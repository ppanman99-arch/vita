import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VitalityMonitor from './components/VitalityMonitor';
import ValuationSimulator from './components/ValuationSimulator';
import ValuationRoadmap from './components/ValuationRoadmap';
import CapTableManagement from './components/CapTableManagement';
import DigitalLegalDocs from './components/DigitalLegalDocs';
import QAChannel from './components/QAChannel';
import RevenueModel from './components/RevenueModel';
import InvestorTopBar from './components/InvestorTopBar';

export default function InvestorPortalPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'vitality' | 'revenue' | 'simulator' | 'roadmap' | 'captable' | 'legal' | 'qa'>('vitality');
  const [investorName, setInvestorName] = useState('');

  useEffect(() => {
    // TEMPORARY: Disabled security features for testing
    // TODO: Re-enable authentication and security features after testing
    
    // Get investor name from session or use default
    const email = sessionStorage.getItem('investor_email');
    if (email) {
      setInvestorName(email.split('@')[0]);
    } else {
      setInvestorName('Nhà đầu tư');
    }

    // REMOVED: Authentication check - redirect to login
    // REMOVED: Watermark
    // REMOVED: Screenshot blocking
    
    // Original code (commented out for testing):
    /*
    try {
      // Kiểm tra authentication
      const isAuthenticated = sessionStorage.getItem('investor_authenticated');
      const email = sessionStorage.getItem('investor_email');
      
      if (!isAuthenticated || !email) {
        navigate('/investor-portal/login');
        return;
      }

      setIsLoading(false);
      setInvestorName(email.split('@')[0]);
      
      // Thêm watermark vào body
      if (document.body) {
        const watermark = document.createElement('div');
        watermark.id = 'investor-watermark';
        watermark.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 48px;
          color: rgba(16, 185, 129, 0.1);
          font-weight: bold;
          pointer-events: none;
          z-index: 9999;
          user-select: none;
          white-space: nowrap;
        `;
        watermark.textContent = `CONFIDENTIAL - ${email.toUpperCase()}`;
        document.body.appendChild(watermark);
      }

      // Chống chụp màn hình (basic)
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
          e.preventDefault();
          alert('Chụp màn hình bị vô hiệu hóa trong khu vực bảo mật');
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        const wm = document.getElementById('investor-watermark');
        if (wm) wm.remove();
        document.removeEventListener('keydown', handleKeyDown);
      };
    } catch (error) {
      console.error('Error in InvestorPortalPage useEffect:', error);
      setIsLoading(false);
    }
    */
  }, [navigate]);

  const tabs = [
    { id: 'vitality', name: 'Sức sống', icon: 'ri-pulse-line' },
    { id: 'revenue', name: 'Cơ cấu Doanh thu', icon: 'ri-money-dollar-circle-line' },
    { id: 'simulator', name: 'Giả lập Định giá', icon: 'ri-calculator-line' },
    { id: 'roadmap', name: 'Lộ trình IPO', icon: 'ri-roadmap-line' },
    { id: 'captable', name: 'Cổ đông', icon: 'ri-group-line' },
    { id: 'legal', name: 'Hồ sơ Pháp lý', icon: 'ri-file-text-line' },
    { id: 'qa', name: 'Hỏi đáp', icon: 'ri-question-answer-line' },
  ];

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <InvestorTopBar investorName={investorName} />
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm mb-6 p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
            {activeTab === 'vitality' && <VitalityMonitor />}
            {activeTab === 'revenue' && <RevenueModel />}
            {activeTab === 'simulator' && <ValuationSimulator />}
            {activeTab === 'roadmap' && <ValuationRoadmap />}
            {activeTab === 'captable' && <CapTableManagement />}
            {activeTab === 'legal' && <DigitalLegalDocs />}
            {activeTab === 'qa' && <QAChannel />}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering InvestorPortalPage:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi</h1>
          <p className="text-gray-600 mb-4">Vui lòng làm mới trang hoặc liên hệ hỗ trợ.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Làm mới trang
          </button>
        </div>
      </div>
    );
  }
}

