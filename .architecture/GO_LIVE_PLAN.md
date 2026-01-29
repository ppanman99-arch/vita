# Kế hoạch Go-Live toàn diện VITA

Tài liệu tham chiếu: [.architecture/GO_LIVE_CHECKLIST.md](.architecture/GO_LIVE_CHECKLIST.md). Nguồn sự thật route Live/Demo: [src/config/goLiveRoutes.ts](src/config/goLiveRoutes.ts).

---

## 1. Portal Quản trị HTX (Go-Live)

### 1.1 Đăng ký, đăng nhập HTX

- **Hiện trạng:** [CooperativeRegisterAccountPage](src/modules/cooperative/presentation/pages/CooperativeRegisterAccountPage.tsx) và [CooperativeLoginPage](src/modules/cooperative/presentation/pages/CooperativeLoginPage.tsx) dùng sessionStorage và demo credentials.
- **Cần làm:**
- Nối đăng ký với Supabase Auth (hoặc dùng `VITE_USE_REAL_AUTH`): tạo user + ghi bản ghi HTX (bảng `cooperatives`) với `status: 'pending'`.
- Đăng nhập: xác thực qua Auth, lưu `cooperative_id` vào session và chuyển vào `/cooperative/dashboard`.
- Đảm bảo route `/cooperative/register-account`, `/cooperative/login` và các route con trong [CooperativeModuleRouter](src/modules/cooperative/infrastructure/CooperativeModuleRouter.tsx) hoạt động đầy đủ.

### 1.2 Khai báo thông tin HTX và đăng ký tham gia VITA

- **Hiện trạng:** [CooperativeProfile](src/modules/cooperative/presentation/components/CooperativeProfile.tsx) đã có form đầy đủ (tên, MST, năm thành lập, số thành viên, diện tích, địa chỉ, người đại diện, hoạt động, quan tâm). [CooperativeService](src/modules/cooperative/application/CooperativeService.ts) dùng Supabase nhưng **chưa có migration** cho bảng `cooperatives`.
- **Cần làm:**
- Thêm migration Supabase: bảng `cooperatives` (id, name, email, tax_code, established_year, member_count, total_forest_area, location, representative, representative_position, phone, current_activities, interests, additional_info, logo_url, **status** (pending | approved | rejected), created_at, updated_at) và nếu cần bảng `vita_applications` (cooperative_id, submitted_at, reviewed_at, reviewed_by, status, admin_notes).
- Trong Profile HTX: thêm nút/hành động **"Đăng ký tham gia hệ sinh thái VITA"**: gửi đơn (tạo/update `vita_applications` hoặc set `cooperatives.status = 'pending'`), gọi API hoặc Edge Function để gửi email cho (1) system admin và (2) email HTX (xác nhận đã gửi đơn).
- Trang/quy trình **System Admin**: danh sách đơn đăng ký VITA (pending), nút phê duyệt/từ chối; khi phê duyệt cập nhật `cooperatives.status = 'approved'` và gửi email hai bên (admin + HTX).
- **Vị trí phê duyệt đơn VITA:** Trang phê duyệt đặt tại route cố định (đề xuất `/admin-dashboard/vita-applications` hoặc `/greenlight-command`), dành cho **role system admin** (không phải HTX). RLS: chỉ system admin đọc/update `vita_applications` và `cooperatives.status`; HTX chỉ đọc bản ghi của mình.

#### Email (gửi đơn & phê duyệt)

- **Công nghệ:** Supabase Edge Function + Resend/SendGrid/Mailgun, hoặc API backend riêng.
- **Env:** `RESEND_API_KEY` (hoặc tương đương), `EMAIL_FROM`; key/secret chỉ server/Edge Function, không đưa lên client.
- **Template:** (1) Thông báo admin có đơn mới; (2) Xác nhận gửi đơn cho HTX; (3) Kết quả phê duyệt (approved/rejected) gửi hai bên (admin + HTX).

### 1.3 Công cụ tạo dự án trồng rừng, kêu gọi vốn, ESG

