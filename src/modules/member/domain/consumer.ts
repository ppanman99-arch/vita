/** Domain types for Member Consumer (Tiêu dùng) sub-module. */

export interface Product {
  id: string;
  name: string;
  cooperative: string;
  cooperativeId?: string;
  category: string;
  image?: string;
  price: number;
  memberPrice?: number;
  unit?: string;
}

export interface Voucher {
  id: string;
  name: string;
  code?: string;
  discount: number; // % or fixed amount depending on discountType
  discountType: 'percent' | 'fixed';
  minOrder: number;
  expiryDate: string;
  status: 'available' | 'used' | 'expired';
  usedDate?: string;
  orderId?: string;
}

export interface ConsumerOrder {
  id: string;
  userId: string;
  date: string;
  items: string; // summary e.g. "Sâm Ngọc Linh (2kg), Trà Cà Gai Leo (3 hộp)"
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}
