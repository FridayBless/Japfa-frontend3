import { useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';


type Tab = 'zones' | 'cost' | 'team';

/* ─── Team Roles data ─────────────────────────────────────── */
interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
    lastLogin: string;
    avatar: string;
}

const members: Member[] = [
    {
        id: 1,
        name: 'Alex Thompson',
        email: 'alex.t@japfalogix.com',
        role: 'Logistics Admin',
        status: 'Active',
        lastLogin: '2 mins ago',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzBK1dj32GiR9dVI74_Jt3_gZ25myA61Mdr9ICIpMe_so3EJlxwSj1wg1SDZjJGl3oERSn2udSprfTxz7qEiu5Cs9ty1DnK138Cwl4OoeL9NJdhH882Lqs6CN9VR1_xlmYZ763QpPLFHJ6b9aeErS5BQR_E5XC70pwYIURGoCt36IWWPVDvQyFfHHUArfAd16E_-1nIqfGK63VGY35_DCF8KD9E-rP-BRi4Wbe1Ef--igNpLHxhB5tpNhrxi6xukI4OgMhYsTtQp8',
    },
    {
        id: 2,
        name: 'Sarah Jenkins',
        email: 's.jenkins@japfalogix.com',
        role: 'POD Admin',
        status: 'Active',
        lastLogin: 'Yesterday, 4:20 PM',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUflcqMWXvJHd7uV7aHWjzjSEaW-Vo9xLTtZWmL6G4GSXcdXDPzZF3_eQ-xS0o8jOk2OKY9idN7UkU7f8OR2RyIKV9t0LgV3LMb9YwuKcvGp5QGTA3VxGW9pb6zAqpc_yIdnDKzs1mteLPLVrfG60GUlSrAYIDyebGGpEdxinDuAxnlmvw5vL-OGbwDJEoFdX40JXwE2Eu4aPdRnoDn2KqnVEDR73IuRvBDSlWLPdsGv2jQ0PHnistNsVYBQgbGS6mnas0kxZlCU8',
    },
    {
        id: 3,
        name: 'Marcus Vane',
        email: 'm.vane@japfalogix.com',
        role: 'Driver (Tier 1)',
        status: 'Inactive',
        lastLogin: '3 days ago',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMwAHSiqJbN0qfk_cUudQboUcoEoCS--lH4nwHF99BF8FSDB2CWvtt6kFyqyss3jzpUfeLImsB8sGbI1YLpYN3vQE58Xwr13dqbvtfzJLzpRn_CNHgvsE90pIp-atvTjfT8EtdhQ2TamakwX26nWsTMGG0Dwt6IZeeNfGqRvzDTrJv2kD5957FAHZEBpijfOz7K76xn6OeSQ9131xjJqWmx4mMnq_bz-BqXaRT83JdyijiTghHdzZlUyFME',
    },
    {
        id: 4,
        name: 'David Chen',
        email: 'd.chen@japfalogix.com',
        role: 'Dispatcher',
        status: 'Active',
        lastLogin: '1 hour ago',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtOelL6SnN4mx0F3pELrOqyhCIUl8BIPEt1cKnSpyr_CMo3Wp6XMu2CVD5j29k-SHjuE6S-ppL-BDHIy1gMxMYkj98-LZGpTlkYLl611HmNJPIElDXJ5SUdrzfJLUDfpgnBwyfUQOvKW_ntYxpUspQEWbY43qk2n9QYgXe24cqE3YfG6B7T9Tjw6FvxXCyOj9W8YdNB7jA8hBM9SGgX3Hvu_l88UHpAOXMcaElqV4ixY9JiMqLbm0-0t9h75bdjZTqzd3dBR9IB_E',
    },
];

/* ─── Zone Coordinate Data ────────────────────────────────── */
interface ZonePolygon {
    name: string;
    coordinates: [number, number][];
    center: [number, number];
    color: string;
}

