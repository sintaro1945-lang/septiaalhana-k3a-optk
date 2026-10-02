import React from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  TrendingUp, 
  Boxes, 
  Ship, 
  Truck, 
  CheckCircle2 
} from 'lucide-react';
import { ContainerItem, VesselItem, YardBlockItem, GateTransactionItem } from '../types';

interface ReportViewProps {
  containers: ContainerItem[];
  vessels: VesselItem[];
  yardBlocks: YardBlockItem[];
  gateTransactions: GateTransactionItem[];
}

export const ReportView: React.FC<ReportViewProps> = ({
  containers,
  vessels,
  yardBlocks,
  gateTransactions
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header & Print Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-white">Laporan Kinerja Operasional Terminal</h2>
          <p className="text-sm text-slate-400">Ringkasan statistik harian yard, kapal, dan arus gerbang peti kemas.</p>
        </div>

        <button 
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Ekspor Laporan PDF</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
          <div className="text-xs text-slate-400 uppercase font-semibold">Total Peti Kemas Aktif</div>
          <div className="text-4xl font-extrabold text-white">{containers.length} Unit</div>
          <div className="text-xs text-cyan-400 flex items-center gap-1">
            <Boxes className="w-4 h-4" />
            <span>Kapasitas Yard Terisi 71.4%</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
          <div className="text-xs text-slate-400 uppercase font-semibold">Total Kapal Sandar</div>
          <div className="text-4xl font-extrabold text-white">{vessels.length} Kapal</div>
          <div className="text-xs text-blue-400 flex items-center gap-1">
            <Ship className="w-4 h-4" />
            <span>Produktivitas Crane 28.5 Box/Jam</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
          <div className="text-xs text-slate-400 uppercase font-semibold">Arus Truk Gate</div>
          <div className="text-4xl font-extrabold text-white">{gateTransactions.length} Truk</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <Truck className="w-4 h-4" />
            <span>Waktu Layanan Rata-rata 14 Menit</span>
          </div>
        </div>
      </div>

      {/* Detailed Yard Occupancy Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span>Analisis Kapasitas Lapangan Penumpukan (Yard Block Report)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Blok Yard</th>
                <th className="py-3 px-4">Tipe Penyimpanan</th>
                <th className="py-3 px-4">Kapasitas (TEUs)</th>
                <th className="py-3 px-4">Terisi (TEUs)</th>
                <th className="py-3 px-4">Sisa Kosong</th>
                <th className="py-3 px-4">Persentase YOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {yardBlocks.map(yb => {
                const freeSpace = yb.capacity - yb.currentOccupied;
                const percentage = Math.round((yb.currentOccupied / yb.capacity) * 100);
                return (
                  <tr key={yb.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-bold text-white">{yb.blockName}</td>
                    <td className="py-3 px-4 text-cyan-300">{yb.blockType}</td>
                    <td className="py-3 px-4 font-mono">{yb.capacity}</td>
                    <td className="py-3 px-4 font-mono">{yb.currentOccupied}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">{freeSpace}</td>
                    <td className="py-3 px-4 font-mono font-bold text-white">{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
