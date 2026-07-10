import React, { useState } from 'react';
import PageHeader from '../PageHeader';

const INITIAL_CONFIG = [
  { name: 'AC Deep Clean', basePrice: 'OMR 15', commission: '18%', autoAssign: true, enabled: true, gradient: 'from-primary to-secondary', icon: '❄️' },
  { name: 'Home Cleaning', basePrice: 'OMR 20', commission: '15%', autoAssign: true, enabled: true, gradient: 'from-secondary to-accent', icon: '🧹' },
  { name: 'Plumbing Fix', basePrice: 'OMR 10', commission: '20%', autoAssign: false, enabled: true, gradient: 'from-accent to-cyan-400', icon: '🔧' },
  { name: 'Beauty at Home', basePrice: 'OMR 25', commission: '22%', autoAssign: true, enabled: true, gradient: 'from-primary to-accent', icon: '💅' },
  { name: 'Pest Control', basePrice: 'OMR 18', commission: '18%', autoAssign: false, enabled: false, gradient: 'from-emerald-500 to-accent', icon: '🐛' },
  { name: 'Electrical Repair', basePrice: 'OMR 12', commission: '20%', autoAssign: false, enabled: true, gradient: 'from-amber-500 to-red-500', icon: '💡' },
];

const Toggle = ({ on, onClick }) => (
  <div
    onClick={onClick}
    className={`w-9 h-5 rounded-full cursor-pointer relative transition-colors flex-shrink-0 ${on ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5]' : 'bg-[#E5E7EB]'}`}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
  </div>
);

const ServiceConfig = () => {
  const [config, setConfig] = useState(INITIAL_CONFIG);

  const toggleField = (name, field) => {
    setConfig((prev) => prev.map((s) => (s.name === name ? { ...s, [field]: !s[field] } : s)));
  };

  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      <PageHeader title="Service Config" subtitle="Pricing, commission and assignment rules" actionLabel="+ New Category" />

      <div className="p-6 flex flex-col gap-5">
        <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
          <div className="font-bold text-base leading-none text-[#0A0A0F] mb-1">Service Categories</div>
          <div className="font-normal text-xs leading-none text-[#9090A0] mb-5">Control base pricing, platform commission, and whether bookings auto-assign to the nearest available professional.</div>

          <div className="grid grid-cols-[1.4fr_110px_110px_140px_140px_90px] gap-2 px-3 py-2 bg-[#F8F8FA] rounded-xl mb-2">
            {['Category', 'Base Price', 'Commission', 'Auto-Assign', 'Status', ''].map((h) => (
              <span key={h} className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">{h}</span>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            {config.map((s, index) => (
              <div key={s.name} className={`grid grid-cols-[1.4fr_110px_110px_140px_140px_90px] gap-2 px-3 py-3 rounded-xl items-center ${index % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center text-sm flex-shrink-0`}>
                    {s.icon}
                  </div>
                  <span className="font-semibold text-xs leading-none text-[#0A0A0F]">{s.name}</span>
                </div>
                <span className="font-bold text-xs leading-none text-[#0A0A0F]">{s.basePrice}</span>
                <span className="font-medium text-xs leading-none text-[#6B7280]">{s.commission}</span>
                <Toggle on={s.autoAssign} onClick={() => toggleField(s.name, 'autoAssign')} />
                <div
                  onClick={() => toggleField(s.name, 'enabled')}
                  className={`px-2.5 py-1 rounded-md font-bold text-[10px] leading-none text-center cursor-pointer w-fit ${s.enabled ? 'bg-emerald-100 text-emerald-600' : 'bg-[#F0F0F4] text-[#9090A0]'}`}
                >
                  {s.enabled ? 'Active' : 'Disabled'}
                </div>
                <span className="font-semibold text-[12px] leading-none text-primary cursor-pointer">Edit</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceConfig;