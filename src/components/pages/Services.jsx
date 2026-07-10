import React, { useState } from 'react';

const CATEGORIES = ['All', 'AC & HVAC', 'Cleaning', 'Plumbing', 'Electrical', 'Beauty', 'Carpentry', 'Pest', 'Painting'];

const SERVICES = [
  { icon: '❄️', name: 'AC Deep Cleaning', base: 'OMR 15', qurum: 'OMR 15', khuwair: 'OMR 15', msq: 'OMR 18', status: 'Active' },
  { icon: '🔩', name: 'AC Repair', base: 'OMR 25', qurum: 'OMR 25', khuwair: 'OMR 25', msq: 'OMR 28', status: 'Active' },
  { icon: '🏠', name: 'AC Annual Contract', base: 'OMR 89/yr', qurum: 'OMR 89', khuwair: 'OMR 89', msq: 'OMR 99', status: 'Active' },
  { icon: '⚡', name: 'Electrical Repair', base: 'OMR 18', qurum: 'OMR 18', khuwair: 'OMR 18', msq: 'OMR 22', status: 'Active' },
  { icon: '🔧', name: 'Plumbing Leak Fix', base: 'OMR 12', qurum: 'OMR 12', khuwair: 'OMR 12', msq: 'OMR 15', status: 'Active' },
  { icon: '📺', name: 'Appliance Repair', base: 'OMR 25', qurum: 'OMR 25', khuwair: 'OMR 25', msq: 'OMR 28', status: 'Paused' },
  { icon: '🪲', name: 'Pest Control', base: 'OMR 18', qurum: 'OMR 18', khuwair: 'OMR 18', msq: 'OMR 22', status: 'Paused' },
];

const AREAS = [
  { name: 'Qurum', color: '#10B981' },
  { name: 'Al Khuwair', color: '#10B981' },
  { name: 'Bowsher', color: '#10B981' },
  { name: 'MSQ Hills', color: '#4B6EF5' },
  { name: 'Al Ghubrah', color: '#4B6EF5' },
];

const gridCols = 'grid-cols-[1.5fr_100px_100px_100px_100px_80px_90px]';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[16px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">My Services &amp; Pricing</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Set per-area pricing · Admin sets floor/cap</div>
        </div>
        <div className="flex gap-[9px]">
          <div className="flex items-center gap-[6px] bg-[#D61CA80D] border border-[#D61CA826] rounded-full px-[13px] py-[6px]">
            <span>✨</span>
            <span className="text-[12px] font-semibold text-[#D61CA8]">AI Pricing</span>
          </div>
          <button className="px-[16px] py-[8px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[9px] text-[12px] font-bold text-white">
            + Add Service
          </button>
        </div>
      </div>

      <div className="flex gap-[8px] mb-[16px] flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-[15px] py-[6px] rounded-full text-[12px] ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] font-bold text-white'
                : 'bg-white border-[1.5px] border-[#EBEBEF] font-medium text-[#9090A0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-[9px] bg-[#D61CA80A] border border-[#D61CA81F] rounded-[12px] px-[15px] py-[11px] mb-[16px]">
        <span>✨</span>
        <div className="text-[13px] leading-relaxed text-[#6B7280]">
          <strong className="text-[#D61CA8]">AI:</strong> Your AC Deep Cleaning OMR 15 is market-rate. MSQ Hills avg is OMR 18 — you could charge more there.
        </div>
      </div>

      <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <div className={`grid ${gridCols} gap-2 px-[16px] py-[10px] bg-[#F8F8FA] border-b border-[#EBEBEF]`}>
          {['Service', 'Base', 'Qurum', 'Al Khuwair', 'MSQ Hills', 'Status', 'Action'].map((h) => (
            <span key={h} className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">{h}</span>
          ))}
        </div>
        {SERVICES.map((s) => (
          <div key={s.name} className={`grid ${gridCols} gap-2 px-[16px] py-[11px] border-b border-[#F8F8F8] items-center`}>
            <div className="text-[13px] font-semibold text-[#0A0A0F]">{s.icon} {s.name}</div>
            <div
              className={`rounded-[8px] px-[10px] py-[5px] text-[12px] font-bold w-fit ${
                s.status === 'Active' ? 'bg-[#F8F8FA] border-[1.5px] border-[#D61CA840] text-[#D61CA8]' : 'bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] text-[#9090A0]'
              }`}
            >
              {s.base}
            </div>
            <div className="bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] rounded-[8px] px-[10px] py-[5px] text-[12px] font-semibold text-[#0A0A0F] w-fit">{s.qurum}</div>
            <div className="bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] rounded-[8px] px-[10px] py-[5px] text-[12px] font-semibold text-[#0A0A0F] w-fit">{s.khuwair}</div>
            <div className="bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] rounded-[8px] px-[10px] py-[5px] text-[12px] font-semibold text-[#0A0A0F] w-fit">{s.msq}</div>
            <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold w-fit ${s.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-[#F0F0F4] text-[#9090A0]'}`}>
              {s.status}
            </div>
            <div className="flex gap-[5px]">
              <button className="px-[10px] py-[5px] bg-[#D61CA814] rounded-[7px] text-[10px] font-semibold text-[#D61CA8]">Edit</button>
              <button className={`px-[9px] py-[5px] rounded-[7px] text-[10px] font-bold ${s.status === 'Active' ? 'bg-[#F0F0F4] text-[#9090A0]' : 'bg-[#D1FAE5] text-[#059669]'}`}>
                {s.status === 'Active' ? '⏸' : '▶'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[16px] text-[15px] font-bold text-[#0A0A0F] mb-[10px]">Service Areas</div>
      <div className="flex flex-wrap gap-[8px]">
        {AREAS.map((a) => (
          <div
            key={a.name}
            className="px-[14px] py-[7px] rounded-full flex items-center gap-[6px]"
            style={{ background: `${a.color}14`, border: `1.5px solid ${a.color}40` }}
          >
            <div className="w-[6px] h-[6px] rounded-full" style={{ background: a.color }} />
            <span className="text-[12px] font-semibold text-[#0A0A0F]">{a.name}</span>
          </div>
        ))}
        <button className="px-[14px] py-[7px] bg-[#F8F8FA] border-[1.5px] border-dashed border-[#C0C0CC] rounded-full text-[12px] font-semibold text-[#9090A0]">
          + Add Area
        </button>
      </div>
    </div>
  );
};

export default Services;