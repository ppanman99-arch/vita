
interface BenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BenefitsModal({ isOpen, onClose, onConfirm }: BenefitsModalProps) {
  if (!isOpen) return null;

  const benefits = [
    {
      icon: 'ri-shield-check-line',
      title: '100% bảo toàn điểm Green',
      description: 'Toàn bộ số điểm Green của bạn được bảo toàn và sử dụng trong hệ sinh thái VITA'
    },
    {
      icon: 'ri-vip-crown-line',
      title: 'Ưu tiên mua cổ phần',
      description: 'Được quyền ưu tiên mua cổ phần với chiết khấu ưu đãi của công ty Hành Trình Xanh GreenLight Việt Nam'
    },
    {
      icon: 'ri-team-line',
      title: 'Thành viên hợp tác xã',
      description: 'Trở thành thành viên của các hợp tác xã trong hệ sinh thái VITA'
    },
    {
      icon: 'ri-price-tag-3-line',
      title: 'Ưu đãi 10% - 95%',
      description: 'Được ưu đãi từ 10% đến 95% cho tất cả các sản phẩm và dịch vụ trong hệ sinh thái VITA'
    },
    {
      icon: 'ri-star-line',
      title: 'Quyền ưu tiên dịch vụ',
      description: 'Được quyền ưu tiên trong tất cả các sản phẩm và dịch vụ trong hệ sinh thái VITA'
    },
    {
      icon: 'ri-flight-takeoff-line',
      title: 'Vé du lịch miễn phí',
      description: 'Được tặng 01 vé miễn phí đi du lịch tham quan trải nghiệm mô hình rừng dược sinh của hệ sinh thái VITA'
    },
    {
      icon: 'ri-award-line',
      title: 'Chứng nhận ESG cá nhân',
      description: 'Được cấp chứng nhận ESG cá nhân (đóng góp cho môi trường, xã hội và quản trị)'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-3xl flex items-center justify-between">
          <h2 className="text-2xl font-bold">Quyền lợi từ hệ sinh thái VITA</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-xl text-gray-600">
              Khám phá những quyền lợi đặc biệt dành riêng cho bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-white border-2 border-green-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-600 text-white rounded-xl flex-shrink-0">
                    <i className={`${benefit.icon} w-6 h-6 flex items-center justify-center`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <i className="ri-information-line w-6 h-6 flex items-center justify-center text-green-600 flex-shrink-0 mt-1"></i>
              <p className="text-gray-700 leading-relaxed">
                Bằng việc xác nhận, bạn đồng ý nhận các quyền lợi trên và trở thành thành viên chính thức của hệ sinh thái VITA. Các quyền lợi sẽ được kích hoạt ngay sau khi xác nhận.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all whitespace-nowrap"
            >
              Đóng
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="ri-checkbox-circle-line w-5 h-5 flex items-center justify-center"></i>
                Xác nhận nhận quyền lợi
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
