import React from 'react';

const RevenueChart = () => {
  const data = [
    { day: 'Mon', value: 1847, height: 64 },
    { day: 'Tue', value: 2341, height: 82 },
    { day: 'Wed', value: 2029, height: 71 },
    { day: 'Thu', value: 2800, height: 98 },
    { day: 'Fri', value: 3367, height: 118, peak: true },
    { day: 'Sat', value: 2564, height: 90, projected: true },
    { day: 'Today', value: 1283, height: 46, projected: true },
  ];

  return (
    <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="font-bold text-base leading-none text-[#0A0A0F]">Revenue — Last 7 Days</div>
          <div className="font-normal text-xs leading-none text-[#9090A0] mt-[3px]">Total this week: OMR 14,231</div>
        </div>
        <div className="flex gap-2">
          <div className="px-[14px] py-1.5 bg-gradient-to-r from-primary/8 to-accent/8 rounded-lg font-semibold text-xs leading-none text-primary border border-primary/20">
            Revenue
          </div>
          <div className="px-[14px] py-1.5 bg-[#F8F8FA] rounded-lg font-medium text-xs leading-none text-[#9090A0] cursor-pointer">
            Orders
          </div>
        </div>
      </div>
      
      <div className="flex items-end gap-3 h-[150px] pb-6 relative border-b border-[#F0F0F4]">
        {/* Y-axis hints */}
        <div className="absolute left-0 top-0 right-0 flex flex-col justify-between h-[126px] pointer-events-none">
          <div className="font-normal text-[10px] leading-none text-[#C0C0CC]">OMR 3,000</div>
          <div className="font-normal text-[10px] leading-none text-[#C0C0CC]">OMR 2,000</div>
          <div className="font-normal text-[10px] leading-none text-[#C0C0CC]">OMR 1,000</div>
          <div className="font-normal text-[10px] leading-none text-[#C0C0CC]">0</div>
        </div>
        
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div 
              className={`w-full rounded-t-lg relative ${
                item.peak 
                  ? 'bg-gradient-to-b from-accent to-secondary shadow-[0_0_20px_rgba(75,110,245,0.4)]' 
                  : item.projected 
                    ? 'bg-gradient-to-b from-primary/30 to-secondary/30 border-[1.5px] border-primary/40 border-dashed' 
                    : 'bg-gradient-to-b from-primary to-secondary'
              }`}
              style={{ height: item.height }}
            >
              <div className={`absolute -top-[18px] left-1/2 -translate-x-1/2 font-semibold text-[10px] leading-none whitespace-nowrap ${
                item.peak ? 'text-accent font-bold' : item.projected ? 'text-primary/60' : 'text-primary'
              }`}>
                {item.value.toLocaleString()}
              </div>
            </div>
            <span className={`font-medium text-[11px] leading-none ${item.peak ? 'text-accent font-bold' : item.day === 'Today' ? 'text-primary font-bold' : 'text-[#9090A0]'}`}>
              {item.day}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-primary to-secondary" />
          <span className="font-normal text-[11px] leading-none text-[#9090A0]">Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-accent to-secondary" />
          <span className="font-normal text-[11px] leading-none text-[#9090A0]">Peak day</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm border-[1.5px] border-primary/50 border-dashed" />
          <span className="font-normal text-[11px] leading-none text-[#9090A0]">Projected</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;