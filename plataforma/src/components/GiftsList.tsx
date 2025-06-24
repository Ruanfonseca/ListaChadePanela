import React, { useEffect, useState } from 'react';
import GiftCard from './GiftCard';
import GiftSelectionModal from './GiftSelectionModal';
import AdminAuthModal from './AdminAuthModal';
import AddGiftModal from './AddGiftModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift as GiftIcon, Plus, Trash2, FileText, MapPin, Calendar, Clock, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { categories, Gift } from '@/data/gifts';
import ModalInfo from './ModalInfo';
import { callUber } from '@/service/uber';

const GiftsList = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showInfoModal, setShowInfoModal] = useState(true);
  const [pendingGiftData, setPendingGiftData] = useState<{
  giftId: number;
  name: string;
  whatsapp: string;
} | null>(null);

  const [giftsList, setGiftsList] = useState<Gift[]>([]);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminAction, setAdminAction] = useState<'add' | 'delete' | 'print' | null>(null);
  const [loadingAvailable, setLoadingAvailable] = useState(true);
  const [loadingUnavailable, setLoadingUnavailable] = useState(true);
  const [loadingUber, setLoadingUber] = useState(false);
  const { toast } = useToast();
  
  const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-6 h-6 border-4 border-cha-sage-dark border-t-transparent rounded-full animate-spin" />
  </div>
);

  const filteredGifts = selectedCategory === 'Todos' 
    ? giftsList 
    : selectedCategory === 'Disponíveis'
    ? giftsList.filter(gift => gift.available)
    : selectedCategory === 'Indisponíveis'
    ? giftsList.filter(gift => !gift.available)
    : giftsList.filter(gift => gift.category === selectedCategory);


   useEffect(() => {
      fetch(`${import.meta.env.VITE_PROD}/gifts`)
        .then(res => res.json())
        .then(data => {
          setGiftsList(data);
        })
        .catch(err => console.error('❌ Erro ao carregar presentes:', err))
        .finally(() => {
          setLoadingAvailable(false);
          setLoadingUnavailable(false);
        });
    }, []);




  const handleChooseGift = (gift: Gift) => {
  setSelectedGift(gift);
  setIsModalOpen(true);
};

   const sendWhatsAppMessage = (gift: Gift, name: string, whatsapp: string) => {
  const message = `🎁 *Novo presente escolhido para o Chá de Panela do Ruan & Marcelly!*

      *Presente:* ${gift.name}
      *Escolhido por:* ${name}
      *WhatsApp:* ${whatsapp}
      *Data:* ${new Date().toLocaleDateString('pt-BR')}

      _Mensagem enviada automaticamente pelo sistema de presentes._`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5521969232991?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
      };

const handleConfirmGift = (giftId: number, name: string, whatsapp: string) => {
  setShowInfoModal(true);
  setPendingGiftData({ giftId, name, whatsapp });
};

const finalizeGiftConfirmation = async () => {
  if (!pendingGiftData) return;

  const { giftId, name, whatsapp } = pendingGiftData;

  try {
    const res = await fetch(`${import.meta.env.VITE_PROD}/gifts/${giftId}/choose`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, whatsapp })
    });

    if (!res.ok) throw new Error('Erro ao confirmar presente');

    const updatedGift = await res.json();

    setGiftsList(prev =>
      prev.map(g => (g.id === giftId ? updatedGift : g))
    );

    sendWhatsAppMessage(updatedGift, name, whatsapp);
  } catch (err) {
    console.error(err);
  } finally {
    setShowInfoModal(false);
    setPendingGiftData(null);
  }
};



 const handleAdminAction = (action: 'add' | 'delete' | 'print') => {
  setAdminAction(action);
  if (isAuthenticated) {
    executeAdminAction(action);
  } else {
    setIsAdminModalOpen(true);
  }
};


 const executeAdminAction = (action: 'add' | 'delete' | 'print') => {
  switch (action) {
    case 'add':
      setIsAddModalOpen(true);
      break;
    case 'delete':
      toast({
        title: "Modo exclusão ativado",
        description: "Clique nos presentes que deseja excluir.",
      });
      break;
    case 'print':
      printChosenGifts();
      break;
  }
};


  const handleAuthSuccess = () => {
  setIsAuthenticated(true);
  if (adminAction) {
    executeAdminAction(adminAction);
  }
};

const handleAddGift = async (newGift: Omit<Gift, 'id'>) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_PROD}/gifts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGift)
    });

    const savedGift = await res.json();
    setGiftsList(prev => [...prev, savedGift]);
  } catch (err) {
    console.error('❌ Erro ao adicionar presente:', err);
  }
};


