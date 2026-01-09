import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

export default function ResearchLabPage() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<'overview' | 'genebank' | 'sop' | 'experiment' | 'diagnosis' | 'qaqc'>('overview');

  // Mock data - Gene Bank
  const geneProfiles = [
    {
      id: 'GEN-001',
      species: 'Cà Gai Leo',
      scientificName: 'Solanum procumbens',
      origin: 'Lạng Sơn',
      dnaSequenced: true,
      activeCompounds: ['Solamargine', 'Solasonine'],
      yieldPotential: 'Cao',
      diseaseResistance: 92,
      samples: 156,
      lastUpdate: '15/11/2024'
    },
    {
      id: 'GEN-002',
      species: 'Hoàng Tinh',
      scientificName: 'Polygonatum sibiricum',
      origin: 'Cao Bằng',
      dnaSequenced: true,
      activeCompounds: ['Polysaccharides', 'Saponins'],
      yieldPotential: 'Trung bình',
      diseaseResistance: 85,
      samples: 203,
      lastUpdate: '12/11/2024'
    },
    {
      id: 'GEN-003',
      species: 'Bạch Truật',
      scientificName: 'Atractylodes macrocephala',
      origin: 'Hà Giang',
      dnaSequenced: false,
      activeCompounds: ['Atractylon', 'Atractylenolide'],
      yieldPotential: 'Cao',
      diseaseResistance: 78,
      samples: 89,
      lastUpdate: '10/11/2024'
    }
  ];

  // Mock data - SOP Templates
  const sopTemplates = [
    {
      id: 'SOP-001',
      title: 'Quy trình canh tác Cà Gai Leo chuẩn VietGAP',
      version: 'v2.3',
      status: 'published',
      stages: 8,
      lastModified: '14/11/2024',
      author: 'TS. Nguyễn Văn Khoa',
      deployedTo: 45,
      compliance: 87
    },
    {
      id: 'SOP-002',
      title: 'Quy trình thu hoạch và sơ chế Hoàng Tinh',
      version: 'v1.8',
      status: 'published',
      stages: 6,
      lastModified: '10/11/2024',
      author: 'PGS. Trần Thị Lan',
      deployedTo: 32,
      compliance: 92
    },
    {
      id: 'SOP-003',
      title: 'Quy trình phòng trừ sâu bệnh hữu cơ',
      version: 'v1.0-draft',
      status: 'draft',
      stages: 5,
      lastModified: '13/11/2024',
      author: 'ThS. Lê Văn Minh',
      deployedTo: 0,
      compliance: 0
    }
  ];

  // Mock data - Experiments
  const experiments = [
    {
      id: 'EXP-2024-001',
      title: 'So sánh hiệu quả 3 loại phân bón hữu cơ',
      crop: 'Cà Gai Leo',
      location: 'Khu vực A - Xã Tân Lập',
      startDate: '01/09/2024',
      duration: '120 ngày',
      status: 'in-progress',
      progress: 65,
      plots: 3,
      dataPoints: 245
    },
    {
      id: 'EXP-2024-002',
      title: 'Thử nghiệm giống Hoàng Tinh lai mới',
      crop: 'Hoàng Tinh',
      location: 'Khu vực B - Xã Minh Tân',
      startDate: '15/08/2024',
      duration: '180 ngày',
      status: 'in-progress',
      progress: 82,
      plots: 5,
      dataPoints: 412
    },
    {
      id: 'EXP-2024-003',
      title: 'Đánh giá khả năng chống chịu hạn',
      crop: 'Bạch Truật',
      location: 'Khu vực C - Xã Hòa Bình',
      startDate: '20/10/2024',
      duration: '90 ngày',
      status: 'completed',
      progress: 100,
      plots: 4,
      dataPoints: 189
    }
  ];

  // Mock data - Diagnosis Cases
  const diagnosisCases = [
    {
      id: 'CASE-001',
      title: 'Lá vàng, héo rũ trên Quýt Vân Sơn',
      crop: 'Quýt Vân Sơn',
      farmer: 'Nguyễn Văn A',
      location: 'Khu vực A1',
      severity: 'high',
      status: 'diagnosed',
      aiDiagnosis: 'Bệnh đốm lá nấm (85% confidence)',
      expertDiagnosis: 'Xác nhận: Bệnh đốm lá Cercospora',
      treatment: 'Đã cấp phác đồ',
      photos: 8,
      submittedDate: '14/11/2024 08:30',
      diagnosedDate: '14/11/2024 10:15'
    },
    {
      id: 'CASE-002',
      title: 'Cây phát triển chậm, lá nhỏ',
      crop: 'Cà Gai Leo',
      farmer: 'Trần Thị B',
      location: 'Khu vực B2',
      severity: 'medium',
      status: 'pending',
      aiDiagnosis: 'Thiếu dinh dưỡng Nitơ (72% confidence)',
      expertDiagnosis: null,
      treatment: null,
      photos: 5,
      submittedDate: '13/11/2024 14:20',
      diagnosedDate: null
    }
  ];

  // Mock data - QA/QC Batches
  const qaBatches = [
    {
      id: 'BATCH-2024-045',
      product: 'Cà Gai Leo khô',
      quantity: 500,
      unit: 'kg',
      supplier: 'HTX Dược Liệu Lạng Sơn',
      testDate: '14/11/2024',
      status: 'passed',
      activeCompound: 95.2,
      pesticide: 'Đạt',
      heavyMetal: 'Đạt',
      microbiology: 'Đạt',
      certificateIssued: true
    },
    {
      id: 'BATCH-2024-046',
      product: 'Hoàng Tinh tươi',
      quantity: 800,
      unit: 'kg',
      supplier: 'HTX Dược Liệu Cao Bằng',
      testDate: '13/11/2024',
      status: 'testing',
      activeCompound: null,
      pesticide: 'Đang test',
      heavyMetal: 'Đang test',
      microbiology: 'Đang test',
      certificateIssued: false
    },
    {
      id: 'BATCH-2024-044',
      product: 'Bạch Truật khô',
      quantity: 350,
      unit: 'kg',
      supplier: 'HTX Dược Liệu Hà Giang',
      testDate: '12/11/2024',
      status: 'failed',
      activeCompound: 68.5,
      pesticide: 'Đạt',
      heavyMetal: 'Không đạt',
      microbiology: 'Đạt',
      certificateIssued: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Đã ban hành</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap">Bản nháp</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">Đang tiến hành</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Hoàn thành</span>;
      case 'diagnosed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Đã chẩn đoán</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full whitespace-nowrap">Chờ xử lý</span>;
      case 'passed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Đạt chuẩn</span>;
      case 'testing':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">Đang kiểm tra</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">Không đạt</span>;
      default:
        return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'high':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">Nghiêm trọng</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full whitespace-nowrap">Trung bình</span>;
      case 'low':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">Nhẹ</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-gray-700 text-lg"></i>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Trung Tâm Gen & Khoa Học</h1>
                <p className="text-sm text-gray-500">R&D Center - Data-Driven Research</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PortalSwitcher />
              <div className="px-3 py-1.5 bg-green-100 rounded-lg">
                <span className="text-sm font-medium text-green-700">Lab Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Module Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
            <button
              onClick={() => setActiveModule('overview')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'overview'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-dashboard-line block mb-1 text-lg"></i>
              Tổng quan
            </button>
            <button
              onClick={() => setActiveModule('genebank')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'genebank'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-dna-line block mb-1 text-lg"></i>
              Ngân hàng Gen
            </button>
            <button
              onClick={() => setActiveModule('sop')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'sop'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-file-list-3-line block mb-1 text-lg"></i>
              Quy trình SOP
            </button>
            <button
              onClick={() => setActiveModule('experiment')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'experiment'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-flask-line block mb-1 text-lg"></i>
              Thực nghiệm
            </button>
            <button
              onClick={() => setActiveModule('diagnosis')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'diagnosis'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-stethoscope-line block mb-1 text-lg"></i>
              Chẩn đoán
            </button>
            <button
              onClick={() => setActiveModule('qaqc')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'qaqc'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-shield-check-line block mb-1 text-lg"></i>
              QA/QC
            </button>
          </div>
        </div>

        {/* Module: Overview */}
        {activeModule === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                  <i className="ri-dna-line text-2xl text-indigo-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">156</div>
                <div className="text-sm text-gray-500">Mẫu gen lưu trữ</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <i className="ri-file-list-3-line text-2xl text-blue-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-500">SOP đã ban hành</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <i className="ri-flask-line text-2xl text-purple-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">8</div>
                <div className="text-sm text-gray-500">Thí nghiệm đang chạy</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <i className="ri-shield-check-line text-2xl text-green-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">98.5%</div>
                <div className="text-sm text-gray-500">Tỷ lệ đạt chuẩn</div>
              </div>
            </div>

            {/* Bio-Index Map */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Bản đồ Chỉ số Sinh học (Bio-Index Map)</h3>
              <div className="relative h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=agricultural%20field%20heat%20map%20showing%20crop%20health%20index%20with%20color%20gradient%20from%20green%20to%20yellow%20to%20red%2C%20satellite%20imagery%2C%20topographic%20view%2C%20scientific%20data%20visualization%2C%20bio-index%20monitoring&width=1200&height=400&seq=bio-index-map-001&orientation=landscape"
                  alt="Bio-Index Map"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-3">
                  <div className="text-xs font-semibold text-gray-700 mb-2">Chỉ số sức khỏe</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-500"></div>
                      <span className="text-xs text-gray-600">Tốt (90-100)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-yellow-500"></div>
                      <span className="text-xs text-gray-600">TB (70-89)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-orange-500"></div>
                      <span className="text-xs text-gray-600">Yếu (50-69)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-red-500"></div>
                      <span className="text-xs text-gray-600">Kém (&lt;50)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Cảnh báo Dị thường</h3>
              <div className="space-y-3">
                <div className="border-2 border-red-200 bg-red-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="ri-alert-line text-red-600 text-lg"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">Tốc độ sinh trưởng bất thường</h4>
                      <p className="text-xs text-gray-600 mb-2">Lô A1 - Cà Gai Leo phát triển nhanh hơn 35% so với chuẩn. Nghi ngờ sử dụng chất kích thích.</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <i className="ri-map-pin-line"></i>
                        <span>Khu vực A1 - Xã Tân Lập</span>
                        <span>•</span>
                        <span>14/11/2024 09:30</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap">
                      Kiểm tra
                    </button>
                  </div>
                </div>

                <div className="border-2 border-amber-200 bg-amber-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <i className="ri-error-warning-line text-amber-600 text-lg"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">Sâu bệnh lan rộng</h4>
                      <p className="text-xs text-gray-600 mb-2">3 nông hộ trong cùng khu vực báo cáo triệu chứng tương tự trong 24h. Cần điều tra dịch bệnh.</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <i className="ri-map-pin-line"></i>
                        <span>Khu vực B - Xã Minh Tân</span>
                        <span>•</span>
                        <span>13/11/2024 16:45</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700 transition-colors cursor-pointer whitespace-nowrap">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module: Gene Bank */}
        {activeModule === 'genebank' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Ngân Hàng Gen & Giống</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Thêm hồ sơ gen
                </button>
              </div>

              <div className="space-y-4">
                {geneProfiles.map((gene) => (
                  <div key={gene.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-indigo-600">{gene.id}</span>
                          {gene.dnaSequenced && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                              <i className="ri-check-line mr-1"></i>
                              DNA Sequenced
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-gray-800 text-base mb-1">{gene.species}</h4>
                        <p className="text-sm text-gray-600 italic mb-2">{gene.scientificName}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Nguồn gốc</div>
                        <div className="font-semibold text-blue-600 text-sm">{gene.origin}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Năng suất</div>
                        <div className="font-semibold text-purple-600 text-sm">{gene.yieldPotential}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Kháng bệnh</div>
                        <div className="font-semibold text-green-600 text-sm">{gene.diseaseResistance}%</div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Mẫu lưu trữ</div>
                        <div className="font-semibold text-amber-600 text-sm">{gene.samples}</div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-3 mb-3">
                      <div className="text-xs text-gray-600 mb-1">Hoạt chất chính</div>
                      <div className="flex flex-wrap gap-2">
                        {gene.activeCompounds.map((compound, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white text-indigo-700 text-xs font-medium rounded-full border border-indigo-200">
                            {compound}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Cập nhật: {gene.lastUpdate}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-eye-line mr-1"></i>
                        Xem DNA
                      </button>
                      <button className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-qr-code-line mr-1"></i>
                        Cấp mã
                      </button>
                      <button className="bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-edit-line mr-1"></i>
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Module: SOP Management */}
        {activeModule === 'sop' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Quản lý Quy trình Chuẩn (SOP)</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Soạn SOP mới
                </button>
              </div>

              <div className="space-y-4">
                {sopTemplates.map((sop) => (
                  <div key={sop.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-indigo-600">{sop.id}</span>
                          {getStatusBadge(sop.status)}
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap">
                            {sop.version}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-base mb-2">{sop.title}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Số giai đoạn</div>
                        <div className="font-semibold text-blue-600 text-sm">{sop.stages} bước</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Tác giả</div>
                        <div className="font-semibold text-purple-600 text-sm">{sop.author}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Đã triển khai</div>
                        <div className="font-semibold text-green-600 text-sm">{sop.deployedTo} nông hộ</div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Tuân thủ TB</div>
                        <div className="font-semibold text-amber-600 text-sm">{sop.compliance}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Cập nhật: {sop.lastModified}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-edit-line mr-1"></i>
                        Chỉnh sửa
                      </button>
                      {sop.status === 'draft' && (
                        <button className="bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-send-plane-fill mr-1"></i>
                          Ban hành
                        </button>
                      )}
                      {sop.status === 'published' && (
                        <button className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-bar-chart-line mr-1"></i>
                          Thống kê
                        </button>
                      )}
                      <button className="bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-file-copy-line mr-1"></i>
                        Sao chép
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SOP Editor Preview */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-file-edit-line text-3xl"></i>
                <div>
                  <h3 className="font-bold text-lg">Trình soạn thảo SOP</h3>
                  <p className="text-sm opacity-90">Công cụ chuyên biệt để tạo quy trình canh tác chuẩn</p>
                </div>
              </div>
              <ul className="text-sm space-y-1 opacity-90 mb-4">
                <li>• Chia giai đoạn theo thời gian (0-3 tháng, 3-6 tháng...)</li>
                <li>• Định lượng phân bón, thuốc BVTV chi tiết</li>
                <li>• Quản lý phiên bản (Version Control)</li>
                <li>• Tự động đồng bộ xuống App nông dân</li>
              </ul>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-add-line mr-2"></i>
                Bắt đầu soạn thảo
              </button>
            </div>
          </div>
        )}

        {/* Module: Experiments */}
        {activeModule === 'experiment' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Theo Dõi Thực Nghiệm</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Tạo thí nghiệm
                </button>
              </div>

              <div className="space-y-4">
                {experiments.map((exp) => (
                  <div key={exp.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-indigo-600">{exp.id}</span>
                          {getStatusBadge(exp.status)}
                        </div>
                        <h4 className="font-bold text-gray-800 text-base mb-2">{exp.title}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Cây trồng</div>
                        <div className="font-semibold text-blue-600 text-sm">{exp.crop}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Số lô thí nghiệm</div>
                        <div className="font-semibold text-purple-600 text-sm">{exp.plots} lô</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Thời gian</div>
                        <div className="font-semibold text-green-600 text-sm">{exp.duration}</div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Dữ liệu thu thập</div>
                        <div className="font-semibold text-amber-600 text-sm">{exp.dataPoints} điểm</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Tiến độ</span>
                        <span className="font-semibold">{exp.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${exp.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <i className="ri-map-pin-line"></i>
                      <span>{exp.location}</span>
                      <span>•</span>
                      <span>Bắt đầu: {exp.startDate}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-line-chart-line mr-1"></i>
                        Dữ liệu
                      </button>
                      <button className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-camera-line mr-1"></i>
                        Hình ảnh
                      </button>
                      <button className="bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-file-text-line mr-1"></i>
                        Báo cáo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Module: Diagnosis */}
        {activeModule === 'diagnosis' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Bác Sĩ Cây Trồng (Plant Doctor)</h3>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                    {diagnosisCases.filter(c => c.status === 'pending').length} ca chờ xử lý
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {diagnosisCases.map((case_) => (
                  <div key={case_.id} className={`border-2 rounded-xl p-4 ${
                    case_.severity === 'high' ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-indigo-600">{case_.id}</span>
                          {getSeverityBadge(case_.severity)}
                          {getStatusBadge(case_.status)}
                        </div>
                        <h4 className="font-bold text-gray-800 text-base mb-2">{case_.title}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-xs text-gray-600">Cây trồng</div>
                        <div className="font-semibold text-blue-600 text-sm">{case_.crop}</div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-xs text-gray-600">Nông dân</div>
                        <div className="font-semibold text-purple-600 text-sm">{case_.farmer}</div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-xs text-gray-600">Vị trí</div>
                        <div className="font-semibold text-green-600 text-sm">{case_.location}</div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-xs text-gray-600">Hình ảnh</div>
                        <div className="font-semibold text-amber-600 text-sm">{case_.photos} ảnh</div>
                      </div>
                    </div>

                    {/* AI Diagnosis */}
                    <div className="bg-blue-50 rounded-lg p-3 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-robot-line text-blue-600"></i>
                        <span className="text-xs font-semibold text-gray-700">Chẩn đoán AI</span>
                      </div>
                      <p className="text-sm text-gray-800">{case_.aiDiagnosis}</p>
                    </div>

                    {/* Expert Diagnosis */}
                    {case_.expertDiagnosis && (
                      <div className="bg-green-50 rounded-lg p-3 mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="ri-user-star-line text-green-600"></i>
                          <span className="text-xs font-semibold text-gray-700">Chẩn đoán Chuyên gia</span>
                        </div>
                        <p className="text-sm text-gray-800 mb-2">{case_.expertDiagnosis}</p>
                        {case_.treatment && (
                          <div className="flex items-center gap-2 text-xs text-green-700">
                            <i className="ri-check-line"></i>
                            <span>{case_.treatment}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Gửi: {case_.submittedDate}</span>
                      {case_.diagnosedDate && <span>Chẩn đoán: {case_.diagnosedDate}</span>}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-image-line mr-1"></i>
                        Xem ảnh
                      </button>
                      {case_.status === 'pending' && (
                        <button className="bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-stethoscope-line mr-1"></i>
                          Chẩn đoán
                        </button>
                      )}
                      {case_.status === 'diagnosed' && (
                        <button className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-file-text-line mr-1"></i>
                          Phác đồ
                        </button>
                      )}
                      <button className="bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-message-3-line mr-1"></i>
                        Nhắn tin
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Info */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-robot-line text-3xl"></i>
                <div>
                  <h3 className="font-bold text-lg">AI Plant Doctor</h3>
                  <p className="text-sm opacity-90">Hệ thống chẩn đoán bệnh cây trồng tự động</p>
                </div>
              </div>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• So sánh hình ảnh với 500+ bệnh trong kho dữ liệu</li>
                <li>• Độ chính xác 85-95% với các bệnh phổ biến</li>
                <li>• Gợi ý phác đồ điều trị ban đầu</li>
                <li>• Chuyên gia xác nhận và điều chỉnh</li>
              </ul>
            </div>
          </div>
        )}

        {/* Module: QA/QC */}
        {activeModule === 'qaqc' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Kiểm Định Chất Lượng (QA/QC)</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Nhập kết quả test
                </button>
              </div>

              <div className="space-y-4">
                {qaBatches.map((batch) => (
                  <div key={batch.id} className={`border-2 rounded-xl p-4 ${
                    batch.status === 'failed' ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-indigo-600">{batch.id}</span>
                          {getStatusBadge(batch.status)}
                        </div>
                        <h4 className="font-bold text-gray-800 text-base mb-1">{batch.product}</h4>
                        <p className="text-sm text-gray-600">{batch.supplier}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Số lượng</div>
                        <div className="font-semibold text-blue-600 text-sm">{batch.quantity} {batch.unit}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Ngày test</div>
                        <div className="font-semibold text-purple-600 text-sm">{batch.testDate}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Hoạt chất</div>
                        <div className="font-semibold text-green-600 text-sm">
                          {batch.activeCompound ? `${batch.activeCompound}%` : 'Đang test'}
                        </div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600">Chứng chỉ</div>
                        <div className="font-semibold text-amber-600 text-sm">
                          {batch.certificateIssued ? 'Đã cấp' : 'Chưa cấp'}
                        </div>
                      </div>
                    </div>

                    {/* Test Results */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className={`rounded-lg p-2 text-center ${
                        batch.pesticide === 'Đạt' ? 'bg-green-100' : 
                        batch.pesticide === 'Không đạt' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <div className="text-xs text-gray-600 mb-1">Dư lượng thuốc</div>
                        <div className={`font-semibold text-sm ${
                          batch.pesticide === 'Đạt' ? 'text-green-700' : 
                          batch.pesticide === 'Không đạt' ? 'text-red-700' : 'text-gray-700'
                        }`}>
                          {batch.pesticide}
                        </div>
                      </div>
                      <div className={`rounded-lg p-2 text-center ${
                        batch.heavyMetal === 'Đạt' ? 'bg-green-100' : 
                        batch.heavyMetal === 'Không đạt' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <div className="text-xs text-gray-600 mb-1">Kim loại nặng</div>
                        <div className={`font-semibold text-sm ${
                          batch.heavyMetal === 'Đạt' ? 'text-green-700' : 
                          batch.heavyMetal === 'Không đạt' ? 'text-red-700' : 'text-gray-700'
                        }`}>
                          {batch.heavyMetal}
                        </div>
                      </div>
                      <div className={`rounded-lg p-2 text-center ${
                        batch.microbiology === 'Đạt' ? 'bg-green-100' : 
                        batch.microbiology === 'Không đạt' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <div className="text-xs text-gray-600 mb-1">Vi sinh vật</div>
                        <div className={`font-semibold text-sm ${
                          batch.microbiology === 'Đạt' ? 'text-green-700' : 
                          batch.microbiology === 'Không đạt' ? 'text-red-700' : 'text-gray-700'
                        }`}>
                          {batch.microbiology}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-file-text-line mr-1"></i>
                        Chi tiết
                      </button>
                      {batch.status === 'passed' && !batch.certificateIssued && (
                        <button className="bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-award-line mr-1"></i>
                          Cấp COA
                        </button>
                      )}
                      {batch.certificateIssued && (
                        <button className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-download-line mr-1"></i>
                          Tải COA
                        </button>
                      )}
                      {batch.status === 'failed' && (
                        <button className="bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-close-circle-line mr-1"></i>
                          Hủy lô
                        </button>
                      )}
                      <button className="bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-printer-line mr-1"></i>
                        In nhãn
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QA Standards */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-shield-check-line text-3xl"></i>
                <div>
                  <h3 className="font-bold text-lg">Tiêu Chuẩn VITA</h3>
                  <p className="text-sm opacity-90">Chuẩn chất lượng dược liệu hữu cơ</p>
                </div>
              </div>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Hàm lượng hoạt chất: ≥ 90% so với dược điển</li>
                <li>• Dư lượng thuốc BVTV: &lt; 0.01 ppm</li>
                <li>• Kim loại nặng: Pb &lt; 5ppm, As &lt; 2ppm, Cd &lt; 0.3ppm</li>
                <li>• Vi sinh vật: E.coli âm tính, Tổng vi khuẩn &lt; 10^5 CFU/g</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
