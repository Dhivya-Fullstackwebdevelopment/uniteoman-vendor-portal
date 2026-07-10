import React from 'react';

const PLANS = [
  {
    name: 'Starter', price: 'OMR 10', credits: '50 credits',
    features: ['50 booking leads/mo', 'Standard dispatch priority', 'Email support'],
    border: '#EBEBEF', priceColor: '#0A0A0F', cta: 'Upgrade →', ctaStyle: 'gradient',
  },
  {
    name: 'Professional', price: 'OMR 25', credits: '150 credits',
    features: ['150 booking leads/mo', 'Priority dispatch', 'AI job matching', 'Chat support'],
    border: '#D61CA8', priceColor: '#D61CA8', badge: 'Current', badgeSide: 'left',
    cta: 'Current Plan', ctaStyle: 'muted',
  },
  {
    name: 'Business', price: 'OMR 60', credits: '400 credits',
    features: ['400 booking leads/mo', 'Top priority dispatch', 'AI job matching', 'Dedicated account manager'],
    border: '#4B6EF5', priceColor: '#0A0A0F', badge: 'Best Value', badgeSide: 'right', badgeColor: '#4B6EF5',
    cta: 'Upgrade →', ctaStyle: 'gradient',
  },
  {
    name: 'Custom', price: 'Contact us', credits: 'Unlimited',
    features: ['Unlimited leads', 'Guaranteed dispatch', 'White-glove support', 'Custom SLA'],
    border: '#EBEBEF', priceColor: '#0A0A0F', cta: 'Upgrade →', ctaStyle: 'gradient',
  },
];

const HISTORY = [
  { dir: 'up', amount: '+ 150 credits', desc: 'Plan renewal — Professional', value: '+150', date: '1 Jul 2026' },
  { dir: 'down', amount: '- 1 credit', desc: 'AC Deep Cleaning dispatched #UO-4601', value: '-1', date: '9 Jul 2026' },
  { dir: 'down', amount: '- 1 credit', desc: 'Electrical dispatched #UO-4598', value: '-1', date: '8 Jul 2026' },
  { dir: 'up', amount: '+ 20 credits', desc: 'Admin bonus — July performance', value: '+20', date: '5 Jul 2026' },
  { dir: 'down', amount: '- 1 credit', desc: 'AC Repair dispatched #UO-4595', value: '-1', date: '8 Jul 2026' },
];

const Credits = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F] mb-[6px]">Credits &amp; Plans</div>
      <div className="text-[14px] text-[#9090A0] mb-[20px]">
        Buy credits to receive job leads. 1 credit = 1 booking lead accepted.
      </div>

      {/* Current status */}
      <div className="bg-[#0A0A0F] rounded-[18px] p-[22px] mb-[20px] flex items-center gap-[22px]">
        <div className="flex-1">
          <div className="text-[12px] text-white/45 uppercase tracking-[0.5px] mb-[7px]">Current Credits</div>
          <div className="text-[46px] font-extrabold text-[#D61CA8] leading-none">240</div>
          <div className="text-[12px] text-white/40 mt-[6px]">Professional Plan · Renews 1 Aug 2026</div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="text-[13px] text-white/50">Credits used this month</div>
          <div className="h-[10px] bg-white/[0.08] rounded-full overflow-hidden w-[260px]">
            <div className="w-[60%] h-full bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-full" />
          </div>
          <div className="text-[12px] font-semibold text-white/50">90 used · 240 remaining</div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-4 gap-[13px] mb-[20px]">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.06)] relative"
            style={{ border: `${p.name === 'Professional' ? 2.5 : 1.5}px solid ${p.border}` }}
          >
            {p.badge && (
              <div
                className={`absolute -top-[12px] ${p.badgeSide === 'left' ? 'left-[14px]' : 'right-[14px]'} rounded-[7px] px-[11px] py-[3px] text-[9px] font-bold text-white`}
                style={{ background: p.badgeColor || '#D61CA8' }}
              >
                {p.badge}
              </div>
            )}
            <div className="text-[16px] font-extrabold text-[#0A0A0F] mb-[5px]">{p.name}</div>
            <div className="text-[24px] font-extrabold mb-[3px]" style={{ color: p.priceColor }}>
              {p.price}<span className="text-[12px] font-normal text-[#9090A0]">/mo</span>
            </div>
            <div className="text-[13px] font-bold text-[#4B6EF5] mb-[12px]">{p.credits}</div>
            {p.features.map((f) => (
              <div key={f} className="text-[12px] leading-relaxed text-[#6B7280] mb-[5px]">✓ {f}</div>
            ))}
            <button
              className={`w-full mt-[12px] py-[10px] rounded-[10px] text-center text-[12px] font-bold ${
                p.ctaStyle === 'gradient'
                  ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] text-white'
                  : 'bg-[#F0F0F4] text-[#9090A0]'
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Credit history */}
      <div className="text-[15px] font-bold text-[#0A0A0F] mb-[10px]">Credit Transaction History</div>
      <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        {HISTORY.map((h, i) => (
          <div key={i} className="flex items-center gap-[14px] px-[16px] py-[12px] border-b border-[#F8F8F8] last:border-0">
            <div
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[14px] font-bold flex-shrink-0"
              style={{ background: h.dir === 'up' ? '#D1FAE5' : '#FFE4E6', color: h.dir === 'up' ? '#059669' : '#EF4444' }}
            >
              {h.dir === 'up' ? '↑' : '↓'}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-[#0A0A0F]">{h.amount}</div>
              <div className="text-[11px] text-[#9090A0] mt-[2px]">{h.desc}</div>
            </div>
            <div className="text-right">
              <div className="text-[14px] font-bold" style={{ color: h.dir === 'up' ? '#059669' : '#EF4444' }}>{h.value}</div>
              <div className="text-[11px] text-[#9090A0] mt-[2px]">{h.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;