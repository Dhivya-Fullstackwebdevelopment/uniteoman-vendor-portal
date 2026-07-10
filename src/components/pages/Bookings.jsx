import React, { useState } from 'react';

const TABS = [
  { label: 'Today', count: 3 },
  { label: 'Upcoming', count: 5 },
  { label: 'Completed', count: 847 },
  { label: 'Cancelled', count: 4 },
];

const JOBS = [
  { icon: '❄️', iconBg: '#DBEAFE', borderColor: '#10B981', name: 'AC Deep Cleaning', meta: 'Ahmed Al-Rashdi · Today 10:00 AM · Qurum', price: 'OMR 17', status: 'Done', statusTone: 'bg-emerald-100 text-emerald-600', secondAction: 'Receipt' },
  { icon: '⚡', iconBg: '#FEF3C7', borderColor: '#4B6EF5', name: 'Electrical Repair', meta: 'Khalid Al-Farsi · Today 2:00 PM · Al Khuwair', price: 'OMR 20', status: 'Active', statusTone: 'bg-blue-100 text-blue-600', secondAction: 'Complete' },
  { icon: '🔧', iconBg: '#CFFAFE', borderColor: '#F59E0B', name: 'Plumbing Fix', meta: 'Omar Al-Jabri · Today 4:30 PM · Bowsher', price: 'OMR 14', status: 'Upcoming', statusTone: 'bg-amber-100 text-amber-600', secondAction: 'Navigate' },
  { icon: '💅', iconBg: '#FCE7F3', borderColor: '#8B2EF5', name: 'Beauty — Manicure', meta: 'Sara Al-Balushi · Sat 12 Jul 3pm · MSQ Hills', price: 'OMR 15', status: 'Scheduled', statusTone: 'bg-purple-100 text-purple-600', secondAction: 'Navigate' },
  { icon: '🪲', iconBg: '#EDE9FE', borderColor: '#8B2EF5', name: 'Pest Control', meta: 'Ali Al-Habsi · Sun 13 Jul 10am · Al Ghubrah', price: 'OMR 22', status: 'Scheduled', statusTone: 'bg-purple-100 text-purple-600', secondAction: 'Navigate' },
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">My Bookings</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">All jobs — today, upcoming, completed, cancelled</div>
        </div>
        <div className="flex gap-[9px]">
          <button className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280]">Status ▾</button>
          <button className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280]">Category ▾</button>
          <button className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280]">Date ▾</button>
        </div>
      </div>

      <div className="flex bg-white rounded-[13px] overflow-hidden mb-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-[22px] py-[10px] text-[13px] ${
              activeTab === tab.label
                ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] font-bold text-white'
                : 'font-medium text-[#9090A0]'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-[10px]">
        {JOBS.map((j) => (
          <div
            key={j.name}
            className="flex items-center gap-[14px] bg-white rounded-[14px] p-[15px] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            style={{ borderLeft: `4px solid ${j.borderColor}` }}
          >
            <div className="w-[46px] h-[46px] rounded-[11px] flex items-center justify-center text-[21px] flex-shrink-0" style={{ background: j.iconBg }}>
              {j.icon}
            </div>
            <div className="flex-1">
              <div className="text-[15px] font-bold text-[#0A0A0F]">{j.name}</div>
              <div className="text-[12px] text-[#9090A0] mt-[2px]">{j.meta}</div>
            </div>
            <div className="text-[15px] font-bold text-[#D61CA8]">{j.price}</div>
            <div className={`px-[10px] py-[4px] rounded text-[10px] font-bold ${j.statusTone}`}>{j.status}</div>
            <div className="flex gap-[5px]">
              <button className="px-[11px] py-[6px] bg-[#F8F8FA] border border-[#EBEBEF] rounded-[7px] text-[11px] font-semibold text-[#555]">View</button>
              {j.secondAction === 'Receipt' && (
                <button className="px-[11px] py-[6px] bg-[#D1FAE5] rounded-[7px] text-[11px] font-bold text-[#059669]">Receipt</button>
              )}
              {j.secondAction === 'Complete' && (
                <button className="px-[11px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[7px] text-[11px] font-bold text-white">Complete</button>
              )}
              {j.secondAction === 'Navigate' && (
                <button className="px-[11px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[7px] text-[11px] font-bold text-white">Navigate</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;