- **Hiện trạng:** Tạo dự án nằm ở [admin-forest-funding](src/pages/admin-forest-funding/page.tsx) và [esg-project-creation](src/pages/esg-project-creation/page.tsx); dữ liệu dự án cho xã viên/ESG lấy từ [GreenInvestmentOpportunityService](src/modules/member/application/GreenInvestmentOpportunityService.ts) (localStorage).
- **Cần làm:**
- Thêm route trong cooperative module, ví dụ `/cooperative/projects` (và nếu cần `/cooperative/projects/new`), hoặc link rõ ràng từ [CooperativeDashboardPage](src/modules/cooperative/presentation/pages/CooperativeDashboardPage.tsx) (đang wrap AdminDashboardPage) tới trang tạo dự án dành cho HTX (có thể reuse logic từ admin-forest-funding/esg-project-creation nhưng context là HTX đang đăng nhập).
- Khi HTX tạo/ publish dự án: ghi vào nguồn dữ liệu dùng chung — hoặc Supabase bảng `green_investment_opportunities` (projects) với `cooperative_id`, hoặc đồng bộ từ API vào `GreenInvestmentOpportunityService` (ví dụ qua API đọc/ghi).
- Đảm bảo Member Capital và ESG portal đọc danh sách dự án từ cùng nguồn này (xem mục 2 và 4).

### 1.4 Các tính năng khác trong portal HTX → Demo + toggle

- Các mục trong [AdminSidebar](src/pages/admin-dashboard/components/AdminSidebar.tsx) và quickLinks trong AdminDashboard không thuộc go-live (Sản xuất, Kho, Tài chính, Chuyên gia, GIS, Bao tiêu, Hợp đồng, Land Audit, Mua Giống, VITA Supply, Subscription, Skill Bank, v.v.) **đánh dấu Demo** và chuẩn bị ẩn khi tắt Demo (xem mục 6).

---

## 2. Portal Xã viên (Go-Live)

### 2.1 Đăng ký, đăng nhập xã viên

- **Hiện trạng:** Xã viên có thể dùng `/login` (demo) hoặc vào `/member-hub` (session).
- **Cần làm:**
- Xác định flow chính: đăng ký xã viên (form riêng hoặc từ `/home` → role xã viên) và đăng nhập; nối với Supabase Auth (hoặc `VITE_USE_REAL_AUTH`), lưu `user_id` vào session để Member Hub và Capital/Consumer dùng.
- **Route đăng ký xã viên:** Ghi rõ trong spec — ví dụ `/register?role=member`, `/member-hub/register`, hoặc form từ `/home` chọn role xã viên — để implement thống nhất.

### 2.2 Module Nhà đầu tư (Góp vốn) – Go-Live

- **Hiện trạng:** [InvestmentOpportunitiesPage](src/modules/member/capital/pages/InvestmentOpportunitiesPage.tsx) dùng [CapitalService](src/modules/member/application/CapitalService.ts); cơ hội đầu tư lấy từ [GreenInvestmentOpportunityService](src/modules/member/application/GreenInvestmentOpportunityService.ts) (ưu tiên), fallback MOCK_OPPORTUNITIES. Hành động góp vốn: `capitalService.invest()` chỉ cập nhật raised/local, chưa thanh toán thật, chưa hợp đồng điện tử.
- **Cần làm:**
- **Nguồn dự án:** Đảm bảo danh sách "Cơ hội đầu tư" là dự án do HTX đã tạo (từ Supabase hoặc API đồng bộ với GreenInvestmentOpportunityService), không chỉ mock.
- **Thanh toán:** Đấu nối API cổng thanh toán (VNPay/Momo/Stripe hoặc gateway nội bộ): khi xã viên chọn số tiền góp vốn, chuyển sang bước thanh toán, gọi API tạo giao dịch và xử lý callback; sau khi thanh toán thành công mới ghi invest và update raised.
- **Hợp đồng điện tử:** Sau khi thanh toán thành công (hoặc theo quy trình pháp lý), gọi API ký hợp đồng điện tử (tích hợp e-contract provider), lưu trạng thái/contract_id vào DB và hiển thị cho user.

### 2.3 Module Xã viên Mua sắm → Demo + toggle

