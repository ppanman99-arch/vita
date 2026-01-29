# Go-Live VITA – Các bước công việc và Checklist test

Tài liệu này chia kế hoạch go-live thành từng bước. **Sau mỗi bước hoàn thành, dừng lại và chạy checklist test** tương ứng (viết cho người không biết code: chỉ cần mở trình duyệt, vào đúng đường dẫn, thao tác và kiểm tra kết quả).

Tham chiếu: [go-live_vita_portals_96c695e6.plan.md](.cursor/plans/go-live_vita_portals_96c695e6.plan.md), [GO_LIVE_CHECKLIST.md](GO_LIVE_CHECKLIST.md).

---

## Bước 1 – Database: Migration cooperatives + vita_applications, RLS

**Công việc:**
- Tạo migration Supabase: bảng `cooperatives` (id, name, email, tax_code, established_year, member_count, total_forest_area, location, representative, representative_position, phone, current_activities, interests, additional_info, logo_url, **status** (pending | approved | rejected), created_at, updated_at).
- Nếu dùng riêng đơn đăng ký: bảng `vita_applications` (cooperative_id, submitted_at, reviewed_at, reviewed_by, status, admin_notes).
- Thiết lập RLS: HTX chỉ đọc/sửa bản ghi của mình; system admin đọc/update `vita_applications` và `cooperatives.status`.

---

### Dừng lại – Checklist test (Bước 1)

*Chạy sau khi migration đã chạy trên Supabase (local hoặc project thật).*

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 1.1 | Mở Supabase Dashboard (project của bạn). | Vào https://supabase.com → đăng nhập → chọn project. | ☐ |
| 1.2 | Kiểm tra bảng `cooperatives` đã có. | Vào **Table Editor** → thấy bảng **cooperatives**, có các cột như name, email, status, created_at... | ☐ |
| 1.3 | Kiểm tra bảng `vita_applications` (nếu có dùng). | Trong **Table Editor** thấy bảng **vita_applications** với cột cooperative_id, status, submitted_at... | ☐ |
| 1.4 | Kiểm tra RLS đã bật. | Vào **Authentication** → **Policies** (hoặc Table → cooperatives → RLS): thấy RLS enabled cho bảng liên quan. | ☐ |

**Kết luận bước 1:** Nếu tất cả ô đạt thì chuyển sang Bước 2. Nếu thiếu bảng hoặc RLS, báo lại để sửa migration.

---

## Bước 2 – Database: Migration green_investment_opportunities, RLS

**Công việc:**
- Tạo migration: bảng `green_investment_opportunities` (hoặc `projects`) với cột cooperative_id, thông tin dự án, raised, investors, v.v.
- RLS: HTX chỉ đọc/sửa dự án của mình (theo cooperative_id); xã viên/ESG chỉ đọc dự án (và sau này chỉ ghi invest của mình).

---

### Dừng lại – Checklist test (Bước 2)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 2.1 | Mở Supabase Dashboard → Table Editor. | Vào project → Table Editor. | ☐ |
| 2.2 | Kiểm tra bảng dự án đã có. | Thấy bảng **green_investment_opportunities** (hoặc **projects**) với cột cooperative_id, tên dự án, số tiền, raised... | ☐ |
| 2.3 | Kiểm tra RLS cho bảng dự án. | Bảng đó có bật RLS và có policy phù hợp (HTX sở hữu, user đọc...). | ☐ |

**Kết luận bước 2:** Đủ bảng và RLS thì sang Bước 3.

---

## Bước 3 – Auth: Đăng ký / Đăng nhập HTX (Supabase), session cooperative_id

**Công việc:**
- Nối trang đăng ký HTX (`/cooperative/register-account`) với Supabase Auth: tạo user + ghi bản ghi HTX vào `cooperatives` với status pending.
- Nối trang đăng nhập HTX (`/cooperative/login`) với Supabase Auth; sau khi đăng nhập thành công lưu cooperative_id vào session và chuyển vào `/cooperative/dashboard`.
- Đảm bảo route `/cooperative/register-account`, `/cooperative/login` và route con (CooperativeModuleRouter) hoạt động.

