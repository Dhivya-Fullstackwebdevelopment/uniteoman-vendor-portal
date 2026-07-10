import React from 'react';
import PageHeader from '../PageHeader';
import StatCard from '../StatCard';

const SERVICES = [
  { name: 'AC Deep Clean', icon: '❄️', bookingsMonth: 412, priceRange: 'OMR 15 – 25', share: 38, gradient: 'from-primary to-secondary' },
  { name: 'Home Cleaning', icon: '🧹', bookingsMonth: 268, priceRange: 'OMR 20 – 45', share: 24, gradient: 'from-secondary to-accent' },
  { name: 'Plumbing Fix', icon: '🔧', bookingsMonth: 167, priceRange: 'OMR 10 – 30', share: 15, gradient: 'from-accent to-cyan-400' },
  { name: 'Beauty at Home', icon: '💅', bookingsMonth: 134, priceRange: 'OMR 25 – 60', share: 12, gradient: 'from-primary to-accent' },
  { name: 'Pest Control', icon: '🐛', bookingsMonth: 61, priceRange: 'OMR 18 – 35', share: 6, gradient: 'from-emerald-500 to-accent' },
  { name: 'Electrical Repair', icon: '💡', bookingsMonth: 55, priceRange: 'OMR 12 – 28', share: 5, gradient: 'from-amber-500 to-red-500' },
];

const Services = () => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      <PageHeader title="Services" subtitle="6 active categories · Muscat, Oman" actionLabel="+ Add Service" />

      <div className="p-6 flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-5">
          <StatCard label="Active Services" value="6" gradient="from-[#D61CA8] to-[#8B2EF5]" icon={<span>🗂️</span>} />
          <StatCard label="Bookings This Month" value="1,097" change="↑ 9%" gradient="from-accent to-cyan-400" icon={<span>📈</span>} />
          <StatCard label="Most Popular" value="AC Clean" gradient="from-emerald-500 to-accent" icon={<span>🔥</span>} />
          <StatCard label="Avg Ticket Size" value="OMR 24" gradient="from-amber-500 to-emerald-500" icon={<span>🧾</span>} />
        </div>

        <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-bold text-base leading-none text-[#0A0A0F]">Service Catalog</div>
              <div className="font-normal text-xs leading-none text-[#9090A0] mt-1.5">Bookings and pricing by category, this month</div>
            </div>
            <div className="font-semibold text-[13px] leading-none text-primary cursor-pointer">Manage Categories →</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.name} className="bg-[#F8F8FA] rounded-2xl p-5 flex flex-col gap-4 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-lg`}>
                    {s.icon}
                  </div>
                  <div className="font-bold text-[11px] leading-none text-[#0A0A0F] bg-white rounded-lg px-2 py-1 border border-[#EBEBEF]">
                    {s.share}% of total
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm leading-none text-[#0A0A0F]">{s.name}</div>
                  <div className="font-normal text-[11px] leading-none text-[#9090A0] mt-2">{s.priceRange}</div>
                </div>
                <div className="h-px bg-[#EBEBEF]" />
                <div className="flex items-center justify-between">
                  <span className="font-normal text-[11px] leading-none text-[#9090A0]">Bookings</span>
                  <span className="font-bold text-xs leading-none text-[#0A0A0F]">{s.bookingsMonth}</span>
                </div>
                <div className="h-1.5 bg-[#EBEBEF] rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${s.gradient} rounded-full`} style={{ width: `${s.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;