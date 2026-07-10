import React from 'react';
import logo from '../assets/uniteoman-logo.png';

const NAV_ITEMS = [
  { key: 'dashboard', icon: 'grid', label: 'Dashboard' },
  { key: 'bookings', icon: 'calendar', label: 'Bookings', badge: '147' },
  { key: 'professionals', icon: 'users', label: 'Professionals' },
  { key: 'customers', icon: 'user-group', label: 'Customers' },
  { key: 'services', icon: 'layers', label: 'Services' },
  { key: 'payments', icon: 'credit-card', label: 'Payments' },
  { key: 'analytics', icon: 'chart-bar', label: 'Analytics' },
  { key: 'service-config', icon: 'cog', label: 'Service Config' },
  { key: 'reports', icon: 'document', label: 'Reports' },
];

const Sidebar = ({ activePage = 'dashboard', onNavigate = () => {}, onLogout = () => {} }) => {
  return (
    <div className="w-[232px] bg-[#0A0A0F] flex flex-col flex-shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <img
          src={logo}
          className="h-[30px] w-auto"
          alt="UniteOman"
        />
        <div className="font-normal text-[10px] leading-none text-white/30 mt-[5px] tracking-[0.5px]">
          Admin Console
        </div>
      </div>
      <div className="h-px bg-white/6 mx-5 mb-[14px]" />

      {/* Navigation */}
      <nav className="px-2.5 flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const active = activePage === item.key;
          return (
            <div
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer relative transition-colors
                ${active
                  ? 'bg-gradient-to-br from-primary/20 to-secondary/15 border-l-3 border-primary'
                  : 'hover:bg-white/5'
                }`}
            >
              <Icon name={item.icon} className={active ? 'text-primary' : 'text-white/40'} />
              <span className={`font-medium text-[13px] leading-none ${
                active ? 'text-white' : 'text-white/50'
              }`}>
                {item.label}
              </span>
              {item.badge && (
                <div className="absolute right-3 bg-primary rounded-full px-[7px] py-0.5 font-bold text-[10px] leading-none text-white">
                  {item.badge}
                </div>
              )}
            </div>
          );
        })}

        <div className="mt-2 h-px bg-white/6" />

        {/* Settings */}
        <div
          onClick={() => onNavigate('settings')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer mt-1.5 transition-colors
            ${activePage === 'settings' ? 'bg-gradient-to-br from-primary/20 to-secondary/15 border-l-3 border-primary' : 'hover:bg-white/5'}`}
        >
          <Icon name="settings" className={activePage === 'settings' ? 'text-primary' : 'text-white/30'} />
          <span className={`font-medium text-[13px] leading-none ${activePage === 'settings' ? 'text-white' : 'text-white/30'}`}>
            Settings
          </span>
        </div>
      </nav>

      {/* Admin Profile */}
      <div className="px-5 py-4 border-t border-white/6 flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-[13px] text-white flex-shrink-0">
          A
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-xs leading-none text-white truncate">Admin User</div>
          <div className="font-normal text-[10px] leading-none text-white/35 mt-[3px]">Super Admin</div>
        </div>
        <svg
          onClick={onLogout}
          title="Log out"
          className="w-3.5 h-3.5 text-white/30 cursor-pointer hover:text-primary transition-colors"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
      </div>
    </div>
  );
};

// Icon component
const Icon = ({ name, className }) => {
  const icons = {
    grid: (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" />
        <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    calendar: (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3 9H21M8 2V6M16 2V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    users: (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    'user-group': (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    layers: (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    'credit-card': (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    'chart-bar': (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    cog: (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    document: (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8"/>
        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    settings: (
      <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

export default Sidebar;