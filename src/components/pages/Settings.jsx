import React, { useState } from 'react';
import PageHeader from '../PageHeader';

const Toggle = ({ on, onClick }) => (
  <div
    onClick={onClick}
    className={`w-9 h-5 rounded-full cursor-pointer relative transition-colors flex-shrink-0 ${on ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5]' : 'bg-[#E5E7EB]'}`}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
  </div>
);

const Field = ({ label, value }) => (
  <div>
    <div className="font-medium text-[11px] leading-none text-[#9090A0] mb-2">{label}</div>
    <input
      defaultValue={value}
      className="w-full bg-[#F8F8FA] border border-[#EBEBEF] rounded-xl px-3.5 py-2.5 font-medium text-sm text-[#0A0A0F] outline-none focus:border-primary transition-colors"
    />
  </div>
);

const Settings = () => {
  const [toggles, setToggles] = useState({
    emailAlerts: true,
    smsAlerts: false,
    bookingAlerts: true,
    weeklyDigest: true,
    twoFactor: true,
  });

  const flip = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      <PageHeader title="Settings" subtitle="Manage your admin account and preferences" actionLabel="Save Changes" />

      <div className="p-6 flex flex-col gap-5">
        <div className="grid grid-cols-[1fr_1fr] gap-5">
          {/* Profile */}
          <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
            <div className="font-bold text-base leading-none text-[#0A0A0F] mb-5">Admin Profile</div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-lg text-white">
                A
              </div>
              <div>
                <div className="font-semibold text-sm leading-none text-[#0A0A0F]">Admin User</div>
                <div className="font-normal text-xs leading-none text-[#9090A0] mt-1.5">Super Admin</div>
              </div>
              <div className="ml-auto px-3 py-2 bg-[#F8F8FA] border border-[#EBEBEF] rounded-lg font-semibold text-[11px] leading-none text-[#6B7280] cursor-pointer hover:border-primary hover:text-primary transition-colors">
                Change Photo
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Field label="Full Name" value="Admin User" />
              <Field label="Email Address" value="admin@uniteoman.com" />
              <Field label="Phone Number" value="+968 9123 4567" />
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
            <div className="font-bold text-base leading-none text-[#0A0A0F] mb-5">Security</div>
            <div className="flex flex-col gap-4 mb-5">
              <Field label="Current Password" value="••••••••••" />
              <Field label="New Password" value="" />
            </div>
            <div className="flex items-center justify-between bg-[#F8F8FA] rounded-xl p-3.5">
              <div>
                <div className="font-medium text-xs leading-none text-[#0A0A0F]">Two-Factor Authentication</div>
                <div className="font-normal text-[10px] leading-none text-[#9090A0] mt-1.5">Adds an extra layer of security to your account</div>
              </div>
              <Toggle on={toggles.twoFactor} onClick={() => flip('twoFactor')} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-[22px] shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
          <div className="font-bold text-base leading-none text-[#0A0A0F] mb-1">Notifications</div>
          <div className="font-normal text-xs leading-none text-[#9090A0] mb-5">Choose how you want to be notified about platform activity</div>

          <div className="flex flex-col gap-1">
            {[
              { key: 'emailAlerts', label: 'Email Alerts', desc: 'Get important updates sent to your inbox' },
              { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive text messages for urgent issues' },
              { key: 'bookingAlerts', label: 'Live Booking Alerts', desc: 'Instant notification when a new booking comes in' },
              { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'A summary of performance every Monday' },
            ].map((row, i) => (
              <div key={row.key} className={`flex items-center justify-between px-3 py-3.5 rounded-xl ${i % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}>
                <div>
                  <div className="font-medium text-xs leading-none text-[#0A0A0F]">{row.label}</div>
                  <div className="font-normal text-[10px] leading-none text-[#9090A0] mt-1.5">{row.desc}</div>
                </div>
                <Toggle on={toggles[row.key]} onClick={() => flip(row.key)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;