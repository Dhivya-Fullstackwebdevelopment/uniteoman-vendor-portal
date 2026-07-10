import React from 'react';
import PageHeader from '../PageHeader';

const stats = [
  { label: 'Revenue', value: 'OMR 1,247', delta: '↑ 23%', color: '#D61CA8', deltaColor: '#10B981' },
  { label: 'Jobs', value: '67', delta: '↑ 8', color: '#8B2EF5', deltaColor: '#10B981' },
  { label: 'Rating', value: '★ 4.9', delta: '847 reviews', color: '#F59E0B', deltaColor: '#10B981' },
  { label: 'Completion', value: '98%', delta: 'Market avg 91%', color: '#10B981', deltaColor: '#10B981' },
];

const revenueDays = [
  { day: 'M', height: 38 },
  { day: 'T', height: 56 },
  { day: 'W', height: 44 },
  { day: 'T', height: 70 },
  { day: 'F', height: 82, highlight: true },
  { day: 'S', height: 48 },
  { day: 'S', height: 30 },
];

const categories = [
  { icon: '❄️', label: 'AC Service', pct: 54, color: '#D61CA8' },
  { icon: '⚡', label: 'Electrical', pct: 22, color: '#8B2EF5' },
  { icon: '🔧', label: 'Plumbing', pct: 15, color: '#4B6EF5' },
  { icon: '📺', label: 'Appliance', pct: 9, color: '#10B981' },
];

const Analytics = () => {
  return (
    // <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
    //   <PageHeader title="Analytics" subtitle="AI-powered performance insights" />
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      {/* Title Section matching Credits layout */}
      <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F] mb-[6px]">Analytics</div>
      <div className="text-[14px] text-[#9090A0] mb-[20px]">
        AI-powered performance insights
      </div>


      <div className="p-6">
        {/* Top bar: AI toggle + month */}
        <div className="flex justify-end gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-[#D61CA8]/5 border border-[#D61CA8]/15 rounded-full px-2.5 py-1">
            <span>✨</span>
            <span className="font-semibold text-[10px] leading-none text-[#D61CA8]">AI Insights On</span>
          </div>
          <button className="px-3 py-1.5 bg-white border border-[#EBEBEF] rounded-lg font-medium text-[10px] leading-none text-[#6B7280] hover:border-[#D61CA8] transition-colors">
            July 2026 ▾
          </button>
        </div>

        {/* AI insight banner */}
        <div className="bg-[#D61CA8]/[0.04] border border-[#D61CA8]/[0.12] rounded-xl px-3 py-2.5 mb-4 flex gap-2">
          <span>🤖</span>
          <div className="font-normal text-[11px] leading-relaxed text-[#6B7280]">
            <strong className="text-[#D61CA8]">AI Insight:</strong> Completion rate 98% vs market avg 91%. Fri–Sat
            peak demand — add slots. Bowsher has 12 unmatched AC bookings — expand coverage there for more revenue.
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-2.5 mb-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
              <div className="font-normal text-[9px] leading-none text-[#9090A0] uppercase tracking-wide mb-1">
                {s.label}
              </div>
              <div className="font-extrabold text-[17px] leading-none" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="font-semibold text-[9px] leading-none mt-1" style={{ color: s.deltaColor }}>
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-[1.5fr_1fr] gap-2.5">
          <div className="bg-white rounded-2xl p-3.5 shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="font-bold text-xs leading-none text-[#0A0A0F] mb-3">Revenue Last 7 Days</div>
            <div className="flex items-end gap-2 h-20 border-b border-[#F0F0F4] pb-4">
              {revenueDays.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-[3px] ${d.highlight ? 'bg-gradient-to-b from-[#4B6EF5] to-[#8B2EF5]' : 'bg-gradient-to-br from-[#D61CA8] to-[#8B2EF5]'
                      }`}
                    style={{ height: `${d.height}px` }}
                  />
                  <span
                    className="font-normal text-[9px] leading-none"
                    style={{ color: d.highlight ? '#4B6EF5' : '#C0C0CC' }}
                  >
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="font-bold text-xs leading-none text-[#0A0A0F] mb-3">Jobs by Category</div>
            {categories.map((c) => (
              <div key={c.label} className="mb-2 last:mb-0">
                <div className="flex justify-between mb-0.5">
                  <span className="font-medium text-[10px] leading-none text-[#0A0A0F]">
                    {c.icon} {c.label}
                  </span>
                  <span className="font-bold text-[9px] leading-none" style={{ color: c.color }}>
                    {c.pct}%
                  </span>
                </div>
                <div className="h-1 bg-[#F0F0F4] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;