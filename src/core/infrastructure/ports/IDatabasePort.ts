export interface QueryOptions {
  table: string;
  filters?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  offset?: number;
}

export interface IDatabasePort {
  create<T>(table: string, data: Partial<T>): Promise<T>;
  read<T>(table: string, id: string): Promise<T | null>;
  update<T>(table: string, id: string, data: Partial<T>): Promise<T>;
  delete(table: string, id: string): Promise<void>;
  query<T>(options: QueryOptions): Promise<T[]>;
}
