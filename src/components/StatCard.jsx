import React from 'react';

/**
 * Compact stat card used in page stat-strips (Bookings, Payments, Analytics, etc).
 * Lighter than the full Dashboard KPICard (no progress bar) but shares the same
 * color language: gradient top bar, tinted icon well, green "up" pill.
 */
const StatCard = ({ label, value, change, gradient = 'from-[#D61CA8] to-[#8B2EF5]', icon }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.05)] relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${gradient}`} />
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center`}>
          {icon}
        </div>
        {change && (
          <div className="flex items-center gap-1 bg-[#F0FDF4] rounded-lg px-2 py-1">
            <span className="font-bold text-[11px] leading-none text-[#059669]">{change}</span>
          </div>
        )}
      </div>
      <div className="font-extrabold text-[26px] leading-none text-[#0A0A0F] mb-1">{value}</div>
      <div className="font-medium text-[13px] leading-none text-[#6B7280]">{label}</div>
    </div>
  );
};

export default StatCard;