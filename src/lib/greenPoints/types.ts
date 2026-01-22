// Green Points System Types

export type UserType = 
  | 'farmer' 
  | 'admin' 
  | 'enterprise' 
  | 'investor' 
  | 'expert' 
  | 'consumer' 
  | 'creator' 
  | 'gov';

export type Tier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export type TransactionType = 'earn' | 'redeem' | 'expire' | 'adjust';

export type TransactionStatus = 'pending' | 'completed' | 'cancelled';

export type RewardCategory = 
  | 'discount' 
  | 'service' 
  | 'investment' 
  | 'environment' 
  | 'special';

export interface GreenPoints {
  userId: string;
  userType: UserType;
  totalPoints: number;
  availablePoints: number; // Điểm có thể dùng
  lockedPoints: number; // Điểm đang khóa (chờ xác nhận)
  lifetimePoints: number; // Tổng điểm đã tích từ trước đến nay
  
  // Cấp độ thành viên
  tier: Tier;
  tierPoints: number; // Điểm cần để lên cấp tiếp theo
  
  // Thống kê
  stats: {
    earnedThisMonth: number;
    earnedThisYear: number;
    redeemedThisMonth: number;
    redeemedThisYear: number;
    topActivity: string; // Hoạt động tích điểm nhiều nhất
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface GreenPointTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  points: number; // Số điểm (dương cho earn, âm cho redeem)
  activity: string; // Mô tả hoạt động
  category: string; // Danh mục (production, purchase, etc.)
  portal: string; // Portal nào
  timestamp: string;
  status: TransactionStatus;
  metadata?: Record<string, any>; // Thông tin bổ sung
}

export interface GreenPointReward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  category: RewardCategory;
  available: boolean;
  stock?: number; // Số lượng còn lại (nếu có giới hạn)
  image?: string;
  expiryDate?: string;
  terms?: string; // Điều khoản sử dụng
}

export interface GreenPointActivity {
  id: string;
  name: string;
  description: string;
  points: number;
  category: string;
  portal: string[];
  userTypes: UserType[];
  maxPerDay?: number; // Giới hạn số lần/ngày
  cooldown?: number; // Thời gian chờ (phút) giữa các lần
}

// Tier thresholds
export const TIER_THRESHOLDS: Record<Tier, { min: number; max: number; color: string; icon: string }> = {
  bronze: { min: 0, max: 999, color: '#cd7f32', icon: 'ri-medal-line' },
  silver: { min: 1000, max: 4999, color: '#c0c0c0', icon: 'ri-medal-2-line' },
  gold: { min: 5000, max: 19999, color: '#ffd700', icon: 'ri-medal-fill' },
  platinum: { min: 20000, max: 99999, color: '#e5e4e2', icon: 'ri-star-fill' },
  diamond: { min: 100000, max: Infinity, color: '#b9f2ff', icon: 'ri-diamond-fill' },
};

