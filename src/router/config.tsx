import { lazy, Suspense } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import { nguyenManhthuanRoutes } from "@modules/nguyenmanhthuan/infrastructure/NguyenManhthuanModuleRouter";

// Lazy load pages
const HomePage = lazy(() => import("../pages/home/page"));
const LoginPage = lazy(() => import("../pages/login/page"));
const LandingPage = lazy(() => import("../pages/landing/page"));
const ForestOwnerRegisterPage = lazy(() => import("../pages/forest-owner-register/page"));
const CooperativeRegisterPage = lazy(() => import("../pages/cooperative-register/page"));
const EnterpriseRegisterPage = lazy(() => import("../pages/enterprise-register/page"));
const ResearchPartnerRegisterPage = lazy(() => import("../pages/research-partner-register/page"));
const PhysicianRegisterPage = lazy(() => import("../pages/physician-register/page"));

// Member Hub - Trung tâm Xã viên
const MemberHubPage = lazy(() => import("../pages/member-hub/page"));

// VITA FARMER - 3 vai trò tích hợp
const FarmerProducerPage = lazy(() => import("../pages/farmer-producer/page"));
const FarmerResourcePage = lazy(() => import("../pages/farmer-resource/page"));
const FarmerInvestorPage = lazy(() => import("../pages/farmer-investor/page"));
const FarmerConsumerPage = lazy(() => import("../pages/farmer-consumer/page"));
const ConsumerWalletPage = lazy(() => import("../pages/consumer-wallet/page"));
const ConsumerCommunityPage = lazy(() => import("../pages/consumer-community/page"));
const InvestorWalletPage = lazy(() => import("../pages/investor-wallet/page"));
const InvestorCommunityPage = lazy(() => import("../pages/investor-community/page"));
const InvestorHomePage = lazy(() => import("../pages/investor-home/page"));
const MemberNotificationsPage = lazy(() => import("../pages/member-hub/notifications/page"));
const VitaGreenDashboardPage = lazy(() => import("../pages/vita-green-dashboard/page"));

// VITA FARMER - App cho Nông dân
const FarmerDashboardPage = lazy(() => import("../pages/farmer-dashboard/page"));
const FarmerDiaryPage = lazy(() => import("../pages/farmer-diary/page"));
const FarmerWalletPage = lazy(() => import("../pages/farmer-wallet/page"));
const FarmerServicePage = lazy(() => import("../pages/farmer-service/page"));
const FarmerAlertsPage = lazy(() => import("../pages/farmer-alerts/page"));
const FarmerFarmPage = lazy(() => import("../pages/farmer-farm/page"));
const FarmerFarmCommunityPage = lazy(() => import("../pages/farmer-farm-community/page"));
const FarmerServiceCommunityPage = lazy(() => import("../pages/farmer-service-community/page"));
const FarmerScanPage = lazy(() => import("../pages/farmer-scan/page"));
const FarmerForestryPage = lazy(() => import("../pages/farmer-forestry/page"));
const FarmerSkillBankPage = lazy(() => import("../pages/farmer-skill-bank/page"));

// VITA ADMIN - Dashboard cho HTX & GreenLight
const AdminDashboardPage = lazy(() => import("../pages/admin-dashboard/page"));
const AdminSubscriptionPage = lazy(() => import("../pages/admin-subscription/page"));
const AdminSkillsPage = lazy(() => import("../pages/admin-skills/page"));
const AdminApiIntegrationPage = lazy(() => import("../pages/admin-api-integration/page"));
const AdminGISPage = lazy(() => import("../pages/admin-gis/page"));
const AdminWarehousePage = lazy(() => import("../pages/admin-warehouse/page"));
const AdminFinancePage = lazy(() => import("../pages/admin-finance/page"));
const AdminMembersPage = lazy(() => import("../pages/admin-members/page"));
const AdminProductionPage = lazy(() => import("../pages/admin-production/page"));
const AdminExpertPage = lazy(() => import("../pages/admin-expert/page"));
const AdminOpportunitiesPage = lazy(() => import("../pages/admin-opportunities/page"));
const AdminContractsPage = lazy(() => import("../pages/admin-contracts/page"));
const AdminForestryPage = lazy(() => import("../pages/admin-forestry/page"));
const AdminForestFundingPage = lazy(() => import("../pages/admin-forest-funding/page"));
const AdminLandAuditPage = lazy(() => import("../pages/admin-land-audit/page"));

