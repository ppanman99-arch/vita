# PHASE 06: CỔNG HỢP TÁC XÃ (HTX) - QUẢN LÝ XÃ VIÊN - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Cung cấp công cụ để HTX quản lý danh sách xã viên (Nông dân, Nhà đầu tư...) và các hợp đồng liên quan.

---

## 1. CREATE NEW PAGES

### 1.1 CooperativeMembersPage
- [ ] Create `src/modules/cooperative/presentation/pages/CooperativeMembersPage.tsx`
- [ ] Features:
  - List members với search, filter
  - Member detail view
  - Add/remove members
  - Assign roles (producer, investor, consumer)

### 1.2 CooperativeContractsPage
- [ ] Create `src/modules/cooperative/presentation/pages/CooperativeContractsPage.tsx`
- [ ] Features:
  - Active contracts list
  - Contract templates
  - Digital signing flow
  - Contract history

**Action Items:**
- [ ] Create members page
- [ ] Create contracts page
- [ ] Design UI/UX

---

## 2. UPDATE DOMAIN & SERVICE

### 2.1 CooperativeMember Entity
```typescript
export interface CooperativeMember {
  id: string;
  cooperativeId: string;
  userId: string;
  role: 'producer' | 'investor' | 'consumer' | 'admin';
  status: 'active' | 'pending' | 'suspended';
  joinedAt: Date;
  // ... other fields
}
```

### 2.2 Update CooperativeService
```typescript
async getMembers(cooperativeId: string): Promise<CooperativeMember[]>
async addMember(cooperativeId: string, userId: string, role: string): Promise<CooperativeMember>
async removeMember(memberId: string): Promise<void>
async updateMemberRole(memberId: string, role: string): Promise<CooperativeMember>
```

**Action Items:**
- [ ] Create CooperativeMember entity
- [ ] Add member management methods
- [ ] Implement CRUD operations

---

## 3. MEMBER MANAGEMENT UI

### 3.1 Members Table
- [ ] Table với columns:
  - Họ tên
  - Email/SĐT
  - Vai trò
  - Trạng thái
  - Ngày tham gia
  - Actions (Edit, Remove)

### 3.2 Add Member Form
- [ ] Form để thêm xã viên:
  - Search user by email/phone
  - Select role
  - Send invitation

**Action Items:**
- [ ] Implement members table
- [ ] Implement add member form
- [ ] Add search và filter

---

## 4. CONTRACTS MANAGEMENT

### 4.1 Contract Entity
```typescript
export interface Contract {
  id: string;
  cooperativeId: string;
  memberId?: string;
  enterpriseId?: string;
  type: 'offtake' | 'investment' | 'supply';
  status: 'draft' | 'pending' | 'signed' | 'active' | 'expired';
  // ... contract details
}
```

### 4.2 Contract Service
- [ ] Create `ContractService.ts`
- [ ] Methods: create, sign, update, list

**Action Items:**
- [ ] Create contract entity
- [ ] Create contract service
- [ ] Implement contract list page

---

## 5. VERIFICATION CHECKLIST

- [ ] Members page displays correctly
- [ ] Can add/remove members
- [ ] Can assign roles
- [ ] Contracts page displays
- [ ] Can view contract details
- [ ] Build succeeds

---

## 6. DEPENDENCIES & NOTES

### Dependencies
- Phase 04: HTX Access
- Phase 05: HTX Dashboard

### Notes
- Member roles cần align với Member module roles
- Contract signing có thể dùng e-signature service sau
