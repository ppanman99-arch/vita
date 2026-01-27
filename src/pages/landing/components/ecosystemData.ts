/**
 * 6 nhóm Hệ sinh thái VITA cho sơ đồ Flow dọc (mobile) và Bánh xe (desktop).
 */

export interface PortalItem {
  name: string;
}

export interface EcosystemGroup {
  id: string;
  label: string;
  shortDescription: string;
  icon: string; // Remix icon class
  portals: PortalItem[];
}

/** Thứ tự flow: Đầu vào → Chất lượng & Khoa học → Sản xuất → Đầu ra → Vốn & Tác động | Điều hành & Chính sách (nền) */
export const ECOSYSTEM_GROUPS: EcosystemGroup[] = [
  {
    id: 'input',
    label: 'Đầu vào',
    shortDescription: 'Đất, vốn, giống, vật tư, tri thức',
    icon: 'ri-input-method-line',
    portals: [
      { name: 'Chủ Rừng (đất)' },
      { name: 'Nhà Góp Vốn (xã viên)' },
      { name: 'VITA Supply' },
      { name: 'VITA Expert Hub' },
      { name: 'VITA Forestry' },
    ],
  },
  {
    id: 'quality-science',
    label: 'Chất lượng & Khoa học',
    shortDescription: 'Giống, dược điển, chuẩn',
    icon: 'ri-flask-line',
    portals: [
      { name: 'VITA Research / Trung tâm Gen' },
      { name: 'Tiêu chuẩn dược điển (VITALITY)' },
    ],
  },
  {
    id: 'production',
    label: 'Sản xuất',
    shortDescription: 'HTX, nông dân, quản lý',
    icon: 'ri-plant-line',
    portals: [
      { name: 'Nông Dân' },
      { name: 'Hợp Tác Xã (HTX)' },
      { name: 'VITA Admin' },
    ],
  },
  {
    id: 'output',
    label: 'Đầu ra',
    shortDescription: 'Doanh nghiệp, thầy thuốc, thương hiệu, gỗ, KOL',
    icon: 'ri-output-line',
    portals: [
      { name: 'VITA Partner' },
      { name: 'VITA Physician' },
      { name: 'HTX Brand Hub' },
      { name: 'Timber Trading Hub' },
      { name: 'VITA Creator Hub' },
    ],
  },
  {
    id: 'capital-impact',
    label: 'Vốn & Tác động',
    shortDescription: 'NĐT, ESG, Carbon',
    icon: 'ri-hand-coin-line',
    portals: [
      { name: 'Investor Portal' },
      { name: 'ESG Impact Hub' },
      { name: 'Doanh nghiệp Gỗ' },
    ],
  },
  {
    id: 'governance',
    label: 'Điều hành & Chính sách',
    shortDescription: 'Bao bọc / Giám sát toàn chuỗi',
    icon: 'ri-government-line',
    portals: [
      { name: 'Greenlight Command' },
      { name: 'VITA Gov Portal' },
    ],
  },
];

/** Ids của 4 nhóm nằm trên vòng tròn (bánh xe), theo thứ tự flow. Tâm = Chất lượng & Khoa học. */
export const WHEEL_ORBIT_ORDER = ['input', 'production', 'output', 'capital-impact'] as const;
