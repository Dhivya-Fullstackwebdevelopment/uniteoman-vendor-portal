import React from 'react';
import PageHeader from '../PageHeader';
import StatCard from '../StatCard';

const CUSTOMERS = [
  { name: 'Ahmed Al-Rashdi', initial: 'A', area: 'Qurum', bookings: 24, spend: 'OMR 612', lastBooking: '2 hours ago', tier: 'Gold', gradient: 'from-primary to-secondary' },
  { name: 'Khalid Al-Farsi', initial: 'K', area: 'Al Khuwair', bookings: 17, spend: 'OMR 448', lastBooking: 'Today', tier: 'Silver', gradient: 'from-accent to-secondary' },
  { name: 'Sara Al-Balushi', initial: 'S', area: 'MSQ Hills', bookings: 31, spend: 'OMR 890', lastBooking: 'Today', tier: 'Gold', gradient: 'from-primary to-accent' },
  { name: 'Omar Al-Jabri', initial: 'O', area: 'Ruwi', bookings: 9, spend: 'OMR 201', lastBooking: '3 days ago', tier: 'Bronze', gradient: 'from-secondary to-cyan-400' },
  { name: 'Nasser Al-Rawahi', initial: 'N', area: 'Bowsher', bookings: 14, spend: 'OMR 356', lastBooking: 'Yesterday', tier: 'Silver', gradient: 'from-emerald-500 to-accent' },
  { name: 'Laila Al-Amri', initial: 'L', area: 'Azaiba', bookings: 42, spend: 'OMR 1,240', lastBooking: 'Today', tier: 'Platinum', gradient: 'from-amber-500 to-red-500' },
];

const tierStyles = {
  Platinum: 'bg-purple-100 text-purple-600',
  Gold: 'bg-amber-100 text-amber-600',
  Silver: 'bg-slate-100 text-slate-600',
  Bronze: 'bg-orange-100 text-orange-600',
};

const Customers = () => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      <PageHeader title="Customers" subtitle="8,412 total customers · Muscat, Oman" actionLabel="+ Add Customer" />

      <div className="p-6 flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-5">
          <StatCard label="Total Customers" value="8,412" change="↑ 3.1%" gradient="from-[#D61CA8] to-[#8B2EF5]" icon={<span>👥</span>} />
          <StatCard label="New This Month" value="284" change="↑ 12%" gradient="from-accent to-cyan-400" icon={<span>🆕</span>} />
          <StatCard label="Repeat Rate" value="68%" change="↑ 4%" gradient="from-emerald-500 to-accent" icon={<span>🔁</span>} />
          <StatCard label="Avg Lifetime Value" value="OMR 214" gradient="from-amber-500 to-emerald-500" icon={<span>💰</span>} />
        </div>

        <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-[18px]">
            <div className="font-bold text-base leading-none text-[#0A0A0F]">Recent Customers</div>
            <div className="font-semibold text-[13px] leading-none text-primary cursor-pointer">View All →</div>
          </div>

          <div className="grid grid-cols-[1.4fr_1fr_90px_100px_120px_90px] gap-2 px-3 py-2 bg-[#F8F8FA] rounded-xl mb-2">
            {['Customer', 'Area', 'Bookings', 'Total Spend', 'Last Booking', 'Tier'].map((h) => (
              <span key={h} className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">{h}</span>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            {CUSTOMERS.map((c, index) => (
              <div key={c.name} className={`grid grid-cols-[1.4fr_1fr_90px_100px_120px_90px] gap-2 px-3 py-2.5 rounded-xl items-center ${index % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-[26px] h-[26px] rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center font-bold text-[10px] text-white flex-shrink-0`}>
                    {c.initial}
                  </div>
                  <span className="font-semibold text-xs leading-none text-[#0A0A0F]">{c.name}</span>
                </div>
                <span className="font-normal text-[11px] leading-none text-[#6B7280]">{c.area}</span>
                <span className="font-semibold text-xs leading-none text-[#0A0A0F]">{c.bookings}</span>
                <span className="font-bold text-xs leading-none text-[#0A0A0F]">{c.spend}</span>
                <span className="font-normal text-[11px] leading-none text-[#6B7280]">{c.lastBooking}</span>
                <div className={`px-2.5 py-1 rounded-md font-bold text-[10px] leading-none text-center ${tierStyles[c.tier]}`}>
                  {c.tier}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;