const handleDeleteGift = async (giftId: number) => {
  if (!isAuthenticated) {
    handleAdminAction('delete');
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_PROD}/gifts/${giftId}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Erro ao excluir presente');

    setGiftsList(prev => prev.filter(g => g.id !== giftId));

    toast({
      title: "Presente excluído",
      description: "O presente foi removido da lista.",
    });
  } catch (err) {
    console.error('❌ Erro ao excluir presente:', err);
  }
};



 const printChosenGifts = () => {
  const chosenGifts = giftsList.filter(gift => !gift.available);
  const printContent = chosenGifts.map(gift => 
    `${gift.name} - Escolhido por: ${gift.chosenBy}`
  ).join('\n');

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head><title>Lista de Presentes Escolhidos</title></head>
        <body>
          <h2>Presentes Escolhidos para Ruan e Marcelly</h2>
          <pre>${printContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
};


const handleWay = () => {
  setLoadingUber(true)
  navigator.geolocation.getCurrentPosition(
    (position) => {
     setLoadingUber(false)

      callUber(
        "R. Cândida Rosa, 148, Campo Grande, Rio de Janeiro, 23017-340",
        position.coords.latitude,
        position.coords.longitude
      );
    },
    (error) => {
      console.warn('Erro ao obter localização:', error);
      callUber("R. Cândida Rosa, 148, Campo Grande, Rio de Janeiro, 23017-340");
        setLoadingUber(false)
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
};


  const availableCount = filteredGifts.filter(gift => gift.available).length;
  const totalCount = filteredGifts.length;
  const availableGifts = giftsList.filter(gift => gift.available);
  const unavailableGifts = giftsList.filter(gift => !gift.available);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cha-cream to-cha-beige py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <GiftIcon className="text-cha-terracota" size={32} />
            <h1 className="text-4xl font-bold text-cha-brown">Chá de Panela do Ruan & Marcelly</h1>
            <GiftIcon className="text-cha-terracota" size={32} />
          </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-cha-sage/20">
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-cha-brown">

                <div className="flex items-center gap-3 min-w-[250px] justify-center">
                  <MapPin className="text-cha-terracota" size={20} />
                  <div className="text-sm text-center md:text-left">
                    <div className="font-semibold">Local</div>
                    <div>R. Cândida Rosa, 148, Campo Grande, Rio de Janeiro, 23017-340(rua do antigo sítio alegre)</div>
                    <div>Lameirão Pequeno</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-[250px] justify-center">
                  <Calendar className="text-cha-terracota" size={20} />
                  <div className="text-sm text-center md:text-left">
                    <div className="font-semibold">Data</div>
                    <div>30 de Novembro de 2025</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-[250px] justify-center">
                  <Clock className="text-cha-terracota" size={20} />
                  <div className="text-sm text-center md:text-left">
                    <div className="font-semibold">Horário</div>
                    <div>A partir das 13:00h</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-[250px] justify-center">
                  <Car className="text-cha-terracota" size={20} />
                  <div className="text-sm text-center md:text-left">
                    <div className="font-semibold">Chamar Uber</div>
                    {!loadingUber ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-1 border-cha-sage-dark text-cha-sage-dark hover:bg-cha-sage-dark/10"
                          onClick={() => handleWay()}
                        >
                          Ir para o app
                        </Button>
                      </>
                    ):(
                    <> 
                     <Spinner />
                    </>
                  )}
                    
                  </div>
                </div>

              </div>
            </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            onClick={() => handleAdminAction('add')}
            className="bg-cha-sage-dark hover:bg-cha-sage-dark/90 text-white flex items-center gap-2"
          >
            <Plus size={16} />
            Adicionar Presente
          </Button>
          <Button
            onClick={() => handleAdminAction('delete')}
            variant="outline"
            className="border-cha-terracota text-cha-terracota hover:bg-cha-terracota/10 flex items-center gap-2"
          >
            <Trash2 size={16} />
            Excluir Presente
          </Button>
          <Button
            onClick={() => handleAdminAction('print')}
            variant="outline"
            className="border-cha-brown text-cha-brown hover:bg-cha-brown/10 flex items-center gap-2"
          >
            <FileText size={16} />
            Imprimir Lista
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${
                selectedCategory === category 
                  ? 'bg-cha-sage-dark hover:bg-cha-sage-dark/90 text-white' 
                  : 'border-cha-sage-dark text-cha-sage-dark hover:bg-cha-sage-dark/10'
              } transition-colors`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="bg-cha-brown text-white p-6 rounded-2xl mb-8 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Paleta de cores</h3>
          <p className="mb-4">
            Ah! Nosso enxoval será nas cores abaixo, então, se você considerar na escolha do presente, vamos gostar muito!
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cha-sage rounded-full border-2 border-white"></div>
              <span>Verde</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cha-beige rounded-full border-2 border-white"></div>
              <span>Bege</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cha-terracota rounded-full border-2 border-white"></div>
              <span>Terracota</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-600 rounded-full border-2 border-white"></div>
              <span>Marrom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-300"></div>
              <span>Branco</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full border-2 border-white"></div>
              <span>Amadeirado</span>
            </div>
          </div>
        </div>

        <p className="flex justify-center text-cha-brown text-lg">
            Escolha um presente especial para o casal
          </p>
          <div className="flex justify-center mt-4 mb-4 text-cha-sage-dark font-semibold">
            {availableCount} de {totalCount} presentes disponíveis
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white border-cha-sage-dark shadow-lg">
            <CardHeader className="bg-cha-sage-dark/10 border-b border-cha-sage-dark/20">
              <CardTitle className="text-cha-brown flex items-center gap-2">
                <GiftIcon size={20} />
                Presentes Disponíveis ({selectedCategory === 'Disponíveis' ? availableGifts.length : selectedCategory === 'Indisponíveis' ? 0 : availableGifts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 max-h-96 overflow-y-auto">
               {loadingAvailable ? (
                  <Spinner />
                ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(selectedCategory === 'Indisponíveis' ? [] : 
                  selectedCategory === 'Disponíveis' ? availableGifts : 
                  selectedCategory === 'Todos' ? availableGifts : 
                  filteredGifts.filter(gift => gift.available)
                ).map(gift => (
                  <div key={gift.id} className="relative">
                    <GiftCard
                      gift={gift}
                      onChoose={handleChooseGift}
                    />
                    {isAuthenticated && adminAction === 'delete' && (
                      <Button
                        onClick={() => handleDeleteGift(gift.id)}
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 p-1 h-6 w-6"
                      >
                        <Trash2 size={12} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              )}



              {(selectedCategory === 'Indisponíveis' ? [] : 
                selectedCategory === 'Disponíveis' ? availableGifts : 
                selectedCategory === 'Todos' ? availableGifts : 
                filteredGifts.filter(gift => gift.available)
              ).length === 0 && (
                <p className="text-center text-cha-brown py-8">
                  Nenhum presente disponível no momento.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border-cha-terracota shadow-lg">
            <CardHeader className="bg-cha-terracota/10 border-b border-cha-terracota/20">
              <CardTitle className="text-cha-brown flex items-center gap-2">
                <GiftIcon size={20} />
                Presentes Escolhidos ({selectedCategory === 'Disponíveis' ? 0 : selectedCategory === 'Indisponíveis' ? unavailableGifts.length : unavailableGifts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 max-h-96 overflow-y-auto">

                {loadingUnavailable ? (
                    <Spinner />
                  ) : (
              <div className="space-y-3">
                {(selectedCategory === 'Disponíveis' ? [] :
                  selectedCategory === 'Indisponíveis' ? unavailableGifts :
                  selectedCategory === 'Todos' ? unavailableGifts :
                  filteredGifts.filter(gift => !gift.available)
                ).map(gift => (
                  <div key={gift.id} className="bg-cha-beige/50 p-3 rounded-lg border border-cha-sage-dark/20">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{gift.image}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-cha-brown">{gift.name}</h4>
                        <p className="text-sm text-cha-sage-dark">Escolhido por: {gift.chosenBy}</p>
                        {gift.chosenByWhatsApp && (
                          <p className="text-xs text-cha-brown">WhatsApp: (021) ----- ----</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {(selectedCategory === 'Disponíveis' ? [] :
                selectedCategory === 'Indisponíveis' ? unavailableGifts :
                selectedCategory === 'Todos' ? unavailableGifts :
                filteredGifts.filter(gift => !gift.available)
              ).length === 0 && (
                <p className="text-center text-cha-brown py-8">
                  Nenhum presente foi escolhido ainda.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        
      </div>

      <GiftSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gift={selectedGift}
        onConfirm={handleConfirmGift}
      />

      <AdminAuthModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setAdminAction(null);
        }}
        onSuccess={handleAuthSuccess}
      />

      <AddGiftModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddGift}
      />
      
      <ModalInfo
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        onConfirm={finalizeGiftConfirmation}
      />



       <footer className="mt-16 border-t border-cha-sage-dark/20 pt-6 text-center text-sm text-cha-brown">
              <p>
                Com carinho, Ruan & Marcelly 💕
              </p>
              <p className="mt-1 text-cha-sage-dark">
                Sistema de Presentes | Desenvolvido com 💻 e ☕ por
                <a
                  href="https://quedsoftoficial.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline ml-1 hover:text-cha-terracota transition-colors"
                >
                  QuedSoft
                </a>
              </p>
              <p className="mt-1 text-cha-sage-dark">CNPJ: 57.384.148/0001-94</p>
              <p className="mt-1">
                © {new Date().getFullYear()} Todos os direitos reservados
              </p>
            </footer>



    </div>
  );
};

export default GiftsList;