/* ─── Component ───────────────────────────────────────────── */
export default function Settings() {
    const [activeTab, setActiveTab] = useState<Tab>('zones');

    // Zone Data State
    const [zonesData, setZonesData] = useState<Record<string, ZonePolygon>>({
        'Kelapa Gading': {
            name: 'Kelapa Gading',
            coordinates: [
                [-6.1400, 106.8900],
                [-6.1400, 106.9200],
                [-6.1700, 106.9200],
                [-6.1700, 106.8900]
            ],
            center: [-6.1550, 106.9050],
            color: '#FF7A00'
        },
        'Bekasi/Cikarang': {
            name: 'Bekasi/Cikarang',
            coordinates: [
                [-6.2300, 107.0000],
                [-6.2300, 107.1500],
                [-6.3500, 107.1500],
                [-6.3500, 107.0000]
            ],
            center: [-6.2900, 107.0750],
            color: '#3B82F6'
        },
        'Serpong/Tangerang': {
            name: 'Serpong/Tangerang',
            coordinates: [
                [-6.2000, 106.6000],
                [-6.2000, 106.7000],
                [-6.3000, 106.7000],
                [-6.3000, 106.6000]
            ],
            center: [-6.2500, 106.6500],
            color: '#64748B'
        }
    });

    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [selectedZone, setSelectedZone] = useState<ZonePolygon | null>(null);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);

    // Interactive Map State
    const [editingCoordinates, setEditingCoordinates] = useState<[number, number][]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [tempLat, setTempLat] = useState<string>("");
    const [tempLng, setTempLng] = useState<string>("");

    const handleAddNewZone = () => {
        const newZone: ZonePolygon = {
            name: `New Zone ${Object.keys(zonesData).length + 1}`,
            coordinates: [
                [-6.2000, 106.8000],
                [-6.2000, 106.8500],
                [-6.2500, 106.8500],
                [-6.2500, 106.8000]
            ],
            center: [-6.2250, 106.8250],
            color: '#FF7A00'
        };
        setSelectedZone(newZone);
        setEditingCoordinates([...newZone.coordinates]);
        setIsCreateMode(true);
        setIsMapOpen(true);
    };


    // Cost config state
    const [fuelCost, setFuelCost] = useState<number>(1.45);
    const [maintenanceBuffer, setMaintenanceBuffer] = useState<number>(12.5);
    const [driverSalary, setDriverSalary] = useState<string>('3,500.00');
    const [overtimeStandard, setOvertimeStandard] = useState<string>('28.50');
    const [overtimePremium, setOvertimePremium] = useState<string>('38.00');

    const tabs: { key: Tab; label: string; icon: string }[] = [
        { key: 'zones', label: 'Delivery Zones', icon: 'map' },
        { key: 'cost', label: 'Cost Configuration', icon: 'payments' },
        { key: 'team', label: 'Team Roles', icon: 'group' },
    ];

    return (
        <>
            {/* ── Shared Header ── */}
            <header className="sticky top-0 z-10 bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#333] px-4 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-xl font-bold">Settings Configuration</h1>
            </header>

            {/* ── Content ── */}
            <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">

                {/* ── Tabs ── */}
                <div className="flex items-center border-b border-slate-200 dark:border-[#333] mb-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-6 py-2.5 text-sm font-bold flex items-center gap-2 shrink-0 transition-colors ${activeTab === tab.key
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ══════════════════════════════════════════════ */}
                {/* TAB: DELIVERY ZONES                           */}
                {/* ══════════════════════════════════════════════ */}
                {activeTab === 'zones' && (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold tracking-tight mb-1">Delivery Zones</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Manage geographical boundaries and truck assignments for delivery services.</p>
                            </div>
                            <button
                                onClick={handleAddNewZone}
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined">add_location_alt</span>
                                Add New Zone
                            </button>
                        </div>

                        {/* Table */}
                        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#333] rounded-xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left bg-white dark:bg-[#111111] min-w-[600px]">
                                    <thead className="bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-[#333]">
                                        <tr>
                                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Zone Name</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Assigned Trucks</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-[#333]">
                                        {[
                                            { name: 'Kelapa Gading', trucks: 'B 9513 JXS, ON CALL 1', active: true, color: 'text-primary bg-primary/10' },
                                            { name: 'Bekasi/Cikarang', trucks: 'B 9514 JXS, B 9517 JXS', active: true, color: 'text-blue-500 bg-blue-500/10' },
                                            { name: 'Serpong/Tangerang', trucks: 'B 9518 JXS, B 9522 JXS', active: false, color: 'text-slate-500 bg-slate-100 dark:bg-[#1A1A1A]' },
                                        ].map((zone) => (
                                            <tr key={zone.name} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded flex items-center justify-center ${zone.color}`}>
                                                            <span className="material-symbols-outlined text-lg">explore</span>
                                                        </div>
                                                        <span className="font-medium">{zone.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-slate-500 dark:text-slate-400 text-sm">{zone.trucks}</td>
                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${zone.active ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400' : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-300'}`}>
                                                        {zone.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button
                                                        onClick={() => {
                                                            const zoneData = zonesData[zone.name];
                                                            setSelectedZone(zoneData || null);
                                                            setEditingCoordinates(zoneData ? [...zoneData.coordinates] : []);
                                                            setIsCreateMode(false);
                                                            setIsMapOpen(true);
                                                        }}
                                                        className="text-primary hover:text-primary/80 font-bold text-sm flex items-center gap-1 ml-auto transition-colors cursor-pointer"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">polyline</span>
                                                        Edit Polygon
                                                    </button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Zone Editor Modal ── */}
                {isMapOpen && selectedZone && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMapOpen(false)}></div>
                        <div className="relative bg-white dark:bg-[#111111] w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-[#333] animate-in fade-in zoom-in duration-300">
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-[#333] flex items-center justify-between bg-slate-50 dark:bg-[#0a0a0a]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined">{isCreateMode ? 'add_location_alt' : 'polyline'}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black tracking-tight">{isCreateMode ? 'Create New Delivery Zone' : 'Edit Zone Polygon'}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{isCreateMode ? 'Initializing new boundary' : selectedZone.name}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsMapOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 flex flex-col md:flex-row min-h-0">
                                {/* Map Section */}
                                <div className="flex-1 relative bg-slate-100 dark:bg-black/20">
                                    <Map
                                        initialViewState={{
                                            longitude: selectedZone.center[1],
                                            latitude: selectedZone.center[0],
                                            zoom: 12
                                        }}
                                        style={{ height: '100%', width: '100%', cursor: 'crosshair' }}
                                        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
                                        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                                    >
                                        <Source
                                            id="zone-polygon"
                                            type="geojson"
                                            data={{
                                                type: 'Feature',
                                                geometry: {
                                                    type: 'Polygon',
                                                    coordinates: [
                                                        [...editingCoordinates.map(c => [c[1], c[0]]), [editingCoordinates[0][1], editingCoordinates[0][0]]]
                                                    ]
                                                },
                                                properties: {}
                                            }}
                                        >
                                            <Layer
                                                id="zone-fill"
                                                type="fill"
                                                paint={{
                                                    'fill-color': selectedZone.color,
                                                    'fill-opacity': 0.3
                                                }}
                                            />
                                            <Layer
                                                id="zone-outline"
                                                type="line"
                                                paint={{
                                                    'line-color': selectedZone.color,
                                                    'line-width': 4
                                                }}
                                            />
                                        </Source>
                                    </Map>
                                    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-[#333] z-[1000] shadow-lg">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Visual Guide</p>
                                        <p className="text-xs text-on-surface leading-tight">Drag vertices to modify boundaries.<br />Click edges to add new points.</p>
                                    </div>
                                </div>

                                {/* Controls Section */}
                                <div className="w-full md:w-80 border-l border-slate-200 dark:border-[#333] flex flex-col bg-white dark:bg-[#111111]">
                                    <div className="p-6 flex-1 overflow-y-auto">
                                        <h4 className="text-sm font-black mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">location_on</span>
                                            {isCreateMode ? 'Polygon Initialization' : 'Coordinates List'}
                                        </h4>
                                        <div className="space-y-2">
                                            {editingCoordinates.map((coord, i) => (
                                                <div key={i} className={`p-3 rounded-xl border transition-all ${editingIndex === i ? 'bg-primary/5 border-primary/40 ring-2 ring-primary/10' : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-[#333] border-dashed'} flex flex-col gap-3 group`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-bold text-slate-400">POINT {i + 1}</span>
                                                            {editingIndex !== i && (
                                                                <span className="text-[11px] font-mono font-medium truncate w-40">
                                                                    {coord[0].toFixed(6)}, {coord[1].toFixed(6)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {editingIndex !== i ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditingIndex(i);
                                                                            setTempLat(coord[0].toString());
                                                                            setTempLng(coord[1].toString());
                                                                        }}
                                                                        className="p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded transition-all text-slate-400 hover:text-primary"
                                                                    >
                                                                        <span className="material-symbols-outlined text-sm">edit</span>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            const newCoords = [...editingCoordinates];
                                                                            newCoords.splice(i, 1);
                                                                            setEditingCoordinates(newCoords);
                                                                        }}
                                                                        className="p-1 hover:bg-red-500/10 rounded transition-all text-slate-400 hover:text-red-500"
                                                                    >
                                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        const newCoords = [...editingCoordinates];
                                                                        newCoords[i] = [parseFloat(tempLat), parseFloat(tempLng)];
                                                                        setEditingCoordinates(newCoords);
                                                                        setEditingIndex(null);
                                                                    }}
                                                                    className="p-1 bg-primary text-white rounded transition-all"
                                                                >
                                                                    <span className="material-symbols-outlined text-sm">check</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {editingIndex === i && (
                                                        <div className="grid grid-cols-2 gap-2 animate-in slide-in-from-top-1 duration-200">
                                                            <div className="flex flex-col gap-1">
                                                                <label className="text-[9px] font-black text-slate-400 uppercase">Latitude</label>
                                                                <input
                                                                    type="number"
                                                                    value={tempLat}
                                                                    onChange={(e) => setTempLat(e.target.value)}
                                                                    className="bg-white dark:bg-black/40 border border-slate-200 dark:border-[#444] rounded-lg px-2 py-1 text-[11px] font-mono outline-none focus:ring-1 focus:ring-primary"
                                                                    step="0.0001"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <label className="text-[9px] font-black text-slate-400 uppercase">Longitude</label>
                                                                <input
                                                                    type="number"
                                                                    value={tempLng}
                                                                    onChange={(e) => setTempLng(e.target.value)}
                                                                    className="bg-white dark:bg-black/40 border border-slate-200 dark:border-[#444] rounded-lg px-2 py-1 text-[11px] font-mono outline-none focus:ring-1 focus:ring-primary"
                                                                    step="0.0001"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => {
                                                const lastCoord = editingCoordinates[editingCoordinates.length - 1] || selectedZone.center;
                                                // Create a new point slightly offset from the last one
                                                const newPoint: [number, number] = [lastCoord[0] + 0.001, lastCoord[1] + 0.001];
                                                setEditingCoordinates([...editingCoordinates, newPoint]);
                                                setEditingIndex(editingCoordinates.length);
                                                setTempLat(newPoint[0].toString());
                                                setTempLng(newPoint[1].toString());
                                            }}
                                            className="w-full mt-4 py-2 border-2 border-dashed border-slate-200 dark:border-[#333] rounded-xl text-xs font-bold text-slate-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-sm">add</span>
                                            Add Coordinate
                                        </button>

                                    </div>
                                    <div className="p-6 border-t border-slate-200 dark:border-[#333] flex flex-col gap-3">
                                        <button
                                            onClick={() => {
                                                if (selectedZone) {
                                                    setZonesData({
                                                        ...zonesData,
                                                        [selectedZone.name]: {
                                                            ...selectedZone,
                                                            coordinates: editingCoordinates
                                                        }
                                                    });
                                                }
                                                setIsMapOpen(false);
                                            }}
                                            className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                        >
                                            {isCreateMode ? 'Create Delivery Zone' : 'Save Boundaries'}
                                        </button>
                                        <button
                                            onClick={() => setIsMapOpen(false)}
                                            className="w-full py-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                                        >
                                            Discard Edits
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}



                {/* ══════════════════════════════════════════════ */}
                {/* TAB: COST CONFIGURATION                       */}
                {/* ══════════════════════════════════════════════ */}
                {activeTab === 'cost' && (
                    <div className="flex flex-col gap-6">
                        {/* Section header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold tracking-tight mb-1">Cost Configuration</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Define global parameters for automated shipping cost calculations.</p>
                            </div>
                            <button className="bg-gradient-to-r from-[#994700] to-[#FF7A00] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                Save Configuration
                            </button>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-12 gap-6">

                            {/* Fuel Cost */}
                            <div className="col-span-12 md:col-span-8 bg-white dark:bg-[#111111] p-8 rounded-xl shadow-sm border border-slate-200 dark:border-[#333] flex flex-col justify-between min-h-[260px] relative overflow-hidden">
                                <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-3 bg-orange-100 dark:bg-orange-500/10 rounded-lg text-primary">
                                            <span className="material-symbols-outlined">local_gas_station</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Global Energy Rate</p>
                                            <h4 className="text-xl font-bold text-on-surface">Fuel Cost per Liter</h4>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 max-w-sm">Adjust based on current market trends. This value impacts every delivery route and zone multiplier.</p>
                                </div>
                                <div className="relative z-10 flex items-end gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-300 dark:text-slate-600">$</span>
                                            <input
                                                className="w-full bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#333] rounded-2xl pl-12 pr-6 py-5 text-4xl font-black tracking-tighter text-on-surface focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#1A1A1A] transition-all outline-none"
                                                type="number" step="0.01" value={fuelCost}
                                                onChange={(e) => setFuelCost(parseFloat(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 mb-4 shrink-0">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        +2.4% vs last month
                                    </div>
                                </div>
                            </div>

                            {/* Maintenance Buffer */}
                            <div className="col-span-12 md:col-span-4 bg-[#121212] p-8 rounded-xl text-white flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                                        <span className="material-symbols-outlined text-orange-300">build</span>
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Maintenance Buffer</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">Percentage of revenue reserved for unexpected vehicle repairs and routine servicing.</p>
                                </div>
                                <div className="mt-6">
                                    <div className="flex justify-between items-end mb-3">
                                        <div className="flex items-end gap-0.5">
                                            <input type="number" step="0.1" value={maintenanceBuffer}
                                                onChange={(e) => setMaintenanceBuffer(parseFloat(e.target.value))}
                                                className="text-4xl font-black text-orange-300 bg-transparent border-none outline-none w-24 p-0"
                                            />
                                            <span className="text-xl text-orange-300 font-black mb-1">%</span>
                                        </div>
                                        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">Rec: 10–15%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#994700] to-[#FF7A00] rounded-full transition-all duration-300"
                                            style={{ width: `${Math.min(maintenanceBuffer * 6.67, 100)}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Driver Salary */}
                            <div className="col-span-12 md:col-span-7 bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-slate-400">payments</span>
                                        <h4 className="font-bold text-on-surface">Driver Base Salary (Monthly)</h4>
                                    </div>
                                    <span className="text-xs font-bold bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300">Fixed Rate</span>
                                </div>
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <input className="w-full bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#333] rounded-xl p-4 text-2xl font-black text-on-surface focus:ring-1 focus:ring-primary focus:bg-white dark:focus:bg-[#1A1A1A] transition-all outline-none pr-16"
                                            type="text" value={driverSalary} onChange={(e) => setDriverSalary(e.target.value)} />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">USD</span>
                                    </div>
                                    <button className="p-4 bg-slate-100 dark:bg-white/10 rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                        <span className="material-symbols-outlined">settings_suggest</span>
                                    </button>
                                </div>
                                <div className="mt-4 p-4 bg-slate-50 dark:bg-[#0a0a0a] rounded-lg border-l-4 border-primary/20">
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">Applied to all active fleets in Category A and B. Includes mandatory social security contributions based on regional laws.</p>
                                </div>
                            </div>

                            {/* Overtime Rate */}
                            <div className="col-span-12 md:col-span-5 bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="material-symbols-outlined text-slate-400">schedule</span>
                                    <h4 className="font-bold text-on-surface">Overtime Rate (per Hour)</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 dark:bg-[#0a0a0a] rounded-xl border border-slate-200 dark:border-[#333]">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Standard (1.5x)</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-black text-on-surface">$</span>
                                            <input type="text" value={overtimeStandard} onChange={(e) => setOvertimeStandard(e.target.value)}
                                                className="text-xl font-black text-on-surface bg-transparent outline-none w-20" />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-primary/10">
                                        <p className="text-[10px] font-bold text-primary uppercase mb-1">Premium (2.0x)</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-black text-primary">$</span>
                                            <input type="text" value={overtimePremium} onChange={(e) => setOvertimePremium(e.target.value)}
                                                className="text-xl font-black text-primary bg-transparent outline-none w-20" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center justify-between">
                                    <span className="text-[10px] font-medium text-slate-400">Effective from Jan 01, 2024</span>
                                    <button className="text-xs font-bold text-primary hover:underline">Edit Multipliers</button>
                                </div>
                            </div>
                        </div>

                        {/* Save / Discard footer */}
                        <div className="mt-4 flex justify-end gap-3">
                            <button className="px-6 py-2.5 bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-[#2a2a2a] rounded-lg text-sm font-bold transition-colors">Discard Changes</button>
                            <button className="px-6 py-2.5 bg-gradient-to-r from-[#994700] to-[#FF7A00] text-white rounded-lg text-sm font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-95">Save &amp; Deploy</button>
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════════════════ */}
                {/* TAB: TEAM ROLES                               */}
                {/* ══════════════════════════════════════════════ */}
                {activeTab === 'team' && (
                    <div className="flex flex-col gap-6">
                        {/* Section header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold tracking-tight mb-1">Manage Team</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Control access levels and manage permissions for all logistics personnel.</p>
                            </div>
                            <button className="flex items-center gap-2 bg-gradient-to-r from-[#994700] to-[#FF7A00] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                <span className="material-symbols-outlined">person_add</span>
                                Add Member
                            </button>
                        </div>

                        {/* Stats Bento */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-4 bg-slate-50 dark:bg-[#1A1A1A] p-6 rounded-xl">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Total Personnel</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-black text-on-surface">128</span>
                                    <span className="text-xs font-bold text-blue-500 flex items-center gap-0.5">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>+4 this month
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4 bg-slate-50 dark:bg-[#1A1A1A] p-6 rounded-xl">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Active Drivers</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-black text-on-surface">84</span>
                                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden self-center">
                                        <div className="w-3/4 h-full bg-primary rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4 bg-slate-50 dark:bg-[#1A1A1A] p-6 rounded-xl">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">System Roles</p>
                                <div className="flex gap-1.5 mt-2">
                                    {['LA', 'DR', 'PA'].map((l) => (
                                        <span key={l} className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-slate-50 dark:border-[#1A1A1A] flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-white">{l}</span>
                                    ))}
                                    <span className="w-8 h-8 rounded-full bg-primary text-white border-2 border-slate-50 dark:border-[#1A1A1A] flex items-center justify-center text-[10px] font-bold">+5</span>
                                </div>
                            </div>
                        </div>

                        {/* Members Table */}
                        <div className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#333]">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[640px]">
                                    <thead className="bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-[#333]">
                                        <tr>
                                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Name</th>
                                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Role</th>
                                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Last Login</th>
                                            <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-[#222]">
                                        {members.map((member, idx) => (
                                            <tr key={member.id} className={`hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50/30 dark:bg-white/[0.02]' : ''}`}>
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                                                            <img className="w-full h-full object-cover" src={member.avatar} alt={member.name} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-on-surface">{member.name}</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400">{member.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{member.role}</span>
                                                </td>
                                                <td className="px-8 py-4">
                                                    {member.status === 'Active'
                                                        ? <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase rounded-full tracking-wider">Active</span>
                                                        : <span className="px-3 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase rounded-full tracking-wider">Inactive</span>
                                                    }
                                                </td>
                                                <td className="px-8 py-4 text-sm text-slate-500 dark:text-slate-400">{member.lastLogin}</td>
                                                <td className="px-8 py-4 text-right relative">
                                                    <button
                                                        onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                                                        className="text-slate-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
                                                    >
                                                        <span className="material-symbols-outlined">more_horiz</span>
                                                    </button>
                                                    {openMenuId === member.id && (
                                                        <div className="absolute right-8 top-full mt-1 bg-white dark:bg-[#1F1F1F] border border-slate-200 dark:border-[#333] rounded-xl shadow-xl z-20 w-44 overflow-hidden">
                                                            <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                                <span className="material-symbols-outlined text-sm">edit</span>Edit Member
                                                            </button>
                                                            <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                                <span className="material-symbols-outlined text-sm">manage_accounts</span>Change Role
                                                            </button>
                                                            <div className="border-t border-slate-100 dark:border-[#333]"></div>
                                                            <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                                                <span className="material-symbols-outlined text-sm">person_remove</span>Remove
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-8 py-6 flex items-center justify-between border-t border-slate-100 dark:border-[#222]">
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Showing <span className="text-on-surface font-bold">1–4</span> of 128 members</p>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg border border-slate-200 dark:border-[#333] text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                                    </button>
                                    <button className="p-2 rounded-lg border border-primary text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all">
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Footer Stats Bar ── */}
            <footer className="mt-auto border-t border-slate-200 dark:border-[#333] bg-white dark:bg-[#111111] px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-slate-500 dark:text-slate-400">System Status: <span className="text-slate-900 dark:text-white font-bold">Optimal</span></span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 hidden sm:block">Last synced: <span className="text-slate-900 dark:text-white font-medium">2 mins ago</span></div>
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">V 2.4.1 Build 202311</div>
            </footer>
        </>
    );
}
