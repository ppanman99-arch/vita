import type { IDatabasePort } from '@core/infrastructure/ports/IDatabasePort';
import { SupabaseDatabaseAdapter } from '@core/infrastructure/adapters/database/SupabaseDatabaseAdapter';

export interface VitaApplication {
  id: string;
  cooperativeId: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

function mapRow(row: any): VitaApplication {
  return {
    id: row.id,
    cooperativeId: row.cooperative_id,
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by,
    status: row.status || 'pending',
    adminNotes: row.admin_notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class VitaApplicationService {
  private db: IDatabasePort;

  constructor(db: IDatabasePort = new SupabaseDatabaseAdapter()) {
    this.db = db;
  }

  async submit(cooperativeId: string): Promise<VitaApplication> {
    const existing = await this.getByCooperative(cooperativeId);
    if (existing) {
      if (existing.status === 'pending') {
        return existing;
      }
      const updated = await this.db.update<any>('vita_applications', existing.id, {
        status: 'pending',
        submitted_at: new Date().toISOString(),
        reviewed_at: null,
        reviewed_by: null,
        admin_notes: null,
        updated_at: new Date().toISOString(),
      });
      return mapRow(updated);
    }
    const created = await this.db.create<any>('vita_applications', {
      cooperative_id: cooperativeId,
      status: 'pending',
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    return mapRow(created);
  }

  async getByCooperative(cooperativeId: string): Promise<VitaApplication | null> {
    const rows = await this.db.query<any>({
      table: 'vita_applications',
      filters: { cooperative_id: cooperativeId },
      orderBy: { column: 'submitted_at', ascending: false },
      limit: 1,
    });
    if (!rows.length) return null;
    return mapRow(rows[0]);
  }

  async getPending(): Promise<VitaApplication[]> {
    const rows = await this.db.query<any>({
      table: 'vita_applications',
      filters: { status: 'pending' },
      orderBy: { column: 'submitted_at', ascending: false },
    });
    return rows.map(mapRow);
  }

  async approve(id: string, reviewedBy?: string): Promise<VitaApplication> {
    const app = await this.db.read<any>('vita_applications', id);
    if (!app) throw new Error('Đơn không tồn tại');
    const updated = await this.db.update<any>('vita_applications', id, {
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      reviewed_by: reviewedBy || null,
      updated_at: new Date().toISOString(),
    });
    await this.db.update<any>('cooperatives', app.cooperative_id, {
      status: 'approved',
      updated_at: new Date().toISOString(),
    });
    return mapRow(updated);
  }

  async reject(id: string, adminNotes?: string, reviewedBy?: string): Promise<VitaApplication> {
    const app = await this.db.read<any>('vita_applications', id);
    if (!app) throw new Error('Đơn không tồn tại');
    const updated = await this.db.update<any>('vita_applications', id, {
      status: 'rejected',
      admin_notes: adminNotes || null,
      reviewed_at: new Date().toISOString(),
      reviewed_by: reviewedBy || null,
      updated_at: new Date().toISOString(),
    });
    await this.db.update<any>('cooperatives', app.cooperative_id, {
      status: 'rejected',
      updated_at: new Date().toISOString(),
    });
    return mapRow(updated);
  }
}
