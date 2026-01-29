export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  /** Full article content (HTML or plain paragraphs); used on post detail page */
  content?: string;
  /** Hero image URL for article page (e.g. letter/announcement graphic) */
  heroImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Thư gửi cộng đồng Green Light Việt Nam – Hành Trình Xanh',
    excerpt: 'Thư chia sẻ từ anh Nguyễn Mạnh Thuần và đội ngũ GLVN về Hành Trình Xanh, sự đồng hành của cộng đồng và hướng tới Nền tảng Rừng Dược Sinh Vita.',
    date: '15/01/2024',
    category: 'Thư cộng đồng',
    image: '/images/blog/glvn-hanh-trinh-xanh.png',
    heroImage: '/images/blog/glvn-hanh-trinh-xanh.png',
    content: 'Thưa cô chú, anh chị em cộng đồng Green Light Việt Nam (GLVN) thân mến,\n\nBản thân tôi và đội ngũ GLVN luôn mang trong mình mong muốn được làm những việc có lợi lạc thực chất cho xã hội. Chính vì vậy, chúng tôi đã lựa chọn con đường trồng rừng – một con đường tưởng chừng đơn giản nhưng trên thực tế lại vô cùng gian nan, đòi hỏi nhiều suy tư, phản biện và nội lực bền bỉ.\n\nNgay từ đầu, chúng tôi xác định đây không chỉ là một dự án, mà là Hành Trình Xanh – Green Light Việt Nam: một hành trình dài hơi, nơi mà sự thành công không thể đến từ nỗ lực đơn lẻ, mà cần sự chung tay, thấu hiểu và đồng hành của cộng đồng. Trong suốt thời gian qua, sự ủng hộ – dù được thể hiện trực tiếp hay âm thầm – cùng những góp ý chân thành của cô chú, anh chị em đã luôn là nguồn động viên rất lớn đối với chúng tôi.\n\nTuy nhiên, GLVN vẫn là một doanh nghiệp đang vận hành trong một bối cảnh đầy biến động và bất định. Những thay đổi nhanh chóng của môi trường kinh tế – xã hội – thị trường đã đặt ra cho chúng tôi không ít thách thức. Có những giai đoạn khó khăn, chậm nhịp, thậm chí gây ra sự sốt ruột và trăn trở từ phía cộng đồng.\n\nTrước những điều đó, tôi và đội ngũ GLVN xin được chân thành nhận trách nhiệm, đồng thời gửi lời xin lỗi và phân ưu tới cộng đồng vì những trở ngại, gián đoạn và thiếu kết nối trong thời gian vừa qua. Chúng tôi đã lựa chọn cách bình tĩnh nhìn lại, phản tư sâu sắc và điều chỉnh chiến lược, để không đi nhanh hơn khả năng nội tại, nhưng cũng không rời xa con đường đã chọn.\n\nChúng tôi khẳng định rằng GLVN vẫn kiên định với Hành Trình Xanh – con đường phát triển hài hòa giữa kinh tế, xã hội và môi trường, phù hợp với tiến trình chuyển mình của đất nước. Trong giai đoạn mới này, GLVN đang tập trung hoàn thiện và mở ra một nền tảng toàn diện hơn, thực chất hơn, với trọng tâm là Nền tảng Rừng Dược Sinh Vita (Vitacoop) – nơi hội tụ tư duy hệ thống, giá trị cộng đồng và sinh kế bền vững.\n\nChúng tôi tin tưởng rằng, với chiến lược mới này và sự đồng hành trở lại của cộng đồng, GLVN sẽ từng bước tạo ra những giá trị chung, hướng tới sự thịnh vượng hài hòa cho tất cả chúng ta – không chỉ hôm nay, mà cả trong tương lai dài hạn.\n\nMột lần nữa, xin trân trọng cảm ơn và biết ơn sự tin tưởng, kiên nhẫn và đồng hành của cô chú, anh chị em cộng đồng.\n\nTrân trọng,\nNguyễn Mạnh Thuần\nvà Đội ngũ Green Light Việt Nam'
  },
  {
    id: 2,
    title: 'Câu chuyện Rừng Dược Sinh – Hạ tầng an sinh xã hội số',
    excerpt: 'Thư gửi những người trăn trở với đổi mới sáng tạo: từ câu hỏi về hạ tầng chung cho rừng, dược liệu, sinh kế và an sinh đến tầm nhìn Nền tảng Rừng Dược Sinh Vita.',
    date: '25/01/2024',
    category: 'Thư cộng đồng',
    image: '/images/blog/glvn-cau-chuyen-rung-duoc-sinh.png',
    heroImage: '/images/blog/glvn-cau-chuyen-rung-duoc-sinh.png',
    content: 'Thưa Anh/Chị thân mến,\nnhững người đang trăn trở với đổi mới sáng tạo và mong muốn tạo ra giá trị thực cho xã hội trong thời đại này.\n\nCó lẽ Anh/Chị cũng đã nhìn thấy: rất nhiều nỗ lực tốt đẹp hôm nay không thất bại vì thiếu tâm huyết hay tri thức, mà vì chúng bị đặt trong một cơ chế không phù hợp để tồn tại lâu dài.\n\nRừng được bảo vệ chủ yếu bằng ngân sách nên thiếu bền vững. Dược liệu được xem là lợi thế lớn, nhưng chuỗi giá trị lại rời rạc, thiếu chuẩn và thiếu niềm tin. An sinh xã hội ngày càng mở rộng, nhưng phần lớn vẫn dừng ở hỗ trợ ngắn hạn, chưa tạo ra năng lực tự đứng vững cho cộng đồng sống dựa vào rừng. Mỗi lĩnh vực đều có dự án, có chính sách, có người làm — nhưng chúng hiếm khi được thiết kế để vận hành cùng nhau trong một hệ thống thống nhất.\n\nCâu chuyện Rừng Dược Sinh mà chúng tôi theo đuổi bắt đầu từ một câu hỏi rất căn bản:\nliệu có thể xây dựng một hạ tầng chung để rừng, dược liệu, sinh kế và an sinh cùng vận hành trong một cơ chế tự nuôi sống chính nó hay không?\n\nNền tảng này được hình dung như một hạ tầng an sinh xã hội số, nơi rừng không chỉ được bảo vệ mà trở thành tài sản sinh học có thể đo lường; nơi dược liệu được chuẩn hóa và truy xuất từ gốc sinh thái; nơi cộng đồng không còn là đối tượng thụ hưởng, mà là một chủ thể trong chuỗi giá trị; và nơi dữ liệu đủ tin cậy để doanh nghiệp, nhà đầu tư và cả chính sách có thể ra quyết định dài hạn.\n\nĐiều khiến chúng tôi tin rằng hướng đi này có tiềm năng thành công không nằm ở câu chuyện đẹp, mà ở việc nó nhắm thẳng vào điểm nghẽn của hệ thống hiện tại: thiếu hạ tầng, thiếu chuẩn chung và thiếu dữ liệu sống. Khi lớp này chưa được giải quyết, mọi mô hình dù tốt đến đâu cũng chỉ dừng ở thí điểm.\n\nBức thư này không nhằm kêu gọi sự ủng hộ đại trà. Chúng tôi tìm những người hiểu hệ thống, những người đủ trải nghiệm để nhìn ra giới hạn của mô hình cũ và đủ kiên nhẫn để cùng thiết kế một kiến trúc mới. Không phải để tham gia cho đông, mà để cùng chịu trách nhiệm cho một hướng đi dài hạn.\n\nNếu những điều trên chạm tới các suy tư mà Anh/Chị từng nghĩ đến, chúng tôi rất mong có một cuộc trò chuyện chậm và thẳng thắn — không vội, không cam kết — chỉ để cùng nhìn rõ hơn xem liệu chúng ta có đang đứng chung một hướng hay không.'
  }
];
