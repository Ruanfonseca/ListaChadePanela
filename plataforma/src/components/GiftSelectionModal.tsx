
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gift } from '@/data/gifts';
import { Heart, User, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GiftSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  gift: Gift | null;
  onConfirm: (giftId: number, name: string, whatsapp: string) => void;
}

const GiftSelectionModal: React.FC<GiftSelectionModalProps> = ({
  isOpen,
  onClose,
  gift,
  onConfirm
}) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !whatsapp.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    if (gift) {
      onConfirm(gift.id, name.trim(), whatsapp.trim());
      setName('');
      setWhatsapp('');
      onClose();
      toast({
        title: "Presente escolhido!",
        description: `Obrigado por escolher "${gift.name}". Ruan e Marcelly ficarão muito felizes! 💕`,
      });
    }
  };

  const handleClose = () => {
    setName('');
    setWhatsapp('');
    onClose();
  };

  if (!gift) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-cha-beige border-cha-sage-dark">
        <DialogHeader>
          <DialogTitle className="text-center text-cha-brown text-xl font-bold flex items-center justify-center gap-2">
            <Heart className="text-cha-terracota" size={24} />
            Confirmar Presente
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Selected gift display */}
          <div className="bg-white p-4 rounded-lg border border-cha-sage-dark/30 text-center">
            <div className="text-3xl mb-2">{gift.image}</div>
            <h3 className="font-semibold text-cha-brown">{gift.name}</h3>
            <p className="text-cha-sage-dark text-sm">{gift.category}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-cha-brown font-medium flex items-center gap-2 mb-2">
                <User size={16} />
                Nome Completo
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="border-cha-sage-dark/50 focus:border-cha-sage-dark"
                required
              />
            </div>

            <div>
              <Label htmlFor="whatsapp" className="text-cha-brown font-medium flex items-center gap-2 mb-2">
                <Phone size={16} />
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(00) 00000-0000"
                className="border-cha-sage-dark/50 focus:border-cha-sage-dark"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-cha-sage-dark text-cha-brown hover:bg-cha-sage-dark/10"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-cha-sage-dark hover:bg-cha-sage-dark/90 text-white"
              >
                Confirmar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GiftSelectionModal;
