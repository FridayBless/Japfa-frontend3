import { useState } from "react";

import {
    Check,
    TrendingUp,
    Clock,
    Navigation,
} from "lucide-react";
import { useDateRange } from "../../context/DateRangeContext";

// Types for components
interface KPICardProps {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: string;
    bgColor: string;
    iconColor: string;
    subtext: string;
}

const KPICard = ({ label, value, change, trend, icon, bgColor, iconColor, subtext }: KPICardProps) => (
    <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-wider">{label}</span>
            <div className={`p-2 ${bgColor} dark:bg-opacity-10 ${iconColor} rounded-lg`}>
                <span className="material-symbols-outlined text-xl">{icon}</span>
            </div>
        </div>
        <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-japfa-dark dark:text-white">{value}</h3>
            <span className={`text-sm font-semibold flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                <span className="material-symbols-outlined text-sm mr-1">
                    {trend === 'up' ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {change}
            </span>
        </div>
        <p className="mt-2 text-xs text-japfa-gray dark:text-gray-400">{subtext}</p>
    </div>
);

const OverviewContent = ({ endDate }: { endDate: string }) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const isHistorical = endDate < todayStr;

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top KPI Row (3 Cards) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    label="OTIF Performance"
                    value="94.2%"
                    change="1.2%"
                    trend="up"
                    icon="schedule"
                    bgColor="bg-blue-50"
                    iconColor="text-blue-600"
                    subtext="vs. last month avg"
                />
                <KPICard
                    label="On-Time Delivery"
                    value="96.8%"
                    change="0.5%"
                    trend="up"
                    icon="check_circle"
                    bgColor="bg-green-50"
                    iconColor="text-green-600"
                    subtext="Target: 95%"
                />
                <KPICard
                    label="Average delivery time"
                    value="2.4 Days"
                    change="0.2d"
                    trend="down"
                    icon="timer"
                    bgColor="bg-purple-50"
                    iconColor="text-purple-600"
                    subtext="vs. previous week"
                />
                <KPICard
                    label="Fill Rate"
                    value="98.1%"
                    change="0.3%"
                    trend="up"
                    icon="inventory_2"
                    bgColor="bg-orange-50"
                    iconColor="text-japfa-orange"
                    subtext="Stock availability"
                />
            </section>

            {/* Today's Fulfillment Tracking Section */}
            <section className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-japfa-orange/10 p-2 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-japfa-orange" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-japfa-dark dark:text-white">
                                {isHistorical ? "Historical Fulfillment Tracking" : "Today's Fulfillment Tracking"}
                            </h3>
                            <p className="text-[10px] font-black text-japfa-gray dark:text-gray-500 uppercase tracking-widest mt-0.5">
                                Unit: KG • {isHistorical ? "Analysis Data" : "Real-time Operations"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center px-6 border-r border-gray-100 dark:border-white/5">
                            <p className="text-[9px] font-black text-japfa-gray dark:text-gray-500 uppercase tracking-[0.1em] mb-1">Total Target</p>
                            <p className="text-xl font-black text-japfa-navy dark:text-blue-400">45,280 <span className="text-[10px] opacity-70">KG</span></p>
                        </div>
                        <div className="text-center">
                            <p className="text-[9px] font-black text-japfa-gray dark:text-gray-500 uppercase tracking-[0.1em] mb-1">Remaining</p>
                            <p className="text-xl font-black text-japfa-gray dark:text-gray-400">12,140 <span className="text-[10px] opacity-70">KG</span></p>
                        </div>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Status Column 1: Completed */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                                <span className="text-[11px] font-black text-japfa-dark dark:text-white uppercase tracking-widest">Completed</span>
                            </div>
                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">72.3%</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-sidebar p-4 rounded-xl border border-gray-100 dark:border-white/5 group hover:border-emerald-500/50 transition-colors cursor-pointer">
                            <p className="text-2xl font-black text-japfa-dark dark:text-white">32,740</p>
                            <p className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-[0.1em] mt-1 inline-flex items-center gap-1.5">
                                KG DELIVERED <span className="w-1 h-1 rounded-full bg-emerald-500"></span> 184 DROPS
                            </p>
                            <div className="mt-4 h-1.5 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[72%] rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Status Column 2: In-Transit or Pending */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 ${isHistorical ? 'bg-orange-50 dark:bg-orange-500/10' : 'bg-blue-50 dark:bg-blue-500/10'} rounded-lg`}>
                                    {isHistorical ? <Clock className="w-3.5 h-3.5 text-japfa-orange" /> : <Navigation className="w-3.5 h-3.5 text-blue-600" />}
                                </div>
                                <span className="text-[11px] font-black text-japfa-dark dark:text-white uppercase tracking-widest">
                                    {isHistorical ? "Pending" : "In-Transit"}
                                </span>
                            </div>
                            <span className={`text-xs font-black ${isHistorical ? 'text-japfa-orange bg-orange-50' : 'text-blue-600 bg-blue-50'} dark:bg-opacity-10 px-2 py-0.5 rounded-full`}>18.5%</span>
                        </div>
                        <div className={`bg-gray-50 dark:bg-sidebar p-4 rounded-xl border border-gray-100 dark:border-white/5 group transition-colors cursor-pointer ${isHistorical ? 'hover:border-japfa-orange/50' : 'hover:border-blue-500/50'}`}>
                            <p className="text-2xl font-black text-japfa-dark dark:text-white">8,400</p>
                            <p className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-[0.1em] mt-1 inline-flex items-center gap-1.5">
                                KG PROGRESS <span className={`w-1 h-1 rounded-full ${isHistorical ? 'bg-japfa-orange' : 'bg-blue-500'}`}></span> 42 LOADS
                            </p>
                            <div className="mt-4 h-1.5 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${isHistorical ? 'bg-japfa-orange' : 'bg-blue-500'} w-[18.5%] rounded-full animate-pulse-slow`}></div>
                            </div>
                        </div>
                    </div>

                    {/* Mini Stats 1 */}
                    <div className="bg-gray-50 dark:bg-sidebar p-6 rounded-xl border border-gray-100 dark:border-white/5 flex flex-col justify-between">
                        <div>
                            <p className="text-[9px] font-black text-japfa-gray dark:text-gray-500 uppercase tracking-widest mb-1">Average Payload</p>
                            <h4 className="text-xl font-extrabold text-japfa-dark dark:text-white">2.8 <span className="text-xs uppercase opacity-60">Ton</span></h4>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center justify-between text-[10px] font-bold mb-1.5">
                                <span className="text-japfa-gray dark:text-gray-500 uppercase italic">Capacity Utilization</span>
                                <span className="text-japfa-orange">92.4%</span>
                            </div>
                            <div className="h-1 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-japfa-orange w-[92.4%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Mini Stats 2 */}
                    <div className="bg-gray-50 dark:bg-sidebar p-6 rounded-xl border border-gray-100 dark:border-white/5 flex flex-col justify-between">
                        <div>
                            <p className="text-[9px] font-black text-japfa-gray dark:text-gray-500 uppercase tracking-widest mb-1">Est. Completion</p>
                            <h4 className="text-xl font-extrabold text-japfa-dark dark:text-white">{isHistorical ? "Full Archive" : "18:45"} <span className="text-xs uppercase opacity-60 italic">{isHistorical ? "" : "Tonight"}</span></h4>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                                <span className="text-japfa-gray dark:text-gray-500 uppercase italic">Risk level</span>
                                <span className="text-emerald-500 uppercase tracking-tighter">Low Range</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 flex-wrap">
                    <div>
                        <h2 className="text-xl font-bold text-japfa-dark dark:text-white">Distribution Performance Trend</h2>
                        <p className="text-sm text-japfa-gray dark:text-gray-400">Daily fulfillment vs shipment volume (OTIF & Load Count)</p>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-orange-100 dark:bg-orange-500/20"></span>
                            <span className="text-xs font-medium text-japfa-gray dark:text-gray-400">Shipment Volume</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-japfa-orange"></div>
                            <span className="text-xs font-medium text-japfa-gray dark:text-gray-400">OTIF Performance</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 border-t border-dashed border-red-400"></div>
                            <span className="text-xs font-medium text-japfa-gray dark:text-gray-400">95% Target</span>
                        </div>
                    </div>
                </div>

                {/* SVG Chart Container */}
                <div className="relative w-full h-[300px] mb-4">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
                        {/* Horizontal Grid Lines */}
                        {[0, 60, 120, 180, 240, 300].map((y) => (
                            <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="currentColor" className="text-gray-100 dark:text-white/5" strokeDasharray="4" />
                        ))}
                        {/* 95% Target Line */}
                        <line x1="0" x2="1000" y1="150" y2="150" stroke="#ef4444" strokeDasharray="6,4" strokeWidth="2" />

                        {/* Bars (Shipment Volume) */}
                        {[200, 240, 280, 180, 260, 220, 290].map((h, i) => (
                            <rect key={i} x={80 + i * 130} y={300 - h} width="40" height={h} fill="currentColor" className="text-orange-100 dark:text-orange-500/20 rounded-t-sm" />
                        ))}

                        {/* Trend Line (OTIF %) */}
                        <path
                            d="M 100,200 C 150,200 180,160 230,160 C 280,160 310,120 360,120 C 410,120 440,220 490,220 C 540,220 570,110 620,110 C 670,110 700,140 750,140 C 800,140 830,90 880,90"
                            fill="none"
                            stroke="#F28C38"
                            strokeWidth="4"
                        />

                        {/* Markers */}
                        {[
                            { x: 100, y: 200 }, { x: 230, y: 160 }, { x: 360, y: 120 },
                            { x: 490, y: 220 }, { x: 620, y: 110 }, { x: 750, y: 140 }, { x: 880, y: 90 }
                        ].map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r="5" fill="white" stroke="#F28C38" strokeWidth="2" />
                        ))}
                    </svg>
                </div>
                <div className="flex justify-between px-10 text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-wider">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </section>

            {/* Bottom KPI Row - Stacked Vertically with No Side Blank Space */}
            <section className="flex flex-col gap-4 w-full">
                <KPICard
                    label="Return Rate"
                    value="1.2%"
                    change="0.4%"
                    trend="down"
                    icon="assignment_return"
                    bgColor="bg-red-50"
                    iconColor="text-red-600"
                    subtext="Rejected loads reduction"
                />
                <KPICard
                    label="Transport Cost"
                    value="4.2B"
                    change="2.1%"
                    trend="up"
                    icon="payments"
                    bgColor="bg-purple-50"
                    iconColor="text-purple-600"
                    subtext="Fuel surcharge impact"
                />
                <KPICard
                    label="Load Factor"
                    value="89.4%"
                    change="1.5%"
                    trend="up"
                    icon="local_shipping"
                    bgColor="bg-teal-50"
                    iconColor="text-teal-600"
                    subtext="Capacity efficiency"
                />
            </section>

            {/* 🌟 NEW: RETURN REASONS & AI ANALYSIS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                    <h2 className="text-xl font-bold text-japfa-dark dark:text-white mb-1">Return Causes Distribution</h2>
                    <p className="text-sm text-japfa-gray dark:text-gray-400 font-medium mb-8">Breakdown of return reasons by total weight percentage</p>
                    <div className="flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-8">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle className="stroke-gray-100 dark:stroke-white/5" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="3"></circle>
                                <circle className="stroke-japfa-orange" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="5" strokeDasharray="68 32" strokeDashoffset="0"></circle>
                                <circle className="stroke-japfa-navy dark:stroke-blue-400" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="5" strokeDasharray="23 77" strokeDashoffset="-68"></circle>
                                <circle className="stroke-japfa-gray dark:stroke-gray-600" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="5" strokeDasharray="9 91" strokeDashoffset="-91"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-extrabold text-japfa-dark dark:text-white">18.1K</span>
                                <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-widest mt-1">Total KG</span>
                            </div>
                        </div>
                        <div className="w-full space-y-3">
                            {[
                                { label: "Quality Issues", percent: "68.5%", color: "bg-japfa-orange" },
                                { label: "Mismatched SKU", percent: "23.1%", color: "bg-japfa-navy" },
                                { label: "Cust. Rejection", percent: "8.4%", color: "bg-japfa-gray" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-sidebar rounded-lg border border-gray-100 dark:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                                        <span className="text-sm font-semibold text-japfa-gray dark:text-gray-400">{item.label}</span>
                                    </div>
                                    <span className="text-md font-bold text-japfa-dark dark:text-white">{item.percent}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-japfa-navy to-japfa-navy/90 p-1 rounded-xl shadow-lg">
                    <div className="bg-white dark:bg-card-dark p-7 rounded-[10px] h-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-japfa-orange/10 rounded-lg">
                                    <span className="material-symbols-outlined text-japfa-orange">psychology</span>
                                </div>
                                <h2 className="text-xl font-bold text-japfa-dark dark:text-white">Daily AI Analysis</h2>
                            </div>
                            <span className="text-[10px] font-black bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-wider">Live Insight</span>
                        </div>
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 dark:bg-sidebar rounded-xl border-l-4 border-japfa-orange shadow-sm">
                                <p className="text-sm font-bold text-japfa-dark dark:text-white mb-1">Critical Insight: Rejection Spike</p>
                                <p className="text-xs text-japfa-gray dark:text-gray-400 leading-relaxed">High rejection rate detected at <b>Jabodetabek Area</b> (3.2%). Recommend checking reefer settings.</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-sidebar rounded-xl border-l-4 border-japfa-navy shadow-sm">
                                <p className="text-sm font-bold text-japfa-dark dark:text-white mb-1">Efficiency Optimization</p>
                                <p className="text-xs text-japfa-gray dark:text-gray-400 leading-relaxed">Load factor improved to 89.4%. Est. Saving: Rp 45.2M / day.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReturnContent = () => {
    const [openActionId, setOpenActionId] = useState<number | null>(null);

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* 1. Top Row: Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-wider">Quality Standard Issues</span>
                            <span className="text-[10px] bg-orange-100 dark:bg-orange-500/20 text-japfa-orange px-2 py-0.5 rounded font-bold self-start uppercase">Production</span>
                        </div>
                        <div className="p-2 bg-orange-50 dark:bg-orange-500/10 text-japfa-orange rounded-lg">
                            <span className="material-symbols-outlined text-xl">high_quality</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-3xl font-extrabold text-japfa-dark dark:text-white">12.4K KG</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-japfa-orange">IDR 245.2M</p>
                            <span className="text-[11px] font-semibold text-red-500 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded flex items-center">
                                <span className="material-symbols-outlined text-xs mr-0.5">arrow_upward</span>
                                2.4% vs last month
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-japfa-gray dark:text-gray-400 italic border-t border-gray-50 dark:border-white/5 pt-3">Physical damage or contamination</p>
                </div>

                <div className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-wider">Mismatched SKU</span>
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-500/20 text-japfa-slate dark:text-japfa-gray px-2 py-0.5 rounded font-bold self-start uppercase">Warehouse</span>
                        </div>
                        <div className="p-2 bg-slate-50 dark:bg-slate-500/10 text-japfa-navy dark:text-blue-400 rounded-lg">
                            <span className="material-symbols-outlined text-xl">category</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-3xl font-extrabold text-japfa-dark dark:text-white">4.2K KG</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-japfa-orange">IDR 84.1M</p>
                            <span className="text-[11px] font-semibold text-green-500 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded flex items-center">
                                <span className="material-symbols-outlined text-xs mr-0.5">arrow_downward</span>
                                0.8% vs last month
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-japfa-gray dark:text-gray-400 italic border-t border-gray-50 dark:border-white/5 pt-3">Incorrect product delivered</p>
                </div>

                <div className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-wider">Customer Rejection</span>
                            <span className="text-[10px] bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold self-start uppercase">Transporter</span>
                        </div>
                        <div className="p-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg">
                            <span className="material-symbols-outlined text-xl">person_off</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-3xl font-extrabold text-japfa-dark dark:text-white">1.5K KG</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-japfa-orange">IDR 32.5M</p>
                            <span className="text-[11px] font-semibold text-green-500 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded flex items-center">
                                <span className="material-symbols-outlined text-xs mr-0.5">arrow_downward</span>
                                1.1% vs last month
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-japfa-gray dark:text-gray-400 italic border-t border-gray-50 dark:border-white/5 pt-3">Delivery window or slot missed</p>
                </div>
            </div>

            {/* 2. Middle Section: Donut Chart & Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                    <h2 className="text-xl font-bold text-japfa-dark dark:text-white mb-1">Return Causes Distribution</h2>
                    <p className="text-sm text-japfa-gray dark:text-gray-400 font-medium mb-8">Breakdown of return reasons by total weight percentage</p>
                    <div className="flex flex-col items-center">
                        <div className="relative w-56 h-56 mb-8">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle className="stroke-gray-100 dark:stroke-white/5" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="3"></circle>
                                <circle className="stroke-japfa-orange" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="5" strokeDasharray="68 32" strokeDashoffset="0"></circle>
                                <circle className="stroke-japfa-navy dark:stroke-blue-400" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="5" strokeDasharray="23 77" strokeDashoffset="-68"></circle>
                                <circle className="stroke-japfa-gray dark:stroke-gray-600" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="5" strokeDasharray="9 91" strokeDashoffset="-91"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-extrabold text-japfa-dark dark:text-white">18.1K</span>
                                <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-widest mt-1">Total KG</span>
                            </div>
                        </div>
                        <div className="w-full max-sm mb-4">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-sidebar rounded-lg border border-gray-100 dark:border-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-japfa-orange"></span>
                                        <span className="text-sm font-semibold text-japfa-gray dark:text-gray-400">Quality Issues</span>
                                    </div>
                                    <span className="text-md font-bold text-japfa-dark dark:text-white">68.5%</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-sidebar rounded-lg border border-gray-100 dark:border-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-japfa-navy dark:bg-blue-400"></span>
                                        <span className="text-sm font-semibold text-japfa-gray dark:text-gray-400">Mismatched SKU</span>
                                    </div>
                                    <span className="text-md font-bold text-japfa-dark dark:text-white">23.1%</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-sidebar rounded-lg border border-gray-100 dark:border-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-japfa-gray dark:bg-gray-600"></span>
                                        <span className="text-sm font-semibold text-japfa-gray dark:text-gray-400">Cust. Rejection</span>
                                    </div>
                                    <span className="text-md font-bold text-japfa-dark dark:text-white">8.4%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-sidebar p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
                    <h2 className="text-xl font-bold text-japfa-dark dark:text-white mb-1">Fleet Performance</h2>
                    <p className="text-sm text-japfa-gray dark:text-gray-400 font-medium mb-6">Top vehicles by incident count and weight impact</p>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {[
                            { plate: "B 9044 JXS", count: 14, weight: "1.2K KG", trend: "up", percent: "+5%" },
                            { plate: "B 9513 JXS", count: 11, weight: "940 KG", trend: "down", percent: "-2%" },
                            { plate: "B 9514 JXS", count: 8, weight: "650 KG", trend: "flat", percent: "Stable" },
                            { plate: "B 9517 JXS", count: 6, weight: "420 KG", trend: "down", percent: "-8%" },
                            { plate: "B 9518 JXS", count: 5, weight: "380 KG", trend: "up", percent: "+1%" }
                        ].map((fleet, idx) => (
                            <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${idx === 0 ? 'bg-orange-50/50 dark:bg-orange-500/5 border-orange-100 dark:border-orange-500/20' : 'bg-white dark:bg-sidebar border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/20'}`}>
                                <div className="flex items-center gap-4">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-japfa-orange text-white' : 'bg-gray-100 dark:bg-white/10 text-japfa-gray dark:text-gray-400'}`}>{idx + 1}</span>
                                    <div>
                                        <p className="font-bold text-japfa-dark dark:text-white text-lg tracking-tight">{fleet.plate}</p>
                                        <p className="text-[11px] text-japfa-gray dark:text-gray-500 uppercase font-bold">{fleet.count} Incidents This Month</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-extrabold text-japfa-dark dark:text-white">{fleet.weight}</p>
                                    <p className={`text-[10px] font-bold flex items-center justify-end gap-1 ${fleet.trend === 'up' ? 'text-red-500' : fleet.trend === 'down' ? 'text-green-500' : 'text-japfa-gray dark:text-gray-500'}`}>
                                        <span className="material-symbols-outlined text-xs">
                                            {fleet.trend === 'up' ? 'trending_up' : fleet.trend === 'down' ? 'trending_down' : 'trending_flat'}
                                        </span>
                                        {fleet.percent} vs last month
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Bottom Section: Historical Return Audit Table */}
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-japfa-dark dark:text-white">Historical Return Audit Table</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest leading-none">
                                    <div className="flex items-center gap-2">
                                        Date
                                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors">
                                            <span className="material-symbols-outlined text-[14px]">filter_alt</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest leading-none">
                                    <div className="flex items-center gap-2">
                                        Customer
                                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors">
                                            <span className="material-symbols-outlined text-[14px]">filter_alt</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest leading-none">
                                    <div className="flex items-center gap-2">
                                        Batch ID
                                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors">
                                            <span className="material-symbols-outlined text-[14px]">filter_alt</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest leading-none">
                                    <div className="flex items-center gap-2">
                                        Product
                                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors">
                                            <span className="material-symbols-outlined text-[14px]">filter_alt</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest leading-none">
                                    <div className="flex items-center gap-2">
                                        Weight
                                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors">
                                            <span className="material-symbols-outlined text-[14px]">filter_alt</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest leading-none">
                                    <div className="flex items-center gap-2">
                                        RETURN CAUSE
                                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors">
                                            <span className="material-symbols-outlined text-[14px]">filter_alt</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest leading-none text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        REASON
                                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors">
                                            <span className="material-symbols-outlined text-[14px]">filter_alt</span>
                                        </button>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5 border-b border-gray-100 dark:border-white/10">
                            {[
                                { date: "25 Oct 2023", customer: "Superindo JKT-12", id: "DO-2023-9021", product: "Chicken Fillet 500g", weight: "450 KG", returnCause: "Quality Issues", reason: "Temperature Breach" },
                                { date: "24 Oct 2023", customer: "Lotte Mart Solo", id: "DO-2023-8842", product: "Whole Chicken Grade A", weight: "1,200 KG", returnCause: "Quality Issues", reason: "Damaged Packaging" }
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="py-4 px-6 text-japfa-gray dark:text-gray-400 group-hover:text-japfa-dark dark:group-hover:text-white transition-colors">{row.date}</td>
                                    <td className="py-4 px-6 font-semibold text-japfa-dark dark:text-white">{row.customer}</td>
                                    <td className="py-4 px-6 font-mono text-xs text-japfa-gray dark:text-gray-500">{row.id}</td>
                                    <td className="py-4 px-6 text-japfa-dark dark:text-gray-300">{row.product}</td>
                                    <td className="py-4 px-6 font-extrabold text-japfa-dark dark:text-white text-md">{row.weight}</td>
                                    <td className="py-4 px-6 text-japfa-gray dark:text-gray-400">{row.returnCause}</td>
                                    <td className="py-4 px-6 text-center text-japfa-gray dark:text-gray-400 text-sm">
                                        {row.reason}
                                    </td>
                                    <td className="py-4 px-6 text-right relative">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === idx ? null : idx); }}
                                            className="px-3 py-1.5 bg-japfa-orange/10 dark:bg-japfa-orange/20 text-japfa-orange text-xs font-bold rounded hover:bg-japfa-orange hover:text-white transition-all active:scale-95 cursor-pointer flex items-center gap-1 ml-auto"
                                        >
                                            Details <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
                                        </button>
                                        {openActionId === idx && (
                                            <div className="absolute right-6 top-10 mt-1 w-48 bg-white dark:bg-popover border border-gray-100 dark:border-white/10 rounded-xl shadow-lg z-20 overflow-hidden text-left">
                                                <div className="p-1" role="menu">
                                                    <button onClick={(e) => { e.stopPropagation(); alert('View Report'); setOpenActionId(null); }} className="w-full text-left px-4 py-2 text-sm text-japfa-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 transition-colors">
                                                        <span className="material-symbols-outlined text-[16px]">visibility</span> View Report
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); alert('Download PDF'); setOpenActionId(null); }} className="w-full text-left px-4 py-2 text-sm text-japfa-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 transition-colors">
                                                        <span className="material-symbols-outlined text-[16px]">download</span> Download PDF
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); alert('Process Return'); setOpenActionId(null); }} className="w-full text-left px-4 py-2 text-sm text-japfa-orange hover:bg-orange-50 dark:hover:bg-japfa-orange/10 flex items-center gap-2 transition-colors">
                                                        <span className="material-symbols-outlined text-[16px]">assignment_return</span> Process Return
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const EfficiencyContent = () => (
    <div className="space-y-8 animate-fadeIn pb-20">
        {/* KPI Row - 5 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <KPICard
                label="Cost per KG" value="IDR 850" change="2.1%" trend="up" icon="scale" bgColor="bg-orange-50" iconColor="text-japfa-orange" subtext="vs. target IDR 820"
            />
            <KPICard
                label="Fuel Efficiency" value="92.4%" change="0.8%" trend="up" icon="local_gas_station" bgColor="bg-orange-50" iconColor="text-japfa-orange" subtext="optimal range 90-95%"
            />
            <KPICard
                label="Load Factor" value="87.1%" change="1.5%" trend="up" icon="local_shipping" bgColor="bg-orange-50" iconColor="text-japfa-orange" subtext="capacity utilization"
            />
            <KPICard
                label="Hidden Cost" value="4.2%" change="0.5%" trend="down" icon="visibility_off" bgColor="bg-orange-50" iconColor="text-japfa-orange" subtext="minimal leakage"
            />
            <KPICard
                label="SLA Performance" value="98.2%" change="On Target" trend="up" icon="star" bgColor="bg-orange-50" iconColor="text-japfa-orange" subtext="service excellence"
            />
        </div>

        {/* Main Analytics: Load Factor & Cost Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Actual vs. Target Load Factor Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-card-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold text-japfa-dark dark:text-white">Actual vs. Target Load Factor</h3>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-0.5 bg-japfa-orange"></span>
                            <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-wider">Actual</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-0.5 border-t border-dashed border-gray-400"></span>
                            <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-wider">Baseline</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-0.5 border-t border-dotted border-red-500"></span>
                            <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-wider">90% Target</span>
                        </div>
                    </div>
                </div>
                <div className="relative w-full aspect-[21/9] bg-gray-50 dark:bg-sidebar rounded-xl overflow-hidden border border-gray-100 dark:border-white/5">
                    <svg className="w-full h-full p-4" preserveAspectRatio="none" viewBox="0 0 1000 400">
                        {/* Red Dotted Target Line at 90% */}
                        <line x1="0" y1="80" x2="1000" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                        {/* Grey Dashed Historical Baseline */}
                        <path d="M 0 280 Q 250 300 500 240 T 1000 200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" className="text-gray-400 opacity-40" />
                        {/* Solid JAPFA Orange Actual Line */}
                        <path d="M 0 320 L 150 280 L 300 290 L 450 150 L 600 120 L 750 85 L 900 105 L 1000 90" fill="none" stroke="#F28C38" strokeWidth="3" />
                        {/* Pulse Point */}
                        <circle cx="750" cy="85" r="5" fill="#F28C38" stroke="white" strokeWidth="2">
                            <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                    </svg>

                    {/* Floating Tooltip Mockup */}
                    <div className="absolute top-4 right-1/4 translate-x-20 bg-japfa-dark dark:bg-slate-800 text-white p-3 rounded-xl shadow-xl border border-white/10 scale-90 md:scale-100 origin-top-right">
                        <div className="flex flex-col gap-1 min-w-[120px]">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Oct 24, 2023</p>
                            <div className="flex justify-between items-center text-xs font-bold mt-1">
                                <span>Actual</span>
                                <span className="text-japfa-orange text-sm">89.2%</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-400">
                                <span>Baseline</span>
                                <span>82.1%</span>
                            </div>
                            <div className="h-[1px] bg-white/10 my-1"></div>
                            <div className="flex justify-between items-center text-[10px] text-red-400 font-bold">
                                <span>Gap to Target</span>
                                <span>-0.8%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Operating Cost Distribution Donut */}
            <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col h-full">
                <h3 className="text-lg font-bold text-japfa-dark dark:text-white mb-8">Operating Cost Distribution</h3>
                <div className="flex-1 flex flex-col items-center justify-center relative min-h-[180px]">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Total 100% donut */}
                        {/* BBM: 45% (Orange) */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F28C38" strokeWidth="12" strokeDasharray="282.7" strokeDashoffset="155.5" />
                        {/* Tol: 25% (Light Orange) */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ffcc80" strokeWidth="12" strokeDasharray="282.7" strokeDashoffset="212" transform="rotate(162 50 50)" />
                        {/* Parkir: 15% (Muted Brown) */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8d6e63" strokeWidth="12" strokeDasharray="282.7" strokeDashoffset="240.3" transform="rotate(252 50 50)" />
                        {/* Parkir Liar: 5% (Darker Brown) */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#5d4037" strokeWidth="12" strokeDasharray="282.7" strokeDashoffset="268.6" transform="rotate(306 50 50)" />
                        {/* Labor: 10% (Navy) */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1d2d50" strokeWidth="12" strokeDasharray="282.7" strokeDashoffset="254.4" transform="rotate(324 50 50)" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-black text-japfa-dark dark:text-white">100%</span>
                        <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-widest">Total Ops</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-y-3 mt-8">
                    {[
                        { label: "BBM", percent: "45%", color: "bg-japfa-orange" },
                        { label: "Tol", percent: "25%", color: "bg-orange-300" },
                        { label: "Parkir", percent: "15%", color: "bg-amber-700" },
                        { label: "Liar", percent: "5%", color: "bg-amber-900" },
                        { label: "Kuli/Helper", percent: "10%", color: "bg-[#1d2d50]", full: true }
                    ].map((item, idx) => (
                        <div key={idx} className={`flex items-center gap-2 ${item.full ? 'col-span-2' : ''}`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                            <span className="text-[11px] font-bold text-japfa-gray dark:text-gray-400">{item.label} ({item.percent})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Row: Hidden Cost & Leakage Points */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hidden Cost Composition */}
            <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <h3 className="text-lg font-bold text-japfa-dark dark:text-white mb-8">Hidden Cost Composition</h3>
                <div className="space-y-6">
                    {[
                        { label: "Parkir Liar", value: "52%", color: "bg-japfa-orange" },
                        { label: "Kuli/Lain2", value: "31%", color: "bg-orange-300" },
                        { label: "Helper Harian", value: "17%", color: "bg-slate-700" }
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-japfa-dark dark:text-white">{item.label}</span>
                                <span className="text-japfa-orange text-sm">{item.value}</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-50 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Highest Leakage Points Table */}
            <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <h3 className="text-lg font-bold text-japfa-dark dark:text-white mb-8">Highest Leakage Points</h3>
                <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-white/5">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-white/5">
                            <tr>
                                <th className="p-4 text-[10px] font-black text-japfa-gray dark:text-gray-500 uppercase tracking-widest">Location</th>
                                <th className="p-4 text-[10px] font-black text-japfa-gray dark:text-gray-500 uppercase tracking-widest text-right">Cost (IDR)</th>
                                <th className="p-4 text-[10px] font-black text-japfa-gray dark:text-gray-500 uppercase tracking-widest text-right">% Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {[
                                { loc: "Pasar Senen Hub", cost: "4,250,000", pct: "24.1%" },
                                { loc: "Pluit Distribution", cost: "3,120,000", pct: "18.5%" },
                                { loc: "Tanah Abang Area", cost: "2,840,000", pct: "15.2%" },
                                { loc: "Cakung Logistics", cost: "1,950,000", pct: "11.8%" },
                                { loc: "Kelapa Gading Port", cost: "1,200,000", pct: "9.4%" }
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-xs font-bold text-japfa-dark dark:text-white">{row.loc}</td>
                                    <td className="p-4 text-xs font-mono text-japfa-gray dark:text-gray-400 text-right">{row.cost}</td>
                                    <td className="p-4 text-xs font-black text-japfa-orange text-right">{row.pct}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

const ManagerLogistik = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const { endDate } = useDateRange();

    return (
        <div className="p-8 pt-0 max-w-[1600px] mx-auto min-h-screen">
            {/* Horizontal Tab Navigation */}
            <div className="sticky top-0 z-20 bg-gray-50/95 dark:bg-sidebar/95 backdrop-blur-sm -mx-8 px-8 border-b border-gray-200 dark:border-white/10 pt-1 mb-8">
                <nav className="flex items-center justify-between gap-10">
                    <div className="flex items-center gap-10">
                        {[
                            { id: "overview", label: "Overview" },
                            { id: "return", label: "Return Performance" },
                            { id: "efficiency", label: "Logistics Efficiency" }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-3 text-sm transition-all border-b-2 ${activeTab === tab.id
                                    ? "text-japfa-orange border-japfa-orange font-extrabold"
                                    : "text-japfa-gray dark:text-gray-400 border-transparent hover:text-japfa-dark dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 font-semibold"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-8 pb-10 transition-all duration-500">
                {activeTab === "overview" && <OverviewContent endDate={endDate} />}
                {activeTab === "return" && <ReturnContent />}
                {activeTab === "efficiency" && <EfficiencyContent />}
            </div>
        </div>
    );
};

export default ManagerLogistik;

