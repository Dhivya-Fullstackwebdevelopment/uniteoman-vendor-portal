import React from 'react';
import PageHeader from '../PageHeader';
import StatCard from '../StatCard';

const WEEK = [
  { day: 'Mon', value: 1847, height: 64 },
  { day: 'Tue', value: 2341, height: 82 },
  { day: 'Wed', value: 2029, height: 71 },
  { day: 'Thu', value: 2800, height: 98 },
  { day: 'Fri', value: 3367, height: 118, peak: true },
  { day: 'Sat', value: 2564, height: 90 },
  { day: 'Sun', value: 1283, height: 46 },
];

const AREAS = [
  { name: 'Qurum', bookings: 312, pct: 22 },
  { name: 'Al Khuwair', bookings: 271, pct: 19 },
  { name: 'MSQ Hills', bookings: 228, pct: 16 },
  { name: 'Ruwi', bookings: 184, pct: 13 },
  { name: 'Bowsher', bookings: 156, pct: 11 },
  { name: 'Other areas', bookings: 271, pct: 19 },
];

const Analytics = () => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      <PageHeader title="Analytics" subtitle="Last 7 days · Muscat, Oman" actionLabel="Export Report" />

      <div className="p-6 flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-5">
          <StatCard label="Total Revenue" value="OMR 14,231" change="↑ 11%" gradient="from-[#D61CA8] to-[#8B2EF5]" icon={<span>💰</span>} />
          <StatCard label="Total Bookings" value="1,097" change="↑ 9%" gradient="from-accent to-cyan-400" icon={<span>📅</span>} />
          <StatCard label="Avg Order Value" value="OMR 25.9" change="↑ 2.1%" gradient="from-emerald-500 to-accent" icon={<span>🧾</span>} />
          <StatCard label="Customer Retention" value="68%" change="↑ 4%" gradient="from-amber-500 to-emerald-500" icon={<span>🔁</span>} />
        </div>

        <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-bold text-base leading-none text-[#0A0A0F]">Revenue — Last 7 Days</div>
              <div className="font-normal text-xs leading-none text-[#9090A0] mt-1.5">Total this week: OMR 14,231</div>
            </div>
          </div>

          <div className="flex items-end gap-3 h-[160px] pb-6 border-b border-[#F0F0F4]">
            {WEEK.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-md relative ${d.peak ? 'bg-gradient-to-b from-accent to-secondary shadow-[0_0_20px_rgba(75,110,245,0.4)]' : 'bg-gradient-to-b from-[#D61CA8] to-[#8B2EF5]'}`}
                  style={{ height: `${d.height}px` }}
                >
                  <div className={`absolute -top-[18px] left-1/2 -translate-x-1/2 whitespace-nowrap font-semibold text-[10px] ${d.peak ? 'text-accent' : 'text-primary'}`}>
                    {d.value.toLocaleString()}
                  </div>
                </div>
                <span className={`text-[11px] leading-none ${d.peak ? 'font-bold text-accent' : 'font-medium text-[#9090A0]'}`}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1.6fr_1fr] gap-5">
          <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
            <div className="font-bold text-base leading-none text-[#0A0A0F] mb-1">Bookings by Area</div>
            <div className="font-normal text-xs leading-none text-[#9090A0] mb-5">This week</div>
            <div className="flex flex-col gap-4">
              {AREAS.map((a) => (
                <div key={a.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-medium text-xs leading-none text-[#6B7280]">{a.name}</span>
                    <span className="font-bold text-xs leading-none text-[#0A0A0F]">{a.bookings} · {a.pct}%</span>
                  </div>
                  <div className="h-2 bg-[#F0F0F4] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5]" style={{ width: `${a.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="font-bold text-base leading-none text-[#0A0A0F]">Growth Snapshot</div>
            {[
              { label: 'New customers', value: '+284', sub: 'vs +251 last week' },
              { label: 'New professionals', value: '+18', sub: 'vs +12 last week' },
              { label: 'Repeat booking rate', value: '68%', sub: 'up from 64%' },
            ].map((row) => (
              <div key={row.label} className="bg-[#F8F8FA] rounded-xl p-3.5">
                <div className="font-medium text-[11px] leading-none text-[#9090A0]">{row.label}</div>
                <div className="font-extrabold text-xl leading-none text-[#0A0A0F] mt-2">{row.value}</div>
                <div className="font-normal text-[10px] leading-none text-[#9090A0] mt-1.5">{row.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;