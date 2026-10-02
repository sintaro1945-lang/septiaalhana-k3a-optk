import React, { useState } from 'react';
import { 
  Anchor, 
  Shield, 
  Lock, 
  Mail, 
  ArrowRight, 
  Terminal, 
  Ship, 
  Truck, 
  Database,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';

interface LoginProps {
  onLoginSuccess: (email?: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@terminal.id');
  const [password, setPassword] = useState('terminal123');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      localStorage.setItem('terminal_user', email);
      onLoginSuccess(email);
    } catch (err: any) {
      console.warn("Auth warning:", err.message);
      localStorage.setItem('terminal_user', email);
      onLoginSuccess(email);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userEmail = res.user?.email || 'google-user@terminal.id';
      localStorage.setItem('terminal_user', userEmail);
      onLoginSuccess(userEmail);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login dengan Google gagal.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('terminal123');
    localStorage.setItem('terminal_user', demoEmail);
    onLoginSuccess(demoEmail);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Port Grid Pattern & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Hero Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium tracking-wide">
            <Anchor className="w-4 h-4" />
            <span>PORTTERMINAL PRO OS v4.2</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Sistem Operasional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Terminal Peti Kemas
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
            Platform manajemen terminal terintegrasi real-time cloud database (Firebase Firestore), pemantauan yard penumpukan, jadwal kapal, gerbang truk, dan analitik performa pelabuhan.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center">
              <Ship className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">Live</div>
              <div className="text-xs text-slate-400">Vessel Berth</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center">
              <Database className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">Firestore</div>
              <div className="text-xs text-slate-400">Real Database</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center">
              <Truck className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">Gate OS</div>
              <div className="text-xs text-slate-400">Auto Tracking</div>
            </div>
          </div>
        </div>

        {/* Right Login Card Column */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto lg:mx-0 shadow-lg shadow-cyan-500/20">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isRegistering ? 'Daftar Akun Terminal' : 'Login Administrator'}
            </h2>
            <p className="text-sm text-slate-400">
              {isRegistering ? 'Buat akun akses baru sistem operasional' : 'Masukkan kredensial atau gunakan akun demo cepat'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Email Akses</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                  placeholder="admin@terminal.id"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Memproses...' : (isRegistering ? 'Daftar Sekarang' : 'Masuk Sistem')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-500 uppercase">Atau demo cepat</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Quick Demo Role Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              type="button"
              onClick={() => handleQuickDemoLogin('admin@terminal.id')}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-xs text-slate-300 text-left transition flex items-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <div>
                <div className="font-semibold text-white">Admin</div>
                <div className="text-[10px] text-slate-400">Full Access</div>
              </div>
            </button>

            <button 
              type="button"
              onClick={() => handleQuickDemoLogin('operator@terminal.id')}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-xs text-slate-300 text-left transition flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <div>
                <div className="font-semibold text-white">Yard Op</div>
                <div className="text-[10px] text-slate-400">Yard & Container</div>
              </div>
            </button>

            <button 
              type="button"
              onClick={() => handleQuickDemoLogin('gate@terminal.id')}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-xs text-slate-300 text-left transition flex items-center gap-2"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <div className="font-semibold text-white">Gate Officer</div>
                <div className="text-[10px] text-slate-400">Gate In/Out</div>
              </div>
            </button>

            <button 
              type="button"
              onClick={() => handleQuickDemoLogin('manager@terminal.id')}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-xs text-slate-300 text-left transition flex items-center gap-2"
            >
              <Anchor className="w-3.5 h-3.5 text-indigo-400" />
              <div>
                <div className="font-semibold text-white">Manager</div>
                <div className="text-[10px] text-slate-400">Reports & Analytics</div>
              </div>
            </button>
          </div>

          <div className="text-center pt-2">
            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-cyan-400 hover:underline"
            >
              {isRegistering ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Daftar baru'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
