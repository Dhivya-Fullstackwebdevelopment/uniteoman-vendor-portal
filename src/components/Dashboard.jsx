import React from 'react';
import KPICard from './KPICard';
import RevenueChart from './RevenueChart';
import ServicesBreakdown from './ServicesBreakdown';
import BookingsTable from './BookingsTable';
import TopProfessionals from './TopProfessionals';

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
      {/* Topbar */}
      <div className="bg-white border-b border-[#EBEBEF] h-[72px] flex items-center px-7 gap-4 flex-shrink-0 sticky top-0 z-50">
        <div className="flex-1">
          <div className="font-bold text-xl leading-none text-[#0A0A0F]">Dashboard</div>
          <div className="font-normal text-sm leading-none text-[#9090A0] mt-1">Sunday, 29 June 2025 · Muscat, Oman</div>
        </div>
        
        {/* Search */}
        <div className="flex items-center gap-2 bg-[#F4F5F8] rounded-xl px-4 py-2.5 w-[240px]">
          <svg className="w-4 h-4 text-[#9090A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="10.5" cy="10.5" r="7" stroke="currentColor" />
            <path d="M15.5 15.5L21 21" stroke="currentColor" strokeLinecap="round" />
          </svg>
          <input 
            className="bg-transparent border-none font-normal text-sm leading-none text-[#0A0A0F] w-full outline-none placeholder:text-[#9090A0]"
            placeholder="Search bookings, pros..." 
          />
        </div>
        
        {/* Date Range */}
        <div className="flex items-center gap-2 bg-white border border-[#EBEBEF] rounded-xl px-4 py-2.5 cursor-pointer hover:border-[#D61CA8] transition-colors">
          <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" />
            <path d="M3 9H21M8 2V6M16 2V6" stroke="currentColor" strokeLinecap="round" />
          </svg>
          <span className="font-medium text-sm leading-none text-[#6B7280]">Last 7 days</span>
          <svg className="w-3 h-3 text-[#6B7280]" fill="none" viewBox="0 0 12 12">
            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        
        {/* Export Button */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-xl font-semibold text-sm leading-none text-white cursor-pointer whitespace-nowrap shadow-[0_4px_16px_rgba(214,28,168,0.35)] hover:shadow-[0_6px_24px_rgba(214,28,168,0.45)] transition-shadow">
          Export Report
        </div>
        
        {/* Notification Bell */}
        <div className="relative cursor-pointer p-1 hover:bg-[#F8F8FA] rounded-full transition-colors">
          <svg className="w-5 h-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeLinecap="round" />
          </svg>
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#D61CA8] rounded-full border-2 border-white" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col gap-5">
        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-5">
          <KPICard 
            title="Today's Bookings"
            value="147"
            change="↑ 12%"
            icon="calendar"
            color="primary"
            progress={72}
            subtitle="vs yesterday: 131"
            progressLabel="72%"
          />
          <KPICard 
            title="Revenue Today"
            value="OMR 2,847"
            change="↑ 8.3%"
            icon="credit-card"
            color="secondary"
            progress={83}
            subtitle="vs yesterday: OMR 2,629"
            progressLabel="83%"
            valueColor="#D61CA8"
          />
          <KPICard 
            title="Active Professionals"
            value="234"
            subtitle="/312"
            icon="users"
            color="accent"
            progress={75}
            progressLabel="75%"
            liveBadge="234 live"
          />
          <KPICard 
            title="Avg Customer Rating"
            value="4.8"
            change="↑ 0.1"
            icon="star"
            color="warning"
            progress={96}
            subtitle="From 8,247 reviews"
            progressLabel="96%"
            valueSuffix=" ★"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-[1.6fr_1fr] gap-5">
          <RevenueChart />
          <ServicesBreakdown />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-[1.6fr_1fr] gap-5">
          <BookingsTable />
          <TopProfessionals />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;