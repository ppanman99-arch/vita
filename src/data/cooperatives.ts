// Mock data cho các Hợp tác xã
export interface Cooperative {
  id: string;
  name: string;
  shortName: string;
  subdomain: string;
  logo?: string;
  coverImage: string;
  description: string;
  location: {
    province: string;
    district: string;
    commune: string;
    address: string;
  };
  stats: {
    members: number;
    area: number; // ha
    products: number;
    revenue: number; // VND
  };
  specialties: string[];
  certifications: string[];
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
    unit: string;
    description: string;
  }[];
  tourism: {
    services: {
      id: string;
      name: string;
      type: 'tour' | 'homestay' | 'experience';
      price: number;
      duration: string;
      image: string;
      description: string;
    }[];
    otaLinks: {
      agoda?: string;
      airbnb?: string;
      traveloka?: string;
      luxstay?: string;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  social: {
    facebook?: string;
    zalo?: string;
  };
  story: {
    title: string;
    content: string;
    images: string[];
  };
}

export const cooperatives: Cooperative[] = [
  {
    id: 'htx-mang-ri',
    name: 'Hợp tác xã Rừng Dược Sinh Măng Ri',
    shortName: 'HTX Măng Ri',
    subdomain: 'mangri',
    coverImage: 'https://readdy.ai/api/search-image?query=Vietnamese%20highland%20forest%20cooperative%20mountain%20landscape%20lush%20green%20forest%20traditional%20village%20sustainable%20agriculture%20herbal%20medicine%20cultivation%20natural%20beauty%20serene%20peaceful%20rural%20Vietnam&width=1200&height=600&seq=coop-cover-001&orientation=landscape',
    description: 'HTX Rừng Dược Sinh Măng Ri chuyên trồng và chế biến các loại dược liệu quý như Sâm Ngọc Linh, Đương Quy, Ba Kích tím theo tiêu chuẩn hữu cơ. Với diện tích 245 ha rừng dược liệu, chúng tôi cam kết mang đến sản phẩm chất lượng cao, an toàn cho sức khỏe.',
    location: {
      province: 'Kon Tum',
      district: 'Kon Plông',
      commune: 'Xã Măng Ri',
      address: 'Thôn Kon Hring, Xã Măng Ri, Huyện Kon Plông, Tỉnh Kon Tum'
    },
    stats: {
      members: 187,
      area: 245.8,
      products: 12,
      revenue: 8500000000
    },
    specialties: [
      'Sâm Ngọc Linh hữu cơ',
      'Đương Quy cao cấp',
      'Ba Kích tím',
      'Cà Gai Leo',
      'Du lịch sinh thái'
    ],
    certifications: [
      'Chứng nhận Hữu cơ (Organic)',
      'VietGAP',
      'Truy xuất nguồn gốc VITA'
    ],
    products: [
      {
        id: 'sam-ngoc-linh',
        name: 'Sâm Ngọc Linh củ tươi',
        image: 'https://readdy.ai/api/search-image?query=fresh%20Vietnamese%20ginseng%20root%20Ngoc%20Linh%20premium%20quality%20organic%20natural%20white%20background%20product%20photography&width=400&height=400&seq=product-sam-001&orientation=squarish',
        price: 5000000,
        unit: 'kg',
        description: 'Sâm Ngọc Linh 5-7 năm tuổi, trồng hữu cơ tại vùng núi Kon Tum, hàm lượng saponin cao'
      },
      {
        id: 'duong-quy',
        name: 'Đương Quy khô',
        image: 'https://readdy.ai/api/search-image?query=dried%20angelica%20root%20herbal%20medicine%20traditional%20Vietnamese%20medicine%20natural%20organic%20product%20photography&width=400&height=400&seq=product-duong-quy-001&orientation=squarish',
        price: 350000,
        unit: 'kg',
        description: 'Đương Quy sấy khô tự nhiên, giữ nguyên dược tính, đóng gói kín'
      },
      {
        id: 'ba-kich',
        name: 'Ba Kích tím tươi',
        image: 'https://readdy.ai/api/search-image?query=fresh%20purple%20morinda%20root%20Vietnamese%20herbal%20medicine%20natural%20organic%20product%20photography&width=400&height=400&seq=product-ba-kich-001&orientation=squarish',
        price: 280000,
        unit: 'kg',
        description: 'Ba Kích tím tươi, thu hoạch đúng độ tuổi, chất lượng cao'
      }
    ],
    tourism: {
      services: [
        {
          id: 'tour-sam',
          name: 'Tour Tham quan Vườn Sâm Ngọc Linh',
          type: 'tour',
          price: 500000,
          duration: '3 giờ',
          image: 'https://readdy.ai/api/search-image?query=Vietnamese%20ginseng%20farm%20tour%20visitors%20walking%20through%20herbal%20garden%20mountain%20landscape%20eco%20tourism%20sustainable%20agriculture&width=600&height=400&seq=tour-sam-001&orientation=landscape',
          description: 'Tham quan vườn Sâm Ngọc Linh, tìm hiểu quy trình trồng và chế biến, thưởng thức trà sâm'
        },
        {
          id: 'homestay',
          name: 'Homestay Rừng Dược Sinh',
          type: 'homestay',
          price: 800000,
          duration: '1 đêm',
          image: 'https://readdy.ai/api/search-image?query=Vietnamese%20highland%20homestay%20traditional%20wooden%20house%20mountain%20view%20eco%20tourism%20sustainable%20tourism%20peaceful%20serene&width=600&height=400&seq=homestay-001&orientation=landscape',
          description: 'Nghỉ dưỡng tại homestay truyền thống, tận hưởng không khí trong lành của núi rừng'
        },
        {
          id: 'experience',
          name: 'Trải nghiệm Thu hoạch Dược liệu',
          type: 'experience',
          price: 300000,
          duration: '2 giờ',
          image: 'https://readdy.ai/api/search-image?query=hands%20harvesting%20herbal%20plants%20Vietnamese%20farmers%20traditional%20agriculture%20sustainable%20farming%20eco%20friendly&width=600&height=400&seq=experience-001&orientation=landscape',
          description: 'Tham gia thu hoạch dược liệu cùng nông dân, học cách nhận biết và chế biến'
        }
      ],
      otaLinks: {
        agoda: 'https://www.agoda.com/homestay-mang-ri',
        airbnb: 'https://www.airbnb.com/rooms/mang-ri-homestay',
        traveloka: 'https://www.traveloka.com/hotel/mang-ri'
      }
    },
    contact: {
      phone: '0901.234.567',
      email: 'info@mangri.vita.vn',
      website: 'https://mangri.vita.vn'
    },
    social: {
      facebook: 'https://facebook.com/htxmangri',
      zalo: 'https://zalo.me/0901234567'
    },
    story: {
      title: 'Hành trình từ Rừng đến Bàn ăn',
      content: 'HTX Măng Ri được thành lập năm 2018 với mục tiêu bảo tồn và phát triển các loại dược liệu quý của Tây Nguyên. Từ những cây sâm đầu tiên được trồng thử nghiệm, đến nay chúng tôi đã có 245 ha rừng dược liệu với 187 thành viên. Mỗi sản phẩm của chúng tôi đều được truy xuất nguồn gốc, đảm bảo chất lượng và an toàn cho người tiêu dùng.',
      images: [
        'https://readdy.ai/api/search-image?query=Vietnamese%20cooperative%20farmers%20working%20together%20herbal%20garden%20teamwork%20sustainable%20agriculture&width=800&height=600&seq=story-001&orientation=landscape',
        'https://readdy.ai/api/search-image?query=Vietnamese%20ginseng%20harvesting%20traditional%20method%20sustainable%20farming%20eco%20friendly&width=800&height=600&seq=story-002&orientation=landscape'
      ]
    }
  },
  {
    id: 'htx-tay-nguyen',
    name: 'Hợp tác xã Dược Liệu Tây Nguyên',
    shortName: 'HTX Tây Nguyên',
    subdomain: 'taynguyen',
    coverImage: 'https://readdy.ai/api/search-image?query=Vietnamese%20Central%20Highlands%20cooperative%20herbal%20medicine%20farm%20mountain%20terrace%20agriculture%20sustainable%20farming%20green%20landscape&width=1200&height=600&seq=coop-cover-002&orientation=landscape',
    description: 'HTX Dược Liệu Tây Nguyên là đơn vị tiên phong trong việc ứng dụng công nghệ số vào quản lý và sản xuất dược liệu. Với hệ thống IoT và truy xuất nguồn gốc blockchain, chúng tôi cam kết mang đến sản phẩm minh bạch, chất lượng cao.',
    location: {
      province: 'Kon Tum',
      district: 'Kon Rẫy',
      commune: 'Xã Đắk Năng',
      address: 'Thôn Đắk Năng, Xã Đắk Năng, Huyện Kon Rẫy, Tỉnh Kon Tum'
    },
    stats: {
      members: 245,
      area: 320.5,
      products: 18,
      revenue: 12500000000
    },
    specialties: [
      'Sâm Ngọc Linh công nghệ cao',
      'Cà Gai Leo chuẩn hóa',
      'Đương Quy sấy lạnh',
      'Tinh dầu dược liệu',
      'Du lịch công nghệ'
    ],
    certifications: [
      'Chứng nhận Hữu cơ (Organic)',
      'VietGAP',
      'ISO 22000',
      'Truy xuất nguồn gốc Blockchain'
    ],
    products: [
      {
        id: 'sam-cao-cap',
        name: 'Sâm Ngọc Linh cao cấp',
        image: 'https://readdy.ai/api/search-image?query=premium%20Vietnamese%20ginseng%20root%20high%20quality%20organic%20certified%20product%20photography&width=400&height=400&seq=product-sam-premium-001&orientation=squarish',
        price: 8000000,
        unit: 'kg',
        description: 'Sâm Ngọc Linh 7-10 năm tuổi, trồng theo công nghệ IoT, hàm lượng saponin >12%'
      },
      {
        id: 'ca-gai-leo',
        name: 'Cà Gai Leo khô',
        image: 'https://readdy.ai/api/search-image?query=dried%20solanum%20procumbens%20herbal%20medicine%20Vietnamese%20traditional%20medicine%20natural%20organic&width=400&height=400&seq=product-ca-gai-001&orientation=squarish',
        price: 180000,
        unit: 'kg',
        description: 'Cà Gai Leo sấy khô công nghệ lạnh, giữ nguyên hoạt chất, đóng gói chân không'
      },
      {
        id: 'tinh-dau',
        name: 'Tinh dầu Đương Quy',
        image: 'https://readdy.ai/api/search-image?query=essential%20oil%20bottle%20angelica%20herbal%20extract%20natural%20organic%20product%20photography&width=400&height=400&seq=product-tinh-dau-001&orientation=squarish',
        price: 1200000,
        unit: 'chai 30ml',
        description: 'Tinh dầu Đương Quy chiết xuất 100% tự nhiên, không pha trộn'
      }
    ],
    tourism: {
      services: [
        {
          id: 'tour-tech',
          name: 'Tour Công nghệ Nông nghiệp 4.0',
          type: 'tour',
          price: 600000,
          duration: '4 giờ',
          image: 'https://readdy.ai/api/search-image?query=smart%20agriculture%20IoT%20sensors%20Vietnamese%20farm%20technology%20modern%20farming%20digital%20agriculture&width=600&height=400&seq=tour-tech-001&orientation=landscape',
          description: 'Tham quan hệ thống IoT, tìm hiểu công nghệ truy xuất nguồn gốc blockchain, trải nghiệm nông nghiệp thông minh'
        },
        {
          id: 'homestay-tech',
          name: 'Eco-Lodge Công nghệ',
          type: 'homestay',
          price: 1200000,
          duration: '1 đêm',
          image: 'https://readdy.ai/api/search-image?query=modern%20eco%20lodge%20Vietnamese%20highland%20sustainable%20architecture%20mountain%20view%20technology%20integrated&width=600&height=400&seq=homestay-tech-001&orientation=landscape',
          description: 'Nghỉ dưỡng tại eco-lodge hiện đại, tích hợp công nghệ IoT, tận hưởng thiên nhiên và công nghệ'
        },
        {
          id: 'workshop',
          name: 'Workshop Chế biến Dược liệu',
          type: 'experience',
          price: 500000,
          duration: '3 giờ',
          image: 'https://readdy.ai/api/search-image?query=herbal%20medicine%20processing%20workshop%20Vietnamese%20traditional%20medicine%20modern%20facility&width=600&height=400&seq=workshop-001&orientation=landscape',
          description: 'Tham gia workshop chế biến dược liệu, học cách làm trà, cao, tinh dầu từ dược liệu tươi'
        }
      ],
      otaLinks: {
        agoda: 'https://www.agoda.com/eco-lodge-tay-nguyen',
        airbnb: 'https://www.airbnb.com/rooms/tay-nguyen-eco-lodge',
        traveloka: 'https://www.traveloka.com/hotel/tay-nguyen-eco',
        luxstay: 'https://www.luxstay.com/tay-nguyen-eco-lodge'
      }
    },
    contact: {
      phone: '0902.345.678',
      email: 'info@taynguyen.vita.vn',
      website: 'https://taynguyen.vita.vn'
    },
    social: {
      facebook: 'https://facebook.com/htxtaynguyen',
      zalo: 'https://zalo.me/0902345678'
    },
    story: {
      title: 'Nông nghiệp Thông minh cho Tương lai Bền vững',
      content: 'HTX Dược Liệu Tây Nguyên được thành lập năm 2020 với tầm nhìn kết hợp giữa truyền thống và công nghệ. Chúng tôi là một trong những HTX đầu tiên tại Việt Nam ứng dụng IoT và blockchain vào sản xuất dược liệu. Với 245 thành viên và 320 ha đất canh tác, chúng tôi không chỉ sản xuất dược liệu chất lượng cao mà còn tạo ra một mô hình nông nghiệp bền vững, minh bạch.',
      images: [
        'https://readdy.ai/api/search-image?query=IoT%20sensors%20Vietnamese%20farm%20smart%20agriculture%20technology%20modern%20farming&width=800&height=600&seq=story-tech-001&orientation=landscape',
        'https://readdy.ai/api/search-image?query=blockchain%20traceability%20Vietnamese%20herbal%20medicine%20supply%20chain%20transparency&width=800&height=600&seq=story-tech-002&orientation=landscape'
      ]
    }
  }
];

// Helper function để lấy HTX theo ID hoặc subdomain
export const getCooperativeById = (id: string): Cooperative | undefined => {
  return cooperatives.find(coop => coop.id === id);
};

export const getCooperativeBySubdomain = (subdomain: string): Cooperative | undefined => {
  return cooperatives.find(coop => coop.subdomain === subdomain);
};



