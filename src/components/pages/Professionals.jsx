import React from 'react';
import PageHeader from '../PageHeader';
import StatCard from '../StatCard';

const PROFESSIONALS = [
  { name: 'Mohammed A.', initial: 'M', category: 'AC Service', rating: 4.9, jobs: 847, earnings: 'OMR 3.2k', online: true, gradient: 'from-primary to-secondary' },
  { name: 'Fatima Al-Z.', initial: 'F', category: 'Beauty', rating: 5.0, jobs: 291, earnings: 'OMR 2.8k', online: true, gradient: 'from-accent to-secondary' },
  { name: 'Salim Al-Habsi', initial: 'S', category: 'Plumbing', rating: 4.8, jobs: 524, earnings: 'OMR 1.9k', online: true, gradient: 'from-emerald-500 to-accent' },
  { name: 'Khalid Al-Farsi', initial: 'K', category: 'Electrical', rating: 4.7, jobs: 312, earnings: 'OMR 1.6k', online: false, gradient: 'from-amber-500 to-red-500' },
  { name: 'Ali Al-Maamari', initial: 'A', category: 'Cleaning', rating: 4.9, jobs: 445, earnings: 'OMR 1.4k', online: true, gradient: 'from-secondary to-primary' },
  { name: 'Nasser Al-Rawahi', initial: 'N', category: 'Pest Control', rating: 4.6, jobs: 198, earnings: 'OMR 1.1k', online: false, gradient: 'from-secondary to-cyan-400' },
  { name: 'Yousef Al-Kindi', initial: 'Y', category: 'AC Service', rating: 4.8, jobs: 276, earnings: 'OMR 980', online: true, gradient: 'from-primary to-accent' },
  { name: 'Laila Al-Amri', initial: 'L', category: 'Beauty', rating: 4.9, jobs: 163, earnings: 'OMR 870', online: true, gradient: 'from-accent to-primary' },
];

const Professionals = () => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      <PageHeader title="Professionals" subtitle="234 active · 312 total · Muscat, Oman" actionLabel="+ Add Professional" />

      <div className="p-6 flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-5">
          <StatCard label="Total Professionals" value="312" gradient="from-[#D61CA8] to-[#8B2EF5]" icon={<span>👷</span>} />
          <StatCard label="Online Now" value="234" change="75%" gradient="from-accent to-cyan-400" icon={<span>🟢</span>} />
          <StatCard label="Avg Rating" value="4.8 ★" change="↑ 0.1" gradient="from-amber-500 to-emerald-500" icon={<span>⭐</span>} />
          <StatCard label="New This Month" value="18" change="↑ 4" gradient="from-emerald-500 to-accent" icon={<span>🆕</span>} />
        </div>

        <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-5">
            <div className="font-bold text-base leading-none text-[#0A0A0F]">All Professionals</div>
            <div className="font-semibold text-[13px] leading-none text-primary cursor-pointer">View All →</div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {PROFESSIONALS.map((pro) => (
              <div key={pro.name} className="bg-[#F8F8FA] rounded-2xl p-4 flex flex-col gap-3 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${pro.gradient} flex items-center justify-center font-bold text-sm text-white`}>
                      {pro.initial}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#F8F8FA] ${pro.online ? 'bg-emerald-500' : 'bg-[#C0C0CC]'}`} />
                  </div>
                  <div className="font-bold text-[11px] leading-none text-amber-500">★ {pro.rating}</div>
                </div>
                <div>
                  <div className="font-semibold text-[13px] leading-none text-[#0A0A0F]">{pro.name}</div>
                  <div className="font-normal text-[11px] leading-none text-[#9090A0] mt-1">{pro.category}</div>
                </div>
                <div className="h-px bg-[#EBEBEF]" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs leading-none text-[#0A0A0F]">{pro.jobs}</div>
                    <div className="font-normal text-[9px] leading-none text-[#9090A0] mt-1">jobs done</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xs leading-none text-primary">{pro.earnings}</div>
                    <div className="font-normal text-[9px] leading-none text-[#9090A0] mt-1">this month</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Professionals;