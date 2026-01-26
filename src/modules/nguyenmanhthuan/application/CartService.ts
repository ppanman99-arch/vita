import type { CartItem, Cart } from '../domain/CartItem';
import type { Product } from '../domain/Product';

const CART_STORAGE_KEY = 'nguyenmanhthuan_cart';

export class CartService {
  private getCartFromStorage(): CartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading cart from storage:', error);
      return [];
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  getCart(): Cart {
    const items = this.getCartFromStorage();
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      total,
      itemCount,
    };
  }

  addToCart(product: Product, quantity: number = 1): Cart {
    const items = this.getCartFromStorage();
    const existingIndex = items.findIndex(item => item.product.id === product.id);

    if (existingIndex >= 0) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    this.saveCartToStorage(items);
    return this.getCart();
  }

  updateQuantity(productId: string, quantity: number): Cart {
    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }

    const items = this.getCartFromStorage();
    const item = items.find(item => item.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      this.saveCartToStorage(items);
    }

    return this.getCart();
  }

  removeFromCart(productId: string): Cart {
    const items = this.getCartFromStorage();
    const filtered = items.filter(item => item.product.id !== productId);
    this.saveCartToStorage(filtered);
    return this.getCart();
  }

  clearCart(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CART_STORAGE_KEY);
  }
}
