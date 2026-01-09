import { useState } from 'react';

export default function QAChannel() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'Mô hình kinh doanh của GreenLight có khác biệt gì so với các nền tảng nông nghiệp khác?',
      answer: 'GreenLight không sở hữu tài sản nặng (asset-light), tập trung vào việc kết nối và điều phối hệ sinh thái. Chúng tôi kiếm tiền từ nhiều nguồn: phí nền tảng, hoa hồng thương mại, dịch vụ tư vấn, và tín chỉ carbon - tạo ra mô hình doanh thu đa dạng và bền vững.',
      askedBy: 'investor@fund.com',
      answeredBy: 'CEO - Nguyễn Văn A',
      date: '2024-01-15',
      status: 'answered',
    },
    {
      id: 2,
      question: 'Làm thế nào GreenLight đảm bảo chất lượng dược liệu từ nhiều nguồn khác nhau?',
      answer: 'Chúng tôi có hệ thống kiểm soát chất lượng 3 lớp: (1) Tiêu chuẩn VITA được ban hành bởi Hội đồng khoa học, (2) Giám sát thực thi qua đội ngũ QC và hệ thống giám sát chéo, (3) Mã QR truy xuất nguồn gốc cho từng lô hàng. Mọi hành vi gian lận đều bị phơi bày.',
      askedBy: 'investor@fund.com',
      answeredBy: 'CTO - Trần Thị B',
      date: '2024-01-20',
      status: 'answered',
    },
    {
      id: 3,
      question: 'Kế hoạch mở rộng ra các tỉnh khác như thế nào?',
      answer: null,
      askedBy: 'investor@fund.com',
      answeredBy: null,
      date: '2024-02-01',
      status: 'pending',
    },
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const question = {
      id: questions.length + 1,
      question: newQuestion,
      answer: null,
      askedBy: sessionStorage.getItem('investor_email') || 'investor@fund.com',
      answeredBy: null,
      date: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
    };

    setQuestions([question, ...questions]);
    setNewQuestion('');
    alert('Câu hỏi đã được gửi! CEO/Founder sẽ trả lời trong vòng 24-48 giờ.');
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <i className="ri-question-answer-line mr-2 text-emerald-600"></i>
          Kênh Hỏi đáp trực tiếp - Q&A Channel
        </h2>
        <p className="text-gray-600">
          Đặt câu hỏi trực tiếp cho CEO/Founder về bất kỳ khía cạnh nào của dự án
        </p>
      </div>

      {/* Ask Question Form */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="ri-question-line text-emerald-600"></i>
          Đặt câu hỏi mới
        </h3>
        <form onSubmit={handleSubmitQuestion} className="space-y-4">
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Nhập câu hỏi của bạn về dự án, mô hình kinh doanh, tài chính, hoặc bất kỳ điều gì bạn muốn làm rõ..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            rows={4}
            required
          />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="ri-information-line"></i>
            <span>Bạn có thể đính kèm biểu đồ hoặc số liệu cụ thể để làm rõ câu hỏi</span>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
          >
            <i className="ri-send-plane-line mr-2"></i>
            Gửi câu hỏi
          </button>
        </form>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <i className="ri-list-check text-emerald-600"></i>
          Câu hỏi & Trả lời ({questions.length})
        </h3>

        {questions.map((q) => (
          <div
            key={q.id}
            className={`bg-white p-6 rounded-xl border-2 ${
              q.status === 'answered' ? 'border-emerald-200' : 'border-yellow-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    q.status === 'answered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {q.status === 'answered' ? 'Đã trả lời' : 'Đang chờ'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(q.date).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{q.question}</h4>
                {q.answer && (
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-checkbox-circle-line text-emerald-600"></i>
                      <span className="text-sm font-semibold text-gray-700">
                        Trả lời bởi: {q.answeredBy}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{q.answer}</p>
                  </div>
                )}
                {!q.answer && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <i className="ri-time-line text-yellow-600"></i>
                      Câu hỏi đang được xem xét. CEO/Founder sẽ trả lời trong vòng 24-48 giờ.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Attach Chart Button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedChart(selectedChart === q.id.toString() ? null : q.id.toString())}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                <i className="ri-bar-chart-line"></i>
                {selectedChart === q.id.toString() ? 'Ẩn' : 'Hiển thị'} biểu đồ liên quan
              </button>
              {selectedChart === q.id.toString() && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <i className="ri-information-line mr-2"></i>
                    Tính năng đính kèm biểu đồ sẽ được tích hợp trong phiên bản tiếp theo
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="ri-questionnaire-line text-emerald-600"></i>
          Câu hỏi thường gặp (FAQ)
        </h3>
        <div className="space-y-4">
          <details className="p-4 bg-gray-50 rounded-lg">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              GreenLight kiếm tiền như thế nào?
            </summary>
            <p className="mt-2 text-gray-700">
              GreenLight có 4 nguồn doanh thu chính: (1) Phí nền tảng từ HTX và nông dân, 
              (2) Hoa hồng thương mại từ các giao dịch B2B, (3) Dịch vụ tư vấn và đào tạo, 
              (4) Tín chỉ Carbon từ rừng dược liệu.
            </p>
          </details>
          <details className="p-4 bg-gray-50 rounded-lg">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              Rủi ro chính của mô hình này là gì?
            </summary>
            <p className="mt-2 text-gray-700">
              Rủi ro chính bao gồm: (1) Rủi ro thiên tai ảnh hưởng đến sản lượng, 
              (2) Biến động giá thị trường dược liệu, (3) Thay đổi chính sách về carbon credit, 
              (4) Cạnh tranh từ các nền tảng khác. Tuy nhiên, mô hình đa dạng hóa giúp giảm thiểu rủi ro.
            </p>
          </details>
          <details className="p-4 bg-gray-50 rounded-lg">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              Khi nào GreenLight dự kiến đạt break-even?
            </summary>
            <p className="mt-2 text-gray-700">
              Dự kiến đạt break-even vào cuối năm 2025 khi đạt mốc 5,000 ha và có 10+ doanh nghiệp B2B 
              ký hợp đồng bao tiêu dài hạn.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

