import React, { useState } from 'react';
import { 
  Boxes, 
  Ship, 
  Grid, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Check, 
  X,
  AlertCircle
} from 'lucide-react';
import { 
  ContainerItem, 
  VesselItem, 
  YardBlockItem, 
  UserProfileItem 
} from '../types';

interface MasterDataViewProps {
  containers: ContainerItem[];
  vessels: VesselItem[];
  yardBlocks: YardBlockItem[];
  users: UserProfileItem[];
  onAddContainer: (item: Omit<ContainerItem, 'id'>) => Promise<void>;
  onUpdateContainer: (id: string, item: Partial<ContainerItem>) => Promise<void>;
  onDeleteContainer: (id: string) => Promise<void>;

  onAddVessel: (item: Omit<VesselItem, 'id'>) => Promise<void>;
  onUpdateVessel: (id: string, item: Partial<VesselItem>) => Promise<void>;
  onDeleteVessel: (id: string) => Promise<void>;

  onAddYardBlock: (item: Omit<YardBlockItem, 'id'>) => Promise<void>;
  onUpdateYardBlock: (id: string, item: Partial<YardBlockItem>) => Promise<void>;
  onDeleteYardBlock: (id: string) => Promise<void>;

  onAddUser: (item: Omit<UserProfileItem, 'id'>) => Promise<void>;
  onDeleteUser: (id: string) => Promise<void>;
}

type SubTab = 'containers' | 'vessels' | 'yards' | 'users';

