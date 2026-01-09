import { useState } from 'react';

export default function DigitalLegalDocs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const documents = [
    {
      id: 1,
      category: 'corporate',
      name: 'Giấy phép Kinh doanh',
      description: 'Giấy phép đăng ký kinh doanh số 0101234567',
      date: '2023-01-15',
      size: '2.5 MB',
      type: 'PDF',
      status: 'active',
    },
    {
      id: 2,
      category: 'corporate',
      name: 'Điều lệ Công ty',
      description: 'Điều lệ công ty TNHH GreenLight Platform',
      date: '2023-01-20',
      size: '1.8 MB',
      type: 'PDF',
      status: 'active',
    },
    {
      id: 3,
      category: 'audit',
      name: 'Báo cáo Kiểm toán 2023',
      description: 'Báo cáo tài chính đã được kiểm toán bởi PwC',
      date: '2024-03-31',
      size: '5.2 MB',
      type: 'PDF',
      status: 'active',
    },
    {
      id: 4,
      category: 'contracts',
      name: 'Hợp đồng mẫu với HTX',
      description: 'Mẫu hợp đồng hợp tác với Hợp tác xã',
      date: '2023-06-10',
      size: '1.2 MB',
      type: 'PDF',
      status: 'active',
    },
    {
      id: 5,
      category: 'contracts',
      name: 'Hợp đồng mẫu với Doanh nghiệp B2B',
      description: 'Mẫu hợp đồng bao tiêu với doanh nghiệp dược phẩm',
      date: '2023-06-15',
      size: '1.5 MB',
      type: 'PDF',
      status: 'active',
    },
    {
      id: 6,
      category: 'legal',
      name: 'Giấy phép Hoạt động Nền tảng',
      description: 'Giấy phép vận hành nền tảng số từ Bộ TT&TT',
      date: '2023-02-28',
      size: '3.1 MB',
      type: 'PDF',
      status: 'active',
    },
    {
      id: 7,
      category: 'legal',
      name: 'Chứng nhận Bảo mật Thông tin',
      description: 'ISO 27001 - Quản lý An ninh Thông tin',
      date: '2023-09-15',
      size: '2.8 MB',
      type: 'PDF',
      status: 'active',
    },
    {
      id: 8,
      category: 'financial',
      name: 'Báo cáo Tài chính Q1 2024',
      description: 'Báo cáo tài chính quý 1 năm 2024',
      date: '2024-04-30',
      size: '4.5 MB',
      type: 'PDF',
      status: 'active',
    },
  ];

  const categories = [
    { id: 'all', name: 'Tất cả', icon: 'ri-folder-line' },
    { id: 'corporate', name: 'Pháp lý Doanh nghiệp', icon: 'ri-building-line' },
    { id: 'audit', name: 'Kiểm toán', icon: 'ri-file-check-line' },
    { id: 'contracts', name: 'Hợp đồng Mẫu', icon: 'ri-file-list-3-line' },
    { id: 'legal', name: 'Giấy phép', icon: 'ri-shield-check-line' },
    { id: 'financial', name: 'Tài chính', icon: 'ri-money-dollar-circle-line' },
  ];

  const filteredDocs = selectedCategory === 'all'
    ? documents
    : documents.filter(doc => doc.category === selectedCategory);

  const handleDownload = (doc: any) => {
    // Demo: Tạo file PDF giả
    alert(`Đang tải xuống: ${doc.name}\n\n(Lưu ý: Đây là demo, file thực tế sẽ được tải từ server)`);
  };

  const handleView = (doc: any) => {
    // Demo: Mở viewer
    alert(`Đang mở: ${doc.name}\n\n(Lưu ý: Đây là demo, viewer thực tế sẽ được tích hợp)`);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <i className="ri-file-text-line mr-2 text-emerald-600"></i>
          Hồ sơ Pháp lý Số - Digital Legal Documents
        </h2>
        <p className="text-gray-600">
          Tất cả tài liệu pháp lý quan trọng được số hóa và lưu trữ an toàn
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className={category.icon}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-pdf-line text-red-600 text-2xl"></i>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                doc.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {doc.status === 'active' ? 'Hoạt động' : 'Lưu trữ'}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{doc.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{doc.description}</p>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <i className="ri-calendar-line"></i>
                <span>{new Date(doc.date).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-file-line"></i>
                <span>{doc.size}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleView(doc)}
                className="flex-1 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-all text-sm font-medium"
              >
                <i className="ri-eye-line mr-2"></i>
                Xem
              </button>
              <button
                onClick={() => handleDownload(doc)}
                className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-medium"
              >
                <i className="ri-download-line mr-2"></i>
                Tải
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <i className="ri-shield-check-line text-emerald-600 text-2xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Bảo mật & Quyền riêng tư</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                <span>Tất cả tài liệu được mã hóa và lưu trữ an toàn</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                <span>Chỉ nhà đầu tư đã ký NDA mới có quyền truy cập</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                <span>Mọi hoạt động tải/xem tài liệu đều được ghi log</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                <span>Tài liệu có watermark với thông tin nhà đầu tư để chống rò rỉ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

