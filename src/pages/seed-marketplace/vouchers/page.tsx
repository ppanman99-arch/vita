import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackButton from '../../../components/shared/BackButton';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

interface Voucher {
  id: string;
  code: string;
  packageId: string;
  packageName: string;
  value: number; // VNĐ
  seedType: string;
  htxId?: string;
  htxName?: string;
  status: 'pending' | 'allocated' | 'used' | 'expired';
  allocatedDate?: string;
  usedDate?: string;
  orderId?: string;
}

export default function SeedVouchersPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([]);
  const [allocateHTX, setAllocateHTX] = useState('');

  // Mock data
  useEffect(() => {
    const mockVouchers: Voucher[] = [
      {
        id: 'v1',
        code: 'VCH-2026-001-001',
        packageId: 'VCH-2026-001',
        packageName: 'Hỗ trợ Mùa vụ 2026 - Gáo Vàng',
        value: 10000000, // 10 triệu
        seedType: 'Gáo Vàng (Mega 3P)',
        htxId: 'htx-001',
        htxName: 'HTX Tu Mơ Rông - Kon Tum',
        status: 'used',
        allocatedDate: '05/01/2026',
        usedDate: '12/01/2026',
        orderId: 'ORD-SEED-2026-001',
      },
      {
        id: 'v2',
        code: 'VCH-2026-001-002',
        packageId: 'VCH-2026-001',
        packageName: 'Hỗ trợ Mùa vụ 2026 - Gáo Vàng',
        value: 10000000,
        seedType: 'Gáo Vàng (Mega 3P)',
        htxId: 'htx-002',
        htxName: 'HTX Ngọc Linh - Kon Tum',
        status: 'allocated',
        allocatedDate: '10/01/2026',
      },
      {
        id: 'v3',
        code: 'VCH-2026-001-003',
        packageId: 'VCH-2026-001',
        packageName: 'Hỗ trợ Mùa vụ 2026 - Gáo Vàng',
        value: 10000000,
        seedType: 'Gáo Vàng (Mega 3P)',
        status: 'pending',
      },
    ];
    setVouchers(mockVouchers.filter(v => !packageId || v.packageId === packageId));
  }, [packageId]);

  const filteredVouchers = vouchers.filter(v => 
    filterStatus === 'all' || v.status === filterStatus
  );

  const handleAllocate = () => {
    if (!allocateHTX || selectedVouchers.length === 0) {
      alert('Vui lòng chọn HTX và ít nhất một voucher');
      return;
    }
    
    const htxName = allocateHTX === 'htx-001' ? 'HTX Tu Mơ Rông - Kon Tum' :
                    allocateHTX === 'htx-002' ? 'HTX Ngọc Linh - Kon Tum' :
                    'HTX Đã chọn';
    
    setVouchers(prev => prev.map(v => 
      selectedVouchers.includes(v.id)
        ? { ...v, status: 'allocated' as const, htxId: allocateHTX, htxName, allocatedDate: new Date().toLocaleDateString('vi-VN') }
        : v
    ));
    
    alert(`Đã phân bổ ${selectedVouchers.length} voucher cho ${htxName}`);
    setShowAllocateModal(false);
    setSelectedVouchers([]);
    setAllocateHTX('');
  };

  const getStatusBadge = (status: Voucher['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Chờ phân bổ</span>;
      case 'allocated':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Đã phân bổ</span>;
      case 'used':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Đã sử dụng</span>;
      case 'expired':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Hết hạn</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Quản lý Voucher Giống</h1>
                <p className="text-green-100 text-sm">
                  Phân bổ và theo dõi voucher giống cho các HTX
                </p>
              </div>
            </div>
            <PortalSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ phân bổ</option>
                <option value="allocated">Đã phân bổ</option>
                <option value="used">Đã sử dụng</option>
                <option value="expired">Hết hạn</option>
              </select>
            </div>
            <button
              onClick={() => setShowAllocateModal(true)}
              disabled={selectedVouchers.length === 0}
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
            >
              <i className="ri-user-add-line mr-2"></i>
              Phân bổ ({selectedVouchers.length})
            </button>
          </div>
        </div>

        {/* Vouchers List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedVouchers(filteredVouchers.filter(v => v.status === 'pending').map(v => v.id));
                        } else {
                          setSelectedVouchers([]);
                        }
                      }}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mã Voucher</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Gói hỗ trợ</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Giá trị</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">HTX nhận</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày phân bổ</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Đơn hàng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVouchers.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedVouchers.includes(voucher.id)}
                        onChange={(e) => {
                          if (e.target.checked && voucher.status === 'pending') {
                            setSelectedVouchers([...selectedVouchers, voucher.id]);
                          } else {
                            setSelectedVouchers(selectedVouchers.filter(id => id !== voucher.id));
                          }
                        }}
                        disabled={voucher.status !== 'pending'}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500 disabled:opacity-50"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-mono font-semibold text-gray-900">{voucher.code}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-700">{voucher.packageName}</div>
                      <div className="text-xs text-gray-500">{voucher.seedType}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-green-600">{(voucher.value / 1000000).toFixed(0)} triệu VNĐ</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-700">{voucher.htxName || '-'}</div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(voucher.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">{voucher.allocatedDate || '-'}</div>
                    </td>
                    <td className="px-4 py-3">
                      {voucher.orderId ? (
                        <button
                          onClick={() => navigate(`/seed-marketplace/order-detail/${voucher.orderId}`)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {voucher.orderId}
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredVouchers.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <i className="ri-coupon-line text-5xl mb-4"></i>
              <p>Không có voucher nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Allocate Modal */}
      {showAllocateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Phân bổ Voucher cho HTX</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn HTX <span className="text-red-500">*</span>
                </label>
                <select
                  value={allocateHTX}
                  onChange={(e) => setAllocateHTX(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Chọn HTX</option>
                  <option value="htx-001">HTX Tu Mơ Rông - Kon Tum</option>
                  <option value="htx-002">HTX Ngọc Linh - Kon Tum</option>
                  <option value="htx-003">HTX Dược liệu Sapa - Lào Cai</option>
                  <option value="htx-004">HTX Đăk Na - Kon Tum</option>
                </select>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  Bạn đang phân bổ <strong>{selectedVouchers.length} voucher</strong> với tổng giá trị{' '}
                  <strong>{((selectedVouchers.length * 10000000) / 1000000).toFixed(0)} triệu VNĐ</strong>
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  HTX sẽ nhận thông báo và có thể sử dụng voucher trên Seed Marketplace
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAllocateModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAllocate}
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  Xác nhận Phân bổ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





