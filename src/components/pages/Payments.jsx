import React from 'react';
import PageHeader from '../PageHeader';
import StatCard from '../StatCard';

const TRANSACTIONS = [
  { id: 'TXN-9931', booking: '#4521', customer: 'Ahmed Al-Rashdi', method: 'Card', amount: 'OMR 17.00', status: 'Paid', statusColor: 'emerald', date: 'Today, 10:24 AM' },
  { id: 'TXN-9930', booking: '#4520', customer: 'Khalid Al-Farsi', method: 'Wallet', amount: 'OMR 37.00', status: 'Pending', statusColor: 'amber', date: 'Today, 10:02 AM' },
  { id: 'TXN-9929', booking: '#4519', customer: 'Sara Al-Balushi', method: 'Card', amount: 'OMR 45.00', status: 'Paid', statusColor: 'emerald', date: 'Today, 9:51 AM' },
  { id: 'TXN-9928', booking: '#4518', customer: 'Omar Al-Jabri', method: 'Cash', amount: 'OMR 22.00', status: 'Paid', statusColor: 'emerald', date: 'Today, 9:40 AM' },
  { id: 'TXN-9927', booking: '#4515', customer: 'Laila Al-Amri', method: 'Card', amount: 'OMR 33.00', status: 'Refunded', statusColor: 'red', date: 'Today, 8:40 AM' },
];

const statusStyles = {
  emerald: 'bg-emerald-100 text-emerald-600',
  amber: 'bg-amber-100 text-amber-600',
  red: 'bg-red-100 text-red-600',
};

const Payments = () => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      <PageHeader title="Payments" subtitle="Sunday, 29 June 2025 · Muscat, Oman" actionLabel="Export Statement" />

      <div className="p-6 flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-5">
          <StatCard label="Revenue Today" value="OMR 2,847" change="↑ 8.3%" gradient="from-[#D61CA8] to-[#8B2EF5]" icon={<span>💳</span>} />
          <StatCard label="Pending Payouts" value="OMR 1,204" gradient="from-amber-500 to-red-500" icon={<span>⏳</span>} />
          <StatCard label="Refunds This Week" value="OMR 96" change="↓ 1.2%" gradient="from-accent to-cyan-400" icon={<span>↩️</span>} />
          <StatCard label="Platform Fees Earned" value="OMR 427" gradient="from-emerald-500 to-accent" icon={<span>🏦</span>} />
        </div>

        <div className="grid grid-cols-[1.6fr_1fr] gap-5">
          <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-[18px]">
              <div className="font-bold text-base leading-none text-[#0A0A0F]">Recent Transactions</div>
              <div className="font-semibold text-[13px] leading-none text-primary cursor-pointer">View All →</div>
            </div>

            <div className="grid grid-cols-[110px_1fr_80px_90px_90px_140px] gap-2 px-3 py-2 bg-[#F8F8FA] rounded-xl mb-2">
              {['Transaction', 'Customer', 'Method', 'Amount', 'Status', 'Date'].map((h) => (
                <span key={h} className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">{h}</span>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              {TRANSACTIONS.map((t, index) => (
                <div key={t.id} className={`grid grid-cols-[110px_1fr_80px_90px_90px_140px] gap-2 px-3 py-2.5 rounded-xl items-center ${index % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}>
                  <span className="font-semibold text-xs leading-none text-[#9090A0]">{t.id}</span>
                  <div>
                    <div className="font-semibold text-xs leading-[1.2] text-[#0A0A0F]">{t.customer}</div>
                    <div className="font-normal text-[10px] leading-none text-[#9090A0] mt-0.5">Booking {t.booking}</div>
                  </div>
                  <span className="font-normal text-[11px] leading-none text-[#6B7280]">{t.method}</span>
                  <span className="font-bold text-xs leading-none text-[#0A0A0F]">{t.amount}</span>
                  <div className={`px-2.5 py-1 rounded-md font-bold text-[10px] leading-none text-center ${statusStyles[t.statusColor]}`}>
                    {t.status}
                  </div>
                  <span className="font-normal text-[11px] leading-none text-[#6B7280]">{t.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payout methods breakdown */}
          <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
            <div className="font-bold text-base leading-none text-[#0A0A0F] mb-1">Payment Methods</div>
            <div className="font-normal text-xs leading-none text-[#9090A0] mb-5">Share of revenue today</div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Card', pct: 54, color: '#D61CA8' },
                { label: 'Wallet', pct: 31, color: '#8B2EF5' },
                { label: 'Cash', pct: 15, color: '#4B6EF5' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-medium text-xs leading-none text-[#6B7280]">{m.label}</span>
                    <span className="font-bold text-xs leading-none text-[#0A0A0F]">{m.pct}%</span>
                  </div>
                  <div className="h-2 bg-[#F0F0F4] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;