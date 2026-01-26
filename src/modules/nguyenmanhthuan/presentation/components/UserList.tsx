
import { useState, useEffect } from 'react';
import { UserService } from '../../application/UserService';

interface User {
  [key: string]: any;
}

export default function UserList() {
  const userService = new UserService();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(''); // Input riêng, không tự động search
  const [activeSearch, setActiveSearch] = useState(''); // Search term đang active
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDoanhSo, setTotalDoanhSo] = useState(0);
  const [totalGreen, setTotalGreen] = useState(0);
  const [totalTongGopVND, setTotalTongGopVND] = useState(0);
  const [totalTongGopGREEN, setTotalTongGopGREEN] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false); // Đang ở chế độ search hay không

  const fetchUsers = async (searchTerm: string = '', isTopSearch: boolean = false) => {
    setLoading(true);
    try {
      const data = await userService.getUsers({
        page,
        limit: 50,
        search: searchTerm || undefined,
        top: isTopSearch || undefined,
      });

      if (data.success) {
        setUsers(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        if (data.totals) {
          setTotalDoanhSo(data.totals.doanhSo);
          setTotalGreen(data.totals.green);
          setTotalTongGopVND(data.totals.tongGopVND || 0);
          setTotalTongGopGREEN(data.totals.tongGopGREEN || 0);
        }
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      setError('Không thể tải danh sách users');
    } finally {
      setLoading(false);
    }
  };

  // Load dữ liệu ban đầu khi component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Load dữ liệu khi đổi trang (chỉ khi không ở chế độ search)
  useEffect(() => {
    if (!isSearchMode && page > 1) {
      fetchUsers();
    }
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      // Nếu search rỗng, quay về chế độ bình thường
      setIsSearchMode(false);
      setActiveSearch('');
      setPage(1);
      fetchUsers();
      return;
    }

    // Bật chế độ search và tìm top 5
    setIsSearchMode(true);
    setActiveSearch(searchInput.trim());
    setPage(1);
    fetchUsers(searchInput.trim(), true);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearch('');
    setIsSearchMode(false);
    setPage(1);
    fetchUsers();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <i className="ri-loader-4-line text-4xl text-emerald-600 animate-spin mb-4"></i>
            <p className="text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <i className="ri-error-warning-fill text-2xl text-red-600"></i>
            <div>
              <h3 className="font-bold text-red-800">Lỗi</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <i className="ri-database-2-line text-6xl text-gray-400 mb-4"></i>
          <p className="text-gray-600 text-lg">Không có dữ liệu user</p>
        </div>
      </div>
    );
  }

  // Lấy tất cả các keys từ user đầu tiên để tạo header
  const columns = users.length > 0 ? Object.keys(users[0]) : [];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách Người dùng</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <p className="text-gray-600">Tổng số: <strong>{total}</strong> users</p>
          <span className="text-gray-400">|</span>
          <p className="text-gray-600">
            Tổng Doanh số: <strong className="text-emerald-600">{totalDoanhSo.toLocaleString('vi-VN')} VNĐ</strong>
          </p>
          <span className="text-gray-400">|</span>
          <p className="text-gray-600">
            Tổng Green: <strong className="text-green-600">{totalGreen.toLocaleString('vi-VN')}</strong>
          </p>
          <span className="text-gray-400">|</span>
          <p className="text-gray-600">
            Tổng góp: <strong className="text-blue-600">{totalTongGopVND.toLocaleString('vi-VN')} VNĐ</strong> / <strong className="text-green-600">{totalTongGopGREEN.toLocaleString('vi-VN')} GREEN</strong>
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Tìm kiếm user (nhập và bấm nút tìm kiếm)..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
            {isSearchMode && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            <i className="ri-search-line mr-2"></i>
            Tìm kiếm
          </button>
        </div>
        {isSearchMode && (
          <div className="mt-2 text-sm text-gray-600">
            <i className="ri-information-line mr-1"></i>
            Đang hiển thị <strong>5 kết quả</strong> gần đúng nhất cho: <strong>"{activeSearch}"</strong>
          </div>
        )}
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <tr>
                {columns.map((column) => {
                  // Bỏ qua cột _matchScore trong header
                  if (column === '_matchScore') return null;
                  return (
                    <th
                      key={column}
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                    >
                      {column}
                    </th>
                  );
                })}
                {/* Thêm cột Tỷ lệ khớp khi ở chế độ search */}
                {isSearchMode && (
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    Tỷ lệ khớp
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {columns.map((column) => {
                    // Bỏ qua cột _matchScore trong hiển thị
                    if (column === '_matchScore') return null;
                    return (
                      <td
                        key={column}
                        className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100"
                      >
                        {String(user[column] || '-')}
                      </td>
                    );
                  })}
                  {/* Hiển thị điểm khớp nếu có */}
                  {isSearchMode && user._matchScore !== undefined && (
                    <td className="px-4 py-3 text-sm border-b border-gray-100">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        {Math.round(user._matchScore)}% khớp
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination - chỉ hiển thị khi không ở chế độ search */}
      {!isSearchMode && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Trang {page} / {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Trước
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
