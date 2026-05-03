import { useState, useEffect } from "react";
import FleetTrackingMap from './FleetTrackingMap';

interface VolumeData {
    time: string;
    count: number;
}

export default function Dashboard() {
    const [kpiData, setKpiData] = useState({
        totalShipments: 0,
        otifRate: "0%",
        rejectionRate: "0%",
        totalWeightKg: "0"
    });

    const [volumeData, setVolumeData] = useState<VolumeData[]>([]);
    const [maxVolume, setMaxVolume] = useState(1);
    const [fleetData, setFleetData] = useState({ active: 0, total: 0, rate: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        // 1. Narik KPI
        fetch('http://localhost:8000/api/analytics/kpi-summary')
            .then(res => res.json())
            .then(data => {
                const weightFormated = data.total_weight_kg > 1000
                    ? (data.total_weight_kg / 1000).toFixed(1) + "k"
                    : data.total_weight_kg;

                setKpiData({
                    totalShipments: data.total_deliveries_today || 0,
                    otifRate: `${data.success_rate_percent || 0}%`,
                    rejectionRate: "0%",
                    totalWeightKg: weightFormated ? weightFormated.toString() : "0"
                });
            })
            .catch(err => console.error("Gagal narik KPI:", err));

        // 2. Narik Hourly Volume
        fetch('http://localhost:8000/api/dashboard/hourly-volume')
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setVolumeData(data.data);
                    setMaxVolume(data.max);
                }
            })
            .catch(err => console.error("Gagal narik Volume:", err));

        // 3. Narik Fleet Utilization
        fetch('http://localhost:8000/api/dashboard/fleet-utilization')
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setFleetData({
                        active: data.active_trucks,
                        total: data.total_trucks,
                        rate: data.utilization_rate
                    });
                }
            })
            .catch(err => console.error("Gagal narik Fleet Util:", err));

        // 4. Done loading
        Promise.resolve().then(() => setIsLoading(false));

    }, []);

    const getBarHeight = (count: number) => {
        if (count === 0) return "5%";
        return `${(count / maxVolume) * 100}%`;
    };

    return (
        <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8 transition-all duration-300">
            {/* TOP KPI ROW (3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">OTIF Rate</span>
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">timer</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{isLoading ? "..." : kpiData.otifRate}</h3>
                        <span className="text-emerald-500 dark:text-emerald-400 text-sm font-bold flex items-center">
                            <span className="material-symbols-outlined text-xs">arrow_upward</span> 1.2%
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Deliveries</span>
                        <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-500 dark:text-blue-400">
                            <span className="material-symbols-outlined">local_shipping</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{isLoading ? "..." : kpiData.totalShipments}</h3>
                        <span className="text-emerald-500 dark:text-emerald-400 text-sm font-bold flex items-center">
                            <span className="material-symbols-outlined text-xs">arrow_upward</span> 3%
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Volume (KG)</span>
                        <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-500 dark:text-purple-400">
                            <span className="material-symbols-outlined">scale</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">12,800</h3>
                        <span className="text-slate-400 text-sm font-medium uppercase">KG</span>
                    </div>
                </div>
            </div>

            {/* TODAY'S FULFILLMENT BOX */}
            <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Today's Fulfillment</h2>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Real-time status</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-2">
                    <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <circle className="stroke-slate-100 dark:stroke-slate-800" cx="18" cy="18" r="16" fill="transparent" strokeWidth="4"></circle>
                            <circle className="stroke-primary" cx="18" cy="18" r="16" fill="transparent" strokeWidth="4" strokeDasharray="75 25" strokeDashoffset="0"></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">12,800</span>
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total KG</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                        {[
                            { label: "Completed", percent: "75%", count: "9,600", color: "bg-primary" },
                            { label: "In-Transit", percent: "20%", count: "2,560", color: "bg-slate-700 dark:bg-blue-400" },
                            { label: "Pending", percent: "5%", count: "640", color: "bg-red-500" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-[#222] border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">{item.label}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-black text-slate-900 dark:text-white">{item.percent}</span>
                                    <span className="text-[10px] font-bold text-slate-400">{item.count} KG</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hourly Delivery Volume */}
            <div className="w-full bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hourly Delivery Volume</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Peak hour based on AI Estimation</p>
                </div>
                <div className="h-[250px] flex items-end gap-4 px-4">
                    {isLoading ? (
                        <div className="w-full h-full flex justify-center items-center font-bold text-slate-400">Menghitung...</div>
                    ) : volumeData.map((item, idx) => {
                        const isPeak = item.count === maxVolume && item.count > 0;
                        return (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className={`w-full rounded-t-md transition-all relative ${isPeak ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20'}`}
                                    style={{ height: getBarHeight(item.count) }}
                                ></div>
                                <span className={`text-[10px] font-bold ${isPeak ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{item.time}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* BOTTOM KPI ROW (3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Return Rate</span>
                        <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-500 dark:text-red-400">
                            <span className="material-symbols-outlined">assignment_return</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{isLoading ? "..." : kpiData.rejectionRate}</h3>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Transport Cost</span>
                        <div className="p-2 bg-teal-50 dark:bg-teal-500/10 rounded-lg text-teal-600 dark:text-teal-400">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">4.2 <span className="text-lg">B</span></h3>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Load Factor</span>
                        <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-japfa-orange">
                            <span className="material-symbols-outlined">local_shipping</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{fleetData.rate}%</h3>
                </div>
            </div>

            {/* 🌟 ADVANCED LIVE FLEET TRACKING MAP */}
            <FleetTrackingMap />
        </div>
    );
}