// Default activities với điểm thưởng
export const DEFAULT_ACTIVITIES: GreenPointActivity[] = [
  // Consumer activities
  {
    id: 'consumer-purchase',
    name: 'Mua sản phẩm',
    description: 'Mua sản phẩm VITA',
    points: 1, // 1 điểm / 10k VNĐ
    category: 'purchase',
    portal: ['coop-consumer-portal', 'farmer-consumer'],
    userTypes: ['consumer'],
  },
  {
    id: 'consumer-organic-purchase',
    name: 'Mua sản phẩm hữu cơ',
    description: 'Mua sản phẩm hữu cơ VITA',
    points: 2, // 2 điểm / 10k VNĐ
    category: 'purchase',
    portal: ['coop-consumer-portal', 'farmer-consumer'],
    userTypes: ['consumer'],
  },
  {
    id: 'consumer-qr-scan',
    name: 'Quét QR truy xuất',
    description: 'Quét QR code để truy xuất nguồn gốc',
    points: 5,
    category: 'engagement',
    portal: ['coop-consumer-portal', 'farmer-consumer'],
    userTypes: ['consumer'],
    maxPerDay: 10,
  },
  {
    id: 'consumer-review',
    name: 'Đánh giá sản phẩm',
    description: 'Viết đánh giá sản phẩm',
    points: 10,
    category: 'engagement',
    portal: ['coop-consumer-portal', 'farmer-consumer'],
    userTypes: ['consumer'],
  },
  {
    id: 'consumer-referral',
    name: 'Giới thiệu bạn bè',
    description: 'Giới thiệu người dùng mới',
    points: 50,
    category: 'referral',
    portal: ['coop-consumer-portal', 'farmer-consumer'],
    userTypes: ['consumer'],
  },
  {
    id: 'consumer-share',
    name: 'Chia sẻ mạng xã hội',
    description: 'Chia sẻ sản phẩm trên mạng xã hội',
    points: 5,
    category: 'engagement',
    portal: ['coop-consumer-portal', 'farmer-consumer'],
    userTypes: ['consumer'],
    maxPerDay: 5,
  },
  
  // Farmer activities
  {
    id: 'farmer-diary-entry',
    name: 'Ghi nhật ký điện tử',
    description: 'Ghi nhật ký canh tác',
    points: 5,
    category: 'production',
    portal: ['farmer-dashboard', 'farmer-diary'],
    userTypes: ['farmer'],
  },
  {
    id: 'farmer-photo-upload',
    name: 'Upload ảnh canh tác',
    description: 'Upload ảnh quá trình canh tác',
    points: 3,
    category: 'production',
    portal: ['farmer-diary', 'farmer-dashboard'],
    userTypes: ['farmer'],
    maxPerDay: 10,
  },
  {
    id: 'farmer-task-complete',
    name: 'Hoàn thành nhiệm vụ SOP',
    description: 'Hoàn thành nhiệm vụ theo quy trình',
    points: 10,
    category: 'production',
    portal: ['farmer-dashboard'],
    userTypes: ['farmer'],
  },
  {
    id: 'farmer-compliance-100',
    name: 'Tuân thủ 100% quy trình',
    description: 'Tuân thủ đầy đủ quy trình trong tháng',
    points: 50,
    category: 'production',
    portal: ['farmer-dashboard'],
    userTypes: ['farmer'],
  },
  {
    id: 'farmer-harvest-standard',
    name: 'Thu hoạch đúng tiêu chuẩn',
    description: 'Thu hoạch đạt tiêu chuẩn chất lượng',
    points: 20,
    category: 'production',
    portal: ['farmer-dashboard', 'digital-harvest'],
    userTypes: ['farmer'],
  },
  {
    id: 'farmer-land-digitize',
    name: 'Số hóa đất rừng',
    description: 'Số hóa đất rừng vào hệ thống',
    points: 100,
    category: 'management',
    portal: ['land-digitization'],
    userTypes: ['farmer'],
  },
  {
    id: 'farmer-gis-update',
    name: 'Cập nhật GIS',
    description: 'Cập nhật thông tin bản đồ',
    points: 10,
    category: 'management',
    portal: ['farmer-farm', 'admin-gis'],
    userTypes: ['farmer', 'admin'],
  },
  {
    id: 'farmer-pest-report',
    name: 'Báo cáo sâu bệnh',
    description: 'Báo cáo phát hiện sâu bệnh',
    points: 15,
    category: 'production',
    portal: ['farmer-dashboard', 'farmer-alerts'],
    userTypes: ['farmer'],
  },
  {
    id: 'farmer-training',
    name: 'Tham gia đào tạo',
    description: 'Hoàn thành khóa đào tạo',
    points: 30,
    category: 'education',
    portal: ['farmer-skill-bank', 'farmer-community'],
    userTypes: ['farmer'],
  },
  {
    id: 'farmer-payment-on-time',
    name: 'Thanh toán đúng hạn',
    description: 'Thanh toán đúng thời hạn',
    points: 5,
    category: 'financial',
    portal: ['farmer-wallet'],
    userTypes: ['farmer'],
  },
  
  // Admin activities
  {
    id: 'admin-approve-member',
    name: 'Phê duyệt xã viên mới',
    description: 'Phê duyệt xã viên mới vào HTX',
    points: 20,
    category: 'management',
    portal: ['admin-members', 'admin-dashboard'],
    userTypes: ['admin'],
  },
  {
    id: 'admin-inventory-check',
    name: 'Quản lý kho hiệu quả',
    description: 'Thực hiện kiểm kê kho',
    points: 10,
    category: 'management',
    portal: ['admin-warehouse'],
    userTypes: ['admin'],
  },
  {
    id: 'admin-financial-report',
    name: 'Báo cáo tài chính minh bạch',
    description: 'Báo cáo tài chính đầy đủ',
    points: 50,
    category: 'management',
    portal: ['admin-finance', 'admin-dashboard'],
    userTypes: ['admin'],
  },
  {
    id: 'admin-certification',
    name: 'Đạt chứng nhận chất lượng',
    description: 'HTX đạt chứng nhận chất lượng',
    points: 200,
    category: 'achievement',
    portal: ['admin-dashboard'],
    userTypes: ['admin'],
  },
  {
    id: 'admin-link-coop',
    name: 'Kết nạp HTX mới',
    description: 'Kết nạp HTX mới vào mạng lưới',
    points: 500,
    category: 'network',
    portal: ['admin-dashboard'],
    userTypes: ['admin'],
  },
  {
    id: 'admin-share-experience',
    name: 'Chia sẻ kinh nghiệm',
    description: 'Chia sẻ kinh nghiệm quản lý',
    points: 30,
    category: 'community',
    portal: ['admin-dashboard'],
    userTypes: ['admin'],
  },
  
  // Enterprise activities
  {
    id: 'enterprise-offtake-order',
    name: 'Đặt hàng bao tiêu',
    description: 'Đặt hàng bao tiêu sản phẩm',
    points: 1, // 1 điểm / 100k VNĐ
    category: 'purchase',
    portal: ['enterprise-procurement', 'offtake-booking'],
    userTypes: ['enterprise'],
  },
  {
    id: 'enterprise-payment-on-time',
    name: 'Thanh toán đúng hạn',
    description: 'Thanh toán đơn hàng đúng hạn',
    points: 10,
    category: 'financial',
    portal: ['enterprise-procurement', 'trade-execution'],
    userTypes: ['enterprise'],
  },
  {
    id: 'enterprise-quality-review',
    name: 'Đánh giá chất lượng tốt',
    description: 'Đánh giá chất lượng sản phẩm',
    points: 20,
    category: 'engagement',
    portal: ['quality-gate', 'enterprise-procurement'],
    userTypes: ['enterprise'],
  },
  {
    id: 'enterprise-esg-sponsor',
    name: 'Tài trợ dự án ESG',
    description: 'Tài trợ dự án ESG',
    points: 5, // 5 điểm / 100k VNĐ
    category: 'esg',
    portal: ['esg-portal', 'esg-project-creation'],
    userTypes: ['enterprise'],
  },
  {
    id: 'enterprise-seed-sponsor',
    name: 'Tài trợ giống',
    description: 'Tài trợ cây giống cho HTX',
    points: 100, // 100 điểm / 1000 cây
    category: 'esg',
    portal: ['esg-portal', 'seed-marketplace'],
    userTypes: ['enterprise'],
  },
  {
    id: 'enterprise-carbon-credit',
    name: 'Mua Carbon Credit',
    description: 'Mua tín chỉ carbon',
    points: 2, // 2 điểm / 1 tấn CO2
    category: 'esg',
    portal: ['esg-portal'],
    userTypes: ['enterprise'],
  },
  
  // Investor activities
  {
    id: 'investor-invest',
    name: 'Đầu tư vào dự án',
    description: 'Đầu tư vào dự án HTX',
    points: 1, // 1 điểm / 1 triệu VNĐ
    category: 'investment',
    portal: ['investor-portal', 'crowd-investment'],
    userTypes: ['investor'],
  },
  {
    id: 'investor-long-term',
    name: 'Đầu tư dài hạn',
    description: 'Đầu tư dài hạn (>3 năm)',
    points: 50,
    category: 'investment',
    portal: ['investor-portal'],
    userTypes: ['investor'],
  },
  {
    id: 'investor-referral',
    name: 'Giới thiệu nhà đầu tư',
    description: 'Giới thiệu nhà đầu tư mới',
    points: 200,
    category: 'referral',
    portal: ['investor-portal'],
    userTypes: ['investor'],
  },
  {
    id: 'investor-esg-invest',
    name: 'Đầu tư ESG',
    description: 'Đầu tư vào dự án ESG',
    points: 2, // 2 điểm / 1 triệu VNĐ
    category: 'esg',
    portal: ['esg-portal', 'investor-portal'],
    userTypes: ['investor'],
  },
  
  // Expert activities
  {
    id: 'expert-sop-create',
    name: 'Đăng SOP mới',
    description: 'Tạo SOP mới cho nông dân',
    points: 50,
    category: 'knowledge',
    portal: ['expert-portal', 'admin-expert'],
    userTypes: ['expert'],
  },
  {
    id: 'expert-diagnosis',
    name: 'Chẩn đoán bệnh',
    description: 'Chẩn đoán bệnh cho cây trồng',
    points: 10,
    category: 'knowledge',
    portal: ['expert-portal', 'expert-marketplace'],
    userTypes: ['expert'],
  },
  {
    id: 'expert-quality-review',
    name: 'Đánh giá chất lượng',
    description: 'Đánh giá chất lượng dược liệu',
    points: 15,
    category: 'quality',
    portal: ['physician-portal', 'quality-gate'],
    userTypes: ['expert', 'physician'],
  },
  {
    id: 'expert-publication',
    name: 'Xuất bản nghiên cứu',
    description: 'Xuất bản công trình nghiên cứu',
    points: 200,
    category: 'knowledge',
    portal: ['research-lab', 'expert-portal'],
    userTypes: ['expert'],
  },
  {
    id: 'expert-workshop',
    name: 'Tổ chức workshop',
    description: 'Tổ chức workshop đào tạo',
    points: 100,
    category: 'education',
    portal: ['expert-portal'],
    userTypes: ['expert'],
  },
  {
    id: 'expert-train-farmer',
    name: 'Đào tạo nông dân',
    description: 'Đào tạo nông dân',
    points: 30,
    category: 'education',
    portal: ['expert-portal', 'farmer-community'],
    userTypes: ['expert'],
  },
  
  // Creator activities
  {
    id: 'creator-livestream',
    name: 'Livestream bán hàng',
    description: 'Livestream bán sản phẩm',
    points: 20,
    category: 'marketing',
    portal: ['creator-hub'],
    userTypes: ['creator'],
  },
  {
    id: 'creator-video-review',
    name: 'Video review',
    description: 'Tạo video review sản phẩm',
    points: 30,
    category: 'marketing',
    portal: ['creator-hub'],
    userTypes: ['creator'],
  },
  {
    id: 'creator-article',
    name: 'Bài viết',
    description: 'Viết bài về sản phẩm',
    points: 15,
    category: 'marketing',
    portal: ['creator-hub'],
    userTypes: ['creator'],
  },
  {
    id: 'creator-kpi-achieved',
    name: 'Đạt KPI bán hàng',
    description: 'Đạt KPI bán hàng tháng',
    points: 100,
    category: 'achievement',
    portal: ['creator-hub'],
    userTypes: ['creator'],
  },
  {
    id: 'creator-esg-campaign',
    name: 'Tạo chiến dịch ESG',
    description: 'Tạo chiến dịch ESG',
    points: 200,
    category: 'esg',
    portal: ['creator-hub'],
    userTypes: ['creator'],
  },
];
