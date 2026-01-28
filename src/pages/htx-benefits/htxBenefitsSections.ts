export interface HtxBenefitSection {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  mobileImage: string;
  desktopImage: string;
}

export const htxBenefitsSections: HtxBenefitSection[] = [
  {
    id: 'capital',
    title: 'Vốn & Kêu Gọi Đầu Tư',
    description: 'Tiếp cận nguồn vốn đa dạng từ nền tảng, kết nối nhà đầu tư ESG và cộng đồng',
    category: 'Tài chính',
    icon: 'ri-funds-line',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    mobileImage: 'https://readdy.ai/api/search-image?query=Modern%20agricultural%20cooperative%20farmers%20discussing%20investment%20plans%20with%20financial%20documents%20and%20digital%20tablets%20in%20bright%20meeting%20room%20with%20natural%20lighting%20and%20green%20plants%20creating%20professional%20atmosphere&width=400&height=800&seq=htx-capital-mobile&orientation=portrait',
    desktopImage: 'https://readdy.ai/api/search-image?query=Professional%20agricultural%20investment%20meeting%20with%20diverse%20stakeholders%20reviewing%20financial%20charts%20and%20sustainable%20farming%20plans%20in%20modern%20bright%20office%20with%20natural%20elements%20and%20clean%20minimalist%20design&width=600&height=600&seq=htx-capital-desktop&orientation=squarish',
    benefits: [
      {
        title: 'Góp vốn linh hoạt',
        description: 'Cơ chế góp vốn linh hoạt từ thành viên và đối tác',
        icon: 'ri-hand-coin-line'
      },
      {
        title: 'Đầu tư ESG',
        description: 'Kêu gọi đầu tư ESG từ các tổ chức và cá nhân quan tâm nông nghiệp bền vững',
        icon: 'ri-leaf-line'
      },
      {
        title: 'Crowdfunding minh bạch',
        description: 'Crowdfunding minh bạch qua nền tảng VITA',
        icon: 'ri-group-line'
      },
      {
        title: 'Hỗ trợ tài chính',
        description: 'Hỗ trợ tài chính từ các chương trình Nhà nước và quốc tế',
        icon: 'ri-government-line'
      },
      {
        title: 'Quản lý vốn chuyên nghiệp',
        description: 'Quản lý vốn chuyên nghiệp với công cụ số hóa',
        icon: 'ri-line-chart-line'
      }
    ]
  },
  {
    id: 'standard',
    title: 'Chuẩn & Thương Hiệu',
    description: 'Nâng cao uy tín với chuẩn dược điển VITALITY và chứng nhận chất lượng',
    category: 'Chất lượng',
    icon: 'ri-award-line',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    mobileImage: 'https://readdy.ai/api/search-image?query=Premium%20medicinal%20herbs%20with%20quality%20certification%20badges%20and%20QR%20codes%20displayed%20on%20clean%20white%20surface%20with%20soft%20lighting%20highlighting%20product%20excellence%20and%20brand%20trust&width=400&height=800&seq=htx-standard-mobile&orientation=portrait',
    desktopImage: 'https://readdy.ai/api/search-image?query=High%20quality%20certified%20medicinal%20herbs%20arranged%20beautifully%20with%20authentication%20certificates%20and%20modern%20branding%20elements%20in%20bright%20professional%20setting%20with%20clean%20minimalist%20aesthetic&width=600&height=600&seq=htx-standard-desktop&orientation=squarish',
    benefits: [
      {
        title: 'Chuẩn VITALITY',
        description: 'Áp dụng chuẩn dược điển VITALITY - tiêu chuẩn cao cho dược liệu',
        icon: 'ri-medal-line'
      },
      {
        title: 'Chứng nhận minh bạch',
        description: 'Hệ thống chứng nhận và truy xuất nguồn gốc minh bạch',
        icon: 'ri-shield-check-line'
      },
      {
        title: 'Xây dựng thương hiệu',
        description: 'Xây dựng thương hiệu HTX trên nền tảng quốc gia',
        icon: 'ri-building-line'
      },
      {
        title: 'Tem chống giả',
        description: 'Tem chống giả và QR code cho từng sản phẩm',
        icon: 'ri-qr-code-line'
      },
      {
        title: 'Tăng giá trị',
        description: 'Tăng giá trị thương hiệu qua uy tín và chất lượng được kiểm chứng',
        icon: 'ri-arrow-up-line'
      }
    ]
  },
  {
    id: 'market',
    title: 'Đầu Ra & Thị Trường',
    description: 'Kết nối trực tiếp với doanh nghiệp dược và thị trường tiêu thụ ổn định',
    category: 'Thương mại',
    icon: 'ri-store-3-line',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    mobileImage: 'https://readdy.ai/api/search-image?query=Modern%20pharmaceutical%20company%20representatives%20meeting%20with%20cooperative%20farmers%20in%20bright%20warehouse%20filled%20with%20medicinal%20herbs%20discussing%20business%20contracts%20and%20market%20opportunities&width=400&height=800&seq=htx-market-mobile&orientation=portrait',
    desktopImage: 'https://readdy.ai/api/search-image?query=Professional%20business%20handshake%20between%20pharmaceutical%20company%20and%20agricultural%20cooperative%20with%20medicinal%20herb%20products%20displayed%20in%20modern%20bright%20commercial%20space%20with%20clean%20design&width=600&height=600&seq=htx-market-desktop&orientation=squarish',
    benefits: [
      {
        title: 'Kết nối doanh nghiệp',
        description: 'Kết nối doanh nghiệp dược phẩm có nhu cầu nguyên liệu ổn định',
        icon: 'ri-building-2-line'
      },
      {
        title: 'Hợp đồng cam kết',
        description: 'Hợp đồng đặt hàng và cam kết thu mua từ đối tác',
        icon: 'ri-file-text-line'
      },
      {
        title: 'HTX Brand Hub',
        description: 'HTX Brand Hub - không gian thương hiệu riêng trên nền tảng',
        icon: 'ri-store-2-line'
      },
      {
        title: 'Sàn giao dịch',
        description: 'Sàn giao dịch dược liệu kết nối HTX với người mua',
        icon: 'ri-exchange-line'
      },
      {
        title: 'Xuất khẩu',
        description: 'Mở rộng thị trường xuất khẩu qua mạng lưới đối tác quốc tế',
        icon: 'ri-global-line'
      }
    ]
  },
  {
    id: 'management',
    title: 'Quản Trị & Vận Hành',
    description: 'Công cụ quản lý chuyên nghiệp giúp HTX vận hành hiệu quả và minh bạch',
    category: 'Công nghệ',
    icon: 'ri-dashboard-line',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    mobileImage: 'https://readdy.ai/api/search-image?query=Modern%20digital%20dashboard%20displaying%20agricultural%20cooperative%20management%20data%20with%20charts%20and%20analytics%20on%20tablet%20screen%20in%20bright%20office%20environment%20with%20clean%20professional%20aesthetic&width=400&height=800&seq=htx-management-mobile&orientation=portrait',
    desktopImage: 'https://readdy.ai/api/search-image?query=Professional%20cooperative%20manager%20using%20advanced%20digital%20management%20system%20with%20multiple%20screens%20showing%20real-time%20data%20analytics%20and%20production%20monitoring%20in%20modern%20bright%20workspace&width=600&height=600&seq=htx-management-desktop&orientation=squarish',
    benefits: [
      {
        title: 'VITA Admin',
        description: 'VITA Admin - hệ thống quản lý HTX toàn diện',
        icon: 'ri-admin-line'
      },
      {
        title: 'Dashboard real-time',
        description: 'Dashboard theo dõi sản xuất, thành viên, tài chính real-time',
        icon: 'ri-bar-chart-box-line'
      },
      {
        title: 'Quản lý thành viên',
        description: 'Quản lý thành viên, phân quyền và hợp tác nội bộ',
        icon: 'ri-team-line'
      },
      {
        title: 'Lập kế hoạch',
        description: 'Công cụ lập kế hoạch sản xuất và quản lý vụ mùa',
        icon: 'ri-calendar-check-line'
      },
      {
        title: 'Báo cáo tự động',
        description: 'Báo cáo tài chính tự động, minh bạch với thành viên',
        icon: 'ri-file-chart-line'
      }
    ]
  },
  {
    id: 'support',
    title: 'Hỗ Trợ & Chính Sách',
    description: 'Đào tạo chuyên sâu và hỗ trợ tận tình từ đội ngũ chuyên gia',
    category: 'Dịch vụ',
    icon: 'ri-customer-service-2-line',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    mobileImage: 'https://readdy.ai/api/search-image?query=Expert%20agricultural%20consultant%20teaching%20medicinal%20herb%20cultivation%20techniques%20to%20cooperative%20farmers%20in%20bright%20training%20room%20with%20educational%20materials%20and%20supportive%20atmosphere&width=400&height=800&seq=htx-support-mobile&orientation=portrait',
    desktopImage: 'https://readdy.ai/api/search-image?query=Professional%20training%20session%20with%20agricultural%20experts%20providing%20guidance%20to%20cooperative%20members%20in%20modern%20bright%20classroom%20with%20educational%20displays%20and%20collaborative%20learning%20environment&width=600&height=600&seq=htx-support-desktop&orientation=squarish',
    benefits: [
      {
        title: 'Đào tạo kỹ thuật',
        description: 'Chương trình đào tạo kỹ thuật canh tác dược liệu chuẩn',
        icon: 'ri-book-open-line'
      },
      {
        title: 'Tư vấn chính sách',
        description: 'Tư vấn chính sách Nhà nước hỗ trợ HTX và nông nghiệp',
        icon: 'ri-file-list-3-line'
      },
      {
        title: 'Hỗ trợ pháp lý',
        description: 'Hỗ trợ pháp lý trong thành lập và vận hành HTX',
        icon: 'ri-scales-3-line'
      },
      {
        title: 'Kết nối tài trợ',
        description: 'Kết nối các chương trình tài trợ và hỗ trợ quốc tế',
        icon: 'ri-hand-heart-line'
      },
      {
        title: 'Đồng hành 24/7',
        description: 'Đội ngũ chuyên gia đồng hành 24/7',
        icon: 'ri-service-line'
      }
    ]
  },
  {
    id: 'ecosystem',
    title: 'Kết Nối Hệ Sinh Thái',
    description: 'Tham gia mạng lưới HTX và đối tác toàn quốc, chia sẻ nguồn lực',
    category: 'Cộng đồng',
    icon: 'ri-links-line',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    mobileImage: 'https://readdy.ai/api/search-image?query=Diverse%20network%20of%20agricultural%20cooperatives%20connecting%20and%20collaborating%20with%20shared%20resources%20and%20equipment%20in%20bright%20modern%20facility%20with%20community%20spirit%20and%20teamwork%20atmosphere&width=400&height=800&seq=htx-ecosystem-mobile&orientation=portrait',
    desktopImage: 'https://readdy.ai/api/search-image?query=Connected%20network%20of%20cooperative%20members%20and%20partners%20sharing%20knowledge%20and%20resources%20in%20modern%20bright%20collaborative%20space%20with%20visual%20representation%20of%20ecosystem%20and%20community&width=600&height=600&seq=htx-ecosystem-desktop&orientation=squarish',
    benefits: [
      {
        title: 'Nhà cung cấp chất lượng',
        description: 'Kết nối nhà cung cấp giống, vật tư đầu vào chất lượng',
        icon: 'ri-plant-line'
      },
      {
        title: 'Mạng lưới chuyên gia',
        description: 'Mạng lưới chuyên gia nông nghiệp và dược liệu',
        icon: 'ri-user-star-line'
      },
      {
        title: 'Sàn HTX',
        description: 'Sàn HTX - hợp tác và trao đổi kinh nghiệm giữa các HTX',
        icon: 'ri-community-line'
      },
      {
        title: 'Chia sẻ nguồn lực',
        description: 'Chia sẻ máy móc, thiết bị và nguồn lực sản xuất',
        icon: 'ri-share-line'
      },
      {
        title: 'Cộng đồng học hỏi',
        description: 'Cộng đồng HTX học hỏi và phát triển cùng nhau',
        icon: 'ri-graduation-cap-line'
      }
    ]
  }
];
