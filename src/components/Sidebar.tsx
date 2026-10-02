import React from 'react';
import { 
  LayoutDashboard, 
  Boxes, 
  Ship, 
  Truck, 
  FileText, 
  Search, 
  Bot, 
  Grid,
  Users
} from 'lucide-react';

export type TabType = 'dashboard' | 'master' | 'transaction' | 'report' | 'tracking' | 'ai';

interface SidebarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard Analitik', icon: LayoutDashboard },
    { id: 'master' as TabType, label: 'Master Data', icon: Boxes },
    { id: 'transaction' as TabType, label: 'Transaksi & Operasional', icon: Truck },
    { id: 'report' as TabType, label: 'Laporan & Kinerja', icon: FileText },
    { id: 'tracking' as TabType, label: 'Pelacakan Kontainer', icon: Search },
    { id: 'ai' as TabType, label: 'Asisten AI Terminal', icon: Bot },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 select-none">
      <div className="p-4 border-b border-slate-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Menu Navigasi</span>
      </div>

      <nav className="p-3 space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Terminal Status Box */}
      <div className="p-4 m-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Yard Occupancy</span>
          <span className="text-emerald-400 font-bold">71.4%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full" style={{ width: '71.4%' }}></div>
        </div>
        <div className="text-[10px] text-slate-500 flex justify-between">
          <span>Kapasitas: 3,300 TEUs</span>
          <span>Aman</span>
        </div>
      </div>
    </aside>
  );
};