// VITA RESEARCH - Lab Khoa học
const ResearchLabPage = lazy(() => import("../pages/research-lab/page"));
// ExpertMarketplacePage is no longer used - redirected to /admin-expert
const ExpertProfilePage = lazy(() => import("../pages/expert-marketplace/expert-profile/page"));
const ConsultationPage = lazy(() => import("../pages/expert-marketplace/consultation/page"));
const GeneNurseryHubPage = lazy(() => import("../pages/gene-nursery-hub/page"));
const SeedMarketplacePage = lazy(() => import("../pages/seed-marketplace/page"));
const SeedOrderPage = lazy(() => import("../pages/seed-marketplace/order/page"));
const SeedVouchersPage = lazy(() => import("../pages/seed-marketplace/vouchers/page"));
const BatchTracePage = lazy(() => import("../pages/seed-marketplace/trace/page"));

// VITA PARTNER - Portal cho B2B/Nhà đầu tư
const PartnerDashboardPage = lazy(() => import("../pages/partner-dashboard/page"));
const PartnerOrderPage = lazy(() => import("../pages/partner-order/page"));
const PartnerTraceabilityPage = lazy(() => import("../pages/partner-traceability/page"));

// VITA ENTERPRISE - B2B Procurement System (NEW)
const EnterpriseProcurementPage = lazy(() => import("../pages/enterprise-procurement/page"));
const EnterpriseMatchingPage = lazy(() => import("../pages/enterprise-matching/page"));
const EnterprisePotentialMapPage = lazy(() => import("../pages/enterprise-potential-map/page"));
const EnterpriseNegotiationPage = lazy(() => import("../pages/enterprise-negotiation/page"));
const FactoryPortalPage = lazy(() => import("../pages/factory-portal/page"));

// VITA PHYSICIAN - Cổng Kiểm Định & Lâm Sàng
const PhysicianPortalPage = lazy(() => import("../pages/physician-portal/page"));

// VITA HOSPITAL PORTAL - Cổng Bệnh viện & Khoa YHCT
const HospitalPortalPage = lazy(() => import("../pages/hospital-portal/page"));

// VITA EXPERT PORTAL - Cổng làm việc cho Chuyên gia
const ExpertPortalPage = lazy(() => import("../pages/expert-portal/page"));
const ExpertPortalLoginPage = lazy(() => import("../pages/expert-portal/login/page"));
const ExpertPortalRegisterPage = lazy(() => import("../pages/expert-portal/register/page"));

// GREENLIGHT - Trung tâm Điều hành & Giám sát
const GreenlightCommandPage = lazy(() => import("../pages/greenlight-command/page"));

// Investor About Page
const InvestorAboutPage = lazy(() => import("../pages/investor-about/page"));

// Policy Support Page
const PolicySupportPage = lazy(() => import("../pages/policy-support/page"));

// Green Points Page
const GreenPointsPage = lazy(() => import("../pages/green-points/page"));

// GREENLIGHT INVESTOR PORTAL - Private Edition
const InvestorPortalLoginPage = lazy(() => import("../pages/investor-portal/login/page"));
const InvestorPortalRegisterPage = lazy(() => import("../pages/investor-portal/register/page"));
const InvestorPortalPage = lazy(() => import("../pages/investor-portal/page"));

// VITA ESG PORTAL - Impact Investment Hub
const ESGPortalPage = lazy(() => import("../pages/esg-portal/page"));
const ESGLoginPage = lazy(() => import("../pages/esg-portal/login/page"));
const ESGRegisterPage = lazy(() => import("../pages/esg-portal/register/page"));

