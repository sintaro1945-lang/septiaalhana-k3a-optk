import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  Bell, 
  LogOut, 
  User, 
  Clock, 
  Database, 
  CheckCircle, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { auth } from '../firebase';
import { NotificationItem } from '../types';

interface NavbarProps {
  currentUserEmail?: string | null;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onLogout: () => void;
  onSeedData: () => void;
  seeding: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentUserEmail, 
  notifications, 
  onMarkNotificationRead, 
  onLogout,
  onSeedData,
  seeding 
}) => {
  const [time, setTime] = useState(new Date());
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-slate-900 border-b border-slate-800 h-16 px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Brand & System Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
          <Anchor className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide text-base">PortTerminal Pro</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold">
              CLOUD LIVE
            </span>
          </div>
          <div className="text-xs text-slate-400">Terminal Peti Kemas & Yard Management System</div>
        </div>
      </div>

      {/* Center Database Seeder / Status */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
          <Database className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Firestore Connected</span>
        </div>

        <button
          onClick={onSeedData}
          disabled={seeding}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-xs text-cyan-400 font-medium transition flex items-center gap-1.5"
          title="Muat data contoh awal ke database"
        >
          <span>{seeding ? 'Memuat Data...' : '⚡ Seed Data Demo'}</span>
        </button>
      </div>

      {/* Right User & Actions */}
      <div className="flex items-center gap-4">
        {/* Live Clock */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{time.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span className="text-white font-mono font-medium">{time.toLocaleTimeString('id-ID')}</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 flex items-center justify-center text-slate-300 relative transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-semibold text-white text-sm">Notifikasi Otomatis Terminal</span>
                <span className="text-xs text-cyan-400">{notifications.length} Total</span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-500">Tidak ada notifikasi</div>
                ) : (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                        n.read ? 'bg-slate-950/40 border-slate-800/60 opacity-70' : 'bg-slate-800/80 border-slate-700 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-300">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="hidden sm:block text-right">
            <div className="text-xs font-medium text-white">{currentUserEmail || 'Admin Terminal'}</div>
            <div className="text-[10px] text-cyan-400">Online Operator</div>
          </div>
          <button 
            onClick={onLogout}
            title="Keluar Sistem"
            className="w-10 h-10 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
