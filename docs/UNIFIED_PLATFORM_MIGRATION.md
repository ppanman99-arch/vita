# Unified Platform Migration Guide

## Tổng quan

Tài liệu này hướng dẫn cách migrate và đấu nối 2 nền tảng (VITA và nguyenmanhthuan) để dùng chung 1 Supabase project cho Green Points và Users.

## Kiến trúc

```
┌─────────────────┐         ┌─────────────────┐
│   VITA Platform │         │ nguyenmanhthuan │
│                 │         │    Platform     │
└────────┬────────┘         └────────┬────────┘
         │                            │
         │                            │
         └────────────┬───────────────┘
                      │
                      ▼
         ┌─────────────────────────┐
         │   Unified Supabase      │
         │   Project (VITA)        │
         │                          │
         │  - users                 │
         │  - user_mappings         │
         │  - green_points          │
         │  - green_point_transactions│
         └─────────────────────────┘
```

## Các bước thực hiện

### Bước 1: Chuẩn bị Supabase Project

1. **Chọn Supabase project chính**: Dùng project VITA làm project chính
2. **Chạy migration script**: 
   ```bash
   # Trong Supabase Dashboard → SQL Editor
   # Chạy file: supabase/migrations/001_unified_users_and_green_points.sql
   ```

### Bước 2: Export dữ liệu từ nguyenmanhthuan

1. Vào Supabase Dashboard của project nguyenmanhthuan
2. Export các tables:
   - `users` (nếu có)
   - `green_points` (nếu có)
   - `green_point_transactions` (nếu có)

### Bước 3: Migrate dữ liệu

Sử dụng script migration:

```typescript
// src/scripts/migrateNguyenmanhthuan.ts
import { createClient } from '@supabase/supabase-js';

const nguyenmanhthuanSupabase = createClient(
  'YOUR_NGUYENMANHTHUAN_SUPABASE_URL',
  'YOUR_NGUYENMANHTHUAN_SUPABASE_KEY'
);

const vitaSupabase = createClient(
  'YOUR_VITA_SUPABASE_URL',
  'YOUR_VITA_SUPABASE_KEY'
);

async function migrateUsers() {
  const { data: users } = await nguyenmanhthuanSupabase
    .from('users')
    .select('*');

  for (const user of users || []) {
    await vitaSupabase.from('users').insert({
      email: user.email,
      phone: user.phone,
      platform_source: 'nguyenmanhthuan',
      external_id: user.id,
      metadata: { original_data: user },
    });
  }
}

async function migrateGreenPoints() {
  const { data: points } = await nguyenmanhthuanSupabase
    .from('green_points')
    .select('*');

  for (const point of points || []) {
    // Tìm user đã migrate
    const { data: mappedUser } = await vitaSupabase
      .from('users')
      .select('id')
      .eq('external_id', point.user_id)
      .eq('platform_source', 'nguyenmanhthuan')
      .single();

    if (mappedUser) {
      await vitaSupabase.from('green_points').insert({
        user_id: mappedUser.id,
        user_type: point.user_type,
        total_points: point.total_points,
        available_points: point.available_points,
        locked_points: point.locked_points,
        lifetime_points: point.lifetime_points,
        tier: point.tier,
        platform_source: 'nguyenmanhthuan',
        // ... các field khác
      });
    }
  }
}
```

### Bước 4: Update Environment Variables

**VITA Platform** (`.env`):
```env
VITE_SUPABASE_URL=https://your-vita-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-vita-anon-key
```

**nguyenmanhthuan Platform** (`.env`):
```env
VITE_SUPABASE_URL=https://your-vita-project.supabase.co  # Cùng URL với VITA
VITE_SUPABASE_ANON_KEY=your-vita-anon-key                # Cùng key với VITA
```

### Bước 5: Enable Realtime

Trong Supabase Dashboard:
1. Vào **Database** → **Replication**
2. Enable Realtime cho:
   - `users`
   - `user_mappings`
   - `green_points`
   - `green_point_transactions`

Hoặc dùng SQL:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE user_mappings;
ALTER PUBLICATION supabase_realtime ADD TABLE green_points;
ALTER PUBLICATION supabase_realtime ADD TABLE green_point_transactions;
```

### Bước 6: Update Code

Code đã được update trong:
- `src/lib/users/unifiedUserService.ts` - Unified user management
- `src/lib/greenPoints/service.ts` - Green Points với unified user ID
- `src/lib/greenPoints/realtimeService.ts` - Realtime subscriptions

### Bước 7: Test

1. **Test User Creation**:
   ```typescript
   import { UnifiedUserService } from './lib/users/unifiedUserService';
   
   // Tạo user từ VITA
   const vitaUser = await UnifiedUserService.getOrCreateUnifiedUser('vita', {
     email: 'user@example.com',
     phone: '0123456789',
   });
   
   // Tạo user từ nguyenmanhthuan
   const nguyenmanhthuanUser = await UnifiedUserService.getOrCreateUnifiedUser('nguyenmanhthuan', {
     email: 'user@example.com',
     phone: '0123456789',
   });
   
   // Link 2 users nếu cùng 1 người
   await UnifiedUserService.linkUsers(vitaUser.id, nguyenmanhthuanUser.id);
   ```

2. **Test Green Points**:
   ```typescript
   import { earnPoints } from './lib/greenPoints/service';
   
   // Earn points từ VITA
   await earnPoints(
     userId,
     'consumer',
     100,
     'Purchase',
     'purchase',
     'vita-consumer',
     {},
     'vita'
   );
   
   // Earn points từ nguyenmanhthuan
   await earnPoints(
     userId,
     'consumer',
     50,
     'Purchase',
     'purchase',
     'nguyenmanhthuan-consumer',
     {},
     'nguyenmanhthuan'
   );
   ```

3. **Test Realtime**:
   ```typescript
   import { useGreenPointsRealtime } from './lib/greenPoints/realtimeService';
   
   function MyComponent() {
     const { points, loading } = useGreenPointsRealtime(userId);
     // points sẽ tự động update khi có thay đổi
   }
   ```

## Lưu ý quan trọng

1. **Backup trước khi migrate**: Luôn backup dữ liệu trước khi migrate
2. **Test trên staging**: Test kỹ trên môi trường staging trước khi deploy production
3. **User ID Mapping**: Đảm bảo user ID mapping chính xác giữa 2 nền tảng
4. **RLS Policies**: Điều chỉnh Row Level Security policies phù hợp với authentication setup
5. **Realtime**: Enable Realtime chỉ cho các tables cần thiết để tối ưu performance

## Troubleshooting

### Lỗi: "User not found"
- Kiểm tra user_mappings table
- Đảm bảo unified_user_id được set đúng

### Lỗi: "Realtime not working"
- Kiểm tra Realtime đã được enable trong Supabase Dashboard
- Kiểm tra RLS policies không block subscriptions

### Lỗi: "Platform source mismatch"
- Đảm bảo platform_source được set đúng khi tạo user/points
- Kiểm tra constraint trong database

## Support

Nếu gặp vấn đề, kiểm tra:
1. Supabase Dashboard logs
2. Browser console logs
3. Network requests trong DevTools
