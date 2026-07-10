import React, { useState } from 'react';
import PageHeader from '../PageHeader';

const ReadOnlyField = ({ label, value }) => (
  <div className="mb-2">
    <div className="font-semibold text-[9px] leading-none text-[#9090A0] uppercase tracking-wide mb-1">{label}</div>
    <div className="bg-[#F8F8FA] border border-[#EBEBEF] rounded-lg px-2.5 py-2 font-normal text-[11px] leading-none text-[#0A0A0F]">
      {value}
    </div>
  </div>
);

const Toggle = ({ on, onClick }) => (
  <div
    onClick={onClick}
    className={`w-8 h-[17px] rounded-full cursor-pointer relative transition-colors flex-shrink-0 ${on ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5]' : 'bg-[#E5E7EB]'
      }`}
  >
    <div className={`absolute top-0.5 w-[13px] h-[13px] rounded-full bg-white shadow transition-all ${on ? 'left-[17px]' : 'left-0.5'}`} />
  </div>
);

const Settings = () => {
  const [status, setStatus] = useState('online');
  const [toggles, setToggles] = useState({
    newBooking: true,
    paymentReceived: true,
    reviewPosted: true,
    creditsLow: true,
    weeklyEarnings: true,
    aiTips: true,
  });

  const flip = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    // <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
    //   <PageHeader title="Settings" subtitle="Manage your vendor profile, availability and payouts" />
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      {/* Title Section matching Credits layout */}
      <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F] mb-[6px]">Settings</div>
      <div className="text-[14px] text-[#9090A0] mb-[20px]">
        Manage your vendor profile, availability and payouts
      </div>


      <div className="p-6">
        <div className="grid grid-cols-3 gap-2.5">
          {/* Profile */}
          <div className="bg-white rounded-2xl p-3.5 shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="font-bold text-xs leading-none text-[#0A0A0F] mb-3">Profile</div>
            <ReadOnlyField label="Company Name" value="Al Ameera Technical" />
            <ReadOnlyField label="Owner" value="Mohammed Al-Balushi" />
            <ReadOnlyField label="Phone" value="+968 9234 5678" />
            <ReadOnlyField label="Email" value="m@ameera-tech.om" />
            <ReadOnlyField label="CR Number" value="1234567 ✓" />
            <ReadOnlyField label="Oman ID" value="Verified (ROP) ✓" />
            <ReadOnlyField label="Type" value="LLC Company" />
          </div>

          {/* Availability */}
          <div className="bg-white rounded-2xl p-3.5 shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="font-bold text-xs leading-none text-[#0A0A0F] mb-3">Availability</div>
            <ReadOnlyField label="Working Hours" value="8:00 AM – 7:00 PM" />
            <ReadOnlyField label="Working Days" value="Sat – Thu" />
            <ReadOnlyField label="Areas Served" value="Qurum, Al Khuwair, Bowsher, MSQ, Al Ghubrah" />
            <ReadOnlyField label="Max Jobs/Day" value="4" />
            <ReadOnlyField label="Emergency Callouts" value="Yes (+OMR 5)" />

            <div className="mt-3">
              <div className="font-semibold text-[9px] leading-none text-[#9090A0] uppercase tracking-wide mb-1.5">
                Online Status
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setStatus('online')}
                  className={`px-3.5 py-1.5 rounded-md font-bold text-[10px] leading-none transition-colors ${status === 'online'
                      ? 'bg-gradient-to-r from-[#10B981] to-[#4B6EF5] text-white'
                      : 'bg-[#F8F8FA] border border-[#EBEBEF] text-[#6B7280]'
                    }`}
                >
                  🟢 Online
                </button>
                <button
                  onClick={() => setStatus('offline')}
                  className={`px-3.5 py-1.5 rounded-md font-semibold text-[10px] leading-none transition-colors ${status === 'offline'
                      ? 'bg-gradient-to-r from-[#10B981] to-[#4B6EF5] text-white'
                      : 'bg-[#F8F8FA] border border-[#EBEBEF] text-[#6B7280]'
                    }`}
                >
                  Go Offline
                </button>
              </div>
            </div>
          </div>

          {/* Bank & Notifications */}
          <div className="bg-white rounded-2xl p-3.5 shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="font-bold text-xs leading-none text-[#0A0A0F] mb-3">Bank &amp; Notifications</div>

            <div className="bg-gradient-to-br from-[#0A0A0F] to-[#0a1240] rounded-xl p-3.5 mb-3">
              <div className="font-bold text-xs leading-none text-white">Bank of Muscat</div>
              <div className="font-normal text-[9px] leading-none text-white/45 mt-1 mb-2">Primary payout account</div>
              <div className="font-medium text-[10px] leading-none text-white/65">IBAN: OM80 0001 0000 2345 6789</div>
              <button className="mt-2 px-2.5 py-1 bg-white/10 rounded-md font-semibold text-[9px] leading-none text-white/70 hover:bg-white/15 transition-colors">
                Change Bank
              </button>
            </div>

            <div className="flex flex-col">
              {[
                { key: 'newBooking', label: 'New booking alert' },
                { key: 'paymentReceived', label: 'Payment received' },
                { key: 'reviewPosted', label: 'Review posted' },
                { key: 'creditsLow', label: 'Credits low warning' },
                { key: 'weeklyEarnings', label: 'Weekly earnings' },
                { key: 'aiTips', label: 'AI tips' },
              ].map((row) => (
                <div key={row.key} className="flex items-center justify-between py-1.5 border-b border-[#F5F5F5] last:border-b-0">
                  <span className="font-medium text-[10px] leading-none text-[#0A0A0F]">{row.label}</span>
                  <Toggle on={toggles[row.key]} onClick={() => flip(row.key)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;