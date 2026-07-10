import React from 'react';
import PageHeader from '../PageHeader';

const LiveMap = () => {
    return (
        // <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
        //   <PageHeader title="Live Map" subtitle="Your location · Active job · Upcoming bookings" />
        <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
            {/* Title Section matching Credits layout */}
            <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F] mb-[6px]">Live Map</div>
            <div className="text-[14px] text-[#9090A0] mb-[20px]">
                Your location · Active job · Upcoming bookings
            </div>

            <div className="p-6">
                <div className="grid grid-cols-[1fr_300px] gap-4 h-[540px]">
                    {/* Map */}
                    <div className="relative bg-[#E8EDF2] rounded-2xl overflow-hidden">
                        {/* Faux road grid */}
                        <div className="absolute left-0 right-0 top-[26%] h-[3.5%] bg-[#F0F2F4]" />
                        <div className="absolute left-0 right-0 top-[50%] h-[2.5%] bg-[#F0F2F4]" />
                        <div className="absolute top-0 bottom-0 left-[23%] w-[2.5%] bg-[#F0F2F4]" />
                        <div className="absolute top-0 bottom-0 left-[48%] w-[2%] bg-[#F0F2F4]" />

                        {/* Route line */}
                        <svg className="absolute inset-0 w-full h-full">
                            <polyline
                                points="34%,44% 40%,37% 45%,27%"
                                fill="none"
                                stroke="#D61CA8"
                                strokeWidth="2.5"
                                strokeDasharray="7 4"
                                opacity="0.8"
                            />
                        </svg>

                        {/* Ripple under user pin */}
                        <div className="absolute top-[38%] left-[31%] w-14 h-14 rounded-full border-2 border-[#D61CA8]/30" />

                        {/* My location */}
                        <div className="absolute top-[41%] left-[33%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#D61CA8] to-[#8B2EF5] border-[3px] border-white flex items-center justify-center font-bold text-[13px] text-white shadow-[0_3px_12px_rgba(214,28,168,0.5)]">
                            M
                        </div>

                        {/* Active job marker */}
                        <div className="absolute top-[24%] left-[45%] w-[22px] h-[22px] -translate-x-1/2 -translate-y-1/2 bg-[#F59E0B] rounded-full border-2 border-white flex items-center justify-center font-bold text-[9px] text-white shadow-[0_2px_8px_rgba(245,158,11,0.5)] cursor-pointer">
                            1
                        </div>

                        {/* Upcoming job marker */}
                        <div className="absolute top-[50%] left-[12%] w-[22px] h-[22px] -translate-x-1/2 -translate-y-1/2 bg-[#4B6EF5] rounded-full border-2 border-white flex items-center justify-center font-bold text-[9px] text-white shadow-[0_2px_8px_rgba(75,110,245,0.5)] cursor-pointer">
                            2
                        </div>

                        {/* Zoom controls */}
                        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
                            <button className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-sm shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:bg-[#F8F8FA] transition-colors">
                                +
                            </button>
                            <button className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-sm shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:bg-[#F8F8FA] transition-colors">
                                −
                            </button>
                        </div>

                        {/* Area label */}
                        <div className="absolute top-2.5 left-2.5 bg-black/55 rounded-md px-2.5 py-1 font-medium text-[10px] leading-none text-white">
                            Al Khuwair · Muscat
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-2.5 left-2.5 bg-white rounded-lg px-2.5 py-2 flex gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                            <div className="flex items-center gap-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#D61CA8]" />
                                <span className="font-medium text-[9px] leading-none text-[#555]">You</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                                <span className="font-medium text-[9px] leading-none text-[#555]">Active job</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#4B6EF5]" />
                                <span className="font-medium text-[9px] leading-none text-[#555]">Upcoming</span>
                            </div>
                        </div>
                    </div>

                    {/* Side panel */}
                    <div className="flex flex-col gap-3">
                        {/* Active job card */}
                        <div className="bg-white rounded-2xl p-4 shadow-[0_1px_5px_rgba(0,0,0,0.06)]">
                            <div className="font-bold text-[11px] leading-none text-[#0A0A0F] mb-3">Active Job #1</div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-8 h-8 bg-[#FEF3C7] rounded-lg flex items-center justify-center text-base flex-shrink-0">❄️</div>
                                <div>
                                    <div className="font-semibold text-[11px] leading-none text-[#0A0A0F]">AC Deep Cleaning</div>
                                    <div className="font-normal text-[9px] leading-none text-[#9090A0] mt-1">Ahmed Al-Rashdi · Qurum</div>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="font-normal text-[10px] leading-none text-[#9090A0]">Distance</span>
                                <span className="font-bold text-[10px] leading-none text-[#D61CA8]">1.2 km</span>
                            </div>
                            <div className="flex justify-between mb-3">
                                <span className="font-normal text-[10px] leading-none text-[#9090A0]">ETA</span>
                                <span className="font-bold text-[10px] leading-none text-[#0A0A0F]">12 min</span>
                            </div>
                            <button className="w-full py-2 bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-lg text-center font-bold text-[10px] leading-none text-white hover:opacity-90 transition-opacity">
                                Navigate →
                            </button>
                        </div>

                        {/* Upcoming job card */}
                        <div className="bg-white rounded-2xl p-4 shadow-[0_1px_5px_rgba(0,0,0,0.06)]">
                            <div className="font-bold text-[11px] leading-none text-[#0A0A0F] mb-3">Upcoming Job #2</div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-8 h-8 bg-[#DBEAFE] rounded-lg flex items-center justify-center text-base flex-shrink-0">⚡</div>
                                <div>
                                    <div className="font-semibold text-[11px] leading-none text-[#0A0A0F]">Electrical Repair</div>
                                    <div className="font-normal text-[9px] leading-none text-[#9090A0] mt-1">Khalid Al-Farsi · Bowsher</div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-normal text-[10px] leading-none text-[#9090A0]">Scheduled</span>
                                <span className="font-bold text-[10px] leading-none text-[#0A0A0F]">2:00 PM today</span>
                            </div>
                        </div>

                        {/* Status card */}
                        <div className="bg-white rounded-2xl p-4 shadow-[0_1px_5px_rgba(0,0,0,0.06)]">
                            <div className="font-bold text-[11px] leading-none text-[#0A0A0F] mb-3">My Status</div>
                            <div className="flex justify-between mb-2.5">
                                <span className="font-normal text-[10px] leading-none text-[#9090A0]">Coverage areas</span>
                                <span className="font-semibold text-[10px] leading-none text-[#0A0A0F]">5 areas</span>
                            </div>
                            <div className="flex justify-between mb-2.5">
                                <span className="font-normal text-[10px] leading-none text-[#9090A0]">Online since</span>
                                <span className="font-semibold text-[10px] leading-none text-[#0A0A0F]">7:30 AM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-normal text-[10px] leading-none text-[#9090A0]">Jobs today</span>
                                <span className="font-bold text-[10px] leading-none text-[#D61CA8]">3 (1 done)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMap;