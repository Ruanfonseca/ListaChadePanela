export interface Gift {
  id: number;
  name: string;
  category: string;
  image: string;
  available: boolean;
  chosenBy?: string;
  chosenByWhatsApp?: string;
}

export const gifts: Gift[] = [
  // Cozinha
  {
    id: 1,
    name: "Conjunto de Panelas Antiaderentes",
    category: "Cozinha",
    image: "🍳",
    available: true
  },
  {
    id: 2,
    name: "Liquidificador",
    category: "Cozinha",
    image: "🥤",
    available: true
  },
  {
    id: 3,
    name: "Conjunto de Facas",
    category: "Cozinha",
    image: "🔪",
    available: true
  },
  {
    id: 4,
    name: "Forma para Bolo",
    category: "Cozinha",
    image: "🍰",
    available: true
  },
  {
    id: 5,
    name: "Conjunto de Potes Herméticos",
    category: "Cozinha",
    image: "🥫",
    available: true
  },
  
  // Mesa e Jantar
  {
    id: 6,
    name: "Conjunto de Pratos",
    category: "Mesa e Jantar",
    image: "🍽️",
    available: true
  },
  {
    id: 7,
    name: "Conjunto de Copos",
    category: "Mesa e Jantar",
    image: "🥛",
    available: true
  },
  {
    id: 8,
    name: "Conjunto de Talheres",
    category: "Mesa e Jantar",
    image: "🍴",
    available: true
  },
  {
    id: 9,
    name: "Jogo Americano",
    category: "Mesa e Jantar",
    image: "🍽️",
    available: true
  },
  
  // Casa e Decoração
  {
    id: 10,
    name: "Conjunto de Toalhas",
    category: "Casa e Decoração",
    image: "🧻",
    available: true
  },
  {
    id: 11,
    name: "Vaso Decorativo",
    category: "Casa e Decoração",
    image: "🏺",
    available: true
  },
  {
    id: 12,
    name: "Conjunto de Lençóis",
    category: "Casa e Decoração",
    image: "🛏️",
    available: true
  },
  {
    id: 13,
    name: "Quadro Decorativo",
    category: "Casa e Decoração",
    image: "🖼️",
    available: true
  },
  
  // Eletrodomésticos
  {
    id: 14,
    name: "Cafeteira Elétrica",
    category: "Eletrodomésticos",
    image: "☕",
    available: true
  },
  {
    id: 15,
    name: "Torradeira",
    category: "Eletrodomésticos",
    image: "🍞",
    available: true
  },
  {
    id: 16,
    name: "Mixer",
    category: "Eletrodomésticos",
    image: "🥄",
    available: true
  },
  
  // Limpeza
  {
    id: 17,
    name: "Aspirador de Pó",
    category: "Limpeza",
    image: "🧹",
    available: true
  },
  {
    id: 18,
    name: "Conjunto de Panos de Limpeza",
    category: "Limpeza",
    image: "🧽",
    available: true
  },
  {
    id: 19,
    name: "Balde com Esfregão",
    category: "Limpeza",
    image: "🪣",
    available: true
  },
  {
    id: 20,
    name: "Cesto de Roupas",
    category: "Limpeza",
    image: "🧺",
    available: true
  }
];

export const categories = [
  "Todos",
  "Disponíveis", 
  "Indisponíveis"
];
