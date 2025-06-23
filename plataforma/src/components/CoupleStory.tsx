
import React from 'react';
import { Heart, Coffee } from 'lucide-react';

const CoupleStory = () => {
  return (
    <div className="relative bg-gradient-to-br from-cha-brown to-cha-terracota min-h-screen flex items-center justify-center p-4">
      {/* Animated coffee cups */}
      <div className="absolute top-8 left-8 text-cha-sage text-6xl opacity-30 rotate-12 animate-bounce">
        <Coffee />
      </div>
      <div className="absolute bottom-8 right-8 text-cha-sage text-6xl opacity-30 -rotate-12 animate-bounce" style={{animationDelay: '1s'}}>
        <Coffee />
      </div>
      <div className="absolute top-1/4 right-16 text-cha-sage text-4xl opacity-20 animate-pulse">
        <Coffee />
      </div>
      <div className="absolute bottom-1/4 left-16 text-cha-sage text-4xl opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}>
        <Coffee />
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Header with couple names */}
        <div className="text-center mb-12">
          <div className="relative bg-cha-beige rounded-full p-8 mx-auto w-64 h-64 flex flex-col items-center justify-center shadow-2xl">
            <h1 className="text-5xl font-bold text-cha-brown mb-2">chá</h1>
            <p className="text-2xl text-cha-brown italic font-medium">dos noivos</p>
            <div className="mt-4 bg-cha-terracota text-white px-6 py-2 rounded-full">
              <span className="text-xl font-bold">M & R</span>
            </div>
          </div>
        </div>

        {/* Story content */}
        <div className="bg-cha-beige rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photos section */}
            <div className="flex flex-col gap-4 md:w-1/3">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cha-sage mx-auto">
                <img 
                  src="/lovable-uploads/46f8f8ab-50dd-40c2-b318-0f2bd55daaa5.png" 
                  alt="Ruan e Marcelly" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-cha-terracota mx-auto">
                <img 
                  src="/lovable-uploads/59a52630-a680-4863-9370-07a3428f4f1d.png" 
                  alt="Ruan e Marcelly" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Text content */}
            <div className="md:w-2/3 text-cha-brown">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="text-cha-terracota" size={24} />
                <h2 className="text-3xl font-bold text-cha-brown">Oi! Somos Ruan & Marcelly</h2>
              </div>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Nossa história começou lá em 2022, e desde então temos vivido o 
                  cuidado e a bondade de Deus em cada etapa do nosso relacionamento.
                </p>
                
                <p>
                  Agora chegou uma fase muito especial: estamos prestes a 
                  construir o nosso lar! E é claro que não poderia faltar você 
                  nesse momento tão marcante pra gente.
                </p>
                
                <p className="font-semibold text-cha-terracota">
                  Veja como você pode fazer parte desse sonho.
                </p>
              </div>
              
              {/* Decorative arrow */}
              <div className="mt-8 flex justify-center">
                <div className="text-cha-sage text-4xl animate-bounce">
                  ↓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoupleStory;
