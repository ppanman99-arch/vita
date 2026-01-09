import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

interface GeneProfile {
  id: string;
  name: string;
  scientificName: string;
  origin: string;
  dnaProfile: string;
  characteristics: string[];
  suitableRegions: string[];
  certifications: string[];
  status: 'approved' | 'pending' | 'rejected';
}

interface NurseryBatch {
  id: string;
  geneId: string;
  geneName: string;
  quantity: number;
  age: string; // Tuổi cây con
  location: string;
  price: number; // VNĐ/cây
  available: number;
  qrCode: string;
  createdAt: string;
  qualityGrade: 'A' | 'B' | 'C';
}

interface Order {
  id: string;
  htxName: string;
  batchId: string;
  quantity: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: string;
  expectedDelivery: string;
}

export default function GeneNurseryHubPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'inventory' | 'gene-library' | 'orders' | 'quality-control'>('inventory');
  const [selectedGene, setSelectedGene] = useState<GeneProfile | null>(null);
  const [showGeneModal, setShowGeneModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);

  // Mock data - Gene Profiles
  const geneProfiles: GeneProfile[] = [
    {
      id: 'gene-001',
      name: 'Sâm Ngọc Linh - Dòng Kon Tum',
      scientificName: 'Panax vietnamensis',
      origin: 'Kon Tum, Việt Nam',
      dnaProfile: 'DNA-2025-KT-001',
      characteristics: ['Hàm lượng Saponin cao (12-15%)', 'Kháng bệnh tốt', 'Thích nghi độ cao 1,500-2,000m'],
      suitableRegions: ['Kon Tum', 'Gia Lai', 'Quảng Nam'],
      certifications: ['GACP', 'VietGAP', 'Organic'],
      status: 'approved',
    },
    {
      id: 'gene-002',
      name: 'Đương Quy - Dòng Sapa',
      scientificName: 'Angelica sinensis',
      origin: 'Sapa, Lào Cai',
      dnaProfile: 'DNA-2025-SP-002',
      characteristics: ['Hàm lượng Ligustilide cao (0.8-1.2%)', 'Chịu lạnh tốt', 'Thích nghi độ cao 1,200-1,800m'],
      suitableRegions: ['Lào Cai', 'Yên Bái', 'Hà Giang'],
      certifications: ['GACP', 'VietGAP'],
      status: 'approved',
    },
  ];

  // Mock data - Nursery Batches
  const [nurseryBatches, setNurseryBatches] = useState<NurseryBatch[]>([
    {
      id: 'batch-001',
      geneId: 'gene-001',
      geneName: 'Sâm Ngọc Linh - Dòng Kon Tum',
      quantity: 10000,
      age: '6 tháng',
      location: 'Vườn ươm Kon Tum',
      price: 50000,
      available: 7500,
      qrCode: 'QR-BATCH-2025-001',
      createdAt: '2025-01-15',
      qualityGrade: 'A',
    },
    {
      id: 'batch-002',
      geneId: 'gene-002',
      geneName: 'Đương Quy - Dòng Sapa',
      quantity: 15000,
      age: '4 tháng',
      location: 'Vườn ươm Sapa',
      price: 30000,
      available: 12000,
      qrCode: 'QR-BATCH-2025-002',
      createdAt: '2025-01-10',
      qualityGrade: 'A',
    },
  ]);

  // Mock data - Orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'order-001',
      htxName: 'HTX Tu Mơ Rông',
      batchId: 'batch-001',
      quantity: 2000,
      status: 'confirmed',
      orderDate: '2025-01-18',
      expectedDelivery: '2025-01-25',
    },
    {
      id: 'order-002',
      htxName: 'HTX Dược liệu Gia Lai',
      batchId: 'batch-002',
      quantity: 5000,
      status: 'shipped',
      orderDate: '2025-01-15',
      expectedDelivery: '2025-01-22',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getQualityColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-700 border-green-300';
      case 'B': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'C': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <BackButton />
            <div className="flex items-center gap-3">
              <PortalSwitcher />
              <button
                onClick={() => navigate('/expert-marketplace')}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
              >
                <i className="ri-user-star-line mr-2"></i>
                Expert Hub
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <i className="ri-plant-line text-2xl text-white"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VITA Gene & Nursery Hub</h1>
                <p className="text-sm text-gray-600">Quản lý Gen & Vườn ươm - "Giấy khai sinh" cho cây giống</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/seed-marketplace')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <i className="ri-store-line"></i>
              Xem Seed Marketplace
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'inventory', name: 'Kho Giống', icon: 'ri-archive-line' },
              { id: 'gene-library', name: 'Thư viện Gen', icon: 'ri-dna-line' },
              { id: 'orders', name: 'Đơn hàng', icon: 'ri-shopping-cart-line' },
              { id: 'quality-control', name: 'Kiểm soát Chất lượng', icon: 'ri-shield-check-line' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={`${tab.icon} mr-1`}></i>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tab: Inventory */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 text-xl">Kho Giống (Nursery Inventory)</h3>
                <button
                  onClick={() => setShowBatchModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <i className="ri-add-line mr-2"></i>
                  Tạo Lô Mới
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nurseryBatches.map(batch => (
                  <div key={batch.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{batch.geneName}</h4>
                        <p className="text-xs text-gray-600">Lô: {batch.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getQualityColor(batch.qualityGrade)}`}>
                        Hạng {batch.qualityGrade}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tổng số lượng:</span>
                        <span className="font-semibold text-gray-900">{batch.quantity.toLocaleString()} cây</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Còn lại:</span>
                        <span className="font-semibold text-green-600">{batch.available.toLocaleString()} cây</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tuổi cây:</span>
                        <span className="font-semibold text-gray-900">{batch.age}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Giá:</span>
                        <span className="font-bold text-green-600">{(batch.price / 1000).toFixed(0)}k VNĐ/cây</span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3 mb-4 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-qr-code-line text-green-600"></i>
                        <span className="text-xs font-semibold text-gray-700">Mã QR Batch ID:</span>
                      </div>
                      <p className="text-xs font-mono text-gray-900">{batch.qrCode}</p>
                      <p className="text-xs text-gray-600 mt-2">
                        <i className="ri-information-line mr-1"></i>
                        Mã này đi theo cây suốt đời - "Giấy khai sinh" số
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        <i className="ri-eye-line mr-2"></i>
                        Xem chi tiết
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        <i className="ri-qr-code-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Gene Library */}
        {activeTab === 'gene-library' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 text-xl">Thư viện Gen (Gene Library)</h3>
                <button
                  onClick={() => setShowGeneModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <i className="ri-add-line mr-2"></i>
                  Đăng ký Gen Mới
                </button>
              </div>

              <div className="space-y-4">
                {geneProfiles.map(gene => (
                  <div key={gene.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{gene.name}</h4>
                        <p className="text-sm text-gray-600 italic">{gene.scientificName}</p>
                        <p className="text-xs text-gray-500 mt-1">Nguồn gốc: {gene.origin}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(gene.status)}`}>
                        {gene.status === 'approved' ? 'Đã phê duyệt' : gene.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                      </span>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 mb-4 border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-dna-line text-blue-600"></i>
                        <span className="font-semibold text-gray-900">DNA Profile:</span>
                        <span className="font-mono text-sm text-gray-700">{gene.dnaProfile}</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Mã định danh gen duy nhất. Được kiểm định bởi Hội đồng Khoa học VITA.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-700 text-sm mb-2">Đặc điểm</h5>
                        <ul className="space-y-1 text-sm">
                          {gene.characteristics.map((char, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <i className="ri-checkbox-circle-line text-green-600 mt-0.5"></i>
                              <span className="text-gray-700">{char}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-700 text-sm mb-2">Vùng thích hợp</h5>
                        <div className="flex flex-wrap gap-2">
                          {gene.suitableRegions.map((region, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      {gene.certifications.map((cert, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
                      <p className="text-sm text-gray-700">
                        <strong>Quy trình phê duyệt:</strong> Gen mới phải được Hội đồng Khoa học (từ Expert Hub) đánh giá và phê duyệt trước khi niêm yết.
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        <i className="ri-eye-line mr-2"></i>
                        Xem chi tiết DNA
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        <i className="ri-edit-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 text-xl mb-6">Đơn hàng (Orders)</h3>

              <div className="space-y-4">
                {orders.map(order => {
                  const batch = nurseryBatches.find(b => b.id === order.batchId);
                  return (
                    <div key={order.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-1">Đơn #{order.id}</h4>
                          <p className="text-sm text-gray-600">HTX: {order.htxName}</p>
                          {batch && (
                            <p className="text-xs text-gray-500 mt-1">Giống: {batch.geneName}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status === 'pending' ? 'Chờ xác nhận' :
                           order.status === 'confirmed' ? 'Đã xác nhận' :
                           order.status === 'shipped' ? 'Đang giao' : 'Đã giao'}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Số lượng:</span>
                            <p className="font-semibold text-gray-900">{order.quantity.toLocaleString()} cây</p>
                          </div>
                          {batch && (
                            <div>
                              <span className="text-gray-600">Tổng giá trị:</span>
                              <p className="font-semibold text-green-600">
                                {(order.quantity * batch.price / 1000000).toFixed(1)} triệu VNĐ
                              </p>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Đặt ngày:</span>
                            <p className="font-semibold text-gray-900">{order.orderDate}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Dự kiến giao:</span>
                            <p className="font-semibold text-gray-900">{order.expectedDelivery}</p>
                          </div>
                        </div>
                      </div>

                      {order.status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                            <i className="ri-check-line mr-2"></i>
                            Xác nhận
                          </button>
                          <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                            <i className="ri-close-line mr-2"></i>
                            Từ chối
                          </button>
                        </div>
                      )}

                      {order.status === 'shipped' && (
                        <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-200">
                          <p className="text-sm text-gray-700">
                            <i className="ri-truck-line text-blue-600 mr-2"></i>
                            Đang vận chuyển. Mã vận đơn: <strong>VD-{order.id}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Quality Control */}
        {activeTab === 'quality-control' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 text-xl mb-6">Kiểm soát Chất lượng</h3>

              {/* Traceability */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-qr-code-line text-green-600"></i>
                  Truy xuất Nguồn gốc (Traceability)
                </h4>
                <p className="text-sm text-gray-700 mb-4">
                  Khi HTX gặp vấn đề về năng suất thấp, Chuyên gia (Expert Hub) có thể quét mã lô cây để truy ngược về Trung tâm Gen xem nguồn gốc gen có chuẩn không.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <i className="ri-qr-code-line text-6xl text-gray-400"></i>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-2">Quét mã QR Batch ID</h5>
                      <p className="text-sm text-gray-600 mb-3">Xem thông tin:</p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <i className="ri-checkbox-circle-line text-green-600"></i>
                          Nguồn gốc gen (DNA Profile)
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="ri-checkbox-circle-line text-green-600"></i>
                          Vườn ươm, ngày xuất bán
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="ri-checkbox-circle-line text-green-600"></i>
                          Kết quả kiểm nghiệm chất lượng
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="ri-checkbox-circle-line text-green-600"></i>
                          Lịch sử vận chuyển
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Standards */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-shield-check-line text-blue-600"></i>
                  Tiêu chuẩn Chất lượng
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Hạng A', criteria: 'Cây khỏe, không bệnh, đúng giống', color: 'green' },
                    { name: 'Hạng B', criteria: 'Cây khỏe, có thể có khuyết tật nhỏ', color: 'yellow' },
                    { name: 'Hạng C', criteria: 'Cây yếu, cần chăm sóc đặc biệt', color: 'orange' },
                  ].map((grade, idx) => (
                    <div key={idx} className={`bg-white rounded-lg p-4 border-2 border-${grade.color}-200`}>
                      <h5 className={`font-semibold text-${grade.color}-700 mb-2`}>{grade.name}</h5>
                      <p className="text-sm text-gray-700">{grade.criteria}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <i className="ri-information-line text-2xl"></i>
            Mối Liên kết với Expert Hub
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">1. Kiểm định Gen</h4>
              <p className="opacity-90">
                Gen mới muốn niêm yết phải được Hội đồng Khoa học (từ Expert Hub) đánh giá và phê duyệt.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Truy xuất Nguồn gốc</h4>
              <p className="opacity-90">
                Chuyên gia có thể quét mã QR để truy ngược về nguồn gốc gen khi HTX gặp vấn đề.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