---

### Dừng lại – Checklist test (Bước 3)

*Thay `https://your-app.com` bằng địa chỉ thật (localhost:5173 hoặc domain deploy).*

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 3.1 | Mở trang đăng ký HTX. | Trình duyệt gõ: `https://your-app.com/cooperative/register-account` → Enter. | ☐ |
| 3.2 | Điền form đăng ký (email, mật khẩu, tên HTX, v.v.). | Nhập đủ thông tin bắt buộc rồi bấm **Đăng ký** (hoặc nút tương ứng). | ☐ |
| 3.3 | Kiểm tra đăng ký thành công. | Không báo lỗi; có thông báo thành công hoặc tự chuyển trang (ví dụ sang dashboard hoặc trang xác nhận email). | ☐ |
| 3.4 | Kiểm tra trong Supabase đã có user và bản ghi HTX. | Vào Supabase → **Authentication** → **Users**: thấy user mới. **Table Editor** → **cooperatives**: thấy 1 dòng mới với status pending. | ☐ |
| 3.5 | Đăng xuất (nếu có nút Đăng xuất) hoặc mở tab ẩn danh. Mở trang đăng nhập HTX. | Gõ: `https://your-app.com/cooperative/login` → Enter. | ☐ |
| 3.6 | Đăng nhập bằng email/mật khẩu vừa đăng ký. | Nhập email và mật khẩu → bấm **Đăng nhập**. | ☐ |
| 3.7 | Kiểm tra sau đăng nhập. | Chuyển vào trang **Dashboard HTX** (URL có `/cooperative/dashboard`), không báo lỗi; có thể thấy tên HTX hoặc menu HTX. | ☐ |

**Kết luận bước 3:** Đăng ký tạo user + HTX, đăng nhập vào dashboard thì sang Bước 4.

---

## Bước 4 – Auth: Đăng ký / Đăng nhập xã viên (Supabase), session user_id

**Công việc:**
- Xác định route đăng ký xã viên (ví dụ `/register?role=member` hoặc `/member-hub/register` hoặc form từ `/home` chọn role xã viên).
- Nối đăng ký/đăng nhập xã viên với Supabase Auth; sau đăng nhập lưu user_id vào session; chuyển vào Member Hub (ví dụ `/member-hub`).

---

### Dừng lại – Checklist test (Bước 4)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 4.1 | Mở trang đăng ký xã viên (theo route đã quy định). | Gõ URL đăng ký xã viên (vd. `.../register?role=member` hoặc từ **Trang chủ** chọn “Đăng ký xã viên”). | ☐ |
| 4.2 | Điền form và bấm Đăng ký. | Nhập email, mật khẩu (và thông tin khác nếu có) → Đăng ký. | ☐ |
| 4.3 | Kiểm tra đăng ký thành công. | Có thông báo thành công hoặc chuyển trang; Supabase **Users** có user mới. | ☐ |
| 4.4 | Mở trang đăng nhập (xã viên). | Gõ `https://your-app.com/login` (hoặc route đăng nhập xã viên đã định). | ☐ |
| 4.5 | Đăng nhập bằng tài khoản xã viên vừa tạo. | Nhập email/mật khẩu → Đăng nhập. | ☐ |
| 4.6 | Kiểm tra sau đăng nhập. | Chuyển vào **Member Hub** (URL có `/member-hub`), thấy menu Góp vốn / Cơ hội đầu tư (hoặc tương tự), không lỗi. | ☐ |

**Kết luận bước 4:** Xã viên đăng ký/đăng nhập và vào được Member Hub thì sang Bước 5.

---

## Bước 5 – Portal HTX: Nút “Đăng ký tham gia VITA” từ Profile + gửi đơn, email

**Công việc:**
- Trong trang Profile HTX (`/cooperative/profile`) thêm nút/hành động **“Đăng ký tham gia hệ sinh thái VITA”**.
- Bấm nút: tạo/update đơn trong `vita_applications` (hoặc set cooperatives.status = pending); gọi Edge Function/API để gửi email cho (1) admin và (2) HTX (xác nhận đã gửi đơn).

