import React from 'react';

const ServicesBreakdown = () => {
  const services = [
    { name: 'AC Service', percentage: 38, color: '#D61CA8' },
    { name: 'Cleaning', percentage: 24, color: '#8B2EF5' },
    { name: 'Plumbing', percentage: 15, color: '#4B6EF5' },
    { name: 'Beauty', percentage: 12, color: '#06B6D4' },
    { name: 'Others', percentage: 11, color: '#E5E7EB' },
  ];

  // SVG donut chart calculations
  const total = 147;
  const circumference = 2 * Math.PI * 52;
  
  let cumulative = -4;
  const segments = services.map(service => {
    const value = (service.percentage / 100) * circumference;
    const start = cumulative;
    cumulative += value;
    return {
      ...service,
      start,
      value,
      dasharray: `${value} ${circumference - value}`,
      offset: -(start + 4)
    };
  });

  return (
    <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
      <div className="font-bold text-base leading-none text-[#0A0A0F] mb-1">Services Breakdown</div>
      <div className="font-normal text-xs leading-none text-[#9090A0] mb-5">Today's bookings by type</div>
      
      <div className="flex justify-center mb-5">
        <div className="relative w-[130px] h-[130px]">
          <svg width="130" height="130" viewBox="0 0 130 130">
            {segments.map((segment, index) => (
              <circle
                key={index}
                cx="65"
                cy="65"
                r="52"
                fill="none"
                stroke={segment.color}
                strokeWidth="18"
                strokeDasharray={segment.dasharray}
                strokeDashoffset={segment.offset}
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="font-extrabold text-2xl leading-none text-[#0A0A0F]">147</div>
            <div className="font-normal text-[11px] leading-[1.3] text-[#9090A0] mt-[3px]">total</div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: service.color }} />
              <span className="font-medium text-xs leading-none text-[#6B7280]">{service.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-[60px] bg-[#F0F0F4] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${service.percentage}%`, background: service.color }} />
              </div>
              <span className="font-bold text-xs leading-none text-[#0A0A0F]">{service.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesBreakdown;