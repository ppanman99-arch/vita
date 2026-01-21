import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

interface SkillTag {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  category: 'farming' | 'service' | 'processing' | 'esg';
  icon: string;
  description: string;
  unlocked: boolean;
  progress: number; // 0-100
  coursesCompleted: number;
  coursesTotal: number;
  unlocksTasks: string[];
}

export default function FarmerSkillBankPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'farming' | 'service' | 'processing' | 'esg'>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillTag | null>(null);

  const skillTags: SkillTag[] = [
    {
      id: 'skill-001',
      name: 'Trồng Sâm',
      level: 5,
      maxLevel: 10,
      category: 'farming',
      icon: 'ri-plant-line',
      description: 'Kỹ thuật trồng và chăm sóc Sâm Ngọc Linh, Sâm Đương Quy',
      unlocked: true,
      progress: 50,
      coursesCompleted: 3,
      coursesTotal: 6,
      unlocksTasks: ['Nhiệm vụ trồng Sâm lương cao', 'Quản lý vườn Sâm chuyên nghiệp'],
    },
    {
      id: 'skill-002',
      name: 'Dẫn tour',
      level: 3,
      maxLevel: 5,
      category: 'service',
      icon: 'ri-map-2-line',
      description: 'Kỹ năng dẫn đoàn khách tham quan nông trại, vườn dược liệu',
      unlocked: true,
      progress: 60,
      coursesCompleted: 2,
      coursesTotal: 3,
      unlocksTasks: ['Nhiệm vụ dẫn tour Farmstay', 'Hướng dẫn viên chuyên nghiệp'],
    },
    {
      id: 'skill-003',
      name: 'Sơ chế',
      level: 4,
      maxLevel: 8,
      category: 'processing',
      icon: 'ri-scissors-cut-line',
      description: 'Kỹ thuật sơ chế, bảo quản dược liệu sau thu hoạch',
      unlocked: true,
      progress: 50,
      coursesCompleted: 2,
      coursesTotal: 4,
      unlocksTasks: ['Nhiệm vụ sơ chế dược liệu', 'Quản lý kho bảo quản'],
    },
    {
      id: 'skill-004',
      name: 'ESG/Carbon',
      level: 2,
      maxLevel: 5,
      category: 'esg',
      icon: 'ri-leaf-line',
      description: 'Kiến thức về ESG, Tín chỉ Carbon và quản lý rừng bền vững',
      unlocked: true,
      progress: 40,
      coursesCompleted: 1,
      coursesTotal: 2,
      unlocksTasks: ['Nhiệm vụ quản lý Carbon', 'Giám sát rừng ESG'],
    },
    {
      id: 'skill-005',
      name: 'Trồng Quế',
      level: 6,
      maxLevel: 10,
      category: 'farming',
      icon: 'ri-tree-line',
      description: 'Kỹ thuật trồng và chăm sóc cây Quế, thu hoạch vỏ quế',
      unlocked: true,
      progress: 60,
      coursesCompleted: 4,
      coursesTotal: 6,
      unlocksTasks: ['Nhiệm vụ trồng Quế lương cao', 'Quản lý rừng Quế'],
    },
    {
      id: 'skill-006',
      name: 'Buồng phòng',
      level: 0,
      maxLevel: 5,
      category: 'service',
      icon: 'ri-hotel-bed-line',
      description: 'Kỹ năng dọn dẹp buồng phòng theo tiêu chuẩn khách sạn 5 sao',
      unlocked: false,
      progress: 0,
      coursesCompleted: 0,
      coursesTotal: 2,
      unlocksTasks: ['Nhiệm vụ dọn buồng phòng Farmstay'],
    },
  ];

  const categories = [
    { id: 'all', name: 'Tất cả', icon: 'ri-apps-line' },
    { id: 'farming', name: 'Canh tác', icon: 'ri-plant-line' },
    { id: 'service', name: 'Dịch vụ', icon: 'ri-service-line' },
    { id: 'processing', name: 'Sơ chế', icon: 'ri-scissors-cut-line' },
    { id: 'esg', name: 'ESG/Carbon', icon: 'ri-leaf-line' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skillTags 
    : skillTags.filter(skill => skill.category === selectedCategory);

  const unlockedSkills = skillTags.filter(skill => skill.unlocked);
  const lockedSkills = skillTags.filter(skill => !skill.unlocked);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'farming': return 'from-green-500 to-emerald-600';
      case 'service': return 'from-orange-500 to-amber-600';
      case 'processing': return 'from-blue-500 to-indigo-600';
      case 'esg': return 'from-teal-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelColor = (level: number, maxLevel: number) => {
    const percentage = (level / maxLevel) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-blue-600';
    if (percentage >= 30) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-xl sm:text-2xl"></i>
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 text-center px-2">Hồ sơ Năng lực</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{unlockedSkills.length}</div>
              <div className="text-xs text-purple-100">Kỹ năng đã mở</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {skillTags.reduce((sum, skill) => sum + skill.level, 0)}
              </div>
              <div className="text-xs text-purple-100">Tổng bậc kỹ năng</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {skillTags.reduce((sum, skill) => sum + skill.coursesCompleted, 0)}
              </div>
              <div className="text-xs text-purple-100">Khóa đã học</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className={category.icon}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Unlocked Skills */}
        {filteredSkills.filter(skill => skill.unlocked).length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-award-line text-purple-600"></i>
              Kỹ năng đã mở khóa
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {filteredSkills
                .filter(skill => skill.unlocked)
                .map((skill) => (
                  <div
                    key={skill.id}
                    className={`bg-gradient-to-br ${getCategoryColor(skill.category)} rounded-2xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-all`}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <i className={`${skill.icon} text-3xl`}></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{skill.name}</h3>
                          <p className="text-sm opacity-90">{skill.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getLevelColor(skill.level, skill.maxLevel)}`}>
                          Bậc {skill.level}
                        </div>
                        <div className="text-xs opacity-75">/ Bậc {skill.maxLevel}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Tiến độ học tập</span>
                        <span>{skill.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all"
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1 opacity-75">
                        {skill.coursesCompleted}/{skill.coursesTotal} khóa học đã hoàn thành
                      </div>
                    </div>

                    {/* Unlocks Tasks */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-xs opacity-90 mb-2">Mở khóa nhiệm vụ:</div>
                      <div className="flex flex-wrap gap-2">
                        {skill.unlocksTasks.map((task, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/20 rounded text-xs">
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Locked Skills */}
        {filteredSkills.filter(skill => !skill.unlocked).length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-lock-line text-gray-400"></i>
              Kỹ năng chưa mở khóa
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {filteredSkills
                .filter(skill => !skill.unlocked)
                .map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 opacity-60"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                          <i className={`${skill.icon} text-3xl text-gray-400`}></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                            {skill.name}
                            <i className="ri-lock-line text-gray-400"></i>
                          </h3>
                          <p className="text-sm text-gray-600">{skill.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-2">Để mở khóa, hoàn thành:</div>
                      <div className="text-sm text-gray-700">
                        {skill.coursesTotal} khóa học trong VITA Academy
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/farmer/community?tab=academy')}
                      className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
                    >
                      <i className="ri-graduation-cap-line mr-2"></i>
                      Học ngay trong VITA Academy
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedSkill.name}</h3>
              <button
                onClick={() => setSelectedSkill(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className={`bg-gradient-to-br ${getCategoryColor(selectedSkill.category)} rounded-xl p-4 text-white mb-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90 mb-1">Bậc hiện tại</div>
                  <div className="text-3xl font-bold">Bậc {selectedSkill.level}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90 mb-1">Tối đa</div>
                  <div className="text-2xl font-bold">Bậc {selectedSkill.maxLevel}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Mô tả</h4>
                <p className="text-sm text-gray-700">{selectedSkill.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Tiến độ học tập</h4>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getCategoryColor(selectedSkill.category)} rounded-full`}
                    style={{ width: `${selectedSkill.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {selectedSkill.coursesCompleted}/{selectedSkill.coursesTotal} khóa học đã hoàn thành
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Nhiệm vụ đã mở khóa</h4>
                <div className="space-y-2">
                  {selectedSkill.unlocksTasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <i className="ri-checkbox-circle-line text-green-600"></i>
                      <span className="text-sm text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  navigate('/farmer/community?tab=academy');
                  setSelectedSkill(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
              >
                <i className="ri-graduation-cap-line mr-2"></i>
                Tiếp tục học trong VITA Academy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/farmer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-home-5-line text-2xl"></i>
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/diary')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-book-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nhật ký</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/farm')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-map-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nông trại</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-medium">Ví</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-purple-600 cursor-pointer">
            <i className="ri-award-line text-2xl"></i>
            <span className="text-xs font-medium">Kỹ năng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
