import React from 'react';
import PageHeader from '../PageHeader';

const REPORTS = [
  { name: 'Weekly Revenue Report', desc: 'Revenue, bookings and refunds breakdown', period: '23 – 29 Jun 2025', generated: 'Today, 6:00 AM', icon: '📊', gradient: 'from-primary to-secondary' },
  { name: 'Professional Payouts', desc: 'Earnings and commission per professional', period: 'June 2025', generated: 'Yesterday', icon: '👷', gradient: 'from-accent to-secondary' },
  { name: 'Customer Retention Report', desc: 'New vs repeat customer analysis', period: 'Q2 2025', generated: '2 days ago', icon: '🔁', gradient: 'from-emerald-500 to-accent' },
  { name: 'Service Performance', desc: 'Bookings and ratings by service category', period: 'June 2025', generated: '3 days ago', icon: '🗂️', gradient: 'from-amber-500 to-red-500' },
  { name: 'Tax & Compliance Summary', desc: 'VAT collected and remitted', period: 'Q2 2025', generated: '5 days ago', icon: '🧾', gradient: 'from-secondary to-cyan-400' },
  { name: 'Cancellation Analysis', desc: 'Cancellation reasons and trends', period: 'June 2025', generated: '1 week ago', icon: '⚠️', gradient: 'from-primary to-accent' },
];

const Reports = () => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      <PageHeader title="Reports" subtitle="Generated reports · Muscat, Oman" actionLabel="+ Generate Report" />

      <div className="p-6 flex flex-col gap-5">
        <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
          <div className="font-bold text-base leading-none text-[#0A0A0F] mb-1">All Reports</div>
          <div className="font-normal text-xs leading-none text-[#9090A0] mb-5">Download or re-generate reports for any period</div>

          <div className="grid grid-cols-2 gap-4">
            {REPORTS.map((r) => (
              <div key={r.name} className="bg-[#F8F8FA] rounded-2xl p-4 flex items-center gap-4 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-xl flex-shrink-0`}>
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px] leading-none text-[#0A0A0F]">{r.name}</div>
                  <div className="font-normal text-[11px] leading-none text-[#9090A0] mt-1.5">{r.desc}</div>
                  <div className="font-normal text-[10px] leading-none text-[#B0B0C0] mt-1.5">{r.period} · Generated {r.generated}</div>
                </div>
                <div className="px-3 py-2 bg-white border border-[#EBEBEF] rounded-lg font-semibold text-[11px] leading-none text-primary cursor-pointer hover:border-primary transition-colors flex-shrink-0">
                  Download
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;