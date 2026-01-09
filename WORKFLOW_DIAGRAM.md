# VITA COOP - Sơ đồ Workflow Hệ thống

Tài liệu này mô tả toàn bộ workflow và kiến trúc của hệ thống VITA COOP bằng hình ảnh trực quan.

## 📋 Mục lục

1. [Tổng quan Hệ thống](#1-tổng-quan-hệ-thống)
2. [Các Portal & Người dùng](#2-các-portal--người-dùng)
3. [Workflow Chính](#3-workflow-chính)
   - 3.1. Khởi tạo & Số hóa
   - 3.2. Kích hoạt Thị trường & Khớp lệnh
   - 3.3. Triển khai Sản xuất & Giám sát
   - 3.4. Thu hoạch, Thương mại & Tái đầu tư ⭐ MỚI
4. [Luồng Đăng nhập & Đăng ký](#4-luồng-đăng-nhập--đăng-ký)
5. [Luồng Sản xuất & Quản lý](#5-luồng-sản-xuất--quản-lý)

---

## 1. Tổng quan Hệ thống

```mermaid
graph TB
    subgraph "Entry Points"
        Landing[Landing Page /]
        Home[Home Page /home]
        Login[Login Page /login]
    end
    
    subgraph "VITA FARMER - Nông dân"
        FarmerDash[Farmer Dashboard]
        FarmerDiary[Nhật ký Điện tử]
        FarmerWallet[Ví Nông dân]
        FarmerFarm[Quản lý Nông trại]
        FarmerForestry[Lâm nghiệp]
    end
    
    subgraph "VITA ADMIN - HTX"
        AdminDash[Admin Dashboard]
        AdminGIS[GIS & Bản đồ]
        AdminWarehouse[Kho vận]
        AdminFinance[Tài chính]
        AdminMembers[Xã viên]
        AdminProduction[Sản xuất]
        AdminForestry[Lâm nghiệp]
    end
    
    subgraph "VITA RESEARCH - Nghiên cứu"
        ResearchLab[Research Lab]
        GeneNursery[Gene Nursery Hub]
        SeedMarketplace[Seed Marketplace]
        ExpertPortal[Expert Portal]
    end
    
    subgraph "VITA PARTNER - Đối tác B2B"
        PartnerDash[Partner Dashboard]
        PartnerOrder[Đặt hàng]
        PartnerTrace[Traceability]
    end
    
    subgraph "VITA ENTERPRISE - Doanh nghiệp"
        EnterpriseProc[Procurement]
        EnterpriseMatch[Matching]
        EnterpriseNegot[Negotiation]
    end
    
    subgraph "VITA INVESTMENT - Đầu tư"
        InvestorPortal[Investor Portal]
        ESGPortal[ESG Portal]
        TimberTrading[Timber Trading]
    end
    
    subgraph "VITA GOVERNMENT - Chính phủ"
        GovPortal[Gov Portal]
        GovOnboarding[Onboarding]
    end
    
    subgraph "GREENLIGHT - Điều hành"
        Greenlight[GreenLight Command]
    end
    
    Landing --> Home
    Home --> Login
    Login --> FarmerDash
    Login --> AdminDash
    Login --> ResearchLab
    Login --> PartnerDash
    Login --> EnterpriseProc
    
    FarmerDash --> FarmerDiary
    FarmerDash --> FarmerWallet
    FarmerDash --> FarmerFarm
    FarmerDash --> FarmerForestry
    
    AdminDash --> AdminGIS
    AdminDash --> AdminWarehouse
    AdminDash --> AdminFinance
    AdminDash --> AdminMembers
    AdminDash --> AdminProduction
    
    style Landing fill:#10b981
    style Home fill:#10b981
    style Greenlight fill:#1f2937
    style FarmerDash fill:#22c55e
    style AdminDash fill:#3b82f6
    style ResearchLab fill:#a855f7
    style PartnerDash fill:#6366f1
    style InvestorPortal fill:#f59e0b
```

---

## 2. Các Portal & Người dùng

```mermaid
mindmap
  root((VITA COOP))
    Xã viên Nội bộ
      Nông dân & Cộng sự
        Farmer Dashboard
        Nhật ký Điện tử
        Ví Nông dân
        Quản lý Nông trại
      Chủ rừng & Chủ đất
        Quản lý Tài sản
        Ví Carbon
        Dịch vụ Môi trường
      Nhà đầu tư & Góp vốn
        Danh mục Đầu tư
        Báo cáo Tài chính
        Nhận Cổ tức
    Quản trị
      HTX Admin
        Dashboard
        GIS & Bản đồ
        Kho vận
        Tài chính
        Xã viên
        Sản xuất
      GreenLight Command
        Điều hành & Giám sát
        Phân bổ Nguồn lực
    Đối tác B2B
      Doanh nghiệp
        Procurement
        Matching
        Negotiation
      Nghiên cứu
        Research Lab
        Gene Nursery
        Seed Marketplace
        Expert Portal
      Thầy thuốc
        Physician Portal
        Kiểm định Lâm sàng
      Partner Dashboard
        Đặt hàng
        Traceability
    Đầu tư & Tác động
      Investor Portal
        Danh mục Đầu tư
        Báo cáo Hiệu suất
      ESG Portal
        Dự án Tác động
        Báo cáo ESG
      Timber Trading
        Gỗ Nguyên liệu
        Thương mại
    Chính phủ
      Gov Portal
        Xã Nông Thôn Mới Số
        Quản lý Địa phương
```

---

## 3. Workflow Chính

### 3.1. Workflow Khởi tạo & Số hóa (Phần 1)

```mermaid
flowchart TD
    Start([Người dùng truy cập]) --> Onboarding{Onboarding Gateway}
    
    Onboarding --> |Góp Sức| Producer[Đăng ký Nông dân]
    Onboarding --> |Góp Đất| LandDigit[Land Digitization]
    Onboarding --> |Góp Vốn| InvestorReg[Đăng ký Nhà đầu tư]
    
    Producer --> SelectCoop[Chọn HTX]
    SelectCoop --> MemberHub[Member Hub]
    
    LandDigit --> |Số hóa đất rừng| LandDB[(Cơ sở dữ liệu Đất)]
    LandDigit --> SeedListing[Seed Listing]
    
    SeedListing --> SeedMarket[Seed Marketplace]
    
    InvestorReg --> InvestorPortal[Investor Portal]
    
    MemberHub --> FarmerDash[Farmer Dashboard]
    
    style Onboarding fill:#10b981
    style LandDigit fill:#f59e0b
    style SeedMarket fill:#22c55e
    style InvestorPortal fill:#3b82f6
```

### 3.2. Workflow Kích hoạt Thị trường & Khớp lệnh (Phần 2)

```mermaid
flowchart LR
    subgraph "Tạo Nhu cầu"
        Offtake[Offtake Booking]
        ESG[ESG Project Creation]
    end
    
    subgraph "Thanh toán & Đảm bảo"
        Escrow[Escrow Wallet]
        Crowd[Crowd Investment]
    end
    
    subgraph "Khớp Lệnh"
        Matching[Enterprise Matching]
        Negotiation[Negotiation]
    end
    
    Offtake --> Escrow
    ESG --> Escrow
    ESG --> Crowd
    
    Escrow --> Matching
    Crowd --> Matching
    
    Matching --> Negotiation
    Negotiation --> Contract[(Hợp đồng)]
    
    style Offtake fill:#22c55e
    style ESG fill:#10b981
    style Escrow fill:#f59e0b
    style Matching fill:#3b82f6
    style Contract fill:#6366f1
```

### 3.3. Workflow Triển khai Sản xuất & Giám sát (Phần 3)

```mermaid
flowchart TD
    Contract[(Hợp đồng)] --> Input[Input Sourcing]
    
    Input --> TaskAlloc[Task Allocator]
    
    TaskAlloc --> Monitoring[Monitoring & Tracking]
    TaskAlloc --> Production[Sản xuất]
    
    Monitoring --> SmartDisp[Smart Disbursement]
    Production --> SmartDisp
    
    SmartDisp --> Warehouse[Kho vận]
    Warehouse --> Traceability[Traceability]
    
    Traceability --> DigitalHarvest[Digital Harvest]
    
    Production --> AdminDash[Admin Dashboard]
    Monitoring --> FarmerDash[Farmer Dashboard]
    
    style Contract fill:#6366f1
    style Input fill:#22c55e
    style TaskAlloc fill:#3b82f6
    style Monitoring fill:#10b981
    style SmartDisp fill:#f59e0b
    style Traceability fill:#a855f7
    style DigitalHarvest fill:#ec4899
```

### 3.4. Workflow Thu hoạch, Thương mại & Tái đầu tư (Phần 4)

```mermaid
flowchart LR
    DigitalHarvest[Digital Harvest<br/>Thu hoạch số] --> QualityGate[Quality Gate<br/>Cổng chất lượng]
    
    QualityGate --> TradeExec[Trade Execution<br/>Thực thi giao dịch]
    
    TradeExec --> ProfitSplit[Profit Split<br/>Chia lợi nhuận]
    
    ProfitSplit --> Reinvestment[Reinvestment Loop<br/>Vòng lặp tái đầu tư]
    
    Reinvestment --> Onboarding{Onboarding Gateway}
    Onboarding --> LandDigit[Land Digitization]
    
    ProfitSplit --> FarmerWallet[Farmer Wallet]
    ProfitSplit --> AdminFinance[Admin Finance]
    ProfitSplit --> InvestorReturn[Investor Returns]
    
    style DigitalHarvest fill:#ec4899
    style QualityGate fill:#8b5cf6
    style TradeExec fill:#06b6d4
    style ProfitSplit fill:#f59e0b
    style Reinvestment fill:#10b981
    style FarmerWallet fill:#22c55e
    style AdminFinance fill:#3b82f6
    style InvestorReturn fill:#6366f1
```

---

## 4. Luồng Đăng nhập & Đăng ký

```mermaid
stateDiagram-v2
    [*] --> Landing: Truy cập /
    Landing --> Home: Chọn Portal
    Home --> Login: Click Đăng nhập
    Home --> Register: Click Đăng ký
    
    Login --> RoleSelection: Chọn vai trò
    
    RoleSelection --> FarmerLogin: Nông dân
    RoleSelection --> CoopLogin: HTX
    RoleSelection --> ResearchLogin: Nghiên cứu
    RoleSelection --> EnterpriseLogin: Doanh nghiệp
    RoleSelection --> PhysicianLogin: Thầy thuốc
    RoleSelection --> AdminLogin: Admin
    
    FarmerLogin --> MemberHub: Đăng nhập thành công
    CoopLogin --> AdminDash: Đăng nhập thành công
    ResearchLogin --> ResearchLab: Đăng nhập thành công
    EnterpriseLogin --> PartnerDash: Đăng nhập thành công
    PhysicianLogin --> PhysicianPortal: Đăng nhập thành công
    AdminLogin --> Greenlight: Đăng nhập thành công
    
    Register --> RegSelection: Chọn loại đăng ký
    
    RegSelection --> ForestOwnerReg: Chủ rừng
    RegSelection --> CoopReg: HTX
    RegSelection --> EnterpriseReg: Doanh nghiệp
    RegSelection --> ResearchReg: Đối tác Nghiên cứu
    RegSelection --> PhysicianReg: Thầy thuốc
    
    ForestOwnerReg --> Onboarding: Hoàn tất
    CoopReg --> Onboarding: Hoàn tất
    EnterpriseReg --> Onboarding: Hoàn tất
    ResearchReg --> Onboarding: Hoàn tất
    PhysicianReg --> Onboarding: Hoàn tất
```

---

## 5. Luồng Sản xuất & Quản lý

### 5.1. Luồng Nông dân (Farmer Flow)

```mermaid
journey
    title Luồng làm việc của Nông dân
    section Đăng nhập
      Đăng nhập Farmer Portal: 5: Nông dân
      Xem Dashboard: 4: Nông dân
    section Quản lý Nông trại
      Xem Thông tin Nông trại: 5: Nông dân
      Nhập Nhật ký Canh tác: 4: Nông dân
      Báo cáo Sâu bệnh: 3: Nông dân
    section Giao dịch
      Xem Ví: 4: Nông dân
      Nhận Thanh toán: 5: Nông dân
      Xem Cảnh báo: 3: Nông dân
    section Cộng đồng
      Tham gia Cộng đồng: 4: Nông dân
      Quét QR Code: 4: Nông dân
```

### 5.2. Luồng HTX Admin (Admin Flow)

```mermaid
sequenceDiagram
    participant A as Admin
    participant D as Dashboard
    participant G as GIS
    participant W as Warehouse
    participant F as Finance
    participant M as Members
    participant P as Production
    
    A->>D: Đăng nhập Admin Portal
    D->>A: Hiển thị Dashboard
    
    A->>G: Xem Bản đồ & GIS
    G->>A: Thông tin Vùng & Đất
    
    A->>M: Quản lý Xã viên
    M->>A: Danh sách & Thông tin
    
    A->>P: Quản lý Sản xuất
    P->>A: Phân bổ & Theo dõi
    
    A->>W: Quản lý Kho
    W->>A: Tồn kho & Nhập/Xuất
    
    A->>F: Quản lý Tài chính
    F->>A: Báo cáo & Giao dịch
```

### 5.3. Luồng Đối tác Doanh nghiệp (Enterprise Flow)

```mermaid
graph TD
    Enterprise[Enterprise Portal] --> Proc[Procurement<br/>Đặt hàng]
    
    Proc --> Match[Matching<br/>Khớp với HTX]
    
    Match --> Potential[Potential Map<br/>Xem Tiềm năng]
    
    Potential --> Negot[Negotiation<br/>Đàm phán]
    
    Negot --> Contract[Ký Hợp đồng]
    
    Contract --> Order[Partner Order<br/>Theo dõi Đơn hàng]
    
    Order --> Trace[Traceability<br/>Truy xuất Nguồn gốc]
    
    Trace --> Delivery[Giao hàng]
    
    Delivery --> Payment[Thanh toán]
    
    style Enterprise fill:#6366f1
    style Proc fill:#3b82f6
    style Match fill:#22c55e
    style Negot fill:#f59e0b
    style Contract fill:#10b981
    style Trace fill:#a855f7
```

---

## 6. Kiến trúc Hệ thống

```mermaid
graph TB
    subgraph "Frontend - React + TypeScript"
        React[React Application]
        Router[React Router]
        I18n[i18next]
        UI[UI Components]
    end
    
    subgraph "State Management"
        Redux[Redux Toolkit]
        LocalState[Local State]
    end
    
    subgraph "Backend Services"
        Firebase[Firebase<br/>Authentication & Storage]
        Supabase[Supabase<br/>Database & Realtime]
        Stripe[Stripe<br/>Payment]
    end
    
    subgraph "External Services"
        Maps[GIS/Maps APIs]
        Payment[Payment Gateways]
        Notification[Push Notifications]
    end
    
    React --> Router
    React --> I18n
    React --> UI
    React --> Redux
    React --> LocalState
    
    React --> Firebase
    React --> Supabase
    React --> Stripe
    
    Firebase --> Maps
    Supabase --> Payment
    Firebase --> Notification
    
    style React fill:#61dafb
    style Firebase fill:#ffca28
    style Supabase fill:#3ecf8e
    style Stripe fill:#635bff
```

---

## 7. Cấu trúc Thư mục Chính

```mermaid
graph TD
    Root[VITA COOP/] --> Src[src/]
    Root --> Public[public/]
    Root --> Config[Config Files]
    
    Src --> Pages[pages/]
    Src --> Components[components/]
    Src --> Router[router/]
    Src --> I18n[i18n/]
    
    Pages --> Farmer[farmer-*/]
    Pages --> Admin[admin-*/]
    Pages --> Partner[partner-*/]
    Pages --> Enterprise[enterprise-*/]
    Pages --> Research[research-lab/]
    Pages --> Investment[investor-portal/]
    Pages --> Workflows[workflow pages/]
    
    Components --> Feature[feature/]
    Components --> Shared[shared/]
    
    Router --> ConfigRoute[config.tsx]
    Router --> IndexRoute[index.tsx]
    
    style Root fill:#10b981
    style Pages fill:#3b82f6
    style Components fill:#a855f7
    style Router fill:#f59e0b
```

---

## 8. Các Route Chính

```mermaid
graph LR
    subgraph "Public Routes"
        R1[/ - Landing]
        R2[/home - Home]
        R3[/login - Login]
    end
    
    subgraph "Farmer Routes"
        F1[/farmer - Dashboard]
        F2[/farmer/diary - Nhật ký]
        F3[/farmer/wallet - Ví]
        F4[/farmer/farm - Nông trại]
    end
    
    subgraph "Admin Routes"
        A1[/admin - Dashboard]
        A2[/admin-gis - GIS]
        A3[/admin-warehouse - Kho]
        A4[/admin-finance - Tài chính]
    end
    
    subgraph "Workflow Routes"
        W1[/onboarding-gateway]
        W2[/land-digitization]
        W3[/offtake-booking]
        W4[/input-sourcing]
        W5[/digital-harvest]
        W6[/quality-gate]
        W7[/trade-execution]
        W8[/profit-split]
        W9[/reinvestment-loop]
    end
    
    R3 --> F1
    R3 --> A1
    R1 --> W1
```

---

## 📝 Ghi chú

### Cách xem sơ đồ:

1. **VS Code**: Cài extension "Markdown Preview Mermaid Support" hoặc "Mermaid Preview"
2. **GitHub**: Tự động render Mermaid khi push lên GitHub
3. **Online**: Copy code Mermaid và paste vào https://mermaid.live/
4. **Export ảnh**: Dùng https://mermaid.live/ để export PNG/SVG

### Các công cụ khác để tạo workflow:

- **Draw.io / diagrams.net**: Tool vẽ diagram trực quan
- **Lucidchart**: Tool chuyên nghiệp (có phí)
- **Figma**: Design tool, có thể vẽ flowcharts
- **Whimsical**: Tool đơn giản cho flowcharts và mindmaps

---

**Tác giả**: Hệ thống VITA COOP  
**Cập nhật**: 2024  
**Version**: 1.0

