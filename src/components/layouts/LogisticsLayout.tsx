import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useSidebar } from '../../context/SidebarContext';
import { useDateRange } from '../../context/DateRangeContext';

export default function LogisticsLayout() {
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useSidebar();
    const { isLoading } = useDateRange();
    const location = useLocation();

    const getPageTitle = (pathname: string) => {
        const path = pathname.split('?')[0]; // Remove query params

        switch (path) {
            case '/logistik': return "Logistics Dashboard";
            case '/logistik/route-planning': return "Route Planning";
            case '/logistik/fleet': return "Fleet Management";
            case '/logistik/drivers': return "Driver Performance";
            case '/logistik/customers': return "Customer Directory";
            case '/logistik/customers/add': return "Add New Customer";
            case '/logistik/customers/edit': return "Edit Customer";
            case '/logistik/analytics': return "Logistics Analytics";
            case '/logistik/settings': return "Application Settings";
            case '/logistik/load-planner': return "3D Load Planner";
            case '/manager': return "Manager Logistics Dashboard";
            case '/kasir': return "Input Biaya Operasional";
            case '/kasir/history': return "Riwayat Input Biaya";
            default: return "TMS Japfa Logistics";
        }
    };

    return (
        <div className="flex h-screen overflow-hidden relative bg-main-bg dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 antialiased font-display transition-colors">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Global Loading Blur Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/10 dark:bg-black/10 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-japfa-orange/20 border-t-japfa-orange rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-japfa-orange rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-black text-japfa-dark dark:text-white uppercase tracking-[0.2em]">Updating Data</span>
                            <span className="text-[10px] text-japfa-gray dark:text-gray-400 font-medium">Please wait a moment...</span>
                        </div>
                    </div>
                </div>
            )}

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Top Header */}
                <header className="lg:hidden h-16 bg-white dark:bg-sidebar border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-4 shrink-0 z-10 transition-colors shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-100 dark:bg-white p-1 rounded-lg w-12 h-8 flex items-center justify-center shrink-0">
                            <img src="/japfa-logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-lg tracking-tight font-sans">
                            <span className="text-slate-900 dark:text-white">TMS </span>
                            <span className="text-[#FF7A00]">Japfa</span>
                        </span>
                    </div>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors"
                    >
                        <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </header>

                {/* Global Desktop Header */}
                <div className="hidden lg:block">
                    <Header title={getPageTitle(location.pathname)} />
                </div>

                <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0a0a0a] transition-all duration-300 ease-in-out">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
