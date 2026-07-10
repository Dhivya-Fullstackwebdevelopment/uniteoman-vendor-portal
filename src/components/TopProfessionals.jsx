import React from 'react';

const TopProfessionals = () => {
  const professionals = [
    { rank: 1, initial: 'M', name: 'Mohammed A.', specialty: 'AC · ⭐ 4.9 · 847 jobs', amount: 'OMR 3.2k', color: 'from-primary to-secondary', rankColor: 'text-primary' },
    { rank: 2, initial: 'F', name: 'Fatima Al-Z.', specialty: 'Beauty · ⭐ 5.0 · 291 jobs', amount: 'OMR 2.8k', color: 'from-accent to-secondary', rankColor: 'text-secondary' },
    { rank: 3, initial: 'S', name: 'Salim Al-Habsi', specialty: 'Plumbing · ⭐ 4.8 · 524 jobs', amount: 'OMR 1.9k', color: 'from-emerald-500 to-accent', rankColor: 'text-accent' },
    { rank: 4, initial: 'K', name: 'Khalid Al-Farsi', specialty: 'Electrical · ⭐ 4.7 · 312 jobs', amount: 'OMR 1.6k', color: 'from-amber-500 to-red-500', rankColor: 'text-cyan-400' },
    { rank: 5, initial: 'A', name: 'Ali Al-Maamari', specialty: 'Cleaning · ⭐ 4.9 · 445 jobs', amount: 'OMR 1.4k', color: 'from-secondary to-primary', rankColor: 'text-emerald-500' },
  ];

  const rankColors = ['text-primary', 'text-secondary', 'text-accent', 'text-cyan-400', 'text-emerald-500'];

  return (
    <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-[18px]">
        <div className="font-bold text-base leading-none text-[#0A0A0F]">Top Professionals</div>
        <div className="font-semibold text-[13px] leading-none text-primary cursor-pointer">View All →</div>
      </div>
      
      <div className="flex flex-col gap-3">
        {professionals.map((pro, index) => (
          <div key={index} className="flex items-center gap-3 px-3 py-3 bg-[#F8F8FA] rounded-xl">
            <div className={`font-bold text-[13px] leading-none ${rankColors[index]} w-5 text-center flex-shrink-0`}>
              #{pro.rank}
            </div>
            <div className={`w-[38px] h-[38px] rounded-full bg-gradient-to-br ${pro.color} flex items-center justify-center font-bold text-[14px] text-white flex-shrink-0`}>
              {pro.initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[13px] leading-none text-[#0A0A0F]">{pro.name}</div>
              <div className="font-normal text-[11px] leading-none text-[#9090A0] mt-0.5">{pro.specialty}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className={`font-bold text-[13px] leading-none ${rankColors[index]}`}>{pro.amount}</div>
              <div className="font-normal text-[10px] leading-none text-[#9090A0] mt-0.5">this month</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProfessionals;