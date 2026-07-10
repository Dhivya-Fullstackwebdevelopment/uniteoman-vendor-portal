import React from 'react';

const STATS = [
  { label: 'Revenue', value: 'OMR 1,247', color: '#D61CA8', note: 'This month' },
  { label: 'Net Earnings', value: 'OMR 1,059', color: '#10B981', note: 'After 15% fee' },
  { label: 'Platform Fee', value: 'OMR 188', color: '#F59E0B', note: 'Deducted' },
  { label: 'Pending', value: 'OMR 0', color: '#4B6EF5', note: 'Settled T+1' },
];

const TRANSACTIONS = [
  { id: '#4601', service: 'AC Deep Cleaning · Qurum', date: 'Today', gross: 'OMR 17.985', net: 'OMR 15.287', status: 'Paid' },
  { id: '#4598', service: 'Electrical · Al Khuwair', date: '8 Jul', gross: 'OMR 23.000', net: 'OMR 19.550', status: 'Paid' },
  { id: '#4595', service: 'AC Repair · Bowsher', date: '8 Jul', gross: 'OMR 29.000', net: 'OMR 24.650', status: 'Pending' },
  { id: '#4591', service: 'Plumbing · Qurum', date: '7 Jul', gross: 'OMR 16.100', net: 'OMR 13.685', status: 'Paid' },
  { id: '#4582', service: 'Appliance Repair · MSQ', date: '6 Jul', gross: 'OMR 29.000', net: 'OMR 24.650', status: 'Paid' },
];

const statusStyles = {
  Paid: 'bg-emerald-100 text-emerald-600',
  Pending: 'bg-amber-100 text-amber-600',
};

const gridCols = 'grid-cols-[90px_1.5fr_95px_105px_105px_95px]';

const Payments = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Payments &amp; Payouts</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Bank of Muscat · T+1 settlement · 15% platform fee</div>
        </div>
        <div className="flex gap-[9px]">
          <button className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280]">July 2026 ▾</button>
          <button className="px-[18px] py-[8px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[9px] text-[12px] font-bold text-white">Request Payout</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[12px] mb-[18px]">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-[13px] p-[15px] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <div className="text-[11px] text-[#9090A0] uppercase tracking-[0.5px] mb-[6px]">{s.label}</div>
            <div className="text-[21px] font-extrabold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[11px] text-[#9090A0] mt-[4px]">{s.note}</div>
          </div>
        ))}
      </div>

      {/* Bank card */}
      <div className="bg-gradient-to-br from-[#0A0A0F] to-[#0a1240] rounded-[16px] p-[19px] mb-[18px] flex items-center gap-[18px]">
        <div className="flex-1">
          <div className="text-[15px] font-bold text-white">Bank of Muscat</div>
          <div className="text-[12px] text-white/40 mt-[4px]">Primary payout · Mohammed Al-Balushi</div>
          <div className="text-[13px] text-white/60 mt-[7px]">IBAN: OM80 0001 0000 2345 6789</div>
        </div>
        <div className="px-[11px] py-[4px] bg-[#D1FAE5] rounded text-[10px] font-bold text-[#059669]">Verified ✓</div>
        <button className="px-[14px] py-[7px] bg-white/10 rounded-[9px] text-[12px] font-semibold text-white/70">Change</button>
      </div>

      <div className="text-[15px] font-bold text-[#0A0A0F] mb-[10px]">Recent Transactions</div>
      <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className={`grid ${gridCols} gap-2 px-[16px] py-[10px] bg-[#F8F8FA] border-b border-[#EBEBEF]`}>
          {['Booking', 'Service · Area', 'Date', 'Gross', 'Net Paid', 'Status'].map((h) => (
            <span key={h} className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">{h}</span>
          ))}
        </div>
        {TRANSACTIONS.map((t) => (
          <div key={t.id} className={`grid ${gridCols} gap-2 px-[16px] py-[13px] border-b border-[#F8F8F8] items-center`}>
            <span className="text-[12px] font-medium text-[#9090A0] font-mono">{t.id}</span>
            <span className="text-[13px] font-medium text-[#0A0A0F]">{t.service}</span>
            <span className="text-[12px] text-[#9090A0]">{t.date}</span>
            <span className="text-[13px] font-semibold text-[#0A0A0F]">{t.gross}</span>
            <span className="text-[13px] font-bold text-[#10B981]">{t.net}</span>
            <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold w-fit ${statusStyles[t.status]}`}>{t.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;