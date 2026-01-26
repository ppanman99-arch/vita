// Service to handle user data operations
// Reads from public/data/users.json instead of API route

interface User {
  [key: string]: any;
}

interface UserListResponse {
  success: boolean;
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  totals?: {
    doanhSo: number;
    green: number;
    tongGopVND: number;
    tongGopGREEN: number;
  };
  error?: string;
}

// Hàm tính điểm khớp dựa trên tỷ lệ khớp
function calculateMatchScore(user: any, searchTerm: string): number {
  const searchLower = searchTerm.toLowerCase().trim();
  if (!searchLower) return 0;

  let maxScore = 0;

  // Duyệt qua tất cả các giá trị trong user
  Object.values(user).forEach((value: any) => {
    const valueStr = String(value || '').toLowerCase();
    if (!valueStr) return;

    // 1. Khớp chính xác: 100 điểm
    if (valueStr === searchLower) {
      maxScore = Math.max(maxScore, 100);
      return;
    }

    // 2. Khớp từ đầu: 80 điểm + bonus dựa trên độ dài khớp
    if (valueStr.startsWith(searchLower)) {
      const matchRatio = searchLower.length / valueStr.length;
      const score = 80 + (matchRatio * 20); // 80-100 điểm
      maxScore = Math.max(maxScore, score);
      return;
    }

    // 3. Khớp ở giữa (contains): 50 điểm + bonus dựa trên độ dài khớp
    if (valueStr.includes(searchLower)) {
      const matchRatio = searchLower.length / valueStr.length;
      const score = 50 + (matchRatio * 30); // 50-80 điểm
      maxScore = Math.max(maxScore, score);
      return;
    }

    // 4. Khớp một phần (fuzzy match): Tính điểm dựa trên số ký tự khớp
    const commonChars = getCommonCharacters(valueStr, searchLower);
    if (commonChars > 0) {
      const matchRatio = commonChars / Math.max(valueStr.length, searchLower.length);
      const score = matchRatio * 40; // 0-40 điểm
      maxScore = Math.max(maxScore, score);
    }
  });

  return maxScore;
}

// Hàm tính số ký tự chung (đơn giản)
function getCommonCharacters(str1: string, str2: string): number {
  const chars1 = str1.split('');
  const chars2 = str2.split('');
  let common = 0;
  
  chars1.forEach(char => {
    const index = chars2.indexOf(char);
    if (index !== -1) {
      common++;
      chars2.splice(index, 1);
    }
  });
  
  return common;
}

export class UserService {
  private usersData: User[] | null = null;

  async loadUsersData(): Promise<User[]> {
    if (this.usersData) {
      return this.usersData;
    }

    try {
      const response = await fetch('/data/users.json');
      if (!response.ok) {
        throw new Error(`Failed to load users.json: ${response.status}`);
      }
      this.usersData = await response.json();
      return this.usersData;
    } catch (error) {
      console.error('Error loading users.json:', error);
      throw error;
    }
  }

  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    top?: boolean;
  }): Promise<UserListResponse> {
    try {
      const usersData = await this.loadUsersData();
      const page = params.page || 1;
      const limit = params.limit || 100;
      const search = params.search || '';
      const topResults = params.top === true;

      let filteredData = usersData;

      // Nếu có search và yêu cầu top results
      if (search && topResults) {
        // Tính điểm khớp cho mỗi user
        const usersWithScores = usersData.map((user: any) => ({
          ...user,
          _matchScore: calculateMatchScore(user, search)
        }));

        // Lọc bỏ những user có điểm = 0
        const matchedUsers = usersWithScores.filter((user: any) => user._matchScore > 0);

        // Sắp xếp theo điểm giảm dần
        matchedUsers.sort((a: any, b: any) => b._matchScore - a._matchScore);

        // Lấy top 5
        filteredData = matchedUsers.slice(0, 5).map((user: any) => {
          const { _matchScore, ...userWithoutScore } = user;
          return { ...userWithoutScore, _matchScore }; // Giữ lại score để hiển thị
        });
      } else if (search) {
        // Tìm kiếm thông thường (không dùng top results)
        filteredData = usersData.filter((user: any) => {
          const searchLower = search.toLowerCase();
          return Object.values(user).some((value: any) => 
            String(value || '').toLowerCase().includes(searchLower)
          );
        });
      }

      // Tính tổng Doanh số, Green và Tổng góp
      let totalDoanhSo = 0;
      let totalGreen = 0;
      let totalTongGopVND = 0;
      let totalTongGopGREEN = 0;

      usersData.forEach((user: any) => {
        // Parse Tổng góp từ string "0 VNĐ \n 0 GREEN"
        if (user['Tổng góp']) {
          const tongGopStr = String(user['Tổng góp']);
          // Tách VNĐ và GREEN
          const parts = tongGopStr.split('\n');
          
          // Parse VNĐ
          const vndPart = parts.find((p: string) => p.includes('VNĐ'));
          if (vndPart) {
            const vndStr = vndPart.replace(/[^\d,]/g, '').replace(/,/g, '');
            const vnd = parseFloat(vndStr) || 0;
            totalTongGopVND += vnd;
          }
          
          // Parse GREEN
          const greenPart = parts.find((p: string) => p.includes('GREEN'));
          if (greenPart) {
            const greenStr = greenPart.replace(/[^\d,]/g, '').replace(/,/g, '');
            const green = parseFloat(greenStr) || 0;
            totalTongGopGREEN += green;
          }
        }

        // Parse Doanh số từ string "15,005,872,317 VNĐ"
        if (user['Doanh số']) {
          const doanhSoStr = String(user['Doanh số']).replace(/[^\d,]/g, '').replace(/,/g, '');
          const doanhSo = parseFloat(doanhSoStr) || 0;
          totalDoanhSo += doanhSo;
        }

        // Parse Green
        if (user['Green'] !== undefined && user['Green'] !== null) {
          const greenValue = typeof user['Green'] === 'string' 
            ? parseFloat(user['Green'].replace(/[^\d,.-]/g, '').replace(/,/g, '')) || 0
            : parseFloat(user['Green']) || 0;
          totalGreen += greenValue;
        }
      });

      // Pagination (chỉ áp dụng khi không phải top results)
      let paginatedData = filteredData;
      if (!topResults) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        paginatedData = filteredData.slice(startIndex, endIndex);
      }

      return {
        success: true,
        data: paginatedData,
        total: filteredData.length,
        page,
        limit,
        totalPages: Math.ceil(filteredData.length / limit),
        totals: {
          doanhSo: totalDoanhSo,
          green: totalGreen,
          tongGopVND: totalTongGopVND,
          tongGopGREEN: totalTongGopGREEN
        }
      };
    } catch (error) {
      console.error('Error in getUsers:', error);
      return {
        success: false,
        data: [],
        total: 0,
        page: 1,
        limit: 50,
        totalPages: 0,
        error: error instanceof Error ? error.message : 'Failed to load users'
      };
    }
  }
}
