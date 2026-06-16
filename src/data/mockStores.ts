import type { Store } from "../types";

export const mockStores: Store[] = [
  {
    id: "pizzaria-forno-da-praca",
    name: "Pizzaria Forno da Praça",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    description: "Pizzas artesanais, combos de família e entrega rápida no bairro.",
    category: "Alimentação",
    whatsapp: "5511999991001",
    address: "Centro",
    isMember: true,
  },
  {
    id: "moda-viva",
    name: "Moda Viva",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    description: "Looks femininos, moda casual e promoções semanais.",
    category: "Moda",
    whatsapp: "5511999991002",
    address: "Jardim Primavera",
    isMember: true,
  },
  {
    id: "constrular",
    name: "Constrular Materiais",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    description: "Materiais para obra, acabamento e retirada na loja.",
    category: "Casa e construção",
    whatsapp: "5511999991003",
    address: "Vila Nova",
    isMember: false,
  },
  {
    id: "barbearia-nobre",
    name: "Barbearia Nobre",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
    description: "Corte, barba, sobrancelha e atendimento com hora marcada.",
    category: "Saúde e beleza",
    whatsapp: "5511999991004",
    address: "Centro",
    isMember: true,
  },
];
