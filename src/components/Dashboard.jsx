import React from 'react';

const STATS = [
  { label: 'This Month', value: 'OMR 1,247', color: '#D61CA8', note: '↑ 23%' },
  { label: 'Jobs Done', value: '67', color: '#8B2EF5', note: '↑ 8' },
  { label: 'Rating', value: '★ 4.9', color: '#F59E0B', note: '847 reviews' },
  { label: 'Credits', value: '240', color: '#4B6EF5', note: 'Professional' },
];

const JOBS = [
  { icon: '❄️', iconBg: '#DBEAFE', name: 'AC Deep Cleaning', meta: 'Ahmed Al-Rashdi · 10:00 AM · Qurum', price: 'OMR 17', status: 'Done', statusTone: 'bg-emerald-100 text-emerald-600' },
  { icon: '⚡', iconBg: '#FEF3C7', name: 'Electrical Repair', meta: 'Khalid Al-Farsi · 2:00 PM · Al Khuwair', price: 'OMR 20', status: 'Active', statusTone: 'bg-blue-100 text-blue-600' },
  { icon: '🔧', iconBg: '#CFFAFE', name: 'Plumbing Fix', meta: 'Omar Al-Jabri · 4:30 PM · Bowsher', price: 'OMR 14', status: 'Upcoming', statusTone: 'bg-amber-100 text-amber-600' },
];

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Dashboard</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Wed 9 Jul 2026 · Muscat</div>
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="w-[10px] h-[10px] rounded-full bg-[#4ade80]" />
          <span className="text-[13px] font-semibold text-[#0A0A0F]">Online</span>
          <div className="w-[44px] h-[24px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-full relative cursor-pointer">
            <div className="absolute right-[3px] top-[3px] w-[18px] h-[18px] rounded-full bg-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[12px] mb-[18px]">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-[13px] p-[15px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: s.color }} />
            <div className="text-[11px] text-[#9090A0] uppercase tracking-[0.5px] mb-[6px]">{s.label}</div>
            <div className="text-[22px] font-extrabold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[11px] font-semibold text-[#10B981] mt-[4px]">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-[16px]">
        {/* Today's jobs */}
        <div>
          <div className="text-[14px] font-bold text-[#0A0A0F] mb-[10px]">Today's Jobs (3)</div>
          <div className="flex flex-col gap-[8px]">
            {JOBS.map((j) => (
              <div key={j.name} className="flex items-center gap-[12px] bg-white rounded-[13px] p-[13px] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-[19px] flex-shrink-0" style={{ background: j.iconBg }}>
                  {j.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-[#0A0A0F]">{j.name}</div>
                  <div className="text-[11px] text-[#9090A0] mt-[2px]">{j.meta}</div>
                </div>
                <div className="text-[13px] font-bold text-[#D61CA8]">{j.price}</div>
                <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold ${j.statusTone}`}>{j.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI insight + new job request */}
        <div>
          <div className="text-[14px] font-bold text-[#0A0A0F] mb-[10px]">✨ AI Insight</div>
          <div className="bg-[#D61CA80A] border border-[#D61CA81F] rounded-[13px] p-[13px] mb-[11px] flex gap-[8px]">
            <span>🤖</span>
            <div className="text-[13px] leading-relaxed text-[#6B7280]">
              <strong className="text-[#D61CA8]">Recommendation:</strong> Add afternoon slots Fri–Sat. AC demand up 34% this week. Bowsher has 12 unmatched bookings — expand coverage.
            </div>
          </div>

          <div className="bg-[#D61CA80D] border-[1.5px] border-[#D61CA833] rounded-[13px] p-[13px]">
            <div className="flex items-center gap-[6px] mb-[9px]">
              <div className="w-[7px] h-[7px] rounded-full bg-[#D61CA8]" />
              <div className="text-[11px] font-bold text-[#D61CA8]">New Job Request</div>
            </div>
            <div className="text-[14px] font-semibold text-[#0A0A0F] mb-[3px]">AC Gas Refill · MSQ Hills · OMR 22</div>
            <div className="text-[11px] text-[#9090A0] mb-[10px]">Today 5pm · 1.8km · 1 credit</div>
            <div className="flex gap-[8px]">
              <button className="flex-1 py-[8px] bg-[#FFE4E6] rounded-[9px] text-center text-[12px] font-bold text-[#EF4444]">Decline</button>
              <button className="flex-1 py-[8px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[9px] text-center text-[12px] font-bold text-white">Accept</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;