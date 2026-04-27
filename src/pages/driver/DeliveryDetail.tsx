import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '../../components/Header';

const DriverDeliveryDetail: React.FC = () => {
    const navigate = useNavigate();
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

    // Destination: RS Mitra Keluarga Cikarang
    const destination = {
        longitude: 107.144415,
        latitude: -6.326354,
        name: "RS Mitra Keluarga Cikarang"
    };

    const [viewState, setViewState] = useState({
        longitude: destination.longitude,
        latitude: destination.latitude,
        zoom: 14
    });

    return (
        <div className="min-h-screen bg-[#0a0a0a] font-sans transition-colors duration-300 text-white">
            <Header title="Stop Detail" />

            <main className="max-w-md mx-auto px-4 py-6 flex flex-col min-h-[calc(100vh-80px)]">
                <div className="bg-[#1a1a1a] rounded-3xl p-6 shadow-sm border border-slate-800 space-y-6">
                    <div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Customer Name</p>
                        <h3 className="text-lg font-bold text-white">{destination.name}</h3>
                    </div>

                    <div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Address</p>
                        <p className="text-sm font-medium text-slate-300 leading-relaxed">
                            Jl. Raya Industri No. 100, <br />
                            Cikarang Selatan, Bekasi, <br />
                            Jawa Barat 17530
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">PIC Name</p>
                        <p className="text-base font-bold text-white">Bapak Budi Santoso</p>
                    </div>

                    <button className="w-full h-12 bg-primary/20 text-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/30 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined text-lg">call</span>
                        Call PIC
                    </button>

                    <div className="aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-inner relative">
                        <Map
                            {...viewState}
                            onMove={evt => setViewState(evt.viewState)}
                            style={{ width: '100%', height: '100%' }}
                            mapStyle="mapbox://styles/mapbox/dark-v11"
                            mapboxAccessToken={mapboxToken}
                        >
                            <Marker longitude={destination.longitude} latitude={destination.latitude}>
                                <span className="material-symbols-outlined text-primary bg-white rounded-full p-1 text-sm shadow-md">location_on</span>
                            </Marker>
                        </Map>
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 px-2 py-1 rounded shadow-sm">Destinasi</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-8 space-y-4 pb-8">
                    <button
                        onClick={() => navigate('/driver/navigation')}
                        className="w-full h-14 bg-slate-800 border-2 border-slate-700 text-slate-300 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-slate-700 transition-all active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined text-xl">navigation</span>
                        MULAI NAVIGASI
                    </button>

                    <button
                        onClick={() => navigate('/driver/pod')}
                        className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-wide"
                    >
                        SAYA SUDAH TIBA
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DriverDeliveryDetail;
