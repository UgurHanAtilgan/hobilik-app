export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isSeller: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sellerId: string;
  sellerName: string;
  tags: string[];
  materials: string[];
  dimensions?: string;
  weight?: string;
  customizable: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

export type RootStackParamList = {
  '(tabs)': undefined;
  'product/[id]': { id: string };
  'seller/[id]': { id: string };
  'checkout': undefined;
  'order/[id]': { id: string };
};

export type TabsParamList = {
  index: undefined;
  search: undefined;
  cart: undefined;
  profile: undefined;
};