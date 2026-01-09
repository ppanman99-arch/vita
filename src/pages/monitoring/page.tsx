import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MonitoringReport {
  id: string;
  farmerName: string;
  lotName: string;
  taskType: string;
  timestamp: string;
  aiVerification: {
    status: 'valid' | 'warning' | 'invalid';
    message: string;
    confidence: number;
  };
  crossCheck: {
    forestOwner: 'confirmed' | 'pending' | 'rejected';
    satellite: 'match' | 'mismatch' | 'pending';
  };
  expertSOS?: {
    issue: string;
    expert: string;
    status: 'open' | 'diagnosed' | 'resolved';
  };
}

export default function MonitoringPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ai' | 'cross' | 'expert' | 'overview'>('overview');
  const [reports, setReports] = useState<MonitoringReport[]>([
    {
      id: 'RPT-001',
      farmerName: 'Ông A',
      lotName: 'Lô 5',
      taskType: 'Trồng cây',
      timestamp: new Date().toISOString(),
      aiVerification: {
        status: 'valid',
        message: 'Ảnh hợp lệ (Có cây, đúng tọa độ)',
        confidence: 95
      },
      crossCheck: {
        forestOwner: 'confirmed',
        satellite: 'match'
      }
    },
    {
      id: 'RPT-002',
      farmerName: 'Bà B',
      lotName: 'Lô 7',
      taskType: 'Bón phân',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      aiVerification: {
        status: 'warning',
        message: 'Cảnh báo: Ảnh mờ, không rõ việc bón phân',
        confidence: 65
      },
      crossCheck: {
        forestOwner: 'pending',
        satellite: 'pending'
      }
    },
    {
      id: 'RPT-003',
      farmerName: 'Anh C',
      lotName: 'Lô 10',
      taskType: 'SOS - Cây bị bệnh',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      aiVerification: {
        status: 'invalid',
        message: 'Phát hiện dấu hiệu bệnh trên lá',
        confidence: 88
      },
      crossCheck: {
        forestOwner: 'confirmed',
        satellite: 'match'
      },
      expertSOS: {
        issue: 'Lá cây bị vàng, có đốm nâu',
        expert: 'TS. Nguyễn Văn D',
        status: 'diagnosed'
      }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
      case 'confirmed':
      case 'match':
        return 'bg-emerald-100 text-emerald-700';
      case 'warning':
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'invalid':
      case 'rejected':
      case 'mismatch':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin-dashboard')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Giám Sát Đa Tầng</h1>
            <p className="text-sm opacity-90">AI Verification • Cross-Check • Expert SOS</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            AI Verification
          </button>
          <button
            onClick={() => setActiveTab('cross')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'cross'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Cross-Check
          </button>
          <button
            onClick={() => setActiveTab('expert')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'expert'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Expert SOS
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                    <i className="ri-brain-line text-2xl text-purple-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">AI Verification</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports.filter(r => r.aiVerification.status === 'valid').length}/{reports.length}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Hợp lệ</span>
                    <span className="font-semibold text-emerald-600">
                      {reports.filter(r => r.aiVerification.status === 'valid').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Cảnh báo</span>
                    <span className="font-semibold text-amber-600">
                      {reports.filter(r => r.aiVerification.status === 'warning').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                    <i className="ri-check-double-line text-2xl text-blue-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cross-Check</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports.filter(r => r.crossCheck.forestOwner === 'confirmed' && r.crossCheck.satellite === 'match').length}/{reports.length}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Đã xác nhận</span>
                    <span className="font-semibold text-emerald-600">
                      {reports.filter(r => r.crossCheck.forestOwner === 'confirmed').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Chờ xử lý</span>
                    <span className="font-semibold text-amber-600">
                      {reports.filter(r => r.crossCheck.forestOwner === 'pending').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <i className="ri-alarm-warning-line text-2xl text-red-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expert SOS</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {reports.filter(r => r.expertSOS).length}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Yêu cầu hỗ trợ chuyên gia</p>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Báo cáo gần đây</h3>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {report.farmerName} - {report.lotName}
                        </h4>
                        <p className="text-sm text-gray-600">{report.taskType}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(report.timestamp).toLocaleString('vi-VN')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.aiVerification.status)}`}>
                        {report.aiVerification.status === 'valid' ? 'Hợp lệ' :
                         report.aiVerification.status === 'warning' ? 'Cảnh báo' : 'Không hợp lệ'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">AI Verification</p>
                        <p className="font-medium text-gray-900">{report.aiVerification.message}</p>
                        <p className="text-xs text-gray-500">Độ tin cậy: {report.aiVerification.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Chủ rừng</p>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(report.crossCheck.forestOwner)}`}>
                          {report.crossCheck.forestOwner === 'confirmed' ? 'Đã xác nhận' :
                           report.crossCheck.forestOwner === 'pending' ? 'Chờ xác nhận' : 'Từ chối'}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Vệ tinh</p>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(report.crossCheck.satellite)}`}>
                          {report.crossCheck.satellite === 'match' ? 'Khớp' :
                           report.crossCheck.satellite === 'mismatch' ? 'Không khớp' : 'Chờ cập nhật'}
                        </span>
                      </div>
                    </div>

                    {report.expertSOS && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="ri-alarm-warning-line text-red-600"></i>
                          <span className="font-semibold text-red-900">Yêu cầu hỗ trợ chuyên gia</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{report.expertSOS.issue}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-600">Chuyên gia: {report.expertSOS.expert}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            report.expertSOS.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                            report.expertSOS.status === 'diagnosed' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {report.expertSOS.status === 'resolved' ? 'Đã xử lý' :
                             report.expertSOS.status === 'diagnosed' ? 'Đã chẩn đoán' : 'Đang xử lý'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs can be implemented similarly */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-600">Chi tiết theo từng lớp giám sát sẽ được hiển thị ở đây</p>
          </div>
        )}
      </div>
    </div>
  );
}




