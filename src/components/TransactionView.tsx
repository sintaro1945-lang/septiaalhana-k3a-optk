import React, { useState } from 'react';
import { 
  Truck, 
  Activity, 
  Plus, 
  CheckCircle, 
  Clock, 
  X, 
  ArrowRightLeft,
  ShieldCheck
} from 'lucide-react';
import { GateTransactionItem, OperationActivityItem } from '../types';

interface TransactionViewProps {
  gateTransactions: GateTransactionItem[];
  operations: OperationActivityItem[];
  onAddGateTransaction: (item: Omit<GateTransactionItem, 'id'>) => Promise<void>;
  onDeleteGateTransaction: (id: string) => Promise<void>;
  onAddOperation: (item: Omit<OperationActivityItem, 'id'>) => Promise<void>;
  onDeleteOperation: (id: string) => Promise<void>;
}

export const TransactionView: React.FC<TransactionViewProps> = ({
  gateTransactions,
  operations,
  onAddGateTransaction,
  onDeleteGateTransaction,
  onAddOperation,
  onDeleteOperation
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'gate' | 'stevedoring'>('gate');
  const [showGateModal, setShowGateModal] = useState(false);
  const [showOpModal, setShowOpModal] = useState(false);

  const [gateForm, setGateForm] = useState({
    ticketNo: `GT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    truckPlate: 'B 8211 XX',
    driverName: 'Sugiarto',
    containerNo: 'MSCU7849201',
    direction: 'GATE_IN' as const,
    status: 'Approved' as const,
    timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
    operator: 'Petugas Gate 1'
  });

  const [opForm, setOpForm] = useState({
    containerNo: 'MSCU7849201',
    vesselCode: 'VOY-9021',
    activityType: 'DISCHARGE' as const,
    status: 'Completed' as const,
    equipmentNo: 'QC-01',
    timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
  });

  const handleSaveGate = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddGateTransaction(gateForm);
    setShowGateModal(false);
  };

  const handleSaveOp = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddOperation(opForm);
    setShowOpModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('gate')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeSubTab === 'gate' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Transaksi Gate Truk ({gateTransactions.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('stevedoring')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeSubTab === 'stevedoring' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Bongkar Muat / Stevedoring ({operations.length})</span>
          </button>
        </div>

        <div>
          {activeSubTab === 'gate' ? (
            <button
              onClick={() => setShowGateModal(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:from-cyan-400 hover:to-blue-500 transition shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Input Truk Gate Masuk/Keluar</span>
            </button>
          ) : (
            <button
              onClick={() => setShowOpModal(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:from-cyan-400 hover:to-blue-500 transition shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Aktivitas Bongkar Muat</span>
            </button>
          )}
        </div>
      </div>

      {/* GATE TRANSACTIONS TABLE */}
      {activeSubTab === 'gate' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">No. Tiket Gate</th>
                  <th className="py-3.5 px-4">Plat Truk & Sopir</th>
                  <th className="py-3.5 px-4">No. Kontainer</th>
                  <th className="py-3.5 px-4">Arah (Direction)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Waktu</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {gateTransactions.map(gt => (
                  <tr key={gt.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{gt.ticketNo}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{gt.truckPlate}</div>
                      <div className="text-xs text-slate-400">{gt.driverName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400">{gt.containerNo}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        gt.direction === 'GATE_IN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {gt.direction}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300">{gt.status}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{gt.timestamp}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => onDeleteGateTransaction(gt.id)}
                        className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-medium"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STEVEDORING OPERATIONS TABLE */}
      {activeSubTab === 'stevedoring' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">No. Kontainer</th>
                  <th className="py-3.5 px-4">Voyage Kapal</th>
                  <th className="py-3.5 px-4">Tipe Aktivitas</th>
                  <th className="py-3.5 px-4">Alat (Crane)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Waktu</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {operations.map(op => (
                  <tr key={op.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{op.containerNo}</td>
                    <td className="py-3.5 px-4 text-cyan-400">{op.vesselCode}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-200 border border-slate-700">
                        {op.activityType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{op.equipmentNo}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        op.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                      }`}>
                        {op.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{op.timestamp}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => onDeleteOperation(op.id)}
                        className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-medium"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GATE MODAL */}
      {showGateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Input Truk Gate</h3>
              <button onClick={() => setShowGateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Nomor Plat Truk</label>
                <input 
                  type="text" 
                  required
                  value={gateForm.truckPlate}
                  onChange={e => setGateForm({...gateForm, truckPlate: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="B 9182 UXX"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Nama Sopir</label>
                <input 
                  type="text" 
                  required
                  value={gateForm.driverName}
                  onChange={e => setGateForm({...gateForm, driverName: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="Budi Santoso"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Nomor Kontainer</label>
                <input 
                  type="text" 
                  required
                  value={gateForm.containerNo}
                  onChange={e => setGateForm({...gateForm, containerNo: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="MSCU7849201"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Arah Gate</label>
                  <select 
                    value={gateForm.direction}
                    onChange={e => setGateForm({...gateForm, direction: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="GATE_IN">GATE_IN (Masuk)</option>
                    <option value="GATE_OUT">GATE_OUT (Keluar)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Status</label>
                  <select 
                    value={gateForm.status}
                    onChange={e => setGateForm({...gateForm, status: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Inspected">Inspected</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setShowGateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs text-white font-semibold shadow"
                >
                  Simpan Transaksi Gate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OPERATION MODAL */}
      {showOpModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Tambah Aktivitas Bongkar Muat</h3>
              <button onClick={() => setShowOpModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">No. Kontainer</label>
                <input 
                  type="text" 
                  required
                  value={opForm.containerNo}
                  onChange={e => setOpForm({...opForm, containerNo: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="MSCU7849201"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Voyage Kapal</label>
                <input 
                  type="text" 
                  required
                  value={opForm.vesselCode}
                  onChange={e => setOpForm({...opForm, vesselCode: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="VOY-9021"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Aktivitas</label>
                  <select 
                    value={opForm.activityType}
                    onChange={e => setOpForm({...opForm, activityType: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="DISCHARGE">DISCHARGE (Bongkar)</option>
                    <option value="LOAD">LOAD (Muat)</option>
                    <option value="SHIFT">SHIFT (Pindah Yard)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Alat / Crane</label>
                  <input 
                    type="text" 
                    required
                    value={opForm.equipmentNo}
                    onChange={e => setOpForm({...opForm, equipmentNo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="QC-01"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setShowOpModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs text-white font-semibold shadow"
                >
                  Simpan Aktivitas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
