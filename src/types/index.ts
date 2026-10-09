export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  price: number;
  quantity: number;
  product?: Product;
}

export interface Payment {
  id: number;
  order_id: number;
  stripe_payment_id: string;
  amount: number;
  status: string;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'paid' | 'failed' | 'shipped';
  created_at: string;
  items?: OrderItem[];
  payment?: Payment;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
