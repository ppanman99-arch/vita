// Shared Coop Data - Đồng bộ cho tất cả 4 portal
export interface CoopData {
  id: string;
  name: string;
  region: string;
  province?: string;
  district?: string;
  latitude?: number; // Cho tính năng định vị
  longitude?: number; // Cho tính năng định vị
  mainProduct: string;
  coverImage: string;
  rating: number;
  annualReturn: number;
  area: number;
  members: number;
  greenlightScore: 5 | 4 | 3;
  isRecruiting: boolean;
  recruitingType: string[];
  // Thông tin cho Xã viên Góp sức (Worker)
  workerInfo?: {
    availablePositions: string[];
    salaryRange: string;
    workConditions: string[];
    benefits: string[];
  };
  // Thông tin cho Xã viên Góp vốn (Investor)
  investorInfo?: {
    minInvestment: number;
    expectedROI: number;
    investmentTerms: string;
    financialReports: string[];
  };
  // Thông tin cho Xã viên Góp đất (Land)
  landInfo?: {
    landTypes: string[];
    leaseTerms: string;
    revenueShare: string;
    contractLength: string;
  };
  // Thông tin cho Xã viên Tiêu dùng (Consumer)
  consumerInfo?: {
    products: string[];
    priceRange: string;
    certifications: string[];
    deliveryOptions: string[];
  };
}

