import React from 'react';

const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  change, 
  icon, 
  color, 
  progress, 
  progressLabel, 
  valueColor,
  valueSuffix,
  liveBadge
}) => {
  const colorMap = {
    primary: { bg: 'from-primary/10 to-secondary/10', border: 'border-primary/20', text: 'text-primary' },
    secondary: { bg: 'from-secondary/10 to-accent/10', border: 'border-secondary/20', text: 'text-secondary' },
    accent: { bg: 'from-accent/10 to-cyan-400/10', border: 'border-accent/20', text: 'text-accent' },
    warning: { bg: 'from-amber-500/10 to-emerald-500/10', border: 'border-amber-500/20', text: 'text-amber-500' },
  };

  const gradientMap = {
    primary: 'from-primary to-secondary',
    secondary: 'from-secondary to-accent',
    accent: 'from-accent to-cyan-400',
    warning: 'from-amber-500 to-emerald-500',
  };

  const iconMap = {
    calendar: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" fill="currentColor" opacity="0.15" />
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 9H21M8 2V6M16 2V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    'credit-card': (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="3" fill="currentColor" opacity="0.15" />
        <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    users: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.15" />
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    star: (
      <span className="text-[18px]">⭐</span>
    ),
  };

  const colors = colorMap[color];
  const gradient = gradientMap[color];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.05)] relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${gradient}`} />
      
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center ${colors.text}`}>
          {iconMap[icon]}
        </div>
        {change && (
          <div className="flex items-center gap-1 bg-emerald-50 rounded-lg px-2 py-1">
            <span className="font-bold text-[11px] leading-none text-emerald-600">{change}</span>
          </div>
        )}
        {liveBadge && (
          <div className="flex items-center gap-1 bg-blue-50 rounded-lg px-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-blink-dot" />
            <span className="font-bold text-[11px] leading-none text-accent">{liveBadge}</span>
          </div>
        )}
      </div>
      
      <div className="mb-1">
        <span className="font-extrabold text-[28px] leading-none text-[#0A0A0F]">
          {value}
        </span>
        {subtitle && (
          <span className="font-normal text-[16px] text-[#9090A0] ml-1">{subtitle}</span>
        )}
        {valueSuffix && (
          <span className={valueColor || colors.text}>{valueSuffix}</span>
        )}
      </div>
      
      <div className="font-medium text-[13px] leading-none text-[#6B7280]">{title}</div>
      
      <div className="mt-3 h-1 bg-[#F0F0F4] rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${gradient} rounded-full`} style={{ width: `${progress}%` }} />
      </div>
      
      <div className="flex justify-between mt-1">
        <span className="font-normal text-[10px] leading-none text-[#B0B0C0]">{subtitle}</span>
        <span className={`font-semibold text-[10px] leading-none ${colors.text}`}>{progressLabel}</span>
      </div>
    </div>
  );
};

export default KPICard;