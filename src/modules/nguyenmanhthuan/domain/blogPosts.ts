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
  }
];