- Các route `/member-hub/consumer`, `/member-hub/consumer/catalog`, history, vouchers, rewards **giữ là Demo**; chuẩn bị ẩn khi tắt tính năng Demo (mục 6).

---

## 3. Module Xã viên Mua sắm (Demo, có toggle)

- Không đưa vào go-live chức năng thật; giữ đầy đủ công cụ đăng ký/đăng nhập xã viên và chỉ **khởi chạy module mua sắm ở chế độ demo**.
- Đánh dấu Demo trong [goLiveRoutes](src/config/goLiveRoutes.ts) (các path `/member-hub/consumer*` đã là Demo vì chỉ prefix `/member-hub` là Live, cần thống nhất: hoặc coi toàn bộ member-hub là Live nhưng từng mục con là Live/Demo). Đề xuất: trong config thêm danh sách path con Demo (ví dụ consumer/*) để sidebar và menu ẩn khi tắt Demo.
- Chuẩn bị toggle: khi `VITE_SHOW_DEMO_FEATURES=false`, ẩn link/route tới consumer (xem mục 6).

---

## 4. Cổng Đầu tư ESG Doanh nghiệp (Go-Live)

- **Hiện trạng:** [ESGPortalPage](src/pages/esg-portal/page.tsx) dùng mảng `esgProjects` hardcode; có tab dự án, impact, v.v.
- **Auth ESG DN:** Đăng ký/đăng nhập ESG DN dùng Supabase Auth (hoặc `VITE_USE_REAL_AUTH`); session lưu để vào ESG portal và luồng đầu tư. Route `/esg-portal/login` (xem GO_LIVE_CHECKLIST) dùng chung Auth.
- **Cần làm:**
- **Hiển thị dự án từ HTX:** Lấy danh sách dự án từ cùng nguồn với Member Capital (Supabase `green_investment_opportunities` hoặc API/GreenInvestmentOpportunityService).
- **Landing page HTX:** Cho phép vào xem landing của từng HTX (route sẵn có [cooperative/landing/:coopId](src/modules/cooperative/infrastructure/CooperativeModuleRouter.tsx)); link từ card dự án tới `/cooperative/landing/:coopId`.
- **Đầu tư:** Luồng chọn dự án → số tiền → thanh toán (API cổng thanh toán) → ký hợp đồng điện tử; đấu nối API tài chính và e-contract tương tự mục 2.2.

---

## 5. Cổng Đầu tư ESG Cá nhân (Go-Live)

- **Hiện trạng:** [ESGOpportunitiesPage](src/modules/esg-individual/presentation/pages/ESGOpportunitiesPage.tsx) dùng `capitalService.getInvestmentOpportunities()` (cùng nguồn với Member Capital). Nút "Đầu tư" chuyển sang `/member-hub/capital/opportunities`.
- **Cần làm:**
- Giữ hoạt động ngon lành: lựa chọn dự án từ HTX, chuyển sang luồng góp vốn (có thể dùng chung với Member Capital hoặc trang riêng ESG cá nhân).
- Đấu nối đầy đủ API thanh toán và hợp đồng điện tử cho luồng đầu tư (dùng chung service/API với Member Capital và ESG Doanh nghiệp).

---

## 6. Đánh dấu Demo và cơ chế Bật/Tắt (Ẩn tính năng Demo)

### 6.1 Nguồn sự thật Live vs Demo

- Giữ [goLiveRoutes.ts](src/config/goLiveRoutes.ts): `LIVE_PATH_PREFIXES` và `LIVE_EXACT_PATHS` định nghĩa route Live; mọi route không nằm trong đó coi là Demo.
- Bổ sung (trong cùng file hoặc config mới): danh sách **path/prefix Demo cần ẩn khi tắt**, ví dụ: `/member-hub/consumer`, `/member-hub/consumer/*`, `/admin-production`, `/admin-warehouse`, … để router và menu chỉ hiển thị khi bật Demo.
- **Path con Demo:** Hiện `/member-hub` là Live nhưng **chỉ module Góp vốn** Live; **Mua sắm** = Demo. Cần danh sách path/prefix **con** là Demo (vd. `/member-hub/consumer`, `/member-hub/consumer/*`). Hàm `isDemoOnlyRoute` (hoặc mở rộng `isLiveRoute`) dùng danh sách này; menu/sidebar ẩn khi `VITE_SHOW_DEMO_FEATURES=false`. Cập nhật `goLiveRoutes` cho khớp.

### 6.2 Biến môi trường

- Thêm `VITE_SHOW_DEMO_FEATURES=true|false` (mặc định `true` để giữ hành vi hiện tại). Khi `false`: ẩn các tính năng Demo.

### 6.3 Cách ẩn

- **Router:** Trong [router/config.tsx](src/router/config.tsx), lọc bớt route: những route thuộc danh sách Demo (path/prefix) chỉ được đăng ký khi `VITE_SHOW_DEMO_FEATURES === 'true'`; khi false có thể redirect về trang chủ hoặc 404 cho path Demo.
- **Sidebar / Menu:** [AdminSidebar](src/pages/admin-dashboard/components/AdminSidebar.tsx), [MemberHubPage](src/modules/member/presentation/pages/MemberHubPage.tsx) (các thẻ Góp vốn, Tiêu dùng, Sản xuất, Tài nguyên, ESG Cá nhân), [Hub](src/pages/hub/page.tsx): ẩn mục tương ứng với route Demo khi `VITE_SHOW_DEMO_FEATURES === 'false'` (dùng `isLiveRoute` + danh sách Demo ẩn).
- **Badge:** Giữ [FeatureBadge](src/components/shared/FeatureBadge.tsx) cho trang Live/Demo; có thể ẩn luôn block/button dẫn tới trang Demo khi tắt.

### 6.4 Cập nhật GO_LIVE_CHECKLIST

- Cập nhật [.architecture/GO_LIVE_CHECKLIST.md](.architecture/GO_LIVE_CHECKLIST.md): bảng route/feature rõ ràng cột Live vs Demo; thêm mục "Ẩn tính năng Demo" với biến `VITE_SHOW_DEMO_FEATURES` và hướng dẫn bật/tắt.
- **Phase 09 (Member – Tiêu dùng):** Chuyển sang cột Demo; ghi chú "Demo, ẩn khi `VITE_SHOW_DEMO_FEATURES=false`". Sửa checklist cho đúng với Mua sắm = Demo.

---

## 7. Database và API

- **Migrations Supabase:**
- Bảng `cooperatives` (và nếu dùng riêng đơn đăng ký: `vita_applications`).
- Bảng `green_investment_opportunities` (hoặc `projects`) để HTX và admin tạo dự án, Member/ESG đọc và cập nhật raised/investors.
- **Auth:** Supabase Auth cho HTX và xã viên; RLS cho cooperatives, projects, investments.
- **RLS (tóm tắt):** HTX chỉ đọc/sửa `cooperatives` và `green_investment_opportunities` của mình (`cooperative_id`). Chỉ system admin đọc/update `vita_applications` và `cooperatives.status`. Investment records: user chỉ xem của mình.

### 7.1 Payment gateway & e-contract

- **Cổng thanh toán:** Tên (VNPay/Momo/Stripe/…), env (URL, key, secret; key/secret chỉ server/Edge Function). Luồng: tạo giao dịch → redirect/callback → cập nhật DB; tích hợp vào CapitalService.invest và luồng ESG.
- **E-contract:** Nhà cung cấp (nếu đã chọn), env. Luồng: tạo hợp đồng → gửi link ký / API ký → lưu `contract_id`, trạng thái.
- **Lỗi thanh toán / ký hợp đồng:** Xử lý payment failed, timeout, signing failed: thông báo user, **không** ghi invest/raised; có thể lưu trạng thái pending/failed trong DB để đối soát.

---

## 8. Thứ tự triển khai gợi ý

1. **Database:** Migration `cooperatives` (+ `vita_applications` nếu cần), `green_investment_opportunities`; RLS.
2. **Auth:** Đăng ký/đăng nhập HTX và xã viên với Supabase Auth.
3. **Portal HTX:** Luồng đăng ký VITA (gửi đơn → admin phê duyệt → email); tích hợp trang tạo dự án vào cooperative portal; ghi dự án vào DB/shared service.
4. **Nguồn dự án:** Member Capital + ESG (DN + cá nhân) đọc dự án từ DB/API thay vì chỉ mock/localStorage.
5. **Thanh toán và e-contract:** Đấu nối API; tích hợp vào CapitalService.invest và luồng ESG.
6. **Demo toggle:** Thêm `VITE_SHOW_DEMO_FEATURES`, lọc route và menu, cập nhật GO_LIVE_CHECKLIST.
7. **Cổng nguyenmanhthuan (mục 9):** Migration user từ cổng nguyenmanhthuan vào DB thống nhất; đăng nhập/lấy lại mật khẩu và SSO toàn portal.

Sau khi hoàn thành, toàn bộ phần không nằm trong kế hoạch go-live được đánh dấu Demo và có thể ẩn bằng cách tắt `VITE_SHOW_DEMO_FEATURES`.

---

## 9. Cổng nguyenmanhthuan (Go-Live) – Migration user và SSO toàn portal

**Mục tiêu:** Chuyển toàn bộ dữ liệu user của cổng nguyenmanhthuan vào database user thống nhất của dự án VITA; đảm bảo người dùng đăng ký/đăng nhập/lấy lại mật khẩu tại cổng nguyenmanhthuan hoạt động trơn tru, tài khoản được tạo đầy đủ trên nền tảng và **đăng nhập được vào tất cả các portal** (VITA home, Member Hub, ESG, HTX, nguyenmanhthuan, v.v.).

### 9.1 Hiện trạng

- Cổng nguyenmanhthuan: routes `/nguyen-manh-thuan`, `/nguyen-manh-thuan/dashboard`, `/cart`, `/checkout`, `/orders`, `/users`; module [nguyenmanhthuan](src/modules/nguyenmanhthuan/) dùng [AuthService](src/core/application/auth/AuthService.ts) và [SupabaseAuthAdapter](src/core/infrastructure/adapters/auth/SupabaseAuthAdapter.ts).
- Migration [001_unified_users_and_green_points.sql](supabase/migrations/001_unified_users_and_green_points.sql): bảng `users` (id, email, phone, platform_source, external_id, metadata), `user_mappings` (vita_user_id, nguyenmanhthuan_user_id, unified_user_id); bảng `green_points`, `green_point_transactions` có `platform_source` ('vita' | 'nguyenmanhthuan').
- Nếu tồn tại **cổng/ứng dụng nguyenmanhthuan riêng** (deploy tách, DB/Supabase riêng): user đăng ký ở đó chưa nằm trong Supabase Auth và bảng `users` thống nhất của VITA.

### 9.2 Cần làm

#### 9.2.1 Migration dữ liệu user từ cổng nguyenmanhthuan vào DB thống nhất

- **Nguồn dữ liệu:** Xác định nguồn user hiện tại của cổng nguyenmanhthuan (Supabase Auth cũ, bảng custom, file export, hoặc đã dùng chung Supabase với VITA). Nếu là Supabase/project khác: export users (auth.users hoặc bảng profile tương đương) với email, phone, password hash (nếu có), created_at.
- **Đích:** Supabase Auth của dự án VITA (auth.users) và bảng public `users` (unified) với `platform_source = 'nguyenmanhthuan'`; nếu cần giữ mapping với ID cũ thì dùng `external_id` hoặc bảng `user_mappings`.
- **Công việc:**
  - Script migration (one-off): đọc từ nguồn nguyenmanhthuan → tạo hoặc cập nhật user trong Supabase Auth (Admin API hoặc import) và ghi bản ghi tương ứng vào `users` với `platform_source = 'nguyenmanhthuan'`.
  - Xử lý trùng email/phone: nếu user đã tồn tại trên VITA (cùng email/phone), gắn với bản ghi thống nhất (unified_user_id / user_mappings), không tạo user Auth trùng.
  - Migration Green Points: chuyển dữ liệu green points/transactions từ nguồn nguyenmanhthuan sang `green_points` và `green_point_transactions` với `user_id` là ID thống nhất và `platform_source = 'nguyenmanhthuan'`.

#### 9.2.2 Đăng nhập và lấy lại mật khẩu tại cổng nguyenmanhthuan

- **Đăng nhập:** Trang/login cổng nguyenmanhthuan dùng AuthService + Supabase Auth (cùng Supabase project với VITA). Sau khi migration, user đăng nhập bằng email/password (hoặc phone/OTP nếu đã cấu hình) — session Supabase dùng chung toàn nền tảng.
- **Lấy lại mật khẩu (Forgot password):**
  - Dùng flow Supabase Auth: `resetPasswordForEmail` (hoặc tương đương); email gửi link đặt lại mật khẩu (Supabase hoặc custom template qua Edge Function).
  - Đảm bảo redirect sau khi đổi mật khẩu thành công quay về cổng nguyenmanhthuan (hoặc trang chủ VITA) và session được thiết lập đúng — user có thể vào ngay nguyenmanhthuan và các portal khác mà không cần đăng nhập lại.

#### 9.2.3 Tài khoản đầy đủ và đăng nhập một lần (SSO) cho mọi portal

- **Tài khoản đầy đủ:** Mỗi user (dù đăng ký từ cổng nguyenmanhthuan hay từ VITA/HTX/Member/ESG) được tạo trong Supabase Auth và có bản ghi thống nhất trong `users` (và role/profile bổ sung nếu có). Cổng nguyenmanhthuan khi đăng ký mới: gọi Supabase Auth signUp + insert/update `users` với `platform_source = 'nguyenmanhthuan'`.
- **Một tài khoản – mọi portal:** Sau khi đăng nhập (tại bất kỳ điểm nào: `/login`, `/nguyen-manh-thuan`, `/member-hub`, `/esg-portal/login`, `/cooperative/login`, v.v.), session Supabase Auth dùng chung; router và guard của từng portal kiểm tra `auth.getUser()` (hoặc AuthService.getCurrentUser()) — nếu có session thì cho phép truy cập (theo role nếu áp dụng). Không yêu cầu đăng nhập lại khi chuyển giữa /nguyen-manh-thuan, /member-hub, /esg-portal, /cooperative, v.v.
- **Kiểm tra:** Test case: (1) Đăng ký mới tại cổng nguyenmanhthuan → đăng nhập → vào Member Hub, ESG, HTX (nếu role cho phép) không cần login lại. (2) Lấy lại mật khẩu từ trang nguyenmanhthuan → đổi mật khẩu → đăng nhập tại nguyenmanhthuan và tại /login VITA cùng một tài khoản. (3) User đã migration: đăng nhập bằng credential cũ (sau khi đặt lại mật khẩu nếu đã reset) và truy cập tất cả portal.

### 9.3 Route và config

- Giữ route Live cho nguyenmanhthuan trong [goLiveRoutes.ts](src/config/goLiveRoutes.ts) (`/nguyen-manh-thuan` đã trong `LIVE_PATH_PREFIXES`). Sau go-live, cổng nguyenmanhthuan là entry Live, dùng chung Auth và DB user với toàn bộ dự án.
- Tài liệu tham khảo: [NGUYENMANHTHUAN_SETUP.md](../NGUYENMANHTHUAN_SETUP.md), [README_NGUYENMANHTHUAN.md](../README_NGUYENMANHTHUAN.md) (khi cổng từng deploy tách); sau migration chỉ còn một Supabase project và một bộ Auth.

### 9.4 Thứ tự thực hiện (trong mục 8)

- Sau bước Auth (8.2) và trước hoặc song song Demo toggle (8.6): chạy migration user nguyenmanhthuan (9.2.1), bật đăng nhập/lấy lại mật khẩu (9.2.2), xác nhận SSO toàn portal (9.2.3); cập nhật GO_LIVE_CHECKLIST nếu cần (Phase 02–03 nguyenmanhthuan: từ Demo sang Live sau khi migration và SSO xong).

---

Sau khi hoàn thành mục 9, người dùng cổng nguyenmanhthuan có dữ liệu nằm trong database user thống nhất, đăng nhập và lấy lại mật khẩu hoạt động trơn tru, và một tài khoản dùng được cho tất cả các portal.
