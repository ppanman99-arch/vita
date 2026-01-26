import { IDatabasePort, QueryOptions } from '../../ports/IDatabasePort';
import { supabase } from '../../../../lib/supabase'; // Temporary, sẽ refactor sau

export class SupabaseDatabaseAdapter implements IDatabasePort {
  async create<T>(table: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result as T;
  }

  async read<T>(table: string, id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data as T;
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result as T;
  }

  async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  async query<T>(options: QueryOptions): Promise<T[]> {
    let query = supabase.from(options.table).select('*');
    
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      });
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit ?? 10) - 1);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as T[];
  }
}
