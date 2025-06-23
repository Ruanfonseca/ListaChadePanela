
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gift } from '@/data/gifts';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (gift: Omit<Gift, 'id'>) => void;
}

const AddGiftModal: React.FC<AddGiftModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('image');
  const { toast } = useToast();

  const categories = ["Cozinha", "Mesa e Jantar", "Casa e Decoração", "Eletrodomésticos", "Limpeza"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !category || !image.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    onAdd({
      name: name.trim(),
      category,
      image: image.trim(),
      available: true
    });

    setName('');
    setCategory('');
    setImage('');
    onClose();
    
    toast({
      title: "Presente adicionado!",
      description: `"${name}" foi adicionado à lista de presentes.`,
    });
  };

  const handleClose = () => {
    setName('');
    setCategory('');
    setImage('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-cha-beige border-cha-sage">
        <DialogHeader>
          <DialogTitle className="text-center text-cha-brown text-xl font-bold flex items-center justify-center gap-2">
            <Plus className="text-cha-terracota" size={24} />
            Adicionar Presente
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-cha-brown font-medium">
              Nome do Presente
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Conjunto de Panelas"
              className="border-cha-sage/50 focus:border-cha-sage mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-cha-brown font-medium">
              Categoria
            </Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="border-cha-sage/50 focus:border-cha-sage mt-2">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-cha-sage text-cha-brown hover:bg-cha-sage/10"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-cha-sage hover:bg-cha-sage/90 text-white"
            >
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGiftModal;
