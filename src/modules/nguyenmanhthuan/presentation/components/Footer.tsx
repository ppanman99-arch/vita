

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <img 
              src="https://public.readdy.ai/ai/img_res/175944c8-efd8-45b7-8a21-36cb100b66fb.png" 
              alt="GreenLight Logo" 
              className="h-12 sm:h-16 w-auto mb-4"
            />
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Hệ sinh thái VITA - Nền tảng công nghệ cho Nông nghiệp & Dược liệu Việt Nam
            </p>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base">
                  Hệ sinh thái VITA
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base">
                  Tin tức
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base">
                  Hướng dẫn đăng nhập
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="ri-map-pin-line text-lg sm:text-xl text-green-500 mt-1 shrink-0"></i>
                <span className="text-gray-400 text-sm sm:text-base">
                  HTX Rừng Dược Sinh Mường Nguyên<br />Vân Sơn, Phú Thọ
                </span>
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-mail-line text-lg sm:text-xl text-green-500 shrink-0"></i>
                <span className="text-gray-400 text-sm sm:text-base">support@greenlight.vn</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-phone-line text-lg sm:text-xl text-green-500 shrink-0"></i>
                <span className="text-gray-400 text-sm sm:text-base">1900 xxxx</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-xs sm:text-sm text-center lg:text-left">
              © 2024 GreenLight VITA Platform. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex gap-3 sm:gap-4">
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-facebook-fill text-lg sm:text-xl"></i>
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-youtube-fill text-lg sm:text-xl"></i>
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg sm:text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