---

### Dừng lại – Checklist test (Bước 5)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 5.1 | Đăng nhập với tài khoản HTX. | Đăng nhập HTX → vào Dashboard. | ☐ |
| 5.2 | Mở trang Thông tin HTX (Profile). | Trong menu HTX chọn **Thông tin** / **Profile** (URL thường là `/cooperative/profile`). | ☐ |
| 5.3 | Tìm nút “Đăng ký tham gia VITA” (hoặc tương tự). | Trên trang có nút/bước rõ ràng “Đăng ký tham gia hệ sinh thái VITA”. | ☐ |
| 5.4 | Bấm nút và xác nhận gửi đơn (nếu có bước xác nhận). | Bấm nút → (nếu có) bấm Xác nhận. | ☐ |
| 5.5 | Kiểm tra thông báo sau khi gửi. | Trang hiển thị thông báo kiểu “Đã gửi đơn đăng ký VITA” hoặc “Chờ duyệt”, không báo lỗi. | ☐ |
| 5.6 | Kiểm tra email HTX nhận được. | Vào hộp thư email đã dùng đăng ký HTX → có email xác nhận đã gửi đơn (nội dung tùy template). | ☐ |
| 5.7 | (Nếu có cấu hình email admin) Kiểm tra admin nhận email. | Email của admin hệ thống nhận được thông báo có đơn mới. | ☐ |

**Kết luận bước 5:** Có nút, gửi đơn thành công và nhận email xác nhận thì sang Bước 6.

---

## Bước 6 – Portal HTX: Trang admin phê duyệt đơn VITA + email kết quả

**Công việc:**
- Trang phê duyệt đơn VITA tại route cố định (vd. `/admin-dashboard/vita-applications` hoặc `/greenlight-command`), dành cho **system admin** (không phải HTX).
- Danh sách đơn pending; nút Phê duyệt / Từ chối; khi phê duyệt cập nhật cooperatives.status = approved (và vita_applications nếu có); gửi email kết quả cho admin và HTX.

---

### Dừng lại – Checklist test (Bước 6)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 6.1 | Đăng nhập với tài khoản **system admin**. | Dùng tài khoản có quyền admin (không phải tài khoản HTX). | ☐ |
| 6.2 | Mở trang danh sách đơn VITA. | Gõ URL trang phê duyệt (vd. `.../admin-dashboard/vita-applications`) hoặc vào menu Admin → Đơn đăng ký VITA. | ☐ |
| 6.3 | Kiểm tra thấy đơn pending (đã gửi ở Bước 5). | Trang hiển thị ít nhất 1 đơn trạng thái “Chờ duyệt” / pending, có tên HTX. | ☐ |
| 6.4 | Bấm Phê duyệt cho 1 đơn. | Chọn đơn → bấm **Phê duyệt** (hoặc tương tự). | ☐ |
| 6.5 | Kiểm tra trạng thái đơn sau duyệt. | Đơn chuyển sang “Đã duyệt” / approved; không báo lỗi. | ☐ |
| 6.6 | Kiểm tra email HTX nhận kết quả. | Hộp thư email của HTX đó có thư thông báo đơn được phê duyệt. | ☐ |
| 6.7 | (Tùy chọn) Thử Từ chối 1 đơn khác. | Chọn đơn khác → Từ chối → HTX nhận email từ chối (nếu đã cấu hình). | ☐ |

**Kết luận bước 6:** Admin thấy đơn, duyệt/từ chối được và email gửi đúng thì sang Bước 7.

---

## Bước 7 – Portal HTX: Route /cooperative/projects, tạo dự án ghi vào DB

**Công việc:**
- Thêm route `/cooperative/projects` (và nếu cần `/cooperative/projects/new`); link rõ từ Dashboard HTX tới trang tạo dự án.
- Khi HTX tạo/publish dự án: ghi vào bảng `green_investment_opportunities` (hoặc bảng dự án đã tạo ở Bước 2) với cooperative_id của HTX đang đăng nhập.

---

