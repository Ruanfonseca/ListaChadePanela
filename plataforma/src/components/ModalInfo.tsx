import React from "react";
import { X } from "lucide-react";

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalInfo({
  isOpen,
  onClose,
  onConfirm,
}: ModalInfoProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-cha-sage/30 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-cha-brown hover:text-cha-terracota transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-cha-brown text-xl font-bold mb-4 text-center">
          Avisos Importante
        </h2>

        {/* Body */}
        <div className="text-cha-brown text-sm space-y-3">
          <p>
            Ao escolher um presente, ele será marcado como indisponível para os
            demais convidados.
          </p>
          <p>
            Alguns presentes tem uma repetição, basta escolher um e digitar as
            informações solicitadas.
          </p>
          <p>
            Essa escolha é <span className="font-semibold">definitiva</span>,
            portanto, não será possível editar ou excluir depois da seleção.
          </p>
          <p>
            Aproveitamos também para pedir que chegue cedo no dia do evento para
            aproveitar cada momento com a gente! 💕
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleConfirm}
            className="bg-cha-sage hover:bg-cha-sage/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
