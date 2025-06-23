
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === import.meta.env.VITE_ADMIN_API_KEY) {
      onSuccess();
      setPassword('');
      onClose();
    } else {
      toast({
        title: "Senha incorreta",
        description: "Por favor, digite a senha correta.",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-cha-beige border-cha-sage">
        <DialogHeader>
          <DialogTitle className="text-center text-cha-brown text-xl font-bold flex items-center justify-center gap-2">
            <Lock className="text-cha-terracota" size={24} />
            Acesso Administrativo
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password" className="text-cha-brown font-medium">
              Digite a senha:
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de administrador"
              className="border-cha-sage/50 focus:border-cha-sage mt-2"
              required
            />
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
              Entrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAuthModal;
