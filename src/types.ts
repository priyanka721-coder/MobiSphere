export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'OnePlus' | 'Xiaomi' | 'Vivo' | 'Oppo';
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  badge?: string;
  specs: string[];
  inStock: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  longDesc?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  date: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Showroom' | 'Repair' | 'Gadget' | 'Interaction';
  image: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
