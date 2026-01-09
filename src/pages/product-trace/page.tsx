import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';

export default function ProductTrace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const product = {
    name: 'Quýt Hữu Cơ Vân Sơn',
    batchId: 'QS-2024-11-247',
    image: 'https://readdy.ai/api/search-image?query=premium%20Vietnamese%20organic%20citrus%20fruits%20in%20elegant%20packaging%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20fresh%20oranges%2C%20high%20quality%20presentation&width=800&height=600&seq=trace1&orientation=landscape',
    weight: '2kg',
    harvestDate: '15/11/2024',
    packingDate: '16/11/2024',
    certification: 'VITA Standard - Verified by GreenLight'
  };

  const farmer = {
    name: 'Bác Đinh Văn A',
    location: 'Bản Mường, Vân Sơn, Phú Thọ',
    avatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20elderly%20farmer%20portrait%2C%20kind%20smiling%20face%2C%20traditional%20farming%20clothes%2C%20authentic%20rural%20person%2C%20natural%20outdoor%20setting%2C%20respectful%20documentary%20photography&width=400&height=400&seq=farmer1&orientation=squarish',
    story: 'Gia đình tôi đã canh tác quýt hữu cơ được 15 năm. Chúng tôi không sử dụng thuốc trừ sâu hóa học, chỉ dùng phân hữu cơ và các biện pháp sinh học để bảo vệ cây trồng.'
  };

  const timeline = [
    {
      date: '01/08/2024',
      title: 'Gieo hạt & Chuẩn bị đất',
      description: 'Chuẩn bị đất và gieo hạt giống quýt hữu cơ',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20preparing%20soil%20for%20citrus%20planting%2C%20organic%20farming%20preparation%2C%20traditional%20agricultural%20practice%2C%20natural%20outdoor%20setting%2C%20documentary%20photography&width=600&height=400&seq=time1&orientation=landscape',
      location: 'Vườn Quýt Bản Mường',
      gps: '21.2345°N, 105.1234°E'
    },
    {
      date: '15/08/2024',
      title: 'Bón phân hữu cơ lần 1',
      description: 'Sử dụng phân hữu cơ vi sinh từ HTX Vân Sơn',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20applying%20organic%20fertilizer%20to%20young%20citrus%20trees%2C%20natural%20farming%20practice%2C%20healthy%20soil%20management%2C%20authentic%20agricultural%20work%2C%20documentary%20photography&width=600&height=400&seq=time2&orientation=landscape',
      location: 'Vườn Quýt Bản Mường',
      gps: '21.2345°N, 105.1234°E'
    },
    {
      date: '10/09/2024',
      title: 'Chăm sóc & Tưới nước',
      description: 'Tưới nước đều đặn, kiểm tra sâu bệnh định kỳ',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20watering%20citrus%20orchard%2C%20irrigation%20system%2C%20careful%20plant%20care%2C%20healthy%20green%20trees%2C%20natural%20farming%20practice%2C%20documentary%20photography&width=600&height=400&seq=time3&orientation=landscape',
      location: 'Vườn Quýt Bản Mường',
      gps: '21.2345°N, 105.1234°E'
    },
    {
      date: '25/09/2024',
      title: 'Phun thuốc sinh học',
      description: 'Sử dụng thuốc sinh học phòng trừ sâu bệnh',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20spraying%20organic%20biological%20pesticide%20on%20citrus%20trees%2C%20safe%20farming%20practice%2C%20protective%20equipment%2C%20natural%20pest%20control%2C%20documentary%20photography&width=600&height=400&seq=time4&orientation=landscape',
      location: 'Vườn Quýt Bản Mường',
      gps: '21.2345°N, 105.1234°E'
    },
    {
      date: '20/10/2024',
      title: 'Ra hoa & Đậu trái',
      description: 'Cây quýt bắt đầu ra hoa và đậu trái',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20citrus%20trees%20with%20white%20blossoms%20and%20young%20fruits%2C%20healthy%20flowering%20stage%2C%20natural%20orchard%20setting%2C%20beautiful%20agricultural%20photography&width=600&height=400&seq=time5&orientation=landscape',
      location: 'Vườn Quýt Bản Mường',
      gps: '21.2345°N, 105.1234°E'
    },
    {
      date: '15/11/2024',
      title: 'Thu hoạch',
      description: 'Thu hoạch quýt chín tự nhiên, không sử dụng chất kích thích',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmers%20harvesting%20ripe%20organic%20citrus%20fruits%2C%20traditional%20basket%20collection%2C%20natural%20ripening%2C%20authentic%20harvest%20scene%2C%20documentary%20photography&width=600&height=400&seq=time6&orientation=landscape',
      location: 'Vườn Quýt Bản Mường',
      gps: '21.2345°N, 105.1234°E'
    },
    {
      date: '16/11/2024',
      title: 'Kiểm định & Đóng gói',
      description: 'Kiểm tra chất lượng và đóng gói tại kho HTX',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20organic%20fruit%20quality%20inspection%20and%20packaging%20facility%2C%20clean%20processing%20area%2C%20professional%20food%20safety%20standards%2C%20modern%20packaging%20process%2C%20documentary%20photography&width=600&height=400&seq=time7&orientation=landscape',
      location: 'Kho HTX Vân Sơn',
      gps: '21.2456°N, 105.1345°E'
    }
  ];

  const labTest = {
    testDate: '16/11/2024',
    lab: 'Trung tâm Kiểm định Chất lượng Nông sản Phú Thọ',
    results: [
      { name: 'Dư lượng thuốc BVTV', value: 'Không phát hiện', status: 'pass' },
      { name: 'Kim loại nặng', value: 'Đạt chuẩn', status: 'pass' },
      { name: 'Vi sinh vật', value: 'An toàn', status: 'pass' },
      { name: 'Độ ngọt (Brix)', value: '12.5°', status: 'pass' }
    ]
  };

  const handleTip = () => {
    if (selectedTip) {
      alert(`Cảm ơn bạn đã gửi ${selectedTip.toLocaleString()}đ cho ${farmer.name}!`);
      setShowTipModal(false);
      setSelectedTip(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-4 shadow-lg sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-auto" label="" />
            <div>
              <h1 className="text-lg font-bold">Hộ Chiếu Sản Phẩm</h1>
              <p className="text-xs text-emerald-100">Truy xuất nguồn gốc</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-apps-2-line text-lg"></i>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Product Header */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg mb-6">
          <div className="w-full h-80">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-lg text-gray-600">Lô hàng: <strong className="text-green-700">{product.batchId}</strong></p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <i className="ri-verified-badge-line text-4xl text-green-700"></i>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-6">
              <p className="text-green-800 font-semibold flex items-center gap-2">
                <i className="ri-shield-check-line text-2xl"></i>
                {product.certification}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Khối lượng</p>
                <p className="text-lg font-bold text-gray-800">{product.weight}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Ngày thu hoạch</p>
                <p className="text-lg font-bold text-gray-800">{product.harvestDate}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Ngày đóng gói</p>
                <p className="text-lg font-bold text-gray-800">{product.packingDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="ri-time-line text-2xl text-green-700"></i>
            </div>
            Hành Trình Sản Phẩm
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-200"></div>

            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div key={index} className="relative pl-16">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-green-700 font-semibold mb-1">{event.date}</p>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <i className="ri-map-pin-line"></i>
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-navigation-line"></i>
                            {event.gps}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-48 rounded-xl overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Farmer Info */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="ri-user-heart-line text-2xl text-green-700"></i>
            </div>
            Người Làm Ra Sản Phẩm
          </h2>

          <div className="flex items-start gap-6 mb-6">
            <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
              <img 
                src={farmer.avatar} 
                alt={farmer.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{farmer.name}</h3>
              <p className="text-gray-600 flex items-center gap-2 mb-4">
                <i className="ri-map-pin-line text-green-700"></i>
                {farmer.location}
              </p>
              <p className="text-gray-700 leading-relaxed">{farmer.story}</p>
            </div>
          </div>

          {/* Tip Button */}
          <button 
            onClick={() => setShowTipModal(true)}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer whitespace-nowrap"
          >
            <i className="ri-cup-line text-2xl"></i>
            Mời {farmer.name.split(' ').pop()} một cốc nước
          </button>
        </div>

        {/* Lab Test */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="ri-flask-line text-2xl text-green-700"></i>
            </div>
            Chứng Thư Kiểm Định
          </h2>

          <div className="bg-green-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ngày kiểm định</p>
                <p className="text-lg font-bold text-gray-800">{labTest.testDate}</p>
              </div>
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-4xl text-white"></i>
              </div>
            </div>
            <p className="text-sm text-gray-700">{labTest.lab}</p>
          </div>

          <div className="space-y-4">
            {labTest.results.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-check-line text-xl text-green-700"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{result.name}</p>
                    <p className="text-xs text-gray-500">{result.value}</p>
                  </div>
                </div>
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-semibold">
                  ĐẠT
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 border-2 border-green-700 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap">
            <i className="ri-download-line text-xl"></i>
            Tải xuống Chứng thư PDF
          </button>
        </div>
      </div>

      {/* Tip Modal */}
      {showTipModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Gửi lời cảm ơn</h3>
              <button 
                onClick={() => setShowTipModal(false)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl text-gray-700"></i>
              </button>
            </div>

            <p className="text-gray-600 mb-6">Chọn số tiền bạn muốn gửi cho {farmer.name}</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[10000, 20000, 50000, 100000, 200000, 500000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedTip(amount)}
                  className={`py-4 rounded-xl font-semibold transition-all cursor-pointer ${
                    selectedTip === amount
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {(amount / 1000).toLocaleString()}k
                </button>
              ))}
            </div>

            <button 
              onClick={handleTip}
              disabled={!selectedTip}
              className={`w-full py-4 rounded-xl font-semibold transition-all whitespace-nowrap ${
                selectedTip
                  ? 'bg-green-700 text-white hover:bg-green-800 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Gửi ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
