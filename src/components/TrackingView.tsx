import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  Ship, 
  Truck, 
  Boxes, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { ContainerItem, GateTransactionItem, OperationActivityItem } from '../types';

interface TrackingViewProps {
  containers: ContainerItem[];
  gateTransactions: GateTransactionItem[];
  operations: OperationActivityItem[];
}

export const TrackingView: React.FC<TrackingViewProps> = ({
  containers,
  gateTransactions,
  operations
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContainer, setSelectedContainer] = useState<ContainerItem | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = containers.find(c => c.containerNo.toLowerCase() === searchQuery.trim().toLowerCase());
    setSelectedContainer(found || null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Pelacakan Kontainer & Histori Pergerakan</h2>
          <p className="text-sm text-slate-400">Masukkan nomor kontainer (contoh: MSCU7849201) untuk melihat histori pelacakan lengkap.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nomor Kontainer (misal: MSCU7849201)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
          <button 
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20 transition"
          >
            Lacak
          </button>
        </form>
      </div>

      {selectedContainer ? (
        <div className="space-y-6">
          {/* Container Info Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Nomor Kontainer</span>
              <div className="text-xl font-bold font-mono text-cyan-400">{selectedContainer.containerNo}</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Ukuran & Tipe</span>
              <div className="text-lg font-semibold text-white">{selectedContainer.size} - {selectedContainer.type}</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Lokasi Yard Saat Ini</span>
              <div className="text-lg font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{selectedContainer.yardLocation}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Pemilik & Voyage</span>
              <div className="text-sm font-semibold text-white">{selectedContainer.owner} ({selectedContainer.voyageNo})</div>
            </div>
          </div>

          {/* Timeline History */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white">Timeline Histori Pergerakan (Tracking Trail)</h3>

            <div className="relative border-l-2 border-cyan-500/30 ml-4 space-y-8 py-2">
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900" />
                <div className="text-xs text-cyan-400 font-mono">07:30 - {selectedContainer.arrivalDate}</div>
                <div className="text-base font-bold text-white">Gate In (Masuk Terminal via Truk)</div>
                <div className="text-xs text-slate-400">Nomor tiket gerbang tercatat, inspeksi kondisi fisik kontainer aman.</div>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900" />
                <div className="text-xs text-blue-400 font-mono">08:00 - {selectedContainer.arrivalDate}</div>
                <div className="text-base font-bold text-white">Penempatan Yard (Yard Stacking)</div>
                <div className="text-xs text-slate-400">Dipindahkan ke blok penumpukan <strong>{selectedContainer.yardLocation}</strong> oleh Rubber Tyres Gantry (RTG).</div>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900" />
                <div className="text-xs text-emerald-400 font-mono">08:30 - {selectedContainer.arrivalDate}</div>
                <div className="text-base font-bold text-white">Bongkar Muat Kapal (Stevedoring / Discharge)</div>
                <div className="text-xs text-slate-400">Teregistrasi pada jadwal kapal Voyage {selectedContainer.voyageNo}.</div>
              </div>
            </div>
          </div>
        </div>
      ) : searchQuery && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <div className="text-white font-semibold">Kontainer tidak ditemukan</div>
          <p className="text-xs text-slate-500 mt-1">Pastikan nomor kontainer yang dimasukkan sudah benar atau gunakan data dari Master Data.</p>
        </div>
      )}
    </div>
  );
};
