import React from 'react';

const BookingsTable = () => {
  const bookings = [
    { id: '#4521', service: 'AC Deep Clean', customer: 'Ahmed Al-Rashdi', pro: { initial: 'M', name: 'Mohammed A.' }, area: 'Qurum', amount: 'OMR 17', status: 'Completed', statusColor: 'emerald' },
    { id: '#4520', service: 'Home Cleaning', customer: 'Khalid Al-Farsi', pro: { initial: 'S', name: 'Salim Al-Habsi' }, area: 'Al Khuwair', amount: 'OMR 37', status: 'In Progress', statusColor: 'amber' },
    { id: '#4519', service: 'Beauty at Home', customer: 'Sara Al-Balushi', pro: { initial: 'F', name: 'Fatima Al-Z.' }, area: 'MSQ Hills', amount: 'OMR 45', status: 'En Route', statusColor: 'blue' },
    { id: '#4518', service: 'Pest Control', customer: 'Omar Al-Jabri', pro: { initial: 'K', name: 'Khalid Al-H.' }, area: 'Ruwi', amount: 'OMR 22', status: 'Scheduled', statusColor: 'purple' },
    { id: '#4517', service: 'Plumbing Fix', customer: 'Nasser Al-Rawahi', pro: { initial: 'A', name: 'Ali Al-Maamari' }, area: 'Bowsher', amount: 'OMR 15', status: 'Completed', statusColor: 'emerald' },
  ];

  const statusStyles = {
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  const proGradients = [
    'from-primary to-secondary',
    'from-accent to-secondary',
    'from-primary to-accent',
    'from-secondary to-cyan-400',
    'from-emerald-500 to-accent',
    'from-amber-500 to-red-500',
    'from-secondary to-primary',
  ];

  return (
    <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-[18px]">
        <div className="font-bold text-base leading-none text-[#0A0A0F]">Recent Bookings</div>
        <div className="flex gap-2 items-center">
          <div className="px-3 py-1.25 bg-[#FDF4FF] rounded-[7px] font-semibold text-[11px] leading-none text-primary border border-[#F3E8FF]">
            Live
          </div>
          <div className="font-semibold text-[13px] leading-none text-primary cursor-pointer">
            View All →
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-[80px_1.2fr_1fr_80px_80px_90px] gap-2 px-3 py-2 bg-[#F8F8FA] rounded-xl mb-2">
        <span className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">ID</span>
        <span className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">Service · Customer</span>
        <span className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">Professional</span>
        <span className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">Area</span>
        <span className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">Amount</span>
        <span className="font-semibold text-[10px] leading-none text-[#9090A0] uppercase tracking-[0.6px]">Status</span>
      </div>
      
      <div className="flex flex-col gap-1">
        {bookings.map((booking, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-[80px_1.2fr_1fr_80px_80px_90px] gap-2 px-3 py-2.5 rounded-xl items-center ${index % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}
          >
            <span className="font-semibold text-xs leading-none text-[#9090A0]">{booking.id}</span>
            <div>
              <div className="font-semibold text-xs leading-[1.2] text-[#0A0A0F]">{booking.service}</div>
              <div className="font-normal text-[10px] leading-none text-[#9090A0] mt-0.5">{booking.customer}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-[22px] h-[22px] rounded-full bg-gradient-to-br ${proGradients[index % proGradients.length]} flex items-center justify-center font-bold text-[9px] text-white flex-shrink-0`}>
                {booking.pro.initial}
              </div>
              <span className="font-medium text-[11px] leading-none text-[#0A0A0F]">{booking.pro.name}</span>
            </div>
            <span className="font-normal text-[11px] leading-none text-[#6B7280]">{booking.area}</span>
            <span className="font-bold text-xs leading-none text-[#0A0A0F]">{booking.amount}</span>
            <div className={`px-2.5 py-1 rounded-md font-bold text-[10px] leading-none text-center ${statusStyles[booking.statusColor]}`}>
              {booking.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsTable;