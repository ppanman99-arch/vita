import type { CartItem } from './CartItem';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  };
  paymentMethod?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  greenPointsEarned?: number;
  createdAt: Date;
  updatedAt: Date;
}