export const coopList: CoopData[] = [
  {
    id: 'htx-sin-ho',
    name: 'HTX Dược Liệu Hữu Cơ Sìn Hồ',
    region: 'Tây Bắc',
    province: 'Lai Châu',
    district: 'Sìn Hồ',
    latitude: 22.3656,
    longitude: 103.2442,
    mainProduct: 'Sâm Ngọc Linh',
    coverImage: 'https://readdy.ai/api/search-image?query=aerial%20view%20of%20vast%20ginseng%20plantation%20in%20misty%20mountains%20terraced%20fields%20organic%20farming%20northern%20vietnam%20highlands%20lush%20green%20landscape%20sustainable%20agriculture%20morning%20fog%20rolling%20hills%20traditional%20medicinal%20herb%20cultivation&width=800&height=500&seq=htx1&orientation=landscape',
    rating: 5,
    annualReturn: 18,
    area: 500,
    members: 1200,
    greenlightScore: 5,
    isRecruiting: true,
    recruitingType: ['Góp vốn', 'Sản xuất'],
    workerInfo: {
      availablePositions: ['Trồng trọt', 'Thu hoạch', 'Chế biến'],
      salaryRange: '5-8 triệu/tháng',
      workConditions: ['Làm việc ngoài trời', 'Hỗ trợ nhà ở', 'Bảo hiểm đầy đủ'],
      benefits: ['Lương thưởng theo mùa', 'Đào tạo kỹ thuật', 'Hỗ trợ con cái học tập']
    },
    investorInfo: {
      minInvestment: 10000000,
      expectedROI: 18,
      investmentTerms: 'Tối thiểu 1 năm',
      financialReports: ['Báo cáo quý', 'Báo cáo năm']
    },
    landInfo: {
      landTypes: ['Đất rừng', 'Đất trồng'],
      leaseTerms: 'Hợp đồng 5-10 năm',
      revenueShare: '70% chủ đất, 30% HTX',
      contractLength: '5-10 năm'
    },
    consumerInfo: {
      products: ['Sâm Ngọc Linh tươi', 'Sâm Ngọc Linh khô', 'Trà Sâm'],
      priceRange: '500K - 5 triệu',
      certifications: ['GACP', 'VietGAP', 'Organic'],
      deliveryOptions: ['Giao hàng tận nơi', 'Nhận tại HTX']
    }
  },
  {
    id: 'htx-kon-tum',
    name: 'HTX Dược Liệu Kon Tum',
    region: 'Tây Nguyên',
    province: 'Kon Tum',
    district: 'Ngọc Hồi',
    latitude: 14.3545,
    longitude: 107.9795,
    mainProduct: 'Sâm Ngọc Linh',
    coverImage: 'https://readdy.ai/api/search-image?query=panoramic%20drone%20shot%20of%20highland%20medicinal%20herb%20farm%20central%20highlands%20vietnam%20organized%20cultivation%20rows%20modern%20greenhouse%20structures%20mountain%20backdrop%20blue%20sky%20professional%20organic%20farming%20cooperative&width=800&height=500&seq=htx2&orientation=landscape',
    rating: 5,
    annualReturn: 15,
    area: 350,
    members: 850,
    greenlightScore: 5,
    isRecruiting: true,
    recruitingType: ['Góp vốn'],
    workerInfo: {
      availablePositions: ['Canh tác', 'Chăm sóc cây'],
      salaryRange: '4-7 triệu/tháng',
      workConditions: ['Làm việc ngoài trời', 'Có chỗ ở', 'Bảo hiểm'],
      benefits: ['Thưởng cuối năm', 'Hỗ trợ học nghề']
    },
    investorInfo: {
      minInvestment: 5000000,
      expectedROI: 15,
      investmentTerms: 'Tối thiểu 6 tháng',
      financialReports: ['Báo cáo năm']
    },
    landInfo: {
      landTypes: ['Đất trồng'],
      leaseTerms: 'Hợp đồng 3-5 năm',
      revenueShare: '65% chủ đất, 35% HTX',
      contractLength: '3-5 năm'
    },
    consumerInfo: {
      products: ['Sâm Ngọc Linh', 'Cao Sâm'],
      priceRange: '300K - 3 triệu',
      certifications: ['GACP', 'VietGAP'],
      deliveryOptions: ['Giao hàng', 'Nhận tại HTX']
    }
  },
  {
    id: 'htx-lam-dong',
    name: 'HTX Dược Liệu Lâm Đồng',
    region: 'Tây Nguyên',
    province: 'Lâm Đồng',
    district: 'Đà Lạt',
    latitude: 11.9404,
    longitude: 108.4583,
    mainProduct: 'Đương Quy',
    coverImage: 'https://readdy.ai/api/search-image?query=beautiful%20aerial%20view%20of%20angelica%20herb%20plantation%20lam%20dong%20province%20vietnam%20neat%20cultivation%20beds%20irrigation%20system%20pine%20forest%20surrounding%20cool%20climate%20agriculture%20sustainable%20farming%20cooperative&width=800&height=500&seq=htx3&orientation=landscape',
    rating: 4,
    annualReturn: 12,
    area: 280,
    members: 620,
    greenlightScore: 4,
    isRecruiting: true,
    recruitingType: ['Sản xuất', 'Tiêu dùng'],
    workerInfo: {
      availablePositions: ['Trồng trọt', 'Thu hoạch', 'Sơ chế'],
      salaryRange: '6-9 triệu/tháng',
      workConditions: ['Làm việc ngoài trời', 'Khí hậu mát mẻ', 'Bảo hiểm'],
      benefits: ['Lương cao', 'Môi trường tốt', 'Cơ hội thăng tiến']
    },
    investorInfo: {
      minInvestment: 8000000,
      expectedROI: 12,
      investmentTerms: 'Tối thiểu 1 năm',
      financialReports: ['Báo cáo quý']
    },
    landInfo: {
      landTypes: ['Đất trồng'],
      leaseTerms: 'Hợp đồng 5 năm',
      revenueShare: '68% chủ đất, 32% HTX',
      contractLength: '5 năm'
    },
    consumerInfo: {
      products: ['Đương Quy tươi', 'Đương Quy khô', 'Trà Đương Quy'],
      priceRange: '200K - 1.5 triệu',
      certifications: ['VietGAP', 'Organic'],
      deliveryOptions: ['Giao hàng', 'Tự đến lấy']
    }
  },
  {
    id: 'htx-da-lat',
    name: 'HTX Nông Nghiệp Sạch Đà Lạt',
    region: 'Tây Nguyên',
    province: 'Lâm Đồng',
    district: 'Đà Lạt',
    latitude: 11.9404,
    longitude: 108.4583,
    mainProduct: 'Dược liệu hữu cơ',
    coverImage: 'https://readdy.ai/api/search-image?query=modern%20organic%20medicinal%20herb%20greenhouse%20complex%20da%20lat%20vietnam%20high%20tech%20agriculture%20controlled%20environment%20clean%20cultivation%20rows%20of%20medicinal%20plants%20professional%20farming%20facility%20mountain%20valley%20setting&width=800&height=500&seq=htx4&orientation=landscape',
    rating: 5,
    annualReturn: 16,
    area: 420,
    members: 980,
    greenlightScore: 5,
    isRecruiting: true,
    recruitingType: ['Góp vốn', 'Tiêu dùng'],
    workerInfo: {
      availablePositions: ['Vận hành nhà kính', 'Nghiên cứu', 'Chế biến'],
      salaryRange: '7-10 triệu/tháng',
      workConditions: ['Công nghệ cao', 'Môi trường sạch', 'Bảo hiểm đầy đủ'],
      benefits: ['Đào tạo chuyên sâu', 'Thăng tiến nhanh', 'Phụ cấp ăn ở']
    },
    investorInfo: {
      minInvestment: 15000000,
      expectedROI: 16,
      investmentTerms: 'Tối thiểu 1 năm',
      financialReports: ['Báo cáo quý', 'Báo cáo năm']
    },
    landInfo: {
      landTypes: ['Đất trồng', 'Nhà kính'],
      leaseTerms: 'Hợp đồng 10 năm',
      revenueShare: '70% chủ đất, 30% HTX',
      contractLength: '10 năm'
    },
    consumerInfo: {
      products: ['Dược liệu hữu cơ', 'Thực phẩm chức năng'],
      priceRange: '400K - 4 triệu',
      certifications: ['GACP', 'Organic', 'EU-Organic'],
      deliveryOptions: ['Giao hàng nhanh', 'Cửa hàng']
    }
  },
  {
    id: 'htx-tay-nguyen',
    name: 'HTX Khoa Học Dược Liệu Tây Nguyên',
    region: 'Tây Nguyên',
    province: 'Gia Lai',
    district: 'Pleiku',
    latitude: 13.9718,
    longitude: 108.0147,
    mainProduct: 'Nghiên cứu & Ươm giống',
    coverImage: 'https://readdy.ai/api/search-image?query=research%20facility%20and%20nursery%20for%20medicinal%20plants%20central%20highlands%20vietnam%20modern%20laboratory%20building%20experimental%20cultivation%20plots%20seedling%20greenhouse%20scientific%20agriculture%20innovation%20center%20professional%20setup&width=800&height=500&seq=htx5&orientation=landscape',
    rating: 5,
    annualReturn: 20,
    area: 150,
    members: 320,
    greenlightScore: 5,
    isRecruiting: true,
    recruitingType: ['Góp vốn'],
    workerInfo: {
      availablePositions: ['Nghiên cứu viên', 'Kỹ thuật viên', 'Ươm giống'],
      salaryRange: '8-12 triệu/tháng',
      workConditions: ['Môi trường chuyên nghiệp', 'Phòng lab', 'Bảo hiểm cao'],
      benefits: ['Học hỏi công nghệ', 'Tham gia nghiên cứu', 'Thăng tiến tốt']
    },
    investorInfo: {
      minInvestment: 20000000,
      expectedROI: 20,
      investmentTerms: 'Tối thiểu 2 năm',
      financialReports: ['Báo cáo quý', 'Báo cáo năm']
    },
    landInfo: {
      landTypes: ['Đất nghiên cứu'],
      leaseTerms: 'Hợp đồng 10 năm',
      revenueShare: '60% chủ đất, 40% HTX',
      contractLength: '10 năm'
    },
    consumerInfo: {
      products: ['Giống cây chất lượng cao', 'Cây giống'],
      priceRange: '100K - 500K',
      certifications: ['Chứng nhận chất lượng'],
      deliveryOptions: ['Vận chuyển', 'Nhận tại HTX']
    }
  },
  {
    id: 'htx-quang-nam',
    name: 'HTX Dược Liệu Quảng Nam',
    region: 'Miền Trung',
    province: 'Quảng Nam',
    district: 'Nam Giang',
    latitude: 15.9267,
    longitude: 108.2571,
    mainProduct: 'Quế, Hồi',
    coverImage: 'https://readdy.ai/api/search-image?query=cinnamon%20and%20star%20anise%20plantation%20quang%20nam%20vietnam%20traditional%20spice%20cultivation%20hillside%20terraces%20mature%20trees%20harvesting%20area%20rural%20cooperative%20farming%20natural%20landscape%20sustainable%20forestry&width=800&height=500&seq=htx6&orientation=landscape',
    rating: 4,
    annualReturn: 14,
    area: 600,
    members: 1450,
    greenlightScore: 4,
    isRecruiting: false,
    recruitingType: [],
    workerInfo: {
      availablePositions: ['Thu hái', 'Chế biến'],
      salaryRange: '5-7 triệu/tháng',
      workConditions: ['Làm theo mùa', 'Ngoài trời'],
      benefits: ['Thưởng mùa vụ']
    },
    investorInfo: {
      minInvestment: 12000000,
      expectedROI: 14,
      investmentTerms: 'Tối thiểu 1 năm',
      financialReports: ['Báo cáo năm']
    },
    landInfo: {
      landTypes: ['Rừng trồng'],
      leaseTerms: 'Hợp đồng 5 năm',
      revenueShare: '65% chủ đất, 35% HTX',
      contractLength: '5 năm'
    },
    consumerInfo: {
      products: ['Quế khô', 'Hồi khô', 'Tinh dầu'],
      priceRange: '150K - 800K',
      certifications: ['VietGAP'],
      deliveryOptions: ['Giao hàng', 'Tự đến lấy']
    }
  }
];

// Helper function to calculate distance (Haversine formula)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
}
