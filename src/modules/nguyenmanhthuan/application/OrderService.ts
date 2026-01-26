import type { IDatabasePort } from '@core/infrastructure/ports/IDatabasePort';
import type { Order, OrderStatus } from '../domain/Order';
import type { CartItem } from '../domain/CartItem';

export interface CreateOrderParams {
  userId: string;
  items: CartItem[];
  total: number;
  shippingAddress?: {
    name: string;
    phone: string;
  };
  paymentMethod?: string;
}

export class OrderService {
  private dbAdapter: IDatabasePort;

  constructor(dbAdapter: IDatabasePort) {
    this.dbAdapter = dbAdapter;
  }

  async createOrder(params: CreateOrderParams): Promise<Order> {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const order: Order = {
      id: orderId,
      userId: params.userId,
      items: params.items,
      total: params.total,
      status: 'pending',
      shippingAddress: params.shippingAddress as any,
      paymentMethod: params.paymentMethod,
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to database
    const dbRow = await this.dbAdapter.create('orders', {
      id: order.id,
      user_id: order.userId,
      items: JSON.stringify(order.items),
      total: order.total,
      status: order.status,
      shipping_address: order.shippingAddress ? JSON.stringify(order.shippingAddress) : null,
      payment_method: order.paymentMethod || null,
      payment_status: order.paymentStatus,
      green_points_earned: order.greenPointsEarned || null,
      created_at: order.createdAt.toISOString(),
      updated_at: order.updatedAt.toISOString(),
    });

    return order;
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    const data = await this.dbAdapter.read<any>('orders', orderId);

    if (!data) {
      return null;
    }

    return this.mapDbRowToOrder(data);
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    const data = await this.dbAdapter.query<any>({
      table: 'orders',
      filters: { user_id: userId },
      orderBy: { column: 'created_at', ascending: false },
    });

    if (!data) {
      return [];
    }

    return data.map(row => this.mapDbRowToOrder(row));
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const data = await this.dbAdapter.update<any>('orders', orderId, {
      status,
      updated_at: new Date().toISOString(),
    });

    return this.mapDbRowToOrder(data);
  }

  private mapDbRowToOrder(row: any): Order {
    return {
      id: row.id,
      userId: row.user_id,
      items: JSON.parse(row.items || '[]'),
      total: row.total,
      status: row.status as OrderStatus,
      shippingAddress: row.shipping_address ? JSON.parse(row.shipping_address) : undefined,
      paymentMethod: row.payment_method || undefined,
      paymentStatus: row.payment_status || undefined,
      greenPointsEarned: row.green_points_earned || undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