### Dừng lại – Checklist test (Bước 7)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 7.1 | Đăng nhập HTX (ưu tiên HTX đã được duyệt). | Đăng nhập → vào Dashboard HTX. | ☐ |
| 7.2 | Tìm đường vào “Dự án” / “Tạo dự án”. | Trên Dashboard hoặc menu có link **Dự án** hoặc **Tạo dự án trồng rừng** (hoặc tương tự). | ☐ |
| 7.3 | Mở trang danh sách / tạo dự án. | Bấm link → URL có dạng `/cooperative/projects` hoặc `/cooperative/projects/new`. Trang mở không lỗi. | ☐ |
| 7.4 | Điền form tạo dự án (tên, mô tả, số tiền, thời hạn, v.v.). | Nhập đủ thông tin → bấm **Tạo** / **Lưu** / **Publish**. | ☐ |
| 7.5 | Kiểm tra tạo thành công. | Có thông báo thành công hoặc chuyển sang danh sách dự án; thấy dự án vừa tạo. | ☐ |
| 7.6 | Kiểm tra dự án đã lưu trong Supabase. | Supabase → Table Editor → bảng **green_investment_opportunities** (hoặc **projects**) → có 1 dòng mới với đúng cooperative_id và thông tin vừa nhập. | ☐ |

**Kết luận bước 7:** HTX tạo được dự án và dữ liệu xuất hiện trong DB thì sang Bước 8.

---

## Bước 8 – Nguồn dự án: Member Capital + ESG đọc từ DB thay mock

**Công việc:**
- Member Capital (trang Cơ hội đầu tư `/member-hub/capital/opportunities`) lấy danh sách dự án từ Supabase/API thay vì mock hoặc localStorage.
- ESG Doanh nghiệp (`/esg-portal`) và ESG Cá nhân lấy cùng nguồn dự án (dự án do HTX tạo, đã có trong DB).

---

### Dừng lại – Checklist test (Bước 8)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 8.1 | Đăng nhập xã viên. Mở trang Cơ hội đầu tư. | Đăng nhập xã viên → vào Member Hub → chọn **Góp vốn** / **Cơ hội đầu tư** (URL `/member-hub/capital/opportunities`). | ☐ |
| 8.2 | Kiểm tra danh sách dự án. | Trang hiển thị **đúng dự án** mà HTX đã tạo ở Bước 7 (tên, mô tả, số tiền…), không còn danh sách giả/mock cũ. | ☐ |
| 8.3 | Mở ESG Doanh nghiệp (đăng nhập ESG DN nếu cần). | Vào `/esg-portal` (đăng nhập nếu hệ thống yêu cầu). | ☐ |
| 8.4 | Kiểm tra danh sách dự án trên ESG Portal. | Tab/trang dự án hiển thị **cùng các dự án** từ HTX (giống hoặc đồng bộ với Member Capital). | ☐ |
| 8.5 | Mở ESG Cá nhân. | Vào `/esg-individual` (hoặc `/esg-individual/opportunities`). | ☐ |
| 8.6 | Kiểm tra dự án ESG Cá nhân. | Cơ hội đầu tư hiển thị **cùng nguồn dự án** (dự án HTX đã tạo). | ☐ |

**Kết luận bước 8:** Cả 3 nơi (Member Capital, ESG DN, ESG Cá nhân) đều thấy dự án thật từ DB thì sang Bước 9.

---

## Bước 9 – Thanh toán: Đấu nối cổng (VNPay/Momo/Stripe) + luồng góp vốn

**Công việc:**
- Đấu nối API cổng thanh toán (VNPay/Momo/Stripe hoặc gateway nội bộ): tạo giao dịch, redirect/callback.
- Trong luồng góp vốn (Member Capital, ESG): khi xã viên/doanh nghiệp chọn số tiền và bấm thanh toán → chuyển sang bước thanh toán → sau khi thanh toán thành công mới ghi invest và cập nhật raised.

---

