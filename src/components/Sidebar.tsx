import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const navigate = useNavigate();
    const { role, login } = useAuth();
    const { isCollapsed, toggleSidebar, isMobileMenuOpen, closeMobileMenu } = useSidebar();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [userName, setUserName] = useState("Budi Santoso");
    const roleNames: Record<string, string> = {
        logistik: "Logistics Admin",
        manager: "Logistics Manager",
        pod: "POD Admin",
        driver: "Driver",
        kasir: "Kasir"
    };
    const userRole = roleNames[role || 'logistik'] || "Logistics Admin";
    const [userPhoto, setUserPhoto] = useState("https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop");

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <aside className={`
            fixed lg:static inset-y-0 left-0 z-30
            ${isCollapsed ? 'w-20' : 'w-72'} 
            bg-white dark:bg-sidebar text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-white/5 
            flex flex-col justify-between shrink-0 
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
            <div className="flex flex-col overflow-hidden">
                <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-slate-200 dark:border-white/5 h-16`}>
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-50 dark:bg-white p-1 rounded-lg w-16 h-10 flex items-center justify-center shrink-0">
                            <img src="/japfa-logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        {!isCollapsed && (
                            <span className="font-bold text-xl tracking-tight font-sans whitespace-nowrap lg:block">
                                <span className="text-primary font-bold text-2xl tracking-tight font-sans whitespace-nowrap">TMS</span>
                            </span>
                        )}
                    </div>
                    {/* Desktop Toggle Button - Hidden on Mobile */}
                    {!isCollapsed && (
                        <button
                            onClick={toggleSidebar}
                            className="hidden lg:block p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">menu_open</span>
                        </button>
                    )}
                    {/* Mobile Close Button */}
                    <button
                        onClick={closeMobileMenu}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {isCollapsed && (
                    <div className="hidden lg:flex justify-center p-4 border-b border-slate-200 dark:border-white/5">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                )}

                <nav className="p-4 flex flex-col gap-1">
                    {[
                        { to: "/logistik", icon: "dashboard", label: "Dashboard", end: true, roles: ['logistik'] },
                        { to: "/manager/overview", icon: "dashboard", label: "Overview", roles: ['manager'] },
                        { to: "/manager/return", icon: "assignment_return", label: "Return Performance", roles: ['manager'] },
                        { to: "/manager/efficiency", icon: "analytics", label: "Logistics Efficiency", roles: ['manager'] },
                        { to: "/logistik/route-planning", icon: "map", label: "Route Planning", roles: ['logistik'] },
                        { to: "/logistik/load-planner", icon: "conveyor_belt", label: "Load Planner", roles: ['logistik'] },
                        { to: "/logistik/fleet", icon: "local_shipping", label: "Fleet Management", roles: ['logistik'] },
                        { to: "/logistik/drivers", icon: "badge", label: "Driver List", roles: ['logistik'] },
                        { to: "/logistik/customers", icon: "groups", label: "Customer Data", roles: ['logistik'] },
                        { to: "/logistik/analytics", icon: "analytics", label: "Analytics", roles: ['logistik'] },
                        { to: "/kasir", icon: "payments", label: "Input Biaya", end: true, roles: ['kasir'] },
                        { to: "/kasir/history", icon: "history", label: "Riwayat Cost", roles: ['kasir'] },
                    ].filter(item => !item.roles || item.roles.includes(role || '')).map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={closeMobileMenu}
                            className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all ${isActive ? 'active-nav shadow-lg shadow-primary/20' : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                        </NavLink>
                    ))}
                    <div className="my-2 border-t border-slate-200 dark:border-white/5"></div>
                    {role === 'logistik' && (
                        <NavLink
                            to="/logistik/settings"
                            onClick={closeMobileMenu}
                            className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all ${isActive ? 'active-nav shadow-lg shadow-primary/20' : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined">settings</span>
                            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
                        </NavLink>
                    )}
                </nav>
            </div>

            <div className="relative">
                {isProfileOpen && !isCollapsed && (
                    <div className="absolute bottom-[calc(100%+12px)] left-4 w-64 bg-white dark:bg-popover rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col z-50">
                        <div className="p-5 border-b border-slate-200 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border-2 border-primary/50 relative group" style={{ backgroundImage: `url('${userPhoto}')` }}>
                                    {isEditingProfile && (
                                        <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                            />
                                            <span className="material-symbols-outlined text-sm">photo_camera</span>
                                        </label>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    {isEditingProfile ? (
                                        <div className="space-y-1">
                                            <input
                                                type="text"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-2 py-0.5 text-xs font-bold text-slate-900 dark:text-white"
                                            />
                                            <input
                                                type="text"
                                                value={userRole}
                                                readOnly
                                                className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-2 py-0.5 text-[10px] text-slate-500 dark:text-slate-400 cursor-not-allowed"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{userName}</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{userRole}</p>
                                        </>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">{isEditingProfile ? 'check' : 'edit'}</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-3">Switch Role</p>
                            <div className="space-y-1">
                                <button
                                    onClick={() => {
                                        login('logistik');
                                        navigate('/logistik');
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${role === 'logistik'
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                                        <span className={`text-sm ${role === 'logistik' ? 'font-semibold' : 'font-medium'}`}>Admin Logistik</span>
                                    </div>
                                    {role === 'logistik' && <span className="material-symbols-outlined text-xl">check_circle</span>}
                                </button>
                                <button
                                    onClick={() => {
                                        login('manager');
                                        navigate('/manager/overview');
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${role === 'manager'
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">monitoring</span>
                                        <span className={`text-sm ${role === 'manager' ? 'font-semibold' : 'font-medium'}`}>Manager Logistik</span>
                                    </div>
                                    {role === 'manager' && <span className="material-symbols-outlined text-xl">check_circle</span>}
                                </button>

                                <button
                                    onClick={() => {
                                        login('pod');
                                        navigate('/pod');
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${role === 'pod'
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">receipt_long</span>
                                        <span className={`text-sm ${role === 'pod' ? 'font-semibold' : 'font-medium'}`}>Admin POD</span>
                                    </div>
                                    {role === 'pod' && <span className="material-symbols-outlined text-xl">check_circle</span>}
                                </button>
                                <button
                                    onClick={() => {
                                        login('driver');
                                        navigate('/driver');
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${role === 'driver'
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">local_shipping</span>
                                        <span className={`text-sm ${role === 'driver' ? 'font-semibold' : 'font-medium'}`}>Driver</span>
                                    </div>
                                    {role === 'driver' && <span className="material-symbols-outlined text-xl">check_circle</span>}
                                </button>
                                <button
                                    onClick={() => {
                                        login('kasir');
                                        navigate('/kasir');
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${role === 'kasir'
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">payments</span>
                                        <span className={`text-sm ${role === 'kasir' ? 'font-semibold' : 'font-medium'}`}>Kasir</span>
                                    </div>
                                    {role === 'kasir' && <span className="material-symbols-outlined text-xl">check_circle</span>}
                                </button>
                            </div>
                        </div>
                        <div className="p-2 bg-slate-50 dark:bg-black/20 mt-2">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 hover:text-red-600 dark:hover:text-red-300 transition-all"
                            >
                                <span className="material-symbols-outlined text-xl">logout</span>
                                <span className="text-sm font-bold">Logout</span>
                            </button>
                        </div>
                    </div>
                )}

                <div
                    className={`${isCollapsed ? 'p-2 flex justify-center' : 'p-4 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10'} m-4 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-all group`}
                    onClick={() => {
                        if (isCollapsed) {
                            toggleSidebar();
                        } else {
                            setIsProfileOpen(!isProfileOpen);
                        }
                    }}
                >
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-300 dark:border-white/20 shrink-0" style={{ backgroundImage: `url('${userPhoto}')` }}></div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{userName}</p>
                                <p className="text-xs text-slate-500 truncate">{userRole}</p>
                            </div>
                        )}
                        {!isCollapsed && (
                            <button className="text-slate-500 group-hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">swap_horiz</span>
                            </button>
                        )}
                    </div>
                    {!isCollapsed && (
                        <div className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1.5 px-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Online
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
