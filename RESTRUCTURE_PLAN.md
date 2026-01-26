# KẾ HOẠCH TÁI CẤU TRÚC DỰ ÁN VITA

> **Lưu ý:** Tài liệu này là mục lục tổng quan. Chi tiết triển khai và checklist kiểm thử cho từng giai đoạn được lưu trong thư mục `.architecture/migration-phases/`.

---

## 📋 MỤC LỤC

### 1. Tổng quan
- [Xem Overview](./.architecture/migration-phases/00_overview.md) - Danh sách tất cả các phases và lộ trình

### 2. Các Giai đoạn Triển khai

#### Giai đoạn 1: Nền tảng & Khởi động
- [Chi tiết triển khai](./.architecture/migration-phases/phase-01/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-01/test-checklist.md)

#### Giai đoạn 2: Website nguyenmanhthuan - Hiển thị cơ bản
- [Chi tiết triển khai](./.architecture/migration-phases/phase-02/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-02/test-checklist.md)

#### Giai đoạn 3: Website nguyenmanhthuan - Thương mại & Tích điểm
- [Chi tiết triển khai](./.architecture/migration-phases/phase-03/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-03/test-checklist.md)

#### Giai đoạn 4: Cổng Hợp Tác Xã (HTX) - Truy cập & Định danh
- [Chi tiết triển khai](./.architecture/migration-phases/phase-04/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-04/test-checklist.md)

#### Giai đoạn 5: Cổng Hợp Tác Xã (HTX) - Quản trị & Hồ sơ
- [Chi tiết triển khai](./.architecture/migration-phases/phase-05/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-05/test-checklist.md)

#### Giai đoạn 6: Cổng Hợp Tác Xã (HTX) - Quản lý Xã viên
- [Chi tiết triển khai](./.architecture/migration-phases/phase-06/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-06/test-checklist.md)

#### Giai đoạn 7: Cổng Xã Viên (Member) - Hub & Role Switcher
- [Chi tiết triển khai](./.architecture/migration-phases/phase-07/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-07/test-checklist.md)

#### Giai đoạn 8: Cổng Xã Viên - Góp vốn (Capital Sub-module)
- [Chi tiết triển khai](./.architecture/migration-phases/phase-08/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-08/test-checklist.md)

#### Giai đoạn 9: Cổng Xã Viên - Tiêu dùng (Consumer Sub-module)
- [Chi tiết triển khai](./.architecture/migration-phases/phase-09/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-09/test-checklist.md)

#### Giai đoạn 10: Cổng ESG Doanh nghiệp - Cơ bản
- [Chi tiết triển khai](./.architecture/migration-phases/phase-10/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-10/test-checklist.md)

#### Giai đoạn 11: Cổng ESG Doanh nghiệp - Nâng cao (Báo cáo & Tín chỉ)
- [Chi tiết triển khai](./.architecture/migration-phases/phase-11/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-11/test-checklist.md)

#### Giai đoạn 12: Cổng ESG Cá nhân (Individual)
- [Chi tiết triển khai](./.architecture/migration-phases/phase-12/implementation.md)
- [Checklist kiểm thử](./.architecture/migration-phases/phase-12/test-checklist.md)

---

## 🎯 TỔNG QUAN KIẾN TRÚC

### Kiến trúc mục tiêu
- **Hybrid Architecture:** Kết hợp Clean Architecture (layers) và Hexagonal Architecture (ports & adapters)
- **Module-based:** Tách biệt các modules độc lập
- **Core Services:** Logic dùng chung nằm trong `src/core/`

### Cấu trúc thư mục mục tiêu
```
src/
├── core/                    # Core shared logic
│   ├── domain/             # Domain entities
│   ├── application/        # Application services
│   └── infrastructure/     # Adapters & Ports
├── modules/                # Feature modules
│   ├── nguyenmanhthuan/
│   ├── cooperative/
│   ├── member/
│   ├── esg-enterprise/
│   └── esg-individual/
└── shared/                 # Shared UI components
```

---

## 📊 TIẾN ĐỘ TRIỂN KHAI

| Phase | Module | Status | Người phụ trách | Ngày hoàn thành |
|-------|--------|--------|----------------|-----------------|
| 01 | Core Foundation | ⏳ Pending | - | - |
| 02 | nguyenmanhthuan - Basic | ⏳ Pending | - | - |
| 03 | nguyenmanhthuan - Commerce | ⏳ Pending | - | - |
| 04 | HTX - Access | ⏳ Pending | - | - |
| 05 | HTX - Dashboard | ⏳ Pending | - | - |
| 06 | HTX - Members | ⏳ Pending | - | - |
| 07 | Member - Core | ⏳ Pending | - | - |
| 08 | Member - Capital | ⏳ Pending | - | - |
| 09 | Member - Consumer | ⏳ Pending | - | - |
| 10 | ESG Enterprise - Basic | ⏳ Pending | - | - |
| 11 | ESG Enterprise - Advanced | ⏳ Pending | - | - |
| 12 | ESG Individual | ⏳ Pending | - | - |

**Chú thích:**
- ⏳ Pending: Chưa bắt đầu
- 🔄 In Progress: Đang thực hiện
- ✅ Completed: Đã hoàn thành
- ❌ Blocked: Bị chặn

---

## 📚 TÀI LIỆU THAM KHẢO

- [Architecture Overview](./.architecture/index.md)
- [Migration Phases Overview](./.architecture/migration-phases/00_overview.md)
- [CI/CD Setup](../CI_CD_SETUP.md)

---

**Cập nhật lần cuối:** $(date)  
**Phiên bản:** 2.0 (Restructured)