// VITA TIMBER TRADING HUB - Gỗ Nguyên liệu
const TimberTradingPage = lazy(() => import("../pages/timber-trading/page"));
const TimberLoginPage = lazy(() => import("../pages/timber-trading/login/page"));
const TimberRegisterPage = lazy(() => import("../pages/timber-trading/register/page"));

// VITA GOV PORTAL - Xã Nông Thôn Mới Số
const GovPortalPage = lazy(() => import("../pages/gov-portal/page"));
const GovLoginPage = lazy(() => import("../pages/gov-portal/login/page"));
const GovRegisterPage = lazy(() => import("../pages/gov-portal/register/page"));
const GovOnboardingPage = lazy(() => import("../pages/gov-onboarding/page"));

// VITA ONBOARDING FLOW - Luồng Chào đón & Định hướng
const OnboardingPage = lazy(() => import("../pages/onboarding/page"));

// VITA WORKFLOWS - PHẦN 1: KHỞI TẠO & SỐ HÓA
const OnboardingGatewayPage = lazy(() => import("../pages/onboarding-gateway/page"));
const LandDigitizationPage = lazy(() => import("../pages/land-digitization/page"));
const SeedListingPage = lazy(() => import("../pages/seed-listing/page"));

// VITA WORKFLOWS - PHẦN 2: KÍCH HOẠT THỊ TRƯỜNG & KHỚP LỆNH
const OfftakeBookingPage = lazy(() => import("../pages/offtake-booking/page"));
const ESGProjectCreationPage = lazy(() => import("../pages/esg-project-creation/page"));
const EscrowWalletPage = lazy(() => import("../pages/escrow-wallet/page"));
const CrowdInvestmentPage = lazy(() => import("../pages/crowd-investment/page"));

// VITA WORKFLOWS - PHẦN 3: TRIỂN KHAI SẢN XUẤT & GIÁM SÁT
const InputSourcingPage = lazy(() => import("../pages/input-sourcing/page"));
const TaskAllocatorPage = lazy(() => import("../pages/task-allocator/page"));
const MonitoringPage = lazy(() => import("../pages/monitoring/page"));
const SmartDisbursementPage = lazy(() => import("../pages/smart-disbursement/page"));

// VITA WORKFLOWS - PHẦN 4: THU HOẠCH, THƯƠNG MẠI & TÁI ĐẦU TƯ
const DigitalHarvestPage = lazy(() => import("../pages/digital-harvest/page"));
const QualityGatePage = lazy(() => import("../pages/quality-gate/page"));
const TradeExecutionPage = lazy(() => import("../pages/trade-execution/page"));
const ProfitSplitPage = lazy(() => import("../pages/profit-split/page"));
const ReinvestmentLoopPage = lazy(() => import("../pages/reinvestment-loop/page"));

// VITA CREATOR HUB - Cổng Đối tác Sáng tạo Nội dung
const CreatorHubPage = lazy(() => import("../pages/creator-hub/page"));
const CreatorLoginPage = lazy(() => import("../pages/creator-hub/login/page"));
const CreatorRegisterPage = lazy(() => import("../pages/creator-hub/register/page"));

// VITA SUPPLY - Sàn Cung Ứng Vật Tư & Thiết Bị Công Nghệ
const VitaSupplyPage = lazy(() => import("../pages/vita-supply/page"));
const VitaSupplyLoginPage = lazy(() => import("../pages/vita-supply/login/page"));
const VitaSupplyRegisterPage = lazy(() => import("../pages/vita-supply/register/page"));

// HTX BRAND HUB - Cổng Thương hiệu & Dịch vụ Hợp tác xã
const HtxBrandPage = lazy(() => import("../pages/htx-brand/page"));
const HtxBrandLoginPage = lazy(() => import("../pages/htx-brand/login/page"));
const HtxBrandRegisterPage = lazy(() => import("../pages/htx-brand/register/page"));

// HTX LANDING PAGES - Landing pages cho các Hợp tác xã
const HtxLandingPage = lazy(() => import("../pages/htx-landing/page"));

