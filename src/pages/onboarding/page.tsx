import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Onboarding State Interface
interface OnboardingState {
  currentStep: number;
  source?: string; // Changed to single string for single-select
  entityType?: 'individual' | 'organization'; // NEW: Phân chia Cá nhân vs Tổ chức
  asset?: string;
  intent?: string;
  portal?: string;
  creatorType?: 'kol-expert' | 'kol-lifestyle' | 'koc-local' | 'other'; // NEW: For Creator portal
  contentCategories?: string[]; // NEW: Content categories for Creator
}

// Portal mapping
const PORTAL_ROUTES: Record<string, string> = {
  'forest-owner': '/land-digitization',
  'farmer': '/coop-marketplace', // Legacy - will be replaced by worker/investor/land/consumer
  'coop-worker': '/coop-worker-portal',
  'coop-investor': '/coop-investor-portal',
  'coop-land': '/coop-land-portal',
  'coop-consumer': '/coop-consumer-portal',
  'cooperative': '/cooperative-register',
  'investor-small': '/investor-portal/register',
  'investor-large': '/investor-portal/register',
  'creator': '/creator-hub',
  'physician': '/physician-register',
  'hospital': '/hospital-portal',
  'rnd': '/research-partner-register',
  'factory': '/factory-portal',
  'consumer': '/coop-marketplace', // Legacy - will be replaced
};

// Storage key for persistence
const STORAGE_KEY = 'vita_onboarding_state';

export default function OnboardingPage() {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'onboarding/page.tsx:32',message:'OnboardingPage component rendering',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  const navigate = useNavigate();
  const [state, setState] = useState<OnboardingState>(() => {
    // Load saved state from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const currentStep = parsed.currentStep || 1;
        // Safety: Reset to step 1 if we're at an invalid step for the entity type
        // Individual non-creator should not reach step 7 (only creator does)
        if (currentStep === 7 && parsed.entityType === 'individual' && parsed.portal !== 'creator') {
          // Reset to step 6 (QuickSignUp) which will navigate
          return { ...parsed, currentStep: 6 };
        }
        return { ...parsed, currentStep };
      } catch {
        return { currentStep: 1 };
      }
    }
    return { currentStep: 1 };
  });

  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'onboarding/page.tsx:50',message:'OnboardingPage state loaded',data:{currentStep:state.currentStep,entityType:state.entityType,portal:state.portal},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Handle navigation for individual non-creator users (skip QuickSignUp)
  useEffect(() => {
    if (state.currentStep === 6 && state.entityType === 'individual' && state.portal !== 'creator') {
      localStorage.removeItem(STORAGE_KEY);
      const route = PORTAL_ROUTES[state.portal!] || '/home';
      navigate(route);
    }
  }, [state.currentStep, state.entityType, state.portal, navigate]);

  const updateState = (updates: Partial<OnboardingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const goToStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  // Calculate progress percentage - Updated for new flow (removed eKYC step)
  const progress = (state.currentStep / 8) * 100;

  // Render current step
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'onboarding/page.tsx:69',message:'Rendering switch case',data:{currentStep:state.currentStep},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  switch (state.currentStep) {
    case 1:
      return <SplashScreen onNext={nextStep} progress={10} />;
    case 2:
      return (
        <SourceSurvey
          selectedSource={state.source}
          onNext={(source) => {
            updateState({ source });
            nextStep();
          }}
          progress={22}
        />
      );
    case 3:
      // Show Entity Selection after Source Survey
      return (
        <EntitySelection
          selectedEntity={state.entityType}
          onNext={(entityType) => {
            updateState({ entityType });
            nextStep();
          }}
          progress={33}
        />
      );
    case 4:
      // Show Individual Needs or Organization Needs based on entityType
      if (state.entityType === 'individual') {
      return (
          <IndividualNeeds
            selectedNeed={state.asset}
            onNext={(need, portal) => {
              updateState({ asset: need, portal });
            nextStep();
          }}
          progress={44}
        />
      );
      } else if (state.entityType === 'organization') {
        return (
          <OrganizationNeeds
            selectedNeed={state.asset}
            onNext={(need, portal) => {
              updateState({ asset: need, portal });
              nextStep();
            }}
            progress={44}
          />
        );
      }
      return null;
    case 5:
      return (
        <PortalReveal
          portal={state.portal!}
          entityType={state.entityType!}
          asset={state.asset!}
          onNext={nextStep}
          progress={56}
        />
      );
    case 6:
      // Sign Up - Different for Individual vs Organization
      if (state.entityType === 'individual') {
        // For Creator: Add CreatorTypeSelection first
        if (state.portal === 'creator') {
          // Show CreatorTypeSelection first
          if (!state.creatorType) {
      return (
              <CreatorTypeSelection
                selectedType={state.creatorType}
                onNext={(creatorType) => {
                  updateState({ creatorType });
                  nextStep(); // Go to step 7 for Content Categories
                }}
          progress={67}
        />
      );
          }
          // After CreatorTypeSelection, show Content Categories
          if (state.creatorType && state.contentCategories === undefined) {
      return (
              <CreatorContentCategoriesSelection
                selectedCategories={state.contentCategories || []}
                onNext={(categories) => {
                  updateState({ contentCategories: categories });
                  // Save contentCategories to localStorage for Creator Hub
                  const existingProfile = localStorage.getItem('creator_profile_data');
                  const profileData = existingProfile ? JSON.parse(existingProfile) : {};
                  profileData.contentCategories = categories;
                  localStorage.setItem('creator_profile_data', JSON.stringify(profileData));
                  // Navigate directly to creator-hub
            localStorage.removeItem(STORAGE_KEY);
                  const route = PORTAL_ROUTES['creator'] || '/creator-hub';
            navigate(route);
          }}
                progress={75}
              />
            );
          }
        }
        // Skip QuickSignUp - Navigation is handled by useEffect at top level
        return (
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Đang chuyển hướng...</p>
            </div>
          </div>
        );
      } else {
        return (
          <RepresentativeSignUp
          portal={state.portal!}
          onNext={nextStep}
          progress={67}
        />
      );
      }
    case 7:
      // Skip QuickSignUp - This case should not be reached for individuals anymore
      // For organizations, continue to Security Setup
      // For other Individual portals: Should have navigated in case 6, but if we reach here, navigate directly
      if (state.entityType === 'individual') {
        // Individual non-creator: Navigate directly to portal (should have happened in case 6, but safety fallback)
        // Navigate immediately
        const route = PORTAL_ROUTES[state.portal!] || '/home';
        navigate(route);
        localStorage.removeItem(STORAGE_KEY);
        // Return loading screen while navigating
      return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Đang chuyển hướng...</p>
            </div>
          </div>
        );
      }
      // Organization: Skip eKYC/Legal Entity Verification - Go directly to Security Setup
      return <SecuritySetup onNext={nextStep} progress={88} />;
    case 8:
      return <InteractiveTour portal={state.portal!} onNext={() => {
        // Clear onboarding state and navigate
            localStorage.removeItem(STORAGE_KEY);
        const route = PORTAL_ROUTES[state.portal!] || '/home';
            navigate(route);
      }} progress={100} />;
    default:
      return <SplashScreen onNext={nextStep} progress={10} />;
  }
}

// Step 1: Splash Screen
function SplashScreen({ onNext, progress }: { onNext: () => void; progress: number }) {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-900 via-teal-900 to-green-900">
      {/* Video Background Placeholder - Replace with actual video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        {/* Placeholder for video - Use a video element in production */}
        <div className="w-full h-full bg-[url('/images/hero-background.png')] bg-cover bg-center opacity-50"></div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-white/10 backdrop-blur-md rounded-full border-4 border-white/20 mb-6">
            <i className="ri-leaf-line text-white text-5xl sm:text-6xl"></i>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            VITA PLATFORM
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-medium">
            Hệ sinh thái Kinh tế Rừng Dược sinh Quốc gia.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNext}
          className="mt-12 px-12 py-4 sm:py-5 bg-white text-emerald-600 text-lg sm:text-xl font-bold rounded-full hover:shadow-2xl transition-all transform hover:scale-105"
        >
          BẮT ĐẦU HÀNH TRÌNH
        </button>
      </div>
    </div>
  );
}

