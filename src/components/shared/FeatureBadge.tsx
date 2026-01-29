import type { FeatureBadgeVariant } from '../../config/goLiveRoutes';

interface FeatureBadgeProps {
  variant: FeatureBadgeVariant;
  className?: string;
  size?: 'sm' | 'md';
}

export default function FeatureBadge({ variant, className = '', size = 'sm' }: FeatureBadgeProps) {
  const isLive = variant === 'live';
  const label = isLive ? 'Live' : 'Demo';
  const iconClass = isLive ? 'ri-checkbox-circle-fill' : 'ri-flask-line';
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[10px] gap-0.5' : 'px-2 py-1 text-xs gap-1';

  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-full ${sizeClasses}
        ${isLive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}
        ${className}
      `}
      title={isLive ? 'Tính năng production-ready' : 'Tính năng demo, không cần database thật'}
    >
      <i className={iconClass} style={{ fontSize: size === 'sm' ? '10px' : '12px' }}></i>
      <span>{label}</span>
    </span>
  );
}