// Shared
const ProductTracePage = lazy(() => import("../pages/product-trace/page"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 text-lg">Đang tải...</p>
    </div>
  </div>
);

const CoopMarketplace = lazy(() => import("../pages/coop-marketplace/page"));
const CoopWorkerPortal = lazy(() => import("../pages/coop-worker-portal/page"));
const CoopWorkerRegister = lazy(() => import("../pages/coop-worker-portal/register/page"));
const CoopDetail = lazy(() => import("../pages/coop-detail/page"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/hub",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/forest-owner-register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ForestOwnerRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/cooperative-register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CooperativeRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/enterprise-register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EnterpriseRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/research-partner-register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResearchPartnerRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/physician-register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PhysicianRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/investor-about",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InvestorAboutPage />
      </Suspense>
    ),
  },
  {
    path: "/policy-support",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PolicySupportPage />
      </Suspense>
    ),
  },
  
  // GREENLIGHT INVESTOR PORTAL - Private Edition
  {
    path: "/investor-portal/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InvestorPortalLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/investor-portal/register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InvestorPortalRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/investor-portal",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InvestorPortalPage />
      </Suspense>
    ),
  },
  
  // VITA ESG PORTAL - Impact Investment Hub
  {
    path: "/esg-portal/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ESGLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/esg-register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ESGRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/esg-portal",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ESGPortalPage />
      </Suspense>
    ),
  },
  
  // VITA TIMBER TRADING HUB - Gỗ Nguyên liệu
  {
    path: "/timber-trading/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TimberLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/timber-trading/register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TimberRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/timber-trading",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TimberTradingPage />
      </Suspense>
    ),
  },
  
  // VITA GOV PORTAL - Xã Nông Thôn Mới Số
  {
    path: "/gov-portal/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <GovLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/gov-portal/register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <GovRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/gov-portal",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <GovPortalPage />
      </Suspense>
    ),
  },
  {
    path: "/gov-onboarding",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <GovOnboardingPage />
      </Suspense>
    ),
  },
  
  // VITA ONBOARDING FLOW - Luồng Chào đón & Định hướng
  {
    path: "/onboarding",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <OnboardingPage />
      </Suspense>
    ),
  },
  
  // VITA WORKFLOWS - PHẦN 1: KHỞI TẠO & SỐ HÓA
  {
    path: "/onboarding-gateway",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <OnboardingGatewayPage />
      </Suspense>
    ),
  },
  {
    path: "/land-digitization",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LandDigitizationPage />
      </Suspense>
    ),
  },
  {
    path: "/seed-listing",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SeedListingPage />
      </Suspense>
    ),
  },
  
  // VITA WORKFLOWS - PHẦN 2: KÍCH HOẠT THỊ TRƯỜNG & KHỚP LỆNH
  {
    path: "/offtake-booking",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <OfftakeBookingPage />
      </Suspense>
    ),
  },
  {
    path: "/esg-project-creation",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ESGProjectCreationPage />
      </Suspense>
    ),
  },
  {
    path: "/escrow-wallet",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EscrowWalletPage />
      </Suspense>
    ),
  },
  {
    path: "/crowd-investment",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CrowdInvestmentPage />
      </Suspense>
    ),
  },
  
  // VITA WORKFLOWS - PHẦN 3: TRIỂN KHAI SẢN XUẤT & GIÁM SÁT
  {
    path: "/input-sourcing",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InputSourcingPage />
      </Suspense>
    ),
  },
  {
    path: "/task-allocator",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TaskAllocatorPage />
      </Suspense>
    ),
  },
  {
    path: "/monitoring",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <MonitoringPage />
      </Suspense>
    ),
  },
  {
    path: "/smart-disbursement",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SmartDisbursementPage />
      </Suspense>
    ),
  },
  
  // VITA WORKFLOWS - PHẦN 4: THU HOẠCH, THƯƠNG MẠI & TÁI ĐẦU TƯ
  {
    path: "/digital-harvest",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <DigitalHarvestPage />
      </Suspense>
    ),
  },
  {
    path: "/quality-gate",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <QualityGatePage />
      </Suspense>
    ),
  },
  {
    path: "/trade-execution",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TradeExecutionPage />
      </Suspense>
    ),
  },
  {
    path: "/profit-split",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProfitSplitPage />
      </Suspense>
    ),
  },
  {
    path: "/reinvestment-loop",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ReinvestmentLoopPage />
      </Suspense>
    ),
  },
  
  // VITA CREATOR HUB - Cổng Đối tác Sáng tạo Nội dung
  {
    path: "/creator-hub/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CreatorLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/creator-hub/register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CreatorRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/creator-hub",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CreatorHubPage />
      </Suspense>
    ),
  },
  // VITA SUPPLY - Sàn Cung Ứng Vật Tư & Thiết Bị Công Nghệ
  {
    path: "/vita-supply/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <VitaSupplyLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/vita-supply/register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <VitaSupplyRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/vita-supply",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <VitaSupplyPage />
      </Suspense>
    ),
  },
  // HTX BRAND HUB - Cổng Thương hiệu & Dịch vụ Hợp tác xã
  {
    path: "/htx-brand/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HtxBrandLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/htx-brand/register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HtxBrandRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/htx-brand",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HtxBrandPage />
      </Suspense>
    ),
  },
  
  // Member Hub - Trung tâm Xã viên
  {
    path: "/member-hub",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <MemberHubPage />
      </Suspense>
    ),
  },
  {
    path: "/member-hub/notifications",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <MemberNotificationsPage />
      </Suspense>
    ),
  },
  
  // VITA FARMER - 3 vai trò tích hợp
  {
    path: "/farmer/producer",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerProducerPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/resource",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerResourcePage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/investor",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerInvestorPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/consumer",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerConsumerPage />
      </Suspense>
    ),
  },
  {
    path: "/consumer-wallet",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ConsumerWalletPage />
      </Suspense>
    ),
  },
  {
    path: "/consumer-community",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ConsumerCommunityPage />
      </Suspense>
    ),
  },
  {
    path: "/investor-wallet",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InvestorWalletPage />
      </Suspense>
    ),
  },
  {
    path: "/investor-community",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InvestorCommunityPage />
      </Suspense>
    ),
  },
  {
    path: "/investor-home",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InvestorHomePage />
      </Suspense>
    ),
  },
  
  // VITA FARMER Routes
  {
    path: "/farmer",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerDashboardPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/diary",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerDiaryPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/wallet",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerWalletPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/service",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerServicePage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/alerts",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerAlertsPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/farm",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerFarmPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/community",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerFarmCommunityPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/service-community",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerServiceCommunityPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/scan",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerScanPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer-forestry",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerForestryPage />
      </Suspense>
    ),
  },
  {
    path: "/farmer/skill-bank",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerSkillBankPage />
      </Suspense>
    ),
  },
  
  // VITA ADMIN Routes
  {
    path: "/admin",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminDashboardPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminDashboardPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-gis",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminGISPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-warehouse",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminWarehousePage />
      </Suspense>
    ),
  },
  {
    path: "/admin-finance",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminFinancePage />
      </Suspense>
    ),
  },
  {
    path: "/admin-members",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminMembersPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-production",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminProductionPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-expert",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminExpertPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-opportunities",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminOpportunitiesPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-contracts",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminContractsPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-forestry",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminForestryPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-forest-funding",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminForestFundingPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-land-audit",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminLandAuditPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-subscription",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminSubscriptionPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-skills",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminSkillsPage />
      </Suspense>
    ),
  },
  {
    path: "/admin-api-integration",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminApiIntegrationPage />
      </Suspense>
    ),
  },
  
  // VITA RESEARCH Routes
  {
    path: "/research-lab",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResearchLabPage />
      </Suspense>
    ),
  },
  {
    path: "/expert-marketplace",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Navigate to="/admin-expert" replace />
      </Suspense>
    ),
  },
  {
    path: "/expert-marketplace/expert-profile/:expertId",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ExpertProfilePage />
      </Suspense>
    ),
  },
  {
    path: "/expert-marketplace/consultation",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ConsultationPage />
      </Suspense>
    ),
  },
  {
    path: "/gene-nursery-hub",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <GeneNurseryHubPage />
      </Suspense>
    ),
  },
  {
    path: "/seed-marketplace",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SeedMarketplacePage />
      </Suspense>
    ),
  },
  {
    path: "/seed-marketplace/order",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SeedOrderPage />
      </Suspense>
    ),
  },
  {
    path: "/seed-marketplace/vouchers",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SeedVouchersPage />
      </Suspense>
    ),
  },
  {
    path: "/seed-marketplace/trace/:batchId",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <BatchTracePage />
      </Suspense>
    ),
  },
  
  // VITA PARTNER Routes
  {
    path: "/partner",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PartnerDashboardPage />
      </Suspense>
    ),
  },
  {
    path: "/partner-dashboard",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PartnerDashboardPage />
      </Suspense>
    ),
  },
  {
    path: "/partner/order",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PartnerOrderPage />
      </Suspense>
    ),
  },
  {
    path: "/partner/traceability",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PartnerTraceabilityPage />
      </Suspense>
    ),
  },
  
  // VITA ENTERPRISE - B2B Procurement System (NEW)
  {
    path: "/enterprise-procurement",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EnterpriseProcurementPage />
      </Suspense>
    ),
  },
  {
    path: "/enterprise-matching",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EnterpriseMatchingPage />
      </Suspense>
    ),
  },
  {
    path: "/enterprise-potential-map",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EnterprisePotentialMapPage />
      </Suspense>
    ),
  },
  {
    path: '/enterprise-negotiation',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EnterpriseNegotiationPage />
      </Suspense>
    ),
  },
  {
    path: '/factory-portal',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FactoryPortalPage />
      </Suspense>
    ),
  },
  
  // VITA PHYSICIAN Routes
  {
    path: "/physician-portal",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PhysicianPortalPage />
      </Suspense>
    ),
  },
  {
    path: "/physician",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PhysicianPortalPage />
      </Suspense>
    ),
  },
  
  // VITA HOSPITAL PORTAL Routes
  {
    path: "/hospital-portal",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HospitalPortalPage />
      </Suspense>
    ),
  },
  {
    path: "/hospital",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HospitalPortalPage />
      </Suspense>
    ),
  },
  
  // VITA EXPERT PORTAL Routes
  {
    path: "/expert-portal/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ExpertPortalLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/expert-portal/register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ExpertPortalRegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/expert-portal",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ExpertPortalPage />
      </Suspense>
    ),
  },
  
  // GREENLIGHT Routes
  {
    path: "/greenlight-command",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <GreenlightCommandPage />
      </Suspense>
    ),
  },
  
  // Shared Routes
  {
    path: "/product/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProductTracePage />
      </Suspense>
    ),
  },
  {
    path: "/coop-marketplace",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CoopMarketplace />
      </Suspense>
    ),
  },
  {
    path: "/coop-worker-portal",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CoopWorkerPortal />
      </Suspense>
    ),
  },
  {
    path: "/coop-worker-portal/register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CoopWorkerRegister />
      </Suspense>
    ),
  },
  {
    path: "/coop-worker-portal/dashboard",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FarmerDashboardPage />
      </Suspense>
    ),
  },
  {
    path: "/coop-detail/:coopId",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CoopDetail />
      </Suspense>
    ),
  },
  {
    path: "/coop/:coopId",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HtxLandingPage />
      </Suspense>
    ),
  },
  {
    path: "/green-points",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <GreenPointsPage />
      </Suspense>
    ),
  },
  {
    path: "/vita-green-dashboard",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <VitaGreenDashboardPage />
      </Suspense>
    ),
  },
  // NguyenManhThuan Module Routes
  {
    path: "/nguyen-manh-thuan",
    children: nguyenManhthuanRoutes[0].children?.map(child => ({
      ...child,
      element: (
        <Suspense fallback={<LoadingFallback />}>
          {child.element}
        </Suspense>
      ),
    })),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];

export default routes;
