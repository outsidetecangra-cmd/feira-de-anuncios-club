export type AdBadge = "destaque" | "associado" | "promocao";

export interface Ad {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  advertiser: string;
  whatsapp: string;
  location: string;
  status: "ativo" | "inativo";
  badges: AdBadge[];
  storeId?: string;
  type: "particular" | "loja";
  createdAt: string;
}

export interface Store {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  whatsapp: string;
  address: string;
  isMember: boolean;
}

export interface Category {
  name: string;
  description: string;
  icon: string;
}

export interface ClubLead {
  id: string;
  name: string;
  whatsapp: string;
  source: string;
  createdAt: string;
}
