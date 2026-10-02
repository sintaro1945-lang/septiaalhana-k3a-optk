import React from 'react';
import { 
  Ship, 
  Boxes, 
  Truck, 
  TrendingUp, 
  Activity, 
  AlertCircle, 
  Clock, 
  Anchor,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { 
  ContainerItem, 
  VesselItem, 
  YardBlockItem, 
  GateTransactionItem, 
  OperationActivityItem 
} from '../types';

interface DashboardViewProps {
  containers: ContainerItem[];
  vessels: VesselItem[];
  yardBlocks: YardBlockItem[];
  gateTransactions: GateTransactionItem[];
  operations: OperationActivityItem[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  containers,
  vessels,
  yardBlocks,
  gateTransactions,
  operations
}) => {
  const totalContainers = containers.length;
  const activeVessels = vessels.filter(v => v.status === 'Working' || v.status === 'Berthing').length;
  const todayGates = gateTransactions.length;
  const totalTeus = containers.reduce((acc, c) => acc + (c.size === '40ft' ? 2 : 1), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Sistem Operasional Real-Time Aktif</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Terminal Peti Kemas
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Pantau kinerja bongkar muat kapal, kapasitas yard penumpukan, aktivitas truk gate, dan metrik operasional secara live dari database cloud.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
            <div className="text-2xl font-black text-cyan-400">{totalContainers}</div>
            <div className="text-xs text-slate-400">Total Peti Kemas</div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
            <div className="text-2xl font-black text-blue-400">{activeVessels}</div>
            <div className="text-xs text-slate-400">Kapal Berlabuh</div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Yard Occupancy (YOR)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">71.4%</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Kapasitas optimal (Aman & Terkendali)</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Kapal Sandar (Vessels)</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Ship className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{vessels.length} Jadwal</div>
          <div className="text-xs text-cyan-400 flex items-center gap-1">
            <span>{activeVessels} kapal sedang bekerja bongkar muat</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Aktivitas Truk Gate</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{todayGates} Truk</div>
          <div className="text-xs text-blue-400">
            <span>Gate In & Gate Out hari ini</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total TEUs</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{totalTeus} TEUs</div>
          <div className="text-xs text-indigo-400">
            <span>Kapasitas peti kemas tercatat</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Yard Blocks & Vessels Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Yard Blocks Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Boxes className="w-5 h-5 text-cyan-400" />
              <span>Status Lapangan Penumpukan (Yard Blocks)</span>
            </h3>
            <span className="text-xs text-slate-400">4 Blok Utama</span>
          </div>

          <div className="space-y-4">
            {yardBlocks.map(block => {
              const percentage = Math.round((block.currentOccupied / block.capacity) * 100);
              return (
                <div key={block.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-white">{block.blockName}</span>
                    <span className="text-xs text-slate-400">{block.currentOccupied} / {block.capacity} TEUs ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        percentage > 85 ? 'bg-rose-500' : percentage > 70 ? 'bg-amber-500' : 'bg-cyan-500'
                      }`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Tipe: {block.blockType}</span>
                    <span>Status: {percentage > 85 ? 'Padat' : 'Normal'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vessel Schedules */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Ship className="w-5 h-5 text-blue-400" />
              <span>Jadwal & Status Kapal (Vessels)</span>
            </h3>
            <span className="text-xs text-slate-400">{vessels.length} Kapal</span>
          </div>

          <div className="space-y-3">
            {vessels.map(v => (
              <div key={v.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{v.vesselName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-400 border border-slate-700 font-mono">
                      {v.voyageCode}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-3">
                    <span>Berth: <strong className="text-white">{v.berthNo}</strong></span>
                    <span>ETA: {v.eta}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-block ${
                    v.status === 'Working' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    v.status === 'Berthing' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {v.status}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {v.handledTeus} / {v.totalTeus} TEUs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Operation Activities */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <span>Aktivitas Bongkar Muat & Gerbang Terbaru</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">No. Kontainer</th>
                <th className="py-3 px-4">Voyage</th>
                <th className="py-3 px-4">Aktivitas</th>
                <th className="py-3 px-4">Alat / Crane</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {operations.map(op => (
                <tr key={op.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono font-medium text-white">{op.containerNo}</td>
                  <td className="py-3 px-4 text-cyan-400">{op.vesselCode}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-200 border border-slate-700">
                      {op.activityType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">{op.equipmentNo}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      op.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/10' :
                      op.status === 'In Progress' ? 'text-amber-400 bg-amber-500/10' :
                      'text-slate-400 bg-slate-800'
                    }`}>
                      {op.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400">{op.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