### Dừng lại – Checklist test (Bước 9)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 9.1 | Đăng nhập xã viên. Vào Cơ hội đầu tư, chọn 1 dự án. | Member Hub → Góp vốn → Cơ hội đầu tư → bấm vào 1 dự án. | ☐ |
| 9.2 | Chọn số tiền góp và bấm “Góp vốn” / “Thanh toán”. | Nhập số tiền (nếu có) → bấm nút góp vốn / thanh toán. | ☐ |
| 9.3 | Kiểm tra chuyển sang bước thanh toán. | Trang chuyển sang màn hình cổng thanh toán (VNPay/Momo/Stripe…) hoặc trang “Chọn phương thức thanh toán” với tên cổng thật. | ☐ |
| 9.4 | (Môi trường test) Thực hiện thanh toán test theo hướng dẫn cổng. | Hoàn tất bước thanh toán test (vd. chọn “Thanh toán thành công” trên sandbox). | ☐ |
| 9.5 | Kiểm tra sau thanh toán thành công. | Quay lại ứng dụng VITA; có thông báo “Góp vốn thành công” hoặc tương tự; không báo lỗi. | ☐ |
| 9.6 | Kiểm tra số tiền đã góp được cập nhật. | Vào lại dự án hoặc trang Portfolio: số tiền đã gọi (raised) tăng đúng với số vừa góp; giao dịch xuất hiện trong lịch sử (nếu có). | ☐ |

**Kết luận bước 9:** Luồng góp vốn dẫn tới cổng thật, thanh toán xong thì cập nhật đúng trong app thì sang Bước 10.

---

## Bước 10 – E-contract: Tạo + ký hợp đồng điện tử, lưu trạng thái

**Công việc:**
- Sau khi thanh toán thành công (hoặc theo quy trình): gọi API tạo hợp đồng điện tử, gửi link ký / API ký; lưu contract_id và trạng thái vào DB.
- Hiển thị trạng thái hợp đồng (đã ký / chờ ký) cho user.

---

### Dừng lại – Checklist test (Bước 10)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 10.1 | Sau khi góp vốn thành công (Bước 9), kiểm tra có bước “Ký hợp đồng”. | Sau thanh toán có thông báo hoặc trang “Ký hợp đồng” / “Xem hợp đồng” (hoặc link trong email). | ☐ |
| 10.2 | Mở link/trang ký hợp đồng. | Bấm link hoặc vào mục “Hợp đồng” / “Giao dịch của tôi” → chọn giao dịch vừa góp. | ☐ |
| 10.3 | Thực hiện ký (nếu có bước ký trong app hoặc redirect ra nhà cung cấp). | Điền thông tin ký hoặc bấm “Ký” theo hướng dẫn. | ☐ |
| 10.4 | Kiểm tra trạng thái sau khi ký. | Trang hoặc email xác nhận “Đã ký” / “Hợp đồng đã hoàn tất”; không báo lỗi. | ☐ |
| 10.5 | Kiểm tra hợp đồng được lưu. | Vào lại “Hợp đồng” / “Portfolio” / “Giao dịch”: giao dịch đó hiển thị trạng thái đã ký hoặc có contract_id (nếu app hiển thị). | ☐ |

**Kết luận bước 10:** Luồng ký hợp đồng chạy và trạng thái lưu đúng thì sang Bước 11.

---

## Bước 11 – Demo toggle: VITE_SHOW_DEMO_FEATURES, ẩn route/menu Demo

**Công việc:**
- Thêm biến `VITE_SHOW_DEMO_FEATURES=true|false` (mặc định true).
- Trong `goLiveRoutes` (hoặc config): danh sách path/prefix Demo cần ẩn (vd. `/member-hub/consumer`, `/member-hub/consumer/*`, các trang admin demo).
- Router: khi `VITE_SHOW_DEMO_FEATURES=false` thì không đăng ký route Demo (hoặc redirect/404).
- Sidebar/Menu (AdminSidebar, MemberHubPage, Hub): ẩn mục tương ứng route Demo khi env = false.

---

