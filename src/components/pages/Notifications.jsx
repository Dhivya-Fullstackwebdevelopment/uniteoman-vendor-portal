import React, { useState } from 'react';

const initialNotifications = [
  {
    id: 1,
    icon: '💼',
    iconBg: '#D61CA818',
    title: 'New Job Request — AC Deep Cleaning',
    body: 'Ahmed Al-Rashdi · Qurum · OMR 17 · Today 2:00 PM',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    icon: '💰',
    iconBg: '#10B98118',
    title: 'Payment Received',
    body: 'OMR 14.45 credited — Bank of Muscat (AC Deep Cleaning #UO-4521)',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 3,
    icon: '⭐',
    iconBg: '#F59E0B18',
    title: 'New 5-Star Review',
    body: 'Ahmed Al-Rashdi rated you ★★★★★ — "Punctual and professional!"',
    time: '3 hrs ago',
    unread: true,
  },
  {
    id: 4,
    icon: '🎯',
    iconBg: '#8B2EF518',
    title: 'Credits Running Low — 20 remaining',
    body: 'Top up your Professional plan to keep receiving bookings.',
    time: 'Today 9:00 AM',
    unread: false,
  },
  {
    id: 5,
    icon: '✨',
    iconBg: '#4B6EF518',
    title: 'AI Insight: Demand Surge',
    body: 'AC bookings up 34% in Qurum this week. Consider adding afternoon slots.',
    time: 'Today 8:00 AM',
    unread: false,
  },
  {
    id: 6,
    icon: '📋',
    iconBg: '#05966918',
    title: 'Booking Confirmed — #UO-4521',
    body: 'AC Deep Cleaning · Ahmed Al-Rashdi · Wed 9 Jul 10:00 AM',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 7,
    icon: '🏦',
    iconBg: '#D61CA818',
    title: 'Monthly Payout Processed',
    body: 'OMR 1,059.95 transferred to Bank of Muscat IBAN. T+1 settlement.',
    time: 'Yesterday',
    unread: false,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      {/* Header with Mark All Read Action on Right */}
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Notifications</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">
            Bookings, payments, platform updates
          </div>
        </div>
        <button 
          onClick={markAllRead}
          className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-bold text-[#D61CA8] hover:bg-[#F8F8FA] transition-colors"
        >
          Mark all read
        </button>
      </div>

      {/* Notifications feed list */}
      <div className="flex flex-col gap-2.5">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`rounded-xl px-3.5 py-2.5 flex items-start gap-2.5 transition-colors ${
              n.unread
                ? 'bg-[#D61CA8]/[0.03] border border-[#D61CA8]/[0.12]'
                : 'bg-white border border-[#F0F0F0]'
            }`}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
              style={{ backgroundColor: n.iconBg }}
            >
              {n.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[11px] leading-none text-[#0A0A0F] mb-1">{n.title}</div>
              <div className="font-normal text-[10px] leading-relaxed text-[#6B7280]">{n.body}</div>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <span className="font-normal text-[9px] leading-none text-[#9090A0] whitespace-nowrap">{n.time}</span>
              {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#D61CA8]" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;