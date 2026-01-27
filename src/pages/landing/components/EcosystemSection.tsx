import { useState } from 'react';
import { ECOSYSTEM_GROUPS, type EcosystemGroup } from './ecosystemData';

const GROUP_COLORS: Record<string, string> = {
  'input': 'from-amber-500 to-orange-600',
  'quality-science': 'from-purple-500 to-indigo-600',
  'production': 'from-emerald-500 to-teal-600',
  'output': 'from-blue-500 to-cyan-600',
  'capital-impact': 'from-pink-500 to-rose-600',
  'governance': 'from-gray-600 to-gray-700',
};

const GROUP_BORDER: Record<string, string> = {
  'input': 'border-amber-300',
  'quality-science': 'border-purple-300',
  'production': 'border-emerald-300',
  'output': 'border-blue-300',
  'capital-impact': 'border-pink-300',
  'governance': 'border-gray-400',
};

function FlowCard({
  group,
  isGovernance,
  onTogglePortals,
  expandedId,
}: {
  group: EcosystemGroup;
  isGovernance?: boolean;
  onTogglePortals: (id: string) => void;
  expandedId: string | null;
}) {
  const borderClass = GROUP_BORDER[group.id] || 'border-gray-300';
  const gradientClass = GROUP_COLORS[group.id] || 'from-gray-500 to-gray-600';
  const expanded = expandedId === group.id;

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border-l-4 ${borderClass} overflow-hidden transition-all ${
        isGovernance ? 'bg-gray-50 border-2 border-dashed border-gray-300' : ''
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0`}>
            <i className={`${group.icon} text-white text-xl sm:text-2xl`}></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{group.label}</h3>
            <p className="text-sm text-gray-600 mb-3">{group.shortDescription}</p>
            <button
              type="button"
              onClick={() => onTogglePortals(group.id)}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>{expanded ? 'Thu gọn' : 'Xem các portal'}</span>
              <i className={`ri-arrow-${expanded ? 'up' : 'down'}-line`}></i>
            </button>
            {expanded && (
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600 border-t border-gray-100 pt-3">
                {group.portals.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <i className="ri-checkbox-blank-circle-fill text-emerald-500 text-[6px]"></i>
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Flow dọc - dùng chung mobile & desktop */
function EcosystemFlowVertical({
  onTogglePortals,
  expandedId,
}: {
  onTogglePortals: (id: string) => void;
  expandedId: string | null;
}) {
  const governanceGroup = ECOSYSTEM_GROUPS.find((g) => g.id === 'governance');
  const flowGroups = ECOSYSTEM_GROUPS.filter((g) => g.id !== 'governance');

  return (
    <div className="max-w-xl mx-auto space-y-0">
      {flowGroups.map((group, index) => (
        <div key={group.id}>
          <FlowCard
            group={group}
            onTogglePortals={onTogglePortals}
            expandedId={expandedId}
          />
          {index < flowGroups.length - 1 && (
            <div className="flex flex-col items-center py-2">
              {group.id === 'quality-science' ? (
                <>
                  <i className="ri-arrow-down-line text-emerald-500 text-2xl"></i>
                  <span className="text-xs font-medium text-emerald-600 mt-0.5">Sản xuất dựa trên</span>
                </>
              ) : (
                <i className="ri-arrow-down-line text-gray-300 text-2xl"></i>
              )}
            </div>
          )}
        </div>
      ))}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="text-center mb-2">
          <span className="text-xs text-gray-500">Bao bọc / Giám sát toàn chuỗi</span>
        </div>
        {governanceGroup && (
          <FlowCard
            group={governanceGroup}
            isGovernance
            onTogglePortals={onTogglePortals}
            expandedId={expandedId}
          />
        )}
      </div>
    </div>
  );
}

export default function EcosystemSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleTogglePortals = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Hệ Sinh Thái VITA</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            Chất lượng & Khoa học làm tâm; Đầu vào → Sản xuất (dựa trên Chuẩn) → Đầu ra → Vốn & Tác động.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Điều hành & Chính sách là nền quản trị và kết nối chính sách.
          </p>
        </div>

        {/* Flow dọc: dùng chung cho mobile và desktop */}
        <EcosystemFlowVertical onTogglePortals={handleTogglePortals} expandedId={expandedId} />
      </div>
    </div>
  );
}
