
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from '@/data/gifts';

interface GiftCardProps {
  gift: Gift;
  onChoose: (gift: Gift) => void;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, onChoose }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-cha-beige">
      <div className="p-6">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{gift.image}</div>
          <h3 className="font-semibold text-cha-brown text-lg mb-2">{gift.name}</h3>
          <p className="text-cha-sage-dark text-sm">{gift.category}</p>
        </div>
        
        <div className="mt-4">
          {gift.available ? (
            <Button 
              onClick={() => onChoose(gift)}
              className="w-full bg-cha-sage-dark hover:bg-cha-sage-dark/90 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Escolher
            </Button>
          ) : (
            <div className="w-full text-center">
              <span className="text-gray-500 font-medium">Já escolhido</span>
              {gift.chosenBy && (
                <p className="text-sm text-gray-400 mt-1">por {gift.chosenBy}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