### Dừng lại – Checklist test (Bước 11)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 11.1 | Bật Demo: đặt `VITE_SHOW_DEMO_FEATURES=true`, build lại và mở app. | Sau khi build với env = true, mở trang chủ và Member Hub. | ☐ |
| 11.2 | Kiểm tra khi bật Demo: thấy mục “Mua sắm” / “Tiêu dùng” (consumer). | Trong Member Hub sidebar/menu vẫn có **Mua sắm** (hoặc Tiêu dùng); vào được `/member-hub/consumer`. | ☐ |
| 11.3 | Tắt Demo: đặt `VITE_SHOW_DEMO_FEATURES=false`, build lại và mở app. | Build lại với env = false, mở app. | ☐ |
| 11.4 | Kiểm tra khi tắt Demo: menu không còn mục Mua sắm. | Trong Member Hub **không còn** mục Mua sắm / Tiêu dùng (hoặc mục Demo khác đã cấu hình ẩn). | ☐ |
| 11.5 | Gõ trực tiếp URL Demo (vd. `/member-hub/consumer`). | Khi Demo tắt: gõ URL đó → bị chuyển về trang chủ hoặc 404, **không** vào được trang consumer. | ☐ |
| 11.6 | Kiểm tra trang chủ / Hub: khi tắt Demo không còn link/block dẫn tới trang Demo. | Trang chủ và Hub không hiển thị nút/link dẫn tới Mua sắm (và các tính năng Demo khác đã ẩn). | ☐ |

**Kết luận bước 11:** Bật Demo thì vẫn vào được consumer; tắt Demo thì menu và URL Demo bị ẩn/redirect thì sang Bước 12.

---

## Bước 12 – Cập nhật GO_LIVE_CHECKLIST.md (bảng route, mục ẩn Demo)

**Công việc:**
- Cập nhật file `.architecture/GO_LIVE_CHECKLIST.md`: bảng route/feature rõ cột Live vs Demo; Phase 09 (Member – Tiêu dùng) ghi **Demo**, ẩn khi `VITE_SHOW_DEMO_FEATURES=false`.
- Thêm mục “Ẩn tính năng Demo” với biến `VITE_SHOW_DEMO_FEATURES` và hướng dẫn bật/tắt.

---

### Dừng lại – Checklist test (Bước 12)

| # | Việc cần làm | Cách kiểm tra | Đạt? |
|---|--------------|---------------|------|
| 12.1 | Mở file GO_LIVE_CHECKLIST.md. | Mở trong editor hoặc xem trên repo. | ☐ |
| 12.2 | Kiểm tra bảng route có cột Live/Demo. | Bảng Phase 01–12 có cột rõ **Live** hay **Demo**; Phase 09 (Tiêu dùng) ghi **Demo**. | ☐ |
| 12.3 | Kiểm tra có mục “Ẩn tính năng Demo”. | Có đoạn mô tả biến `VITE_SHOW_DEMO_FEATURES` và hướng dẫn khi = false thì ẩn route/menu Demo. | ☐ |
| 12.4 | Đọc lại toàn bộ checklist. | Nội dung khớp với hành vi đã test ở Bước 11 (bật/tắt Demo). | ☐ |

**Kết luận bước 12:** Tài liệu đã đầy đủ và nhất quán với cách ẩn Demo đã làm.

---

## Tóm tắt thứ tự

1. Database: cooperatives + vita_applications + RLS  
2. Database: green_investment_opportunities + RLS  
3. Auth HTX (đăng ký/đăng nhập, session cooperative_id)  
4. Auth xã viên (đăng ký/đăng nhập, session user_id)  
5. Profile HTX: nút Đăng ký VITA + gửi đơn + email  
6. Admin: trang phê duyệt đơn VITA + email kết quả  
7. HTX: route projects, tạo dự án ghi DB  
8. Member Capital + ESG: đọc dự án từ DB  
9. Thanh toán: cổng + luồng góp vốn  
10. E-contract: tạo + ký, lưu trạng thái  
11. Demo toggle: env + ẩn route/menu  
12. Cập nhật GO_LIVE_CHECKLIST.md  

Sau mỗi bước: **dừng lại**, chạy đủ ô trong checklist tương ứng, đạt hết rồi mới chuyển bước tiếp theo.
