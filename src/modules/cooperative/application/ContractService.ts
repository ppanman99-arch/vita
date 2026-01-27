import type { Contract, ContractType, ContractStatus } from '../domain/Contract';
import type { IDatabasePort } from '@core/infrastructure/ports/IDatabasePort';
import { SupabaseDatabaseAdapter } from '@core/infrastructure/adapters/database/SupabaseDatabaseAdapter';

export class ContractService {
  private dbAdapter: IDatabasePort;

  constructor(dbAdapter: IDatabasePort = new SupabaseDatabaseAdapter()) {
    this.dbAdapter = dbAdapter;
  }

  async getContracts(cooperativeId: string, filters?: {
    type?: ContractType;
    status?: ContractStatus;
    memberId?: string;
  }): Promise<Contract[]> {
    try {
      const queryFilters: Record<string, any> = { cooperative_id: cooperativeId };
      if (filters?.type) queryFilters.type = filters.type;
      if (filters?.status) queryFilters.status = filters.status;
      if (filters?.memberId) queryFilters.member_id = filters.memberId;

      const results = await this.dbAdapter.query<any>({
        table: 'contracts',
        filters: queryFilters,
        orderBy: { column: 'created_at', ascending: false },
      });

      return results.map(row => this.mapDbRowToContract(row));
    } catch (error) {
      console.error('Error fetching contracts:', error);
      // Return empty array if table doesn't exist yet
      return [];
    }
  }

  async getContractById(id: string): Promise<Contract | null> {
    try {
      const result = await this.dbAdapter.read<any>('contracts', id);
      if (!result) return null;
      return this.mapDbRowToContract(result);
    } catch (error) {
      console.error('Error fetching contract:', error);
      return null;
    }
  }

  async createContract(data: Partial<Contract>): Promise<Contract> {
    try {
      if (!data.cooperativeId) {
        throw new Error('Cooperative ID is required');
      }

      const dbData: any = {
        cooperative_id: data.cooperativeId,
        member_id: data.memberId || null,
        enterprise_id: data.enterpriseId || null,
        type: data.type || 'offtake',
        status: data.status || 'draft',
        title: data.title || null,
        description: data.description || null,
        start_date: data.startDate ? data.startDate.toISOString() : null,
        end_date: data.endDate ? data.endDate.toISOString() : null,
        signed_date: data.signedDate ? data.signedDate.toISOString() : null,
        terms: data.terms || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const result = await this.dbAdapter.create<any>('contracts', dbData);
      return this.mapDbRowToContract(result);
    } catch (error) {
      console.error('Error creating contract:', error);
      throw error;
    }
  }

  async updateContract(id: string, data: Partial<Contract>): Promise<Contract> {
    try {
      const dbData: any = {
        updated_at: new Date().toISOString(),
      };

      if (data.status !== undefined) dbData.status = data.status;
      if (data.title !== undefined) dbData.title = data.title;
      if (data.description !== undefined) dbData.description = data.description;
      if (data.startDate !== undefined) dbData.start_date = data.startDate.toISOString();
      if (data.endDate !== undefined) dbData.end_date = data.endDate.toISOString();
      if (data.signedDate !== undefined) dbData.signed_date = data.signedDate.toISOString();
      if (data.terms !== undefined) dbData.terms = data.terms;

      const result = await this.dbAdapter.update<any>('contracts', id, dbData);
      return this.mapDbRowToContract(result);
    } catch (error) {
      console.error('Error updating contract:', error);
      throw error;
    }
  }

  async signContract(id: string): Promise<Contract> {
    try {
      const dbData: any = {
        status: 'signed',
        signed_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const result = await this.dbAdapter.update<any>('contracts', id, dbData);
      return this.mapDbRowToContract(result);
    } catch (error) {
      console.error('Error signing contract:', error);
      throw error;
    }
  }

  async deleteContract(id: string): Promise<void> {
    try {
      await this.dbAdapter.delete('contracts', id);
    } catch (error) {
      console.error('Error deleting contract:', error);
      throw error;
    }
  }

  private mapDbRowToContract(row: any): Contract {
    return {
      id: row.id,
      cooperativeId: row.cooperative_id,
      memberId: row.member_id || undefined,
      enterpriseId: row.enterprise_id || undefined,
      type: row.type || 'offtake',
      status: row.status || 'draft',
      title: row.title || undefined,
      description: row.description || undefined,
      startDate: row.start_date ? new Date(row.start_date) : undefined,
      endDate: row.end_date ? new Date(row.end_date) : undefined,
      signedDate: row.signed_date ? new Date(row.signed_date) : undefined,
      terms: row.terms || undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
