

export default function DoubleBenefit() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 sm:px-6 py-2 rounded-full font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
            <i className="ri-gift-line mr-2"></i>
            Ưu đãi Đặc biệt
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Quyền lợi "Kép" Chưa từng có
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Vừa sở hữu Tài sản tăng trưởng, vừa giữ nguyên Đặc quyền tiêu dùng
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-green-500 hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 sm:p-8 text-white">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <i className="ri-stock-line text-4xl sm:text-5xl"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Quyền lợi 1</h3>
              <div className="text-green-100 text-base sm:text-lg">Tài sản Tăng trưởng</div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600 text-sm sm:text-base">Tiền tài trợ cũ của bạn</div>
              </div>
              <div className="flex items-center justify-center mb-6">
                <i className="ri-arrow-down-line text-3xl sm:text-4xl text-green-500"></i>
              </div>
              <div className="bg-green-50 rounded-2xl p-4 sm:p-6 mb-6">
                <div className="text-xl sm:text-2xl font-bold text-green-700 mb-2">
                  = Cổ phần GreenLight
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Tăng trưởng theo định giá công ty
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-green-600 text-lg sm:text-xl mt-1 shrink-0"></i>
                  <span className="text-gray-700 text-sm sm:text-base">Nhận cổ tức hàng năm</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-green-600 text-lg sm:text-xl mt-1 shrink-0"></i>
                  <span className="text-gray-700 text-sm sm:text-base">Quyền biểu quyết tại Đại hội cổ đông</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-green-600 text-lg sm:text-xl mt-1 shrink-0"></i>
                  <span className="text-gray-700 text-sm sm:text-base">Lợi nhuận khi IPO/M&A</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-green-600 text-lg sm:text-xl mt-1 shrink-0"></i>
                  <span className="text-gray-700 text-sm sm:text-base">Chuyển nhượng được</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-500 hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-6 sm:p-8 text-white">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <i className="ri-vip-crown-line text-4xl sm:text-5xl"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Quyền lợi 2</h3>
              <div className="text-yellow-100 text-base sm:text-lg">Đặc quyền Trọn đời</div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <div className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-2">100%</div>
                <div className="text-gray-600 text-sm sm:text-base">Điểm Green cũ của bạn</div>
              </div>
              <div className="flex items-center justify-center mb-6">
                <i className="ri-arrow-down-line text-3xl sm:text-4xl text-yellow-500"></i>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6 mb-6">
                <div className="text-xl sm:text-2xl font-bold text-yellow-700 mb-2">
                  = Điểm Loyalty
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Giảm giá 10-90% trọn đời
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-yellow-600 text-lg sm:text-xl mt-1 shrink-0"></i>
                  <span className="text-gray-700 text-sm sm:text-base">Mua sản phẩm VITA giá ưu đãi</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-yellow-600 text-lg sm:text-xl mt-1 shrink-0"></i>
                  <span className="text-gray-700 text-sm sm:text-base">Ưu tiên sản phẩm mới</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-yellow-600 text-lg sm:text-xl mt-1 shrink-0"></i>
                  <span className="text-gray-700 text-sm sm:text-base">Tích điểm khi giới thiệu</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-yellow-600 text-lg sm:text-xl mt-1 shrink-0"></i>
                  <span className="text-gray-700 text-sm sm:text-base">Không giới hạn thời gian</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <i className="ri-lightbulb-flash-line text-4xl sm:text-5xl lg:text-6xl text-yellow-400 mb-4 sm:mb-6"></i>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Tại sao chúng tôi làm điều này?
            </h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 px-4">
              Vì chúng tôi tin rằng những người đã tin tưởng và đồng hành từ những ngày đầu tiên xứng đáng được hưởng thành quả lớn nhất. Đây không chỉ là lời cảm ơn, mà là cam kết chia sẻ thành công dài hạn.
            </p>
            <div className="inline-block bg-yellow-400 text-gray-900 px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base">
              Giá trị tài trợ của bạn × 2 = Cổ phần + Điểm Loyalty
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