export const MasterDataView: React.FC<MasterDataViewProps> = ({
  containers,
  vessels,
  yardBlocks,
  users,
  onAddContainer,
  onUpdateContainer,
  onDeleteContainer,
  onAddVessel,
  onUpdateVessel,
  onDeleteVessel,
  onAddYardBlock,
  onUpdateYardBlock,
  onDeleteYardBlock,
  onAddUser,
  onDeleteUser
}) => {
  const [subTab, setSubTab] = useState<SubTab>('containers');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [showContainerModal, setShowContainerModal] = useState(false);
  const [editingContainer, setEditingContainer] = useState<ContainerItem | null>(null);

  const [showVesselModal, setShowVesselModal] = useState(false);
  const [editingVessel, setEditingVessel] = useState<VesselItem | null>(null);

  const [showYardModal, setShowYardModal] = useState(false);
  const [editingYard, setEditingYard] = useState<YardBlockItem | null>(null);

  const [showUserModal, setShowUserModal] = useState(false);

  // Form states
  const [containerForm, setContainerForm] = useState<{
    containerNo: string;
    size: '20ft' | '40ft' | '45ft';
    type: 'Dry' | 'Reefer' | 'Open Top' | 'Tank' | 'Flat Rack';
    status: 'Full' | 'Empty';
    grossWeight: number;
    yardLocation: string;
    owner: string;
    voyageNo: string;
    arrivalDate: string;
    isoCode: string;
  }>({
    containerNo: '',
    size: '40ft',
    type: 'Dry',
    status: 'Full',
    grossWeight: 25,
    yardLocation: 'BLK-A-01-01',
    owner: 'MSC',
    voyageNo: 'VOY-9021',
    arrivalDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
    isoCode: '45G1'
  });

  const [vesselForm, setVesselForm] = useState<{
    vesselName: string;
    voyageCode: string;
    eta: string;
    etd: string;
    berthNo: string;
    status: 'Scheduled' | 'Berthing' | 'Working' | 'Departed';
    totalTeus: number;
    handledTeus: number;
    shippingAgent: string;
  }>({
    vesselName: '',
    voyageCode: '',
    eta: '',
    etd: '',
    berthNo: 'Berth 01',
    status: 'Scheduled',
    totalTeus: 1500,
    handledTeus: 0,
    shippingAgent: 'PT Agent'
  });

  const [yardForm, setYardForm] = useState<{
    blockName: string;
    capacity: number;
    currentOccupied: number;
    blockType: 'General' | 'Reefer' | 'Dangerous' | 'Empty';
  }>({
    blockName: '',
    capacity: 1000,
    currentOccupied: 100,
    blockType: 'General'
  });

  const [userForm, setUserForm] = useState<{
    email: string;
    name: string;
    role: 'Admin' | 'Yard Operator' | 'Gate Officer' | 'Operations Manager';
    status: 'Active' | 'Inactive';
  }>({
    email: '',
    name: '',
    role: 'Yard Operator',
    status: 'Active'
  });

  // Handlers for Container
  const handleSaveContainer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContainer) {
      await onUpdateContainer(editingContainer.id, containerForm);
    } else {
      await onAddContainer(containerForm);
    }
    setShowContainerModal(false);
    setEditingContainer(null);
  };

  const handleEditContainerClick = (c: ContainerItem) => {
    setEditingContainer(c);
    setContainerForm({
      containerNo: c.containerNo,
      size: c.size,
      type: c.type,
      status: c.status,
      grossWeight: c.grossWeight,
      yardLocation: c.yardLocation,
      owner: c.owner,
      voyageNo: c.voyageNo,
      arrivalDate: c.arrivalDate,
      isoCode: c.isoCode
    });
    setShowContainerModal(true);
  };

  // Handlers for Vessel
  const handleSaveVessel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVessel) {
      await onUpdateVessel(editingVessel.id, vesselForm);
    } else {
      await onAddVessel(vesselForm);
    }
    setShowVesselModal(false);
    setEditingVessel(null);
  };

  const handleEditVesselClick = (v: VesselItem) => {
    setEditingVessel(v);
    setVesselForm({
      vesselName: v.vesselName,
      voyageCode: v.voyageCode,
      eta: v.eta,
      etd: v.etd,
      berthNo: v.berthNo,
      status: v.status,
      totalTeus: v.totalTeus,
      handledTeus: v.handledTeus,
      shippingAgent: v.shippingAgent
    });
    setShowVesselModal(true);
  };

  // Handlers for Yard
  const handleSaveYard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingYard) {
      await onUpdateYardBlock(editingYard.id, yardForm);
    } else {
      await onAddYardBlock(yardForm);
    }
    setShowYardModal(false);
    setEditingYard(null);
  };

  const handleEditYardClick = (y: YardBlockItem) => {
    setEditingYard(y);
    setYardForm({
      blockName: y.blockName,
      capacity: y.capacity,
      currentOccupied: y.currentOccupied,
      blockType: y.blockType
    });
    setShowYardModal(true);
  };

  // Handlers for User
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddUser(userForm);
    setShowUserModal(false);
  };

  // Filtered lists
  const filteredContainers = containers.filter(c => 
    c.containerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.yardLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVessels = vessels.filter(v =>
    v.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.voyageCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Sub tabs header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSubTab('containers')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              subTab === 'containers' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Peti Kemas ({containers.length})</span>
          </button>

          <button
            onClick={() => setSubTab('vessels')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              subTab === 'vessels' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Ship className="w-4 h-4" />
            <span>Kapal & Voyage ({vessels.length})</span>
          </button>

          <button
            onClick={() => setSubTab('yards')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              subTab === 'yards' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Blok Lapangan ({yardBlocks.length})</span>
          </button>

          <button
            onClick={() => setSubTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              subTab === 'users' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Pengguna Sistem ({users.length})</span>
          </button>
        </div>

        {/* Action Button & Search */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Cari data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 w-full sm:w-60"
            />
          </div>

          {subTab === 'containers' && (
            <button
              onClick={() => { setEditingContainer(null); setShowContainerModal(true); }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:from-cyan-400 hover:to-blue-500 transition shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Kontainer</span>
            </button>
          )}

          {subTab === 'vessels' && (
            <button
              onClick={() => { setEditingVessel(null); setShowVesselModal(true); }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:from-cyan-400 hover:to-blue-500 transition shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Kapal</span>
            </button>
          )}

          {subTab === 'yards' && (
            <button
              onClick={() => { setEditingYard(null); setShowYardModal(true); }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:from-cyan-400 hover:to-blue-500 transition shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Blok</span>
            </button>
          )}

          {subTab === 'users' && (
            <button
              onClick={() => setShowUserModal(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:from-cyan-400 hover:to-blue-500 transition shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Staff</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Tables */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        
        {/* CONTAINERS TABLE */}
        {subTab === 'containers' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">No. Kontainer</th>
                  <th className="py-3.5 px-4">Ukuran / Tipe</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Berat (Ton)</th>
                  <th className="py-3.5 px-4">Lokasi Yard</th>
                  <th className="py-3.5 px-4">Pemilik (Line)</th>
                  <th className="py-3.5 px-4 text-right">Aksi (CRUD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredContainers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500 text-xs">Tidak ada data kontainer ditemukan</td>
                  </tr>
                ) : (
                  filteredContainers.map(c => (
                    <tr key={c.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-white">{c.containerNo}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-cyan-400 font-mono">
                          {c.size} / {c.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          c.status === 'Full' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">{c.grossWeight} T</td>
                      <td className="py-3.5 px-4 font-mono text-cyan-300">{c.yardLocation}</td>
                      <td className="py-3.5 px-4">{c.owner}</td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button 
                          onClick={() => handleEditContainerClick(c)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => onDeleteContainer(c.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* VESSELS TABLE */}
        {subTab === 'vessels' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Nama Kapal</th>
                  <th className="py-3.5 px-4">Voyage</th>
                  <th className="py-3.5 px-4">Berth No</th>
                  <th className="py-3.5 px-4">ETA / ETD</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Progres (TEUs)</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredVessels.map(v => (
                  <tr key={v.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold text-white">{v.vesselName}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400">{v.voyageCode}</td>
                    <td className="py-3.5 px-4">{v.berthNo}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      <div>ETA: {v.eta}</div>
                      <div>ETD: {v.etd}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        v.status === 'Working' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                        v.status === 'Berthing' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{v.handledTeus} / {v.totalTeus} TEUs</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEditVesselClick(v)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDeleteVessel(v.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* YARD BLOCKS TABLE */}
        {subTab === 'yards' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Nama Blok Yard</th>
                  <th className="py-3.5 px-4">Tipe Blok</th>
                  <th className="py-3.5 px-4">Kapasitas Maksimal</th>
                  <th className="py-3.5 px-4">Terisi Saat Ini</th>
                  <th className="py-3.5 px-4">Persentase YOR</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {yardBlocks.map(y => {
                  const pct = Math.round((y.currentOccupied / y.capacity) * 100);
                  return (
                    <tr key={y.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-bold text-white">{y.blockName}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-cyan-300">{y.blockType}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">{y.capacity} TEUs</td>
                      <td className="py-3.5 px-4 font-mono">{y.currentOccupied} TEUs</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{pct}%</td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button 
                          onClick={() => handleEditYardClick(y)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => onDeleteYardBlock(y.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* USERS TABLE */}
        {subTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Nama Staff</th>
                  <th className="py-3.5 px-4">Email Login</th>
                  <th className="py-3.5 px-4">Peran (Role)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold text-white">{u.name}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-200 border border-slate-700">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-400 text-xs font-semibold">{u.status}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => onDeleteUser(u.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* CONTAINER MODAL */}
      {showContainerModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingContainer ? 'Edit Peti Kemas' : 'Tambah Peti Kemas Baru'}
              </h3>
              <button onClick={() => setShowContainerModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContainer} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">No. Kontainer</label>
                  <input 
                    type="text" 
                    required
                    value={containerForm.containerNo}
                    onChange={e => setContainerForm({...containerForm, containerNo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="MSCU1234567"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Ukuran</label>
                  <select 
                    value={containerForm.size}
                    onChange={e => setContainerForm({...containerForm, size: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="20ft">20ft</option>
                    <option value="40ft">40ft</option>
                    <option value="45ft">45ft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Tipe</label>
                  <select 
                    value={containerForm.type}
                    onChange={e => setContainerForm({...containerForm, type: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="Dry">Dry</option>
                    <option value="Reefer">Reefer</option>
                    <option value="Open Top">Open Top</option>
                    <option value="Tank">Tank</option>
                    <option value="Flat Rack">Flat Rack</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Status</label>
                  <select 
                    value={containerForm.status}
                    onChange={e => setContainerForm({...containerForm, status: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="Full">Full (Isi)</option>
                    <option value="Empty">Empty (Kosong)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Berat Kotor (Gross Ton)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    value={containerForm.grossWeight}
                    onChange={e => setContainerForm({...containerForm, grossWeight: parseFloat(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Lokasi Yard</label>
                  <input 
                    type="text" 
                    required
                    value={containerForm.yardLocation}
                    onChange={e => setContainerForm({...containerForm, yardLocation: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="BLK-A-01-02"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Pemilik (Shipping Line)</label>
                  <input 
                    type="text" 
                    required
                    value={containerForm.owner}
                    onChange={e => setContainerForm({...containerForm, owner: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="MSC / Maersk"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Voyage No</label>
                  <input 
                    type="text" 
                    required
                    value={containerForm.voyageNo}
                    onChange={e => setContainerForm({...containerForm, voyageNo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="VOY-9021"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setShowContainerModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs text-white font-semibold shadow"
                >
                  Simpan Kontainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VESSEL MODAL */}
      {showVesselModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingVessel ? 'Edit Kapal' : 'Tambah Kapal Baru'}
              </h3>
              <button onClick={() => setShowVesselModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVessel} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Nama Kapal</label>
                  <input 
                    type="text" 
                    required
                    value={vesselForm.vesselName}
                    onChange={e => setVesselForm({...vesselForm, vesselName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="MSC LORETTO"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Voyage Code</label>
                  <input 
                    type="text" 
                    required
                    value={vesselForm.voyageCode}
                    onChange={e => setVesselForm({...vesselForm, voyageCode: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="VOY-9021"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Berth No</label>
                  <input 
                    type="text" 
                    required
                    value={vesselForm.berthNo}
                    onChange={e => setVesselForm({...vesselForm, berthNo: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="Berth 01"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Status</label>
                  <select 
                    value={vesselForm.status}
                    onChange={e => setVesselForm({...vesselForm, status: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Berthing">Berthing</option>
                    <option value="Working">Working</option>
                    <option value="Departed">Departed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">ETA</label>
                  <input 
                    type="text" 
                    required
                    value={vesselForm.eta}
                    onChange={e => setVesselForm({...vesselForm, eta: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="2026-10-01 06:00"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">ETD</label>
                  <input 
                    type="text" 
                    required
                    value={vesselForm.etd}
                    onChange={e => setVesselForm({...vesselForm, etd: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="2026-10-01 18:00"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setShowVesselModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs text-white font-semibold shadow"
                >
                  Simpan Kapal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* YARD BLOCK MODAL */}
      {showYardModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingYard ? 'Edit Blok Lapangan' : 'Tambah Blok Yard Baru'}
              </h3>
              <button onClick={() => setShowYardModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveYard} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Nama Blok</label>
                <input 
                  type="text" 
                  required
                  value={yardForm.blockName}
                  onChange={e => setYardForm({...yardForm, blockName: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="BLK-E (General)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Kapasitas Maks</label>
                  <input 
                    type="number" 
                    required
                    value={yardForm.capacity}
                    onChange={e => setYardForm({...yardForm, capacity: parseInt(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Terisi Saat Ini</label>
                  <input 
                    type="number" 
                    required
                    value={yardForm.currentOccupied}
                    onChange={e => setYardForm({...yardForm, currentOccupied: parseInt(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Tipe Blok</label>
                <select 
                  value={yardForm.blockType}
                  onChange={e => setYardForm({...yardForm, blockType: e.target.value as any})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="General">General</option>
                  <option value="Reefer">Reefer</option>
                  <option value="Dangerous">Dangerous</option>
                  <option value="Empty">Empty</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setShowYardModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs text-white font-semibold shadow"
                >
                  Simpan Blok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* USER MODAL */}
      {showUserModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Tambah Pengguna / Staff</h3>
              <button onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  value={userForm.name}
                  onChange={e => setUserForm({...userForm, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="Ahmad Operator"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Email Login</label>
                <input 
                  type="email" 
                  required
                  value={userForm.email}
                  onChange={e => setUserForm({...userForm, email: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="operator2@terminal.id"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Peran Sistem (Role)</label>
                <select 
                  value={userForm.role}
                  onChange={e => setUserForm({...userForm, role: e.target.value as any})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="Admin">Admin</option>
                  <option value="Yard Operator">Yard Operator</option>
                  <option value="Gate Officer">Gate Officer</option>
                  <option value="Operations Manager">Operations Manager</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs text-white font-semibold shadow"
                >
                  Simpan Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
