import React, { useState } from 'react';
import PageHeader from '../PageHeader';
import StatCard from '../StatCard';

const ALL_BOOKINGS = [
  { id: '#4521', service: 'AC Deep Clean', customer: 'Ahmed Al-Rashdi', pro: { initial: 'M', name: 'Mohammed A.' }, area: 'Qurum', amount: 'OMR 17', status: 'Completed', statusColor: 'emerald', time: '10:24 AM' },
  { id: '#4520', service: 'Home Cleaning', customer: 'Khalid Al-Farsi', pro: { initial: 'S', name: 'Salim Al-Habsi' }, area: 'Al Khuwair', amount: 'OMR 37', status: 'In Progress', statusColor: 'amber', time: '10:02 AM' },
  { id: '#4519', service: 'Beauty at Home', customer: 'Sara Al-Balushi', pro: { initial: 'F', name: 'Fatima Al-Z.' }, area: 'MSQ Hills', amount: 'OMR 45', status: 'En Route', statusColor: 'blue', time: '9:51 AM' },
  { id: '#4518', service: 'Pest Control', customer: 'Omar Al-Jabri', pro: { initial: 'K', name: 'Khalid Al-H.' }, area: 'Ruwi', amount: 'OMR 22', status: 'Scheduled', statusColor: 'purple', time: '9:40 AM' },
  { id: '#4517', service: 'Plumbing Fix', customer: 'Nasser Al-Rawahi', pro: { initial: 'A', name: 'Ali Al-Maamari' }, area: 'Bowsher', amount: 'OMR 15', status: 'Completed', statusColor: 'emerald', time: '9:15 AM' },
  { id: '#4516', service: 'Electrical Repair', customer: 'Yousef Al-Kindi', pro: { initial: 'K', name: 'Khalid Al-Farsi' }, area: 'Seeb', amount: 'OMR 28', status: 'Completed', statusColor: 'emerald', time: '8:58 AM' },
  { id: '#4515', service: 'Home Cleaning', customer: 'Laila Al-Amri', pro: { initial: 'S', name: 'Salim Al-Habsi' }, area: 'Azaiba', amount: 'OMR 33', status: 'Cancelled', statusColor: 'red', time: '8:40 AM' },
  { id: '#4514', service: 'AC Deep Clean', customer: 'Faisal Al-Harthy', pro: { initial: 'M', name: 'Mohammed A.' }, area: 'Ghubra', amount: 'OMR 17', status: 'Completed', statusColor: 'emerald', time: '8:22 AM' },
];

const STATUS_TABS = ['All', 'Completed', 'In Progress', 'En Route', 'Scheduled', 'Cancelled'];

const statusStyles = {
  emerald: 'bg-emerald-100 text-emerald-600',
  amber: 'bg-amber-100 text-amber-600',
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600',
};

const proGradients = [
  'from-primary to-secondary',
  'from-accent to-secondary',
  'from-primary to-accent',
  'from-secondary to-cyan-400',
  'from-emerald-500 to-accent',
  'from-amber-500 to-red-500',
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? ALL_BOOKINGS
    : ALL_BOOKINGS.filter((b) => b.status === activeTab);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      <PageHeader title="Bookings" subtitle="Sunday, 29 June 2025 · Muscat, Oman" actionLabel="+ New Booking" />

      <div className="p-6 flex flex-col gap-5">
        {/* Stat strip */}
        <div className="grid grid-cols-4 gap-5">
          <StatCard label="Total Bookings Today" value="147" change="↑ 12%" gradient="from-[#D61CA8] to-[#8B2EF5]" icon={<span className="text-primary">📅</span>} />
          <StatCard label="Completed" value="98" change="↑ 6%" gradient="from-emerald-500 to-accent" icon={<span>✅</span>} />
          <StatCard label="In Progress / En Route" value="31" gradient="from-accent to-secondary" icon={<span>🚗</span>} />
          <StatCard label="Cancelled" value="4" change="↓ 2%" gradient="from-amber-500 to-red-500" icon={<span>⚠️</span>} />
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-[18px]">
            <div className="font-bold text-base leading-none text-[#0A0A0F]">All Bookings</div>
            <div className="flex gap-2 items-center">
              {STATUS_TABS.map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] leading-none cursor-pointer transition-colors ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] text-white'
                      : 'bg-[#F8F8FA] text-[#9090A0] hover:text-[#0A0A0F]'
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[70px_1.2fr_1fr_90px_80px_80px_100px] gap-2 px-3 py-2 bg-[#F8F8FA] rounded-xl mb-2">
            {['ID', 'Service · Customer', 'Professional', 'Area', 'Time', 'Amount', 'Status'].map((h) => (
              <span key={h} className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">{h}</span>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            {filtered.map((booking, index) => (
              <div
                key={booking.id}
                className={`grid grid-cols-[70px_1.2fr_1fr_90px_80px_80px_100px] gap-2 px-3 py-2.5 rounded-xl items-center ${index % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}
              >
                <span className="font-semibold text-xs leading-none text-[#9090A0]">{booking.id}</span>
                <div>
                  <div className="font-semibold text-xs leading-[1.2] text-[#0A0A0F]">{booking.service}</div>
                  <div className="font-normal text-[10px] leading-none text-[#9090A0] mt-0.5">{booking.customer}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-[22px] h-[22px] rounded-full bg-gradient-to-br ${proGradients[index % proGradients.length]} flex items-center justify-center font-bold text-[9px] text-white flex-shrink-0`}>
                    {booking.pro.initial}
                  </div>
                  <span className="font-medium text-[11px] leading-none text-[#0A0A0F]">{booking.pro.name}</span>
                </div>
                <span className="font-normal text-[11px] leading-none text-[#6B7280]">{booking.area}</span>
                <span className="font-normal text-[11px] leading-none text-[#6B7280]">{booking.time}</span>
                <span className="font-bold text-xs leading-none text-[#0A0A0F]">{booking.amount}</span>
                <div className={`px-2.5 py-1 rounded-md font-bold text-[10px] leading-none text-center ${statusStyles[booking.statusColor]}`}>
                  {booking.status}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-10 text-center font-medium text-sm text-[#9090A0]">No bookings match this filter.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;