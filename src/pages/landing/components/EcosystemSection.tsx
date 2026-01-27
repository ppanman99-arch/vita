import { useState } from 'react';
import { ECOSYSTEM_GROUPS, WHEEL_ORBIT_ORDER, type EcosystemGroup } from './ecosystemData';

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

/** Flow dọc - Phiên bản A (Mobile) */
function EcosystemFlowVertical({
  onTogglePortals,
  expandedId,
}: {
  onTogglePortals: (id: string) => void;
  expandedId: string | null;
}) {
  const productionIndex = ECOSYSTEM_GROUPS.findIndex((g) => g.id === 'production');
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

/** Bánh xe Desktop: tâm = Chất lượng & Khoa học, 4 nhóm trên vòng, Điều hành = hình chữ nhật nằm ngang bên dưới (nền) */
function EcosystemWheel({
  onTogglePortals,
  expandedId,
}: {
  onTogglePortals: (id: string) => void;
  expandedId: string | null;
}) {
  const centerGroup = ECOSYSTEM_GROUPS.find((g) => g.id === 'quality-science');
  const governanceGroup = ECOSYSTEM_GROUPS.find((g) => g.id === 'governance');
  const orbitGroups = WHEEL_ORBIT_ORDER.map((id) => ECOSYSTEM_GROUPS.find((g) => g.id === id)).filter(Boolean) as EcosystemGroup[];

  // Vòng tròn: 4 điểm đặt trên orbit. Góc để flow: Đầu vào (trên-trái) → Sản xuất (trái) → Đầu ra (phải) → Vốn (trên-phải) → nối lại Đầu vào
  // Góc tính từ tâm: 0 = phải, 90 = dưới, 180 = trái, 270 = trên. Ta muốn Đầu vào ~10h, Sản xuất ~8h, Đầu ra ~4h, Vốn ~2h.
  const positions = [
    { angle: 150 }, // Đầu vào - trên trái
    { angle: 210 }, // Sản xuất - trái
    { angle: 330 }, // Đầu ra - phải
    { angle: 30 },  // Vốn & Tác động - trên phải
  ];
  const radius = 160; // px from center to orbit
  const cx = 50; // % or use fixed - we'll use a wrapper with aspect
  const cy = 45;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Phần vòng tròn đặt trên nền */}
      <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
        {/* Orbit nodes */}
        {orbitGroups.map((group, i) => {
          const pos = positions[i];
          const rad = (pos.angle * Math.PI) / 180;
          const x = 50 + (radius / 280) * 50 * Math.cos(rad);
          const y = 50 + (radius / 280) * 50 * Math.sin(rad);
          const gradientClass = GROUP_COLORS[group.id];
          const expanded = expandedId === group.id;
          return (
            <div
              key={group.id}
              className="absolute w-28 sm:w-32 flex flex-col items-center justify-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <button
                type="button"
                onClick={() => onTogglePortals(group.id)}
                className={`w-full rounded-xl bg-gradient-to-br ${gradientClass} p-3 shadow-lg hover:shadow-xl transition-all text-white text-center`}
              >
                <i className={`${group.icon} text-xl sm:text-2xl block mb-1`}></i>
                <span className="text-xs sm:text-sm font-bold leading-tight block">{group.label}</span>
              </button>
              {expanded && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 w-56 bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Portals</p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {group.portals.map((p, j) => (
                      <li key={j}>{p.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {/* Center hub: Chất lượng & Khoa học */}
        {centerGroup && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <button
              type="button"
              onClick={() => onTogglePortals(centerGroup.id)}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${GROUP_COLORS[centerGroup.id]} shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center text-white border-4 border-white`}
            >
              <i className={`${centerGroup.icon} text-2xl sm:text-3xl mb-0.5`}></i>
              <span className="text-[10px] sm:text-xs font-bold leading-tight text-center px-1">{centerGroup.label}</span>
            </button>
            {expandedId === centerGroup.id && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-20 w-56 bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                <ul className="space-y-1 text-xs text-gray-600">
                  {centerGroup.portals.map((p, j) => (
                    <li key={j}>{p.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* SVG ring + flow arrows (optional decorative circle) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-200" />
          {/* Flow arrows along circle: input -> production -> output -> capital -> (back to input for visual loop) */}
          <path d="M 28 35 Q 22 50 28 65" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-400" markerEnd="url(#arrow)" />
          <path d="M 28 65 Q 50 72 72 65" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-400" markerEnd="url(#arrow)" />
          <path d="M 72 65 Q 78 50 72 35" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-400" markerEnd="url(#arrow)" />
          <path d="M 72 35 Q 50 28 28 35" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-400" markerEnd="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill="currentColor" className="text-emerald-500" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Nền: Điều hành & Chính sách - hình chữ nhật nằm ngang bên dưới vòng tròn */}
      {governanceGroup && (
        <div className="w-full max-w-2xl mt-4 sm:mt-6">
          <button
            type="button"
            onClick={() => onTogglePortals(governanceGroup.id)}
            className="w-full rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 border-2 border-gray-500"
          >
            <i className={`${governanceGroup.icon} text-2xl sm:text-3xl`}></i>
            <div className="text-left">
              <span className="font-bold text-base sm:text-lg block">{governanceGroup.label}</span>
              <span className="text-xs sm:text-sm text-gray-300">{governanceGroup.shortDescription}</span>
            </div>
          </button>
          {expandedId === governanceGroup.id && (
            <div className="mt-2 p-4 bg-white rounded-xl border border-gray-200 shadow-lg">
              <ul className="space-y-1.5 text-sm text-gray-600">
                {governanceGroup.portals.map((p, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <i className="ri-checkbox-blank-circle-fill text-emerald-500 text-[6px]"></i>
                    {p.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
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

        {/* Mobile: Flow dọc (Version A) */}
        <div className="lg:hidden">
          <EcosystemFlowVertical onTogglePortals={handleTogglePortals} expandedId={expandedId} />
        </div>

        {/* Desktop: Bánh xe + nền chữ nhật */}
        <div className="hidden lg:block">
          <EcosystemWheel onTogglePortals={handleTogglePortals} expandedId={expandedId} />
        </div>
      </div>
    </div>
  );
}