// Step 2: Source Survey
function SourceSurvey({
  selectedSource,
  onNext,
  progress,
}: {
  selectedSource?: string;
  onNext: (source: string) => void;
  progress: number;
}) {
  const [currentSelection, setCurrentSelection] = useState<string | undefined>(selectedSource);

  const sourceOptions = [
    { label: 'Facebook/TikTok của KOL/Creator', icon: 'ri-facebook-line' },
    { label: 'Bác sĩ/Chuyên gia giới thiệu', icon: 'ri-stethoscope-line' },
    { label: 'Hội thảo/Sự kiện Đầu tư', icon: 'ri-calendar-event-line' },
    { label: 'Bạn bè/Người thân', icon: 'ri-user-heart-line' },
    { label: 'Tìm kiếm Google/Báo chí', icon: 'ri-search-line' },
    { label: 'Quét mã QR trên sản phẩm', icon: 'ri-qr-code-line' },
  ];

  const handleSelect = (source: string) => {
    // Single select: toggle if same, otherwise set new
    setCurrentSelection(prev => prev === source ? undefined : source);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chào mừng bạn! Bạn biết đến GreenLight và Hệ sinh thái VITA qua kênh nào?
          </h2>
        </div>

        {/* Source Pills - Single Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {sourceOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handleSelect(option.label)}
              className={`p-4 rounded-xl border-2 transition-all text-center flex flex-col items-center gap-2 ${
                currentSelection === option.label
                  ? 'border-emerald-600 bg-emerald-100 text-emerald-900 ring-2 ring-emerald-500 ring-offset-2'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <i className={`${option.icon} text-3xl`}></i>
              <span className="font-medium text-sm">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            if (currentSelection) {
              onNext(currentSelection);
            }
          }}
          disabled={!currentSelection}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

// Step 3: Entity Selection - NEW
function EntitySelection({
  selectedEntity,
  onNext,
  progress,
}: {
  selectedEntity?: 'individual' | 'organization';
  onNext: (entityType: 'individual' | 'organization') => void;
  progress: number;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Để chúng tôi phục vụ bạn tốt nhất, vui lòng cho biết tư cách tham gia của bạn:
          </h2>
        </div>

        {/* Entity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Individual */}
          <button
            onClick={() => onNext('individual')}
            className={`p-8 rounded-2xl border-4 transition-all text-center ${
              selectedEntity === 'individual'
                ? 'border-emerald-600 bg-emerald-50 shadow-xl scale-105'
                : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-lg'
            }`}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-3-line text-white text-5xl"></i>
                </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">CÁ NHÂN</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Tôi là Nông dân, Nhà đầu tư cá nhân, Creator, Bác sĩ, hoặc Người tiêu dùng...
            </p>
            <p className="text-sm text-gray-500 italic">Thân thiện, gần gũi</p>
          </button>

          {/* Card 2: Organization */}
          <button
            onClick={() => onNext('organization')}
            className={`p-8 rounded-2xl border-4 transition-all text-center ${
              selectedEntity === 'organization'
                ? 'border-emerald-600 bg-emerald-50 shadow-xl scale-105'
                : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-lg'
            }`}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-building-line text-white text-5xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">TỔ CHỨC / DOANH NGHIỆP</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Chúng tôi là Nhà máy, Công ty Thương mại, Viện nghiên cứu, HTX hoặc Quỹ đầu tư...
            </p>
            <p className="text-sm text-gray-500 italic">Chuyên nghiệp, trang trọng</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 4A: Individual Needs - NEW
function IndividualNeeds({
  selectedNeed,
  onNext,
  progress,
}: {
  selectedNeed?: string;
  onNext: (need: string, portal: string) => void;
  progress: number;
}) {
  const needs = [
    { id: 'coop-worker', icon: '👷', label: 'Xã viên Góp sức', description: 'Tôi muốn tham gia làm việc, trồng trọt tại HTX gần nhà. Tìm cơ hội việc làm với mức lương hợp lý.', portal: 'coop-worker' },
    { id: 'coop-investor', icon: '💰', label: 'Xã viên Góp vốn', description: 'Tôi muốn đầu tư vốn vào HTX để sinh lời ổn định. Xem báo cáo tài chính và lợi nhuận.', portal: 'coop-investor' },
    { id: 'coop-land', icon: '🏞️', label: 'Góp Đất / Rừng', description: 'Tôi có đất/rừng muốn cho HTX thuê hoặc hợp tác khai thác sinh lời. Tìm HTX gần khu vực đất của tôi.', portal: 'coop-land' },
    { id: 'coop-consumer', icon: '🛒', label: 'Xã viên Tiêu dùng', description: 'Tôi muốn mua nông sản/dược liệu sạch cho gia đình. Xem sản phẩm, giá cả và đánh giá chất lượng.', portal: 'coop-consumer' },
    { id: 'investor-small', icon: '💸', label: 'Đầu tư Cổ phần Doanh nghiệp', description: 'Tôi muốn đầu tư để trở thành cổ đông của công ty Hành trình xanh Greenlight Việt Nam.', portal: 'investor-small' },
    { id: 'creator', icon: '🎥', label: 'Kinh doanh / Sáng tạo nội dung', description: 'Tôi là KOL/Creator muốn xây dựng thương hiệu riêng (OEM) & Bán hàng.', portal: 'creator' },
    { id: 'physician', icon: '⚕️', label: 'Hành nghề Y dược', description: 'Tôi là Bác sĩ/Lương y muốn quản lý bệnh nhân & phát triển bài thuốc.', portal: 'physician' },
    { id: 'rnd-individual', icon: '🔬', label: 'Nghiên cứu Khoa học', description: 'Tôi là Nhà khoa học độc lập muốn chuyển giao công nghệ.', portal: 'rnd' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chào bạn, <span className="text-emerald-600">mục tiêu lớn nhất</span> của bạn khi đến với VITA là gì?
          </h2>
        </div>

        {/* Needs List */}
        <div className="space-y-4 mb-8">
          {needs.map((need) => (
            <button
              key={need.id}
              onClick={() => onNext(need.id, need.portal)}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                selectedNeed === need.id
                  ? 'border-emerald-600 bg-emerald-100 text-emerald-900 shadow-lg'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{need.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{need.label}</h3>
                  <p className="text-gray-700 leading-relaxed">{need.description}</p>
                </div>
                <i className="ri-arrow-right-s-line text-2xl text-gray-400"></i>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => onNext(needs[0].id, needs[0].portal)}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all"
        >
          Xem Giải pháp phù hợp
        </button>
      </div>
    </div>
  );
}

// Step 4B: Organization Needs - NEW
function OrganizationNeeds({
  selectedNeed,
  onNext,
  progress,
}: {
  selectedNeed?: string;
  onNext: (need: string, portal: string) => void;
  progress: number;
}) {
  const needs = [
    { id: 'factory', icon: '🏭', label: 'Sản xuất & Thương mại (Manufacturing/Trading)', description: 'Chúng tôi là Nhà máy chế biến, Công ty XNK cần tìm nguồn nguyên liệu hoặc đơn hàng gia công.', portal: 'factory' },
    { id: 'hospital', icon: '🏥', label: 'Bệnh viện / Khoa YHCT (Hospital/Clinic)', description: 'Chúng tôi là Bệnh viện/Khoa Y học Cổ truyền cần hợp tác nghiên cứu lâm sàng và quản lý dự án.', portal: 'hospital' },
    { id: 'cooperative', icon: '🌾', label: 'Quản trị Hợp tác xã (Co-op Management)', description: 'Chúng tôi là Ban chủ nhiệm HTX cần công cụ quản lý xã viên và mùa vụ.', portal: 'cooperative' },
    { id: 'rnd-org', icon: '🧪', label: 'Nghiên cứu & Phát triển (R&D Institute)', description: 'Chúng tôi là Viện/Trung tâm nghiên cứu muốn hợp tác chuyển giao công nghệ quy mô lớn.', portal: 'rnd' },
    { id: 'investor-large', icon: '💼', label: 'Quỹ Đầu tư / Doanh nghiệp CSR', description: 'Chúng tôi muốn đầu tư dự án lớn hoặc mua Tín chỉ Carbon (ESG).', portal: 'investor-large' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-emerald-600">Lĩnh vực hoạt động chính</span> của đơn vị Quý đối tác là gì?
          </h2>
        </div>

        {/* Needs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {needs.map((need) => (
            <button
              key={need.id}
              onClick={() => onNext(need.id, need.portal)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedNeed === need.id
                  ? 'border-emerald-600 bg-emerald-100 text-emerald-900 shadow-lg'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <div className="text-4xl mb-3">{need.icon}</div>
              <h3 className="font-bold text-lg mb-2">{need.label}</h3>
              <p className="text-gray-700 leading-relaxed text-sm">{need.description}</p>
            </button>
          ))}
        </div>

        <button
          onClick={() => onNext(needs[0].id, needs[0].portal)}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all"
        >
          Kết nối Hợp tác
        </button>
      </div>
    </div>
  );
}

// Step 3: Asset Profiling
function AssetProfiling({
  selectedAsset,
  onNext,
  progress,
}: {
  selectedAsset?: string;
  onNext: (asset: string) => void;
  progress: number;
}) {
  const assets = [
    { id: 'land', icon: '🌿', label: 'Đất đai & Rừng', description: 'Tôi có đất rừng, đất nông nghiệp muốn khai thác' },
    { id: 'labor', icon: '💪', label: 'Sức lao động & Kỹ thuật', description: 'Tôi muốn trực tiếp tham gia canh tác/sản xuất' },
    { id: 'finance', icon: '💰', label: 'Tài chính', description: 'Tôi có vốn nhàn rỗi muốn đầu tư sinh lời bền vững' },
    { id: 'influence', icon: '🎤', label: 'Sức ảnh hưởng & Cộng đồng', description: 'Tôi là Creator/KOL muốn kinh doanh thương hiệu riêng' },
    { id: 'medical', icon: '🩺', label: 'Kiến thức Y học', description: 'Tôi là Bác sĩ/Lương y muốn chữa bệnh và phát triển bài thuốc' },
    { id: 'science', icon: '🧪', label: 'Tri thức Khoa học', description: 'Tôi là Nhà khoa học/Viện nghiên cứu muốn chuyển giao công nghệ' },
    { id: 'factory', icon: '🏭', label: 'Nhà xưởng & Thương mại', description: 'Tôi có nhà máy/công ty muốn tìm nguồn hàng/đơn hàng' },
    { id: 'consumer', icon: '🛒', label: 'Nhu cầu Tiêu dùng', description: 'Tôi muốn mua sản phẩm sạch cho gia đình' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tại VITA, mỗi người đều đóng góp một giá trị riêng.
          </h2>
          <p className="text-xl text-emerald-700 font-semibold mb-2">
            Thế mạnh lớn nhất của bạn là gì?
          </p>
          <p className="text-sm text-gray-600">Vui lòng chọn 1 lựa chọn phù hợp nhất</p>
        </div>

        {/* Asset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {assets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => onNext(asset.id)}
              className={`p-6 rounded-2xl border-2 transition-all text-center ${
                selectedAsset === asset.id
                  ? 'border-emerald-600 bg-emerald-100 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div className="text-5xl mb-3">{asset.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{asset.label}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{asset.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 4: Intent Filtering
function IntentFiltering({
  asset,
  selectedIntent,
  onNext,
  progress,
}: {
  asset: string;
  selectedIntent?: string;
  onNext: (intent: string, portal: string) => void;
  progress: number;
}) {
  // Define intent questions based on asset
  const getIntentOptions = (assetType: string) => {
    switch (assetType) {
      case 'land':
        return {
          question: 'Bạn muốn tham gia như thế nào?',
          options: [
            { id: 'passive', label: 'Tôi muốn góp đất vào HTX và ngồi nhà xem báo cáo tài chính.', portal: 'forest-owner' },
            { id: 'active', label: 'Tôi muốn tự quản lý và canh tác trên đất của mình.', portal: 'farmer' },
          ],
        };
      case 'labor':
        return {
          question: 'Vai trò mong muốn của bạn?',
          options: [
            { id: 'farmer', label: 'Nông dân/Xã viên trực tiếp sản xuất.', portal: 'farmer' },
            { id: 'coop', label: 'Cán bộ quản lý/Ban chủ nhiệm Hợp tác xã.', portal: 'cooperative' },
          ],
        };
      case 'finance':
        return {
          question: 'Quy mô đầu tư của bạn?',
          options: [
            { id: 'small', label: 'Đầu tư cá nhân (Suất đầu tư nhỏ, tích lũy).', portal: 'investor-small' },
            { id: 'large', label: 'Đầu tư Doanh nghiệp/Quỹ (Dự án lớn, Tín chỉ Carbon).', portal: 'investor-large' },
          ],
        };
      case 'influence':
        return {
          question: 'Mục tiêu kinh doanh của bạn?',
          options: [
            { id: 'creator', label: 'Tôi muốn bán hàng có sẵn (Affiliate) & Xây dựng thương hiệu riêng (OEM).', portal: 'creator' },
          ],
        };
      case 'medical':
        return {
          question: 'Chuyên môn chính của bạn?',
          options: [
            { id: 'physician', label: 'Khám chữa bệnh & Kê đơn thuốc.', portal: 'physician' },
          ],
        };
      case 'science':
        return {
          question: 'Bạn muốn làm gì tại VITA?',
          options: [
            { id: 'rnd', label: 'Nghiên cứu, Kiểm nghiệm & Bán bản quyền công nghệ.', portal: 'rnd' },
          ],
        };
      case 'factory':
        return {
          question: 'Vấn đề lớn nhất bạn cần giải quyết?',
          options: [
            { id: 'factory', label: 'Tìm kiếm nguồn nguyên liệu & Đơn hàng gia công (B2B/C2M).', portal: 'factory' },
          ],
        };
      case 'consumer':
        return {
          question: '',
          options: [
            { id: 'consumer', label: 'Tôi muốn mua sản phẩm sạch cho gia đình.', portal: 'consumer' },
          ],
        };
      default:
        return { question: '', options: [] };
    }
  };

  const intentData = getIntentOptions(asset);

  // Auto-select if only one option
  useEffect(() => {
    if (intentData.options.length === 1 && !selectedIntent) {
      onNext(intentData.options[0].id, intentData.options[0].portal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset]);

  if (intentData.options.length === 1) {
    // Loading state while auto-redirecting
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang điều hướng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {intentData.question}
          </h2>
        </div>

        {/* Intent Options */}
        <div className="space-y-4 mb-8">
          {intentData.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onNext(option.id, option.portal)}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                selectedIntent === option.id
                  ? 'border-emerald-600 bg-emerald-100 text-emerald-900'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedIntent === option.id
                      ? 'border-emerald-600 bg-emerald-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedIntent === option.id && (
                    <i className="ri-check-line text-white text-xs"></i>
                  )}
                </div>
                <span className="font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 5: Ecosystem Intro
function EcosystemIntro({
  portal,
  asset,
  onNext,
  progress,
}: {
  portal: string;
  asset: string;
  onNext: () => void;
  progress: number;
}) {
  // Portal icons mapping
  const portalIcons: Record<string, string> = {
    'forest-owner': 'ri-landscape-line',
    'farmer': 'ri-seedling-line',
    'cooperative': 'ri-team-line',
    'investor-small': 'ri-hand-coin-line',
    'investor-large': 'ri-hand-coin-line',
    'creator': 'ri-mic-line',
    'physician': 'ri-stethoscope-line',
    'hospital': 'ri-hospital-line',
    'rnd': 'ri-flask-line',
    'factory': 'ri-building-line',
    'consumer': 'ri-shopping-cart-line',
  };

  const userIcon = portalIcons[portal] || 'ri-user-line';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chào mừng bạn đến với VITA Platform!
          </h2>
          <p className="text-xl text-gray-700 mb-2">
            Bạn là mảnh ghép không thể thiếu.
          </p>
          <p className="text-lg text-gray-600">
            Tại đây, chúng tôi kết nối bạn với:
          </p>
        </div>

        {/* Ecosystem Visualization */}
        <div className="relative w-full aspect-square max-w-md mx-auto mb-12">
          {/* Rotating Circle of Portal Icons */}
          <div className="absolute inset-0 animate-spin-slow">
            {Object.entries(portalIcons).map(([key, icon], index) => {
              const angle = (index * 360) / Object.keys(portalIcons).length;
              const radius = 120;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              const isActive = key === portal;

              return (
                <div
                  key={key}
                  className={`absolute w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white scale-125 shadow-lg'
                      : 'bg-white text-gray-600 border-2 border-gray-200'
                  }`}
                  style={{
                    top: `calc(50% + ${y}px - 32px)`,
                    left: `calc(50% + ${x}px - 32px)`,
                  }}
                >
                  <i className={`${icon} text-2xl`}></i>
                </div>
              );
            })}
          </div>

          {/* Center User Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <i className={`${userIcon} text-white text-4xl`}></i>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            {(portal === 'creator' || asset === 'influence') && (
              <>
                Các Thầy thuốc hàng đầu & Nhà máy chuẩn GMP để giúp bạn tạo ra sản phẩm để đời.
              </>
            )}
            {(portal === 'farmer' || asset === 'labor') && (
              <>
                Các Nhà đầu tư & Chuyên gia R&D để giúp bạn làm giàu trên mảnh đất quê hương.
              </>
            )}
            {!['creator', 'farmer'].includes(portal) && asset !== 'influence' && asset !== 'labor' && (
              <>
                Một mạng lưới đối tác đa dạng để cùng nhau phát triển hệ sinh thái bền vững.
              </>
            )}
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all"
        >
          Khám phá Portal của Tôi
        </button>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Step 6A: Creator Type Selection - NEW (for Creator portal only)
function CreatorTypeSelection({
  selectedType,
  onNext,
  progress,
}: {
  selectedType?: 'kol-expert' | 'kol-lifestyle' | 'koc-local' | 'other';
  onNext: (creatorType: 'kol-expert' | 'kol-lifestyle' | 'koc-local' | 'other') => void;
  progress: number;
}) {
  const creatorTypes = [
    { value: 'kol-expert', label: 'KOL Chuyên gia', description: 'Bác sĩ, Dược sĩ, Chuyên gia dinh dưỡng', icon: 'ri-stethoscope-line' },
    { value: 'kol-lifestyle', label: 'KOL Lifestyle', description: 'Sống xanh, ESG Influencers', icon: 'ri-leaf-line' },
    { value: 'koc-local', label: 'KOC Địa phương', description: 'Nông dân, Xã viên trẻ', icon: 'ri-user-3-line' },
    { value: 'other', label: 'Creator tự do', description: 'Khác (Creator tự do)', icon: 'ri-user-star-line' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Vui lòng chọn loại Creator phù hợp với bạn nhất
          </h2>
          <p className="text-gray-600 text-lg">
            Điều này giúp chúng tôi tùy chỉnh trải nghiệm phù hợp nhất cho bạn
          </p>
        </div>

        {/* Creator Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {creatorTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onNext(type.value as 'kol-expert' | 'kol-lifestyle' | 'koc-local' | 'other')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedType === type.value
                  ? 'border-emerald-600 bg-emerald-100 text-emerald-900 shadow-lg ring-2 ring-emerald-500 ring-offset-2'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedType === type.value
                    ? 'bg-emerald-600'
                    : 'bg-gray-100'
                }`}>
                  <i className={`${type.icon} text-2xl ${selectedType === type.value ? 'text-white' : 'text-gray-600'}`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{type.label}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            if (selectedType) {
              onNext(selectedType);
            }
          }}
          disabled={!selectedType}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

// Step 6B: Creator Content Categories Selection - NEW (for Creator portal only)
function CreatorContentCategoriesSelection({
  selectedCategories,
  onNext,
  progress,
}: {
  selectedCategories?: string[];
  onNext: (categories: string[]) => void;
  progress: number;
}) {
  const contentCategories = [
    'Dược liệu & Sức khỏe',
    'Nông nghiệp bền vững',
    'Sống xanh & ESG',
    'Review sản phẩm',
    'Vlog trải nghiệm',
    'Giáo dục & Kiến thức',
    'Kinh doanh & Đầu tư',
  ];

  const [selected, setSelected] = useState<string[]>(selectedCategories || []);

  const toggleCategory = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter(c => c !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chủ đề nội dung bạn thường làm
          </h2>
          <p className="text-gray-600 text-lg">
            Chọn các chủ đề phù hợp với nội dung bạn sáng tạo (có thể chọn nhiều)
          </p>
        </div>

        {/* Content Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {contentCategories.map((category) => {
            const isSelected = selected.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-purple-600 bg-purple-100 text-purple-900 shadow-lg ring-2 ring-purple-500 ring-offset-2'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? 'bg-purple-600'
                      : 'bg-gray-100'
                  }`}>
                    <i className={`ri-check-line text-lg ${isSelected ? 'text-white' : 'text-transparent'}`}></i>
                  </div>
                  <span className="font-medium text-sm">{category}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={() => onNext(selected)}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all"
        >
          Hoàn tất đăng ký
        </button>

        {/* Skip option */}
        <button
          onClick={() => onNext([])}
          className="w-full mt-3 py-3 text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
        >
          Bỏ qua (có thể cập nhật sau)
        </button>
      </div>
    </div>
  );
}

// Step 5: Portal Reveal
function PortalReveal({
  portal,
  entityType,
  asset,
  onNext,
  progress,
}: {
  portal: string;
  entityType?: 'individual' | 'organization';
  asset?: string;
  onNext: () => void;
  progress: number;
}) {
  const navigate = useNavigate();
  // Pagination state for Portal Reveal content
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State for land digitization form (forest-owner portal)
  const [landData, setLandData] = useState({
    ownerName: '',
    phone: '',
    landLocation: '',
    approximateArea: '',
    currentStatus: '',
    notes: '',
  });
  
  // State for physician registration form
  const [physicianData, setPhysicianData] = useState({
    userType: 'physician',
    organizationName: '',
    specialty: '',
    representative: '',
    position: '',
    phone: '',
    email: '',
    currentNeeds: [] as string[],
    additionalInfo: ''
  });
  
  const specialtyOptions = [
    'Cơ xương khớp',
    'Tiêu hóa',
    'Thần kinh',
    'Tim mạch',
    'Hô hấp',
    'Da liễu',
    'Nội tiết',
    'Khác'
  ];

  const needsOptions = [
    'Tìm nguồn dược liệu sạch, dược tính cao, có nguồn gốc rõ ràng',
    'Cần hóa đơn GTGT và chứng nhận chất lượng để đấu thầu BHYT',
    'Muốn số hóa và bảo mật công thức bài thuốc gia truyền',
    'Cần tư vấn về cách sử dụng, bào chế dược liệu VITA hiệu quả',
    'Hợp tác nghiên cứu lâm sàng và kiểm định hiệu quả bài thuốc',
    'Muốn chuyển đổi bài thuốc sang dạng bào chế công nghiệp (viên, cao, siro)',
    'Tham gia mạng lưới thầy thuốc VITA để chia sẻ kinh nghiệm',
    'Muốn nhận mẫu thử miễn phí để đánh giá chất lượng trước khi đặt hàng'
  ];
  
  // Calculate total slides based on portal
  const hasExtendedContent = portal === 'physician' || portal === 'rnd';
  const hasForm = portal === 'forest-owner';
  const hasPhysicianForm = portal === 'physician';
  // For rnd: Intro (0) + Benefits (1) + Extended Content slides (2-5) = 6 total
  // For physician: Intro (0) + Benefits (1) + Extended Content slides (2-5) + Form slides (6-8) = 9 total
  // For forest-owner: Intro (0) + Benefits (1) + Form (2) = 3 total
  const rndExtendedSlides = portal === 'rnd' ? 4 : 0; // Slide 2-5: Vai trò, Lợi ích, Tiêu chí, Hợp tác+Quy trình
  const physicianExtendedSlides = portal === 'physician' ? 4 : 0; // Slide 2-5: Pain Points, Role, Network, Privileges
  const physicianFormSlides = portal === 'physician' ? 2 : 0; // Slide 5-6: Needs, Commitment (UserType removed, Professional Info and Contact moved to portal profile)
  const totalSlides = 2 + (hasExtendedContent ? (rndExtendedSlides || physicianExtendedSlides) : 0) + (hasForm ? 1 : 0) + physicianFormSlides;
  const portalData: Record<string, { icon: string; title: string; slogan: string; benefits: string[]; heroImage?: string; cta?: string }> = {
    'coop-worker': {
      icon: 'ri-seedling-line',
      title: 'Portal Nông Dân & Cộng Sự',
      slogan: 'Biến Nông nghiệp thành Nghề nghiệp Công nghệ cao.',
      heroImage: 'https://readdy.ai/api/search-image?query=Happy%20Vietnamese%20farmer%20holding%20smartphone%20standing%20in%20medicinal%20herb%20garden%2C%20phone%20screen%20showing%20income%20chart%2C%20smiling%20brightly%2C%20modern%20agriculture%20technology%2C%20green%20field%20background&width=1920&height=1080&seq=coop-worker1&orientation=landscape',
      benefits: [
        'Nhật ký Số 1 Chạm: Không còn sổ sách giấy tờ, ghi chép mùa vụ chỉ bằng một nút bấm.',
        'Lương thưởng Minh bạch: Theo dõi tiền công và lợi nhuận được chia ngay sau mỗi đơn hàng.',
        'Học để Kiếm tiền: Tích lũy kỹ năng, thăng hạng nghề nghiệp và gia tăng thu nhập.',
      ],
      cta: 'Gia nhập Đội ngũ Sản xuất',
    },
    'coop-land': {
      icon: 'ri-landscape-line',
      title: 'Portal Chủ Rừng & Chủ Đất',
      slogan: 'Ngồi tại nhà, Giám sát Tài sản Rừng từ xa.',
      heroImage: 'https://readdy.ai/api/search-image?query=Aerial%20drone%20view%20of%20lush%20green%20forest%20canopy%2C%20overlaid%20with%20digital%20data%20layers%20and%20shield%20protection%20symbols%2C%20remote%20monitoring%20technology%2C%20sustainable%20forestry%2C%20tropical%20forest%20Vietnam&width=1920&height=1080&seq=coop-land1&orientation=landscape',
      benefits: [
        'Số hóa Sổ đỏ & Hợp đồng: Lưu trữ an toàn hồ sơ pháp lý và hợp đồng góp vốn trọn đời.',
        'Mắt thần Giám sát: Xem Camera và ảnh vệ tinh thời gian thực để bảo vệ đất đai.',
        'Dòng tiền Tự động: Nhận báo cáo chia sẻ lợi nhuận minh bạch vào Ví điện tử.',
      ],
      cta: 'Định danh Tài sản Ngay',
    },
    'coop-investor': {
      icon: 'ri-hand-coin-line',
      title: 'Portal Xã Viên Góp Vốn',
      slogan: 'Đầu tư Xanh - Lợi nhuận Bền vững & An tâm.',
      heroImage: 'https://readdy.ai/api/search-image?query=Visual%20comparison%20split%20screen%20savings%20book%20low%20interest%20rate%20versus%20growing%20ginseng%20plant%20with%20green%20growth%20symbol%2C%20investment%20opportunity%2C%20sustainable%20financial%20growth%2C%20Vietnamese%20medicinal%20herbs&width=1920&height=1080&seq=coop-investor1&orientation=landscape',
      benefits: [
        'Vốn nhỏ Sinh lời thật: Mua suất đầu tư dược liệu chỉ từ vài trăm nghìn đồng.',
        'Minh bạch tuyệt đối: Theo dõi cây trồng của bạn qua Camera 24/7 và Blockchain.',
        'Tác động Xã hội: Mỗi đồng vốn giúp tạo sinh kế cho bà con và phủ xanh đất trống.',
      ],
      cta: 'Xem Cơ hội Đầu tư',
    },
    'coop-consumer': {
      icon: 'ri-shopping-cart-line',
      title: 'Portal Xã Viên Mua Sắm',
      slogan: 'Từ Nông trại đến Bàn ăn - Trọn vẹn An tâm.',
      heroImage: 'https://readdy.ai/api/search-image?query=Happy%20Vietnamese%20family%20enjoying%20dinner%20with%20green%20organic%20products%2C%20QR%20code%20being%20scanned%20showing%20origin%20traceability%2C%20healthy%20food%2C%20family%20meal%2C%20sustainable%20lifestyle&width=1920&height=1080&seq=coop-consumer1&orientation=landscape',
      benefits: [
        'Truy xuất nguồn gốc 100%: Biết rõ ai trồng, trồng ở đâu và quy trình chế biến thế nào.',
        'Tích điểm Sống Xanh: Đổi điểm thưởng lấy quà tặng hoặc đóng góp trồng cây gây rừng.',
        'Sức khỏe Gia đình: Tiếp cận các bài thuốc và thực phẩm dưỡng sinh từ chuyên gia.',
      ],
      cta: 'Khám phá Chợ Dược liệu',
    },
    'creator': {
      icon: 'ri-mic-line',
      title: 'VITA CREATOR HUB',
      slogan: 'Không chỉ là Review, Bạn là Chủ sở hữu Thương hiệu.',
      heroImage: 'https://readdy.ai/api/search-image?query=Vietnamese%20creator%20livestreaming%20at%20ginseng%20garden%2C%20shopping%2C%20cart%20icons%20and%20floating%20hearts%20around%2C%20social%20media%20content%20creation%2C%20agricultural%20showcase%2C%20e-commerce%20livestream&width=1920&height=1080&seq=creator1&orientation=landscape',
      benefits: [
        'Dữ liệu thực (Real-time Data): Kể chuyện bán hàng bằng bằng chứng khoa học từ R&D.',
        'Sản xuất Thương hiệu riêng (OEM): Tự ra mắt dòng sản phẩm mang tên bạn mà không cần xây nhà máy.',
        'Kho hàng không giới hạn: Kết nối trực tiếp với kho tổng VITA, không lo vốn nhập hàng.',
      ],
      cta: 'Trở thành Đối tác Sáng tạo',
    },
    'factory': {
      icon: 'ri-building-line',
      title: 'VITA FACTORY & B2B PORTAL',
      slogan: 'Lấp đầy Công suất - Tối ưu Chuỗi cung ứng.',
      heroImage: 'https://readdy.ai/api/search-image?query=Modern%20Vietnamese%20pharmaceutical%20manufacturing%20factory%20production%20line%2C%20herbal%20medicine%20processing%20machinery%2C%20quality%20control%2C%20industrial%20technology%2C%20B2B%20supply%20chain&width=1920&height=1080&seq=factory1&orientation=landscape',
      benefits: [
        'Lấp đầy Công suất: Tiếp cận dòng đơn hàng C2M (Sản xuất theo nhu cầu) liên tục từ hàng nghìn Creator và Thầy thuốc.',
        'Tiếp cận Công nghệ Mới: Đấu giá và mua bản quyền các quy trình chế biến tiên tiến nhất từ Trung tâm R&D để nâng cao năng lực cạnh tranh.',
        'Nguồn cung Chuẩn hóa: Mua nguyên liệu thô có nguồn gốc minh bạch (Traceable) từ các HTX đã được kiểm định.',
      ],
      cta: 'Kết nối với Hệ sinh thái',
    },
    'physician': {
      icon: 'ri-stethoscope-line',
      title: 'Portal Thầy Thuốc',
      slogan: 'Nâng tầm Bài thuốc Gia truyền thành Tài sản Trí tuệ.',
      heroImage: 'https://readdy.ai/api/search-image?query=Vietnamese%20doctor%20holding%20tablet%20with%20virtual%20laboratory%20interface%20for%20herbal%20medicine%20formulation%20blending%2C%20traditional%20medicine%20practitioner%2C%20modern%20healthcare%20technology%2C%20herbal%20medicine%20development&width=1920&height=1080&seq=physician1&orientation=landscape',
      benefits: [
        'Xưởng bào chế Số: Thiết kế công thức online, Nhà máy VITA sản xuất và đóng gói giúp bạn.',
        'Quản lý Bệnh nhân trọn đời: Theo dõi tiến triển sức khỏe và tái khám từ xa.',
        'Kho dược liệu Chuẩn hóa: Truy cập nguồn dược liệu sạch, đã kiểm định, không lo hàng giả.',
      ],
      cta: 'Mở Phòng khám Số',
    },
    'hospital': {
      icon: 'ri-hospital-line',
      title: 'VITA HOSPITAL PORTAL',
      slogan: 'Hợp tác Nghiên cứu Lâm sàng & Xuất bản Khoa học Quốc tế.',
      heroImage: 'https://readdy.ai/api/search-image?query=Vietnamese%20hospital%20research%20team%20conducting%20clinical%20trial%20for%20traditional%20medicine%2C%20medical%20professionals%20analyzing%20data%2C%20scientific%20collaboration%2C%20modern%20healthcare%20facility&width=1920&height=1080&seq=hospital1&orientation=landscape',
      benefits: [
        'Quản lý Dự án Nghiên cứu: Theo dõi tiến độ các dự án nghiên cứu lâm sàng từ Phase I đến Phase III một cách minh bạch và hiệu quả.',
        'Kết nối Mạng lưới: Hợp tác với các bệnh viện đối tác và các trung tâm nghiên cứu trong hệ sinh thái VITA.',
        'Xuất bản Khoa học: Hỗ trợ xuất bản và công bố các công trình nghiên cứu với tiêu chuẩn quốc tế.',
      ],
      cta: 'Tham gia Nghiên cứu',
    },
    'rnd': {
      icon: 'ri-flask-line',
      title: 'VITA SCIENCE HUB (R&D CENTER)',
      slogan: 'Thương mại hóa Tri thức - Bảo chứng Khoa học.',
      heroImage: 'https://readdy.ai/api/search-image?query=Vietnamese%20scientists%20in%20modern%20laboratory%20researching%20medicinal%20herbs%2C%20DNA%20analysis%2C%20biotechnology%2C%20data%20visualization%2C%20innovative%20research%20environment&width=1920&height=1080&seq=rnd1&orientation=landscape',
      benefits: [
        'Sàn Đấu giá Công nghệ: Chuyển nhượng bản quyền sáng chế/quy trình canh tác cho các Nhà máy và Doanh nghiệp với giá trị thực.',
        'Dữ liệu Lớn (Big Data): Tiếp cận kho dữ liệu gen và dữ liệu sinh trưởng thực tế khổng lồ để phục vụ nghiên cứu chuyên sâu.',
        'Thu nhập từ Chuyên môn: Nhận booking tư vấn kỹ thuật (Troubleshooting) hoặc xác thực nội dung truyền thông cho Creator.',
      ],
      cta: 'Tham gia Sàn Công nghệ',
    },
    'cooperative': {
      icon: 'ri-team-line',
      title: 'VITA CO-OP ADMIN',
      slogan: 'Quản trị Tập trung - Vận hành Phi tập trung.',
      benefits: [
        '✅ ERP Nông nghiệp: Quản lý đồng bộ 3 nguồn lực Đất - Sức - Vốn và tự động tính toán phân chia lợi nhuận (P&L) theo thời gian thực.',
        '✅ Minh bạch Tài chính: Xuất báo cáo tài chính chuẩn xác để gọi vốn từ Nhà đầu tư và báo cáo chính quyền.',
        '✅ Điều hành Số: Tổ chức đại hội xã viên online và biểu quyết điện tử (E-Voting) các quyết định quan trọng.',
      ],
    },
    'farmer': {
      icon: 'ri-seedling-line',
      title: 'VITA PRODUCER APP',
      slogan: 'Số hóa Tư liệu Sản xuất & Nhật ký Canh tác.',
      benefits: [
        '✅ Nhật ký Số đơn giản: Ghi chép công việc hàng ngày chỉ bằng "một chạm" để minh bạch công sức lao động.',
        '✅ Thu nhập Rõ ràng: Theo dõi chính xác số tiền công và thưởng năng suất mình nhận được ngay trên điện thoại.',
        '✅ Học để Kiếm tiền (Learn-to-Earn): Học kỹ thuật canh tác mới qua video và nhận điểm thưởng/chứng chỉ tay nghề.',
      ],
    },
    'forest-owner': {
      icon: 'ri-landscape-line',
      title: 'Portal Chủ Rừng & Chủ Đất',
      slogan: 'Ngồi tại nhà, Giám sát Tài sản Rừng từ xa.',
      heroImage: 'https://readdy.ai/api/search-image?query=Aerial%20drone%20view%20of%20lush%20green%20forest%20canopy%2C%20overlaid%20with%20digital%20data%20layers%20and%20shield%20protection%20symbols%2C%20remote%20monitoring%20technology%2C%20sustainable%20forestry%2C%20tropical%20forest%20Vietnam&width=1920&height=1080&seq=forest-owner1&orientation=landscape',
      benefits: [
        'Số hóa Sổ đỏ & Hợp đồng: Lưu trữ an toàn hồ sơ pháp lý và hợp đồng góp vốn trọn đời.',
        'Mắt thần Giám sát: Xem Camera và ảnh vệ tinh thời gian thực để bảo vệ đất đai.',
        'Dòng tiền Tự động: Nhận báo cáo chia sẻ lợi nhuận minh bạch vào Ví điện tử.',
      ],
      cta: 'Định danh Tài sản Ngay',
    },
    'investor-small': {
      icon: 'ri-hand-coin-line',
      title: 'VITA INVEST APP',
      slogan: 'Đầu tư Xanh - Lợi nhuận Bền vững.',
      benefits: [
        '✅ Suất Đầu tư Nhỏ: Tham gia đầu tư vào các dự án Rừng dược sinh với số vốn linh hoạt, an toàn như mua cổ phiếu.',
        '✅ Giám sát Dòng tiền: Nhìn thấy tiền của mình đang được HTX chi vào hạng mục gì (Phân bón, Giống, Nhân công) theo thời gian thực.',
        '✅ Quà tặng Tương lai: Sở hữu và trao tặng các cây sâm/cây gỗ quý như một tài sản tích lũy cho con cái.',
      ],
    },
    'investor-large': {
      icon: 'ri-hand-coin-line',
      title: 'VITA INVEST APP',
      slogan: 'Đầu tư Xanh - Lợi nhuận Bền vững.',
      benefits: [
        '✅ Suất Đầu tư Nhỏ: Tham gia đầu tư vào các dự án Rừng dược sinh với số vốn linh hoạt, an toàn như mua cổ phiếu.',
        '✅ Giám sát Dòng tiền: Nhìn thấy tiền của mình đang được HTX chi vào hạng mục gì (Phân bón, Giống, Nhân công) theo thời gian thực.',
        '✅ Quà tặng Tương lai: Sở hữu và trao tặng các cây sâm/cây gỗ quý như một tài sản tích lũy cho con cái.',
      ],
    },
    'consumer': {
      icon: 'ri-shopping-cart-line',
      title: 'VITA LIFESTYLE APP',
      slogan: 'Sống Xanh - Ăn Sạch - Trải nghiệm Thật.',
      benefits: [
        '✅ Truy xuất Nguồn gốc: Quét mã QR để xem hành trình "Từ rừng về phố" và nhật ký chăm sóc của từng sản phẩm.',
        '✅ Tiêu dùng Tích điểm (Green Points): Mua hàng sạch, đi bộ hoặc check-in Farmstay để nhận điểm đổi quà hấp dẫn.',
        '✅ Nuôi Cây Ảo - Nhận Cây Thật: Chăm sóc cây trên App, VITA sẽ trồng cây thật thay bạn để bảo vệ môi trường.',
      ],
    },
  };

  const data = portalData[portal] || {
    icon: 'ri-user-line',
    title: 'Portal của bạn',
    slogan: 'Chào mừng đến với VITA Platform',
    benefits: ['Lợi ích 1', 'Lợi ích 2', 'Lợi ích 3'],
  };

  // Handle next slide or complete portal reveal
  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // For coop-investor portal, navigate to simple registration page
      if (portal === 'coop-investor') {
        navigate('/physician-register?redirect=/farmer/investor');
      } else {
        onNext();
      }
    }
  };

  // Physician form handlers
  const handlePhysicianChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setPhysicianData({
      ...physicianData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (value: string) => {
    const newNeeds = physicianData.currentNeeds.includes(value)
      ? physicianData.currentNeeds.filter(n => n !== value)
      : [...physicianData.currentNeeds, value];
    
    setPhysicianData({
      ...physicianData,
      currentNeeds: newNeeds
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhysicianData({
      ...physicianData,
      phone: value
    });
  };

  // Slide 0: Intro (Icon + Title + Slogan)
  const renderIntroSlide = () => {
    // Individual portals with hero images: coop-worker, coop-land, forest-owner, coop-investor, coop-consumer, creator, physician
    // Organization portals with hero images: factory, hospital, rnd
    const individualPortalsWithHero = ['coop-worker', 'coop-land', 'forest-owner', 'coop-investor', 'coop-consumer', 'creator', 'physician'];
    const organizationPortalsWithHero = ['factory', 'hospital', 'rnd'];
    const allPortalsWithHero = [...individualPortalsWithHero, ...organizationPortalsWithHero];
    
    // Check if portal has heroImage and should use full-screen hero layout
    if (allPortalsWithHero.includes(portal) && data.heroImage) {
  return (
        <div className="fixed inset-0 w-screen h-screen overflow-hidden">
          {/* Background Image - Full Screen */}
          <img 
            src={data.heroImage}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
                {data.slogan}
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm md:text-base lg:text-xl text-white/95 leading-relaxed">
                  {portal === 'physician' && (
                    <>
                      Chấm dứt nỗi lo <span className="font-semibold">"Dược liệu rác"</span>. Hệ sinh thái Rừng Dược Sinh mang đến nguồn dược liệu chuẩn hóa VITA: Sạch, Dược tính cao, Minh bạch nguồn gốc để người thầy thuốc yên tâm cứu người.
                    </>
                  )}
                  {portal !== 'physician' && (
                    <>
                      Chào mừng bạn đến với {data.title}. Khám phá những tiện ích và cơ hội đang chờ đón bạn.
                    </>
                  )}
                </p>
      </div>

              <button
                onClick={handleNext}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm sm:text-base lg:text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 mt-4 sm:mt-6"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Default Intro Slide for other portals (organizations, etc.)
    return (
      <div className="max-w-4xl mx-auto pt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chúng tôi đã tìm thấy nơi dành riêng cho bạn!
          </h2>
          </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full mb-6 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse">
            <i className={`${data.icon} text-white text-5xl sm:text-6xl`}></i>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {data.title}
          </h3>
          <p className="text-lg sm:text-xl text-emerald-700 font-medium italic">
            {data.slogan}
          </p>
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
        >
          Tiếp tục
        </button>
      </div>
    );
  };

  // Slide 1: Benefits
  const renderBenefitsSlide = () => {
    // Special Benefits for Physician Portal
    if (portal === 'physician') {
      return (
        <div className="max-w-4xl mx-auto pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              QUYỀN LỢI ĐẶC BIỆT DÀNH CHO THÀNH VIÊN
          </h2>
            <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
              3 giá trị cốt lõi khi tham gia hệ sinh thái
            </p>
        </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Quyền lợi 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-leaf-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nguồn Thuốc "Sạch" & An Toàn</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Chuẩn VITA:</p>
                    <p>Trồng dưới tán rừng, nói không với kích thích tăng trưởng</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">An toàn tuyệt đối:</p>
                    <p>Không tồn dư thuốc BVTV, an toàn cho người già, trẻ em, bệnh mãn tính</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quyền lợi 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-heart-pulse-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nâng Cao Hiệu Quả & Uy Tín</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Dược tính cao (High Potency):</p>
                    <p>Thu hái đúng "thời điểm vàng", giữ hàm lượng hoạt chất cao nhất</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Hiệu quả thực tế:</p>
                    <p>Bệnh nhân phục hồi nhanh → Tiếng lành đồn xa → Tăng doanh thu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quyền lợi 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-file-shield-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Minh Bạch Pháp Lý - BHYT</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-green-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Hóa đơn đầy đủ:</p>
                    <p>Hóa đơn GTGT, hồ sơ công bố chất lượng, chứng nhận kiểm nghiệm</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-green-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Thanh toán BHYT:</p>
                    <p>Cơ sở pháp lý vững chắc để đấu thầu và chi trả Bảo hiểm Y tế</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={() => setCurrentSlide(currentSlide - 1)} 
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all text-sm sm:text-base"
            >
              Quay lại
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all text-sm sm:text-base"
            >
              Hoàn tất
            </button>
          </div>
        </div>
      );
    }

    // Default Benefits Slide for other portals
    return (
      <div className="max-w-4xl mx-auto pt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Lợi ích dành cho bạn
          </h2>
        </div>

        <div className="space-y-6 mb-8">
          {(data.benefits || []).map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-check-line text-emerald-600 text-lg"></i>
                </div>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{benefit}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
        >
          Tiếp tục
        </button>
      </div>
    );
  };

  // Physician Portal Slides
  // Slide 2: Nỗi đau của người cầm cân nảy mực
  const renderPhysicianPainPointsSlide = () => (
    <div className="max-w-4xl mx-auto pt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          NỖI ĐAU CỦA NGƯỜI CẦM CÂN NẢY MỰC
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Là những chuyên gia nơi tuyến đầu điều trị, chúng tôi hiểu Quý vị đang đối mặt với những nghịch lý:
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 border-red-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <i className="ri-error-warning-line text-white text-3xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Bắt Mạch Đúng, Kê Đơn Chuẩn Nhưng...</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Bệnh không thuyên giảm. Nguyên nhân không nằm ở y thuật, mà nằm ở <strong className="text-red-600">"dược liệu rác"</strong> – loại dược liệu đã bị chiết xuất hết hoạt chất, chỉ còn lại xác xơ, hoặc tẩm ướp hóa chất bảo quản.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 border-orange-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                    <i className="ri-user-unfollow-line text-white text-3xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Mất Uy Tín Oan Uổng</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Bệnh nhân không khỏi bệnh quay sang nghi ngờ tay nghề của thầy thuốc. Uy tín được xây dựng cả đời có thể sụp đổ chỉ vì nguồn thuốc kém chất lượng.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 border-amber-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
                    <i className="ri-file-forbid-line text-white text-3xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Rào Cản Thanh Toán BHYT</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Muốn đưa thuốc tốt vào điều trị cho bệnh nhân có Bảo hiểm Y tế nhưng nguồn mua trôi nổi không có hóa đơn đỏ, không chứng minh được nguồn gốc xuất xứ để quyết toán.
                  </p>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105 mt-8"
              >
                Tiếp tục
              </button>
            </div>
          );

  // Slide 3: Vai trò của thầy thuốc
  const renderPhysicianRoleSlide = () => (
    <div className="max-w-4xl mx-auto pt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          VAI TRÒ CỦA THẦY THUỐC TRONG HỆ SINH THÁI
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <i className="ri-user-star-line text-white text-2xl sm:text-3xl"></i>
          </div>
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900">Người Thẩm Định Cuối Cùng</h4>
            <p className="text-sm sm:text-base text-teal-600">The Ultimate Validator</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-stethoscope-line text-white text-2xl"></i>
              </div>
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-2">Kiểm Định Qua Lâm Sàng</h5>
                <p className="text-sm text-gray-700 mb-3">Clinical Verification</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-teal-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Kết quả điều trị trên bệnh nhân là thước đo chính xác nhất cho chất lượng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-teal-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Phản hồi về hiệu quả là dữ liệu quý giá để tối ưu hóa quy trình</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-shield-check-line text-white text-2xl"></i>
              </div>
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-2">Bảo Chứng Niềm Tin</h5>
                <p className="text-sm text-gray-700 mb-3">Trust Builder</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-emerald-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Sự tin dùng của Bác sĩ, Lương y uy tín là "tem bảo hành" giá trị nhất</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-emerald-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Xây dựng thương hiệu dược liệu Việt trên nền tảng uy tín y đức</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105 mt-8"
      >
        Tiếp tục
      </button>
    </div>
  );

  // Slide 4: Mạng lưới thầy thuốc VITA
  const renderPhysicianNetworkSlide = () => (
    <div className="max-w-4xl mx-auto pt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          MẠNG LƯỚI THẦY THUỐC VITA
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          VITA Physician Network - Cộng đồng tinh hoa
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <i className="ri-hospital-line text-white text-2xl"></i>
            </div>
            <h5 className="text-base font-bold text-gray-900 mb-2">Bệnh viện YHCT</h5>
            <p className="text-xs text-gray-600">Tuyến Trung ương & Tỉnh</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <i className="ri-building-2-line text-white text-2xl"></i>
            </div>
            <h5 className="text-base font-bold text-gray-900 mb-2">Khoa YHCT</h5>
            <p className="text-xs text-gray-600">Tại bệnh viện đa khoa</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <i className="ri-home-heart-line text-white text-2xl"></i>
            </div>
            <h5 className="text-base font-bold text-gray-900 mb-2">Phòng khám tư</h5>
            <p className="text-xs text-gray-600">YHCT uy tín</p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <i className="ri-user-heart-line text-white text-2xl"></i>
            </div>
            <h5 className="text-base font-bold text-gray-900 mb-2">Lương y, Bác sĩ</h5>
            <p className="text-xs text-gray-600">Tâm huyết với nghề</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
      >
        Tiếp tục
      </button>
    </div>
  );

  // Slide 5: Physician Privileges
  const renderPhysicianPrivilegesSlide = () => {
    if (portal !== 'physician') return null;

    return (
      <div className="max-w-4xl mx-auto pt-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Đặc quyền thành viên
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Những ưu đãi đặc biệt dành cho mạng lưới thầy thuốc VITA
            </p>
          </div>

          <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mb-8">
            <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-vip-crown-line text-teal-600 text-2xl"></i>
              Đặc quyền thành viên:
            </h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <i className="ri-star-fill text-teal-600 text-xl flex-shrink-0"></i>
                <p className="text-sm text-gray-700">Được ưu tiên cung cấp các loại dược liệu quý hiếm hoặc mùa vụ</p>
              </div>
              <div className="flex items-start gap-3">
                <i className="ri-star-fill text-teal-600 text-xl flex-shrink-0"></i>
                <p className="text-sm text-gray-700">Được truy cập dữ liệu truy xuất nguồn gốc (QR Code) để cho bệnh nhân xem trực tiếp</p>
              </div>
              <div className="flex items-start gap-3">
                <i className="ri-star-fill text-teal-600 text-xl flex-shrink-0"></i>
                <p className="text-sm text-gray-700">Nhận mẫu thử miễn phí để đánh giá chất lượng trước khi đặt hàng số lượng lớn</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button type="button" onClick={() => setCurrentSlide(currentSlide - 1)} className="flex-1 py-3 px-6 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all">
              Quay lại
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Slide 5: Physician Needs Selection (Professional Info moved to portal profile, UserType removed)
  const renderPhysicianNeedsSlide = () => {
    if (portal !== 'physician') return null;

    return (
      <div className="max-w-4xl mx-auto pt-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Nhu cầu hiện tại *</h3>
            <p className="text-gray-600">Chọn một hoặc nhiều nhu cầu phù hợp với bạn</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-8">
            <div className="space-y-3">
              {needsOptions.map((option) => (
                <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-300 transition-all">
                  <input
                    type="checkbox"
                    checked={physicianData.currentNeeds.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="w-5 h-5 text-teal-600 mt-0.5"
                  />
                  <span className="text-sm sm:text-base text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button type="button" onClick={() => setCurrentSlide(currentSlide - 1)} className="flex-1 py-3 px-6 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all">
              Quay lại
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Slide 7: Physician Commitment
  const renderPhysicianCommitmentSlide = () => {
    if (portal !== 'physician') return null;

    return (
      <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 shadow-2xl">
                <i className="ri-heart-line text-white text-4xl sm:text-5xl"></i>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight">
              Cam kết từ GreenLight
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8 sm:mb-10">
              Lời hứa của chúng tôi dành cho bạn
            </p>

            {/* Commitment Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10">
              <div className="max-w-3xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                  GreenLight hiểu rằng <span className="font-bold text-teal-700">uy tín của người thầy thuốc được xây dựng cả đời</span>. Chúng tôi cam kết bảo vệ uy tín đó bằng những sản phẩm tử tế nhất từ rừng già.
                </p>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed italic border-t border-gray-200 pt-4 sm:pt-6">
                  "Không bán rẻ tài nguyên rừng, chúng tôi bán giá trị của sự minh bạch và bền vững."
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md mx-auto">
              <button 
                type="button" 
                onClick={() => setCurrentSlide(currentSlide - 1)} 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all text-sm sm:text-base border border-white/30"
              >
                Quay lại
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-teal-700 rounded-xl font-semibold hover:shadow-2xl transition-all text-sm sm:text-base transform hover:scale-105 active:scale-95"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // R&D Portal Slides (Contact moved to portal profile)

  // R&D Portal Slides
  // Slide 2: Vai trò của khoa học
  const renderRndRoleSlide = () => (
    <div className="max-w-4xl mx-auto pt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          VAI TRÒ CỦA KHOA HỌC TRONG HỆ SINH THÁI
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <i className="ri-microscope-line text-white text-2xl sm:text-3xl"></i>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Người Khởi Tạo (The Originator)</h3>
            <p className="text-sm sm:text-base text-purple-600">Giải quyết vấn đề gốc rễ của ngành dược liệu Việt Nam</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-dna-line text-white text-2xl"></i>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Chuẩn Hóa Nguồn Giống</h4>
                <p className="text-sm text-gray-700 mb-3">Genetic Standardization</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-purple-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Chấm dứt tình trạng trồng tự phát, giống lai tạp, thoái hóa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-purple-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Tránh nhầm lẫn loài (Ba kích tím/trắng, Sâm Ngọc Linh/Tam Thất)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-purple-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Cung cấp giống F1 sạch bệnh, đề kháng cao, năng suất ổn định</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-book-open-line text-white text-2xl"></i>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Cố Vấn Kỹ Thuật</h4>
                <p className="text-sm text-gray-700 mb-3">Technical Advisory</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-indigo-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Ban hành quy trình canh tác chuẩn (SOP) cho từng loại cây</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-indigo-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Hướng dẫn mật độ trồng, chế độ dinh dưỡng, kỹ thuật thu hái</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-indigo-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <span>Đào tạo đội ngũ kỹ sư hiện trường giám sát HTX</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
      >
        Tiếp tục
      </button>
    </div>
  );

  // Slide 3: Lợi ích hợp tác
  const renderRndBenefitsSlide = () => (
    <div className="max-w-4xl mx-auto pt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          LỢI ÍCH KHI HỢP TÁC CÙNG RỪNG DƯỢC SINH
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Nền tảng thực tiễn để khoa học đi vào cuộc sống
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <i className="ri-store-line text-white text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Thương Mại Hóa Quy Mô Lớn</h3>
          <p className="text-sm text-gray-600 mb-3 font-semibold text-purple-700">Commercialization</p>
          <div className="space-y-3 text-sm text-gray-600">
            <p>Công trình nghiên cứu, giống cây quý sau lai tạo không còn nằm trong ngăn kéo.</p>
            <p className="font-semibold text-gray-800">GreenLight sở hữu vùng quy hoạch hàng nghìn hecta:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-purple-500 text-lg flex-shrink-0"></i>
                <span>Nhu cầu hàng triệu bầu giống mỗi năm</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-purple-500 text-lg flex-shrink-0"></i>
                <span>Thị trường tiêu thụ trực tiếp và bền vững</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
            <i className="ri-database-2-line text-white text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Dữ Liệu Thực Nghiệm</h3>
          <p className="text-sm text-gray-600 mb-3 font-semibold text-indigo-700">Big Data R&D</p>
          <div className="space-y-3 text-sm text-gray-600">
            <p>Thông qua Platform <strong>VITA Data Hub</strong>, nhà khoa học nhận dữ liệu phản hồi thực tế:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-indigo-500 text-lg flex-shrink-0"></i>
                <span>Độ thích nghi từ hàng nghìn hecta vùng trồng</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-indigo-500 text-lg flex-shrink-0"></i>
                <span>Năng suất thực tế theo tiểu khí hậu</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-indigo-500 text-lg flex-shrink-0"></i>
                <span>Biến đổi hoạt chất theo môi trường</span>
              </li>
            </ul>
            <p className="font-semibold text-gray-800">Kho dữ liệu quý giá để hoàn thiện nghiên cứu và lai tạo giống mới ưu việt hơn.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
            <i className="ri-leaf-line text-white text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Bảo Tồn & Phát Triển</h3>
          <p className="text-sm text-gray-600 mb-3 font-semibold text-blue-700">Conservation</p>
          <div className="space-y-3 text-sm text-gray-600">
            <p>Hợp tác xây dựng các vườn bảo tồn dược liệu gốc (Mother Garden) ngay tại vùng rừng sinh thái.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-blue-500 text-lg flex-shrink-0"></i>
                <span>Bảo vệ loài gen quý bản địa</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-blue-500 text-lg flex-shrink-0"></i>
                <span>Ngăn chặn nguy cơ tuyệt chủng do khai thác tận diệt</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-blue-500 text-lg flex-shrink-0"></i>
                <span>Phát triển nguồn gen bền vững cho thế hệ tương lai</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
      >
        Tiếp tục
      </button>
    </div>
  );

  // Slide 4: Tiêu chí đối tác
  const renderRndCriteriaSlide = () => (
    <div className="max-w-4xl mx-auto pt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          TIÊU CHÍ ĐỐI TÁC CHIẾN LƯỢC
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
        <p className="text-sm sm:text-base text-gray-700 mb-6">
          Chúng tôi tìm kiếm sự hợp tác từ:
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
              <i className="ri-government-line text-white text-2xl"></i>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Viện Nghiên Cứu Quốc Gia</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Viện Dược Liệu (NIMM)</li>
              <li>• Viện Khoa học Lâm nghiệp</li>
              <li>• Học viện Nông nghiệp</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-3">
              <i className="ri-building-line text-white text-2xl"></i>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Doanh Nghiệp Khoa Học</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Nuôi cấy mô (Tissue culture)</li>
              <li>• Lai tạo giống</li>
              <li>• Bảo hộ giống cây trồng</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
              <i className="ri-user-star-line text-white text-2xl"></i>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Nhà Khoa Học Độc Lập</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Chuyên gia đầu ngành</li>
              <li>• Tâm huyết dược liệu Việt</li>
              <li>• Kinh nghiệm thực tiễn</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Yêu cầu năng lực:</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <i className="ri-checkbox-circle-fill text-purple-600 text-2xl flex-shrink-0"></i>
              <p className="text-sm text-gray-700">Sở hữu nguồn giống bố mẹ đầu dòng đã được công nhận hoặc kiểm định</p>
            </div>
            <div className="flex items-start gap-3">
              <i className="ri-checkbox-circle-fill text-purple-600 text-2xl flex-shrink-0"></i>
              <p className="text-sm text-gray-700">Có năng lực sản xuất cây giống quy mô công nghiệp (hoặc sẵn sàng chuyển giao quy trình nhân giống)</p>
            </div>
            <div className="flex items-start gap-3">
              <i className="ri-checkbox-circle-fill text-purple-600 text-2xl flex-shrink-0"></i>
              <p className="text-sm text-gray-700">Sẵn sàng tham gia Hội đồng Khoa học VITA để thẩm định chất lượng</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
      >
        Tiếp tục
      </button>
    </div>
  );

  // Slide 5: Các hình thức hợp tác + Quy trình
  const renderRndCooperationSlide = () => (
    <div className="max-w-4xl mx-auto pt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          CÁC HÌNH THỨC HỢP TÁC
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-8">
          Partnership Models - Linh hoạt theo nhu cầu
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Nhà Cung Cấp Độc Quyền</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-semibold text-purple-700">Exclusive Supplier</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-purple-500 flex-shrink-0 mt-0.5"></i>
                <span>Chịu trách nhiệm sản xuất và cung cấp toàn bộ cây giống</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-purple-500 flex-shrink-0 mt-0.5"></i>
                <span>GreenLight cam kết bao tiêu số lượng theo kế hoạch từng năm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Chuyển Giao Công Nghệ</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-semibold text-indigo-700">Technology Transfer</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-indigo-500 flex-shrink-0 mt-0.5"></i>
                <span>Chuyển giao quy trình nhân giống cho GreenLight</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-indigo-500 flex-shrink-0 mt-0.5"></i>
                <span>GreenLight tự sản xuất theo công nghệ được cấp phép</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Hợp Tác Nghiên Cứu</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-semibold text-blue-700">Joint Research</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-blue-500 flex-shrink-0 mt-0.5"></i>
                <span>Hai bên cùng đầu tư, cùng sở hữu kết quả nghiên cứu</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-arrow-right-s-fill text-blue-500 flex-shrink-0 mt-0.5"></i>
                <span>Chia sẻ lợi nhuận từ thương mại hóa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          QUY TRÌNH HỢP TÁC KHOA HỌC
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-3 mx-auto">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-2">Tiếp Nhận Hồ Sơ</h4>
            <p className="text-xs text-gray-600">Đăng ký hợp tác qua Platform</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-3 mx-auto">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-2">Thẩm Định</h4>
            <p className="text-xs text-gray-600">Hội đồng Khoa học VITA đánh giá</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3 mx-auto">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-2">Ký Hợp Đồng</h4>
            <p className="text-xs text-gray-600">Thỏa thuận hợp tác chính thức</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center mb-3 mx-auto">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-2">Triển Khai</h4>
            <p className="text-xs text-gray-600">Bắt đầu hợp tác thực tế</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
      >
        Tiếp tục
      </button>
    </div>
  );

  // Slide 3: Form (Forest Owner only)
  const renderFormSlide = () => {
    if (portal !== 'forest-owner') return null;

    return (
      <div className="max-w-4xl mx-auto pt-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Số hóa Đất & Rừng</h3>
            <p className="text-gray-600">Vui lòng cung cấp thông tin sơ bộ về lô đất bạn muốn đưa vào hệ thống VITA</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem('vita_land_digitization_data', JSON.stringify(landData));
              onNext();
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Họ và tên chủ đất <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={landData.ownerName}
                onChange={(e) => setLandData({...landData, ownerName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={landData.phone}
                onChange={(e) => setLandData({...landData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="0901234567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vị trí đất <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={landData.landLocation}
                onChange={(e) => setLandData({...landData, landLocation: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Ví dụ: Xã Măng Ri, Huyện Kon Plông, Tỉnh Kon Tum"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Diện tích ước tính <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={landData.approximateArea}
                onChange={(e) => setLandData({...landData, approximateArea: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Ví dụ: 10 ha"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hiện trạng <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={landData.currentStatus}
                onChange={(e) => setLandData({...landData, currentStatus: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Chọn hiện trạng</option>
                <option value="forest">Rừng tự nhiên</option>
                <option value="plantation">Rừng trồng</option>
                <option value="degraded">Rừng nghèo kiệt</option>
                <option value="bare">Đất trống</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ghi chú thêm
              </label>
              <textarea
                value={landData.notes}
                onChange={(e) => setLandData({...landData, notes: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Mô tả thêm về đất (nếu có)"
              />
            </div>

            <div className="bg-amber-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800">
                <i className="ri-information-line mr-2"></i>
                Sau khi gửi, cán bộ HTX sẽ liên hệ với bạn để sắp xếp lịch thẩm định thực địa.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Gửi yêu cầu số hóa đất
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Main return - conditional rendering based on currentSlide
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Conditional rendering based on currentSlide */}
      {currentSlide === 0 && renderIntroSlide()}
      {/* R&D Portal Extended Content Slides */}
      {portal === 'rnd' && currentSlide === 1 && renderRndRoleSlide()}
      {portal === 'rnd' && currentSlide === 2 && renderRndBenefitsSlide()}
      {portal === 'rnd' && currentSlide === 3 && renderRndCriteriaSlide()}
      {portal === 'rnd' && currentSlide === 4 && renderRndCooperationSlide()}
      {portal === 'rnd' && currentSlide === 5 && renderBenefitsSlide()}
      {/* Physician Extended Content Slides - Benefits moved to last slide */}
      {portal === 'physician' && currentSlide === 1 && renderPhysicianPainPointsSlide()}
      {portal === 'physician' && currentSlide === 2 && renderPhysicianRoleSlide()}
      {portal === 'physician' && currentSlide === 3 && renderPhysicianNetworkSlide()}
      {portal === 'physician' && currentSlide === 4 && renderPhysicianPrivilegesSlide()}
      {portal === 'physician' && currentSlide === 5 && renderPhysicianNeedsSlide()}
      {portal === 'physician' && currentSlide === 6 && renderPhysicianCommitmentSlide()}
      {portal === 'physician' && currentSlide === 7 && renderBenefitsSlide()}
      {/* Default Benefits for other portals */}
      {!['physician', 'rnd'].includes(portal) && currentSlide === 1 && renderBenefitsSlide()}
      {/* Forest Owner Form */}
      {portal === 'forest-owner' && currentSlide === 2 && renderFormSlide()}

      {/* Slide Indicators - Fixed at bottom */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-2 z-[100] pointer-events-none pb-safe">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`block w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${
              currentSlide === index ? 'bg-emerald-600 w-6' : 'bg-gray-300'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

// Step 7: Quick Tour
function QuickTour({ onNext, progress }: { onNext: () => void; progress: number }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: 'ri-fingerprint-line',
      title: 'Bước 1: Định danh (Verify)',
      description: 'Xác thực danh tính (eKYC) để mở khóa các quyền lợi tài chính và pháp lý.',
    },
    {
      icon: 'ri-links-line',
      title: 'Bước 2: Kết nối (Connect)',
      description: 'Tìm kiếm đối tác hoặc đơn hàng trên "Sàn Giao dịch" của VITA.',
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Bước 3: Tác động (Impact)',
      description: 'Kinh doanh và theo dõi tác động xã hội bạn tạo ra theo thời gian thực.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto pt-12">
        {/* Slider */}
        <div className="relative mb-8">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full p-8 sm:p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`${slide.icon} text-white text-4xl`}></i>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {slide.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-emerald-600 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          {currentSlide > 0 && (
            <button
              onClick={() => setCurrentSlide(currentSlide - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50"
            >
              <i className="ri-arrow-left-line text-gray-700"></i>
            </button>
          )}
          {currentSlide < slides.length - 1 && (
            <button
              onClick={() => setCurrentSlide(currentSlide + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50"
            >
              <i className="ri-arrow-right-line text-gray-700"></i>
            </button>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all"
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
}

// Step 8: Authentication
function Authentication({
  portal,
  referralCode: initialReferralCode,
  onComplete,
  progress,
}: {
  portal: string;
  referralCode: string;
  onComplete: (portal: string) => void;
  progress: number;
}) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState(initialReferralCode);
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    if (!agreed) {
      alert('Vui lòng đồng ý với Điều khoản sử dụng!');
      return;
    }
    // Here you would typically call an API to register the user
    // For now, just complete the onboarding
    onComplete(portal);
  };

  const portalNames: Record<string, string> = {
    'forest-owner': 'Chủ Rừng & Chủ Đất',
    'farmer': 'Nông Dân & Cộng Sự',
    'cooperative': 'Hợp Tác Xã',
    'investor-small': 'Xã Viên Góp Vốn',
    'investor-large': 'Xã Viên Góp Vốn (Hạng VIP)',
    'creator': 'CREATOR HUB',
    'physician': 'THẦY THUỐC',
    'rnd': 'R&D CENTER',
    'factory': 'NHÀ MÁY & ĐỐI TÁC THU MUA',
    'consumer': 'XÃ VIÊN MUA SẮM',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Gia nhập VITA {portalNames[portal] || 'PLATFORM'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0912345678"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nhập lại mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mã giới thiệu (Tùy chọn)
            </label>
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="VITA123456"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Nhập mã của người giới thiệu để cả hai cùng nhận 50 điểm V-Point.
            </p>
          </div>

          {/* Social Login */}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-3 text-center">Hoặc đăng nhập bằng:</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="py-2 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="ri-google-fill text-2xl text-red-500"></i>
              </button>
              <button
                type="button"
                className="py-2 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="ri-apple-fill text-2xl text-gray-900"></i>
              </button>
              <button
                type="button"
                className="py-2 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="ri-chat-3-fill text-2xl text-blue-500"></i>
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">
                Tôi đồng ý với <span className="text-emerald-600 font-semibold">Điều khoản sử dụng</span> và{' '}
                <span className="text-emerald-600 font-semibold">Chính sách bảo mật dữ liệu</span> của VITA Platform.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">
                (Tùy chọn) Tôi muốn nhận bản tin thị trường qua Email.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            TẠO TÀI KHOẢN & VÀO DASHBOARD
          </button>
        </form>
      </div>
    </div>
  );
}

// Step 6A: Quick Sign Up for Individual - NEW
function QuickSignUp({
  portal,
  onNext,
  progress,
}: {
  portal: string;
  onNext: () => void;
  progress: number;
}) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleContinue = () => {
    if (!phone.match(/^[0-9]{10}$/)) {
      alert('Vui lòng nhập đúng số điện thoại 10 số!');
      return;
    }
    // Simulate OTP sending
    setShowOtp(true);
    alert(`Mã OTP 6 số đã được gửi đến ${phone}`);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      alert('Mã OTP phải có 6 số!');
      return;
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bắt đầu hành trình Sống Xanh của bạn
          </h2>
        </div>

        {!showOtp ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
            {/* Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhập số điện thoại di động
              </label>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="0912345678"
                className="w-full px-4 py-4 text-xl text-center border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                maxLength={10}
              />
            </div>

            {/* Social Login */}
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3 text-center">Hoặc đăng nhập bằng:</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-google-fill text-2xl text-red-500"></i>
                </button>
                <button
                  type="button"
                  className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-apple-fill text-2xl text-gray-900"></i>
                </button>
                <button
                  type="button"
                  className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-chat-3-fill text-2xl text-blue-500"></i>
                </button>
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-500 text-center">
              Bằng việc tiếp tục, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật dữ liệu của VITA.
            </p>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={phone.length !== 10}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tiếp tục
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-message-3-line text-emerald-600 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nhập mã OTP</h3>
              <p className="text-gray-600 text-sm">
                Chúng tôi đã gửi mã xác thực 6 số đến <span className="font-semibold">{phone}</span>
              </p>
            </div>

            {/* OTP Input */}
            <div>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-4 py-4 text-2xl text-center tracking-widest border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none font-mono"
                maxLength={6}
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Xác thực
            </button>

            <button
              onClick={() => setShowOtp(false)}
              className="w-full py-2 text-emerald-600 text-sm font-medium hover:underline"
            >
              Gửi lại mã OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Step 6B: Representative Sign Up for Organization - NEW
function RepresentativeSignUp({
  portal,
  onNext,
  progress,
}: {
  portal: string;
  onNext: () => void;
  progress: number;
}) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo mode: Accept simple credentials
    const isDemoMode = email === '1@gmail.com' && phone === '1' && password === '1' && confirmPassword === '1';
    
    if (isDemoMode) {
      // Skip validation for demo mode
      onNext();
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (!email.includes('@')) {
      alert('Vui lòng nhập đúng địa chỉ email doanh nghiệp!');
      return;
    }
    // Simulate email verification sending
    alert(`Email xác thực đã được gửi đến ${email}. Vui lòng kiểm tra email để kích hoạt tài khoản.`);
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Thiết lập Tài khoản Quản trị Doanh nghiệp
          </h2>
        </div>

        {/* Demo Info Banner */}
        <div className="mb-6 bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Chế độ Demo - Xem nhanh</p>
              <p className="text-xs text-blue-700">
                Để xem demo nhanh, nhập: <strong>Email: 1@gmail.com</strong>, <strong>Số điện thoại: 1</strong>, <strong>Mật khẩu: 1</strong>, <strong>Xác nhận mật khẩu: 1</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Doanh nghiệp <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com hoặc 1@gmail.com (demo)"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-amber-600">
              <i className="ri-information-line mr-1"></i>
              Email này sẽ được dùng để nhận các thông báo pháp lý, hóa đơn và hợp đồng điện tử.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Số điện thoại người liên hệ <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="0912345678"
              required
              maxLength={10}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={password === '1' ? 1 : 8}
              pattern={password === '1' ? undefined : "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              {password === '1' ? 'Demo mode: Mật khẩu đơn giản được chấp nhận' : 'Tối thiểu 8 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt'}
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Xác nhận Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            Gửi Email Xác thực
          </button>
        </form>
      </div>
    </div>
  );
}

// Step 7A: eKYC for Individual - NEW
function EKYC({ onNext, progress }: { onNext: () => void; progress: number }) {
  const [step, setStep] = useState<'front' | 'back' | 'selfie'>('front');
  const [captured, setCaptured] = useState({ front: false, back: false, selfie: false });

  const handleCapture = (type: 'front' | 'back' | 'selfie') => {
    setCaptured(prev => ({ ...prev, [type]: true }));
    if (type === 'front') {
      setStep('back');
    } else if (type === 'back') {
      setStep('selfie');
    } else {
      alert('Xác minh danh tính thành công!');
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Xác minh danh tính Công dân Số VITA</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            {step === 'front' && <p className="text-sm text-blue-800"><i className="ri-information-line mr-2"></i>Vui lòng đưa mặt trước CCCD vào khung hình.</p>}
            {step === 'back' && <p className="text-sm text-blue-800"><i className="ri-information-line mr-2"></i>Vui lòng đưa mặt sau CCCD vào khung hình.</p>}
            {step === 'selfie' && <p className="text-sm text-blue-800"><i className="ri-information-line mr-2"></i>Quay mặt sang trái, phải, mỉm cười để xác thực.</p>}
          </div>
          <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-[16/10] border-4 border-dashed border-gray-300">
            <div className="absolute inset-0 flex items-center justify-center">
              {!captured[step] ? (
                <div className="text-center">
                  <i className={`${step === 'selfie' ? 'ri-user-line' : 'ri-camera-line'} text-6xl text-gray-400 mb-4`}></i>
                  <p className="text-gray-600">{step === 'selfie' ? 'Xác thực khuôn mặt' : `Đưa mặt ${step === 'front' ? 'trước' : 'sau'} CCCD vào khung`}</p>
                </div>
              ) : (
                <div className="text-center">
                  <i className="ri-checkbox-circle-fill text-6xl text-green-500 mb-4"></i>
                  <p className="text-green-600 font-semibold">Đã chụp thành công!</p>
                </div>
              )}
            </div>
          </div>
          {!captured[step] && (
            <button onClick={() => handleCapture(step)} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all">
              <i className="ri-camera-line mr-2"></i>Chụp ảnh
            </button>
          )}
          {step === 'front' && (
            <button onClick={() => confirm('Bỏ qua xác minh? Bạn sẽ bị giới hạn một số tính năng.') && onNext()} className="w-full py-2 text-gray-600 text-sm font-medium hover:underline">
              Để sau
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 7B: Legal Entity Verification for Organization - NEW
function LegalEntityVerification({ onNext, progress }: { onNext: () => void; progress: number }) {
  const [taxId, setTaxId] = useState('');
  const [companyInfo, setCompanyInfo] = useState<{ name: string; address: string; representative: string } | null>(null);
  const [documents, setDocuments] = useState({ gpkd: false, authorization: false });

  const handleCheckTaxId = () => {
    setCompanyInfo({ name: 'CÔNG TY TNHH VÍ DỤ', address: '123 Đường ABC, Quận XYZ, TP. HCM', representative: 'Nguyễn Văn A' });
    alert('Đã tìm thấy thông tin doanh nghiệp!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="max-w-2xl mx-auto pt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Hồ sơ Pháp lý Tổ chức</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nhập Mã số thuế (Tax ID) <span className="text-red-500">*</span></label>
            <div className="flex gap-3">
              <input type="text" value={taxId} onChange={(e) => setTaxId(e.target.value.replace(/\D/g, ''))} placeholder="0123456789" className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none" />
              <button onClick={handleCheckTaxId} disabled={taxId.length < 10} className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">Kiểm tra</button>
            </div>
            {companyInfo && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Thông tin doanh nghiệp:</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-medium">Tên công ty:</span> {companyInfo.name}</p>
                  <p><span className="font-medium">Địa chỉ:</span> {companyInfo.address}</p>
                  <p><span className="font-medium">Người đại diện:</span> {companyInfo.representative}</p>
                </div>
              </div>
            )}
          </div>
          {companyInfo && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-gray-900 mb-4">Tải tài liệu</h3>
              <div onClick={() => setDocuments(prev => ({ ...prev, gpkd: true }))} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${documents.gpkd ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-emerald-500 hover:bg-emerald-50'}`}>
                {documents.gpkd ? <div><i className="ri-file-check-line text-4xl text-green-600 mb-2"></i><p className="text-green-700 font-semibold">Đã tải lên</p></div> : <div><i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2"></i><p className="text-gray-600">Kéo thả file Giấy phép Đăng ký Kinh doanh</p></div>}
              </div>
            </div>
          )}
          <button onClick={() => { if (!companyInfo || !documents.gpkd) { alert('Vui lòng hoàn tất các bước!'); return; } alert('Hồ sơ đã được gửi xét duyệt!'); onNext(); }} disabled={!companyInfo || !documents.gpkd} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            Gửi Hồ sơ Xét duyệt
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 8: Security Setup - NEW
function SecuritySetup({ onNext, progress }: { onNext: () => void; progress: number }) {
  const [useBiometric, setUseBiometric] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin !== confirmPin || pin.length !== 6) {
      alert('Mã PIN phải có 6 số và khớp nhau!');
      return;
    }
    alert('Thiết lập bảo mật thành công!');
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Thiết lập Bảo mật</h2>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={useBiometric} onChange={(e) => setUseBiometric(e.target.checked)} className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Sử dụng FaceID/TouchID</p>
                <p className="text-sm text-gray-600 mt-1">Xác thực giao dịch bằng sinh trắc học</p>
              </div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Thiết lập mã PIN 6 số <span className="text-red-500">*</span></label>
            <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" required maxLength={6} className="w-full px-4 py-4 text-2xl text-center tracking-widest border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none font-mono" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mã PIN <span className="text-red-500">*</span></label>
            <input type="password" inputMode="numeric" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" required maxLength={6} className="w-full px-4 py-4 text-2xl text-center tracking-widest border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none font-mono" />
          </div>
          <button type="submit" className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all">
            Hoàn tất
          </button>
        </form>
      </div>
    </div>
  );
}

// Step 9: Interactive Tour - NEW
function InteractiveTour({ portal, onNext, progress }: { portal: string; onNext: () => void; progress: number }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [skipped, setSkipped] = useState(false);

  const getTourSteps = (portalType: string) => {
    switch (portalType) {
      case 'farmer':
        return [{ title: 'Nút Nhật ký', description: 'Bác bấm vào đây để ghi công việc hôm nay nhé.', cta: 'Ghi công việc' }, { title: 'Chọn công việc', description: 'Ví dụ hôm nay bác tưới nước cho cây Sâm.', cta: 'Chọn "Tưới nước"' }, { title: 'Xác nhận & Nhận tiền', description: 'Tuyệt vời! Công việc đã được ghi nhận.', cta: 'Hoàn thành' }];
      case 'investor-small':
      case 'investor-large':
        return [{ title: 'Khám phá Chợ Dự án', description: 'Đây là nơi niêm yết các vùng trồng dược liệu đang cần nguồn vốn.', cta: 'Xem dự án' }, { title: 'Mắt thần Giám sát', description: 'Xem trực tiếp cây trồng qua Camera 24/7.', cta: 'Xem Camera' }, { title: 'Dự tính Lợi nhuận', description: 'Tính ước tính lợi nhuận sau 1 chu kỳ thu hoạch.', cta: 'Tính ROI' }];
      case 'creator':
        return [{ title: 'Kho hàng', description: 'Hàng nghìn sản phẩm đang chờ bạn bán.', cta: 'Xem sản phẩm' }, { title: 'Lấy mẫu & Link', description: 'Nhận mẫu về quay review hoặc lấy Link cho TikTok.', cta: 'Lấy Link' }, { title: 'Bảng hoa hồng', description: 'Tiền hoa hồng sẽ cập nhật vào đây.', cta: 'Xem thu nhập' }];
      case 'hospital':
        return [{ title: 'Bệnh viện Đối tác', description: 'Quản lý danh sách bệnh viện đối tác và hợp tác nghiên cứu.', cta: 'Xem đối tác' }, { title: 'Dự án Nghiên cứu', description: 'Theo dõi tiến độ các dự án nghiên cứu lâm sàng.', cta: 'Xem dự án' }, { title: 'Case Lâm sàng', description: 'Xem các case lâm sàng nổi bật và kết quả điều trị.', cta: 'Xem cases' }];
      default:
        return [{ title: 'Chào mừng', description: 'Hãy khám phá các tính năng của portal này.', cta: 'Bắt đầu' }];
    }
  };

  const steps = getTourSteps(portal);

  if (skipped) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4 sm:px-6 relative">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-20">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30"></div>
      <div className="relative z-40 max-w-md mx-auto pt-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">Bước {currentStep + 1}/{steps.length}</span>
            <button onClick={() => setSkipped(true)} className="text-sm text-gray-600 hover:text-gray-900 underline">Bỏ qua hướng dẫn</button>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-information-line text-white text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{steps[currentStep].title}</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">{steps[currentStep].description}</p>
          </div>
          <div className="flex gap-3">
            {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep - 1)} className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">Quay lại</button>}
            <button onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(currentStep + 1); } else { alert('Chúc mừng! Bạn đã nhận được 50 VITA Points!'); onNext(); } }} className={`${currentStep === 0 ? 'w-full' : 'flex-1'} py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all`}>
              {currentStep < steps.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}