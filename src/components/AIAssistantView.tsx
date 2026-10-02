import React, { useState } from 'react';
import { Bot, Send, Sparkles, Terminal, Ship, Boxes } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ContainerItem, VesselItem, YardBlockItem } from '../types';

interface AIAssistantViewProps {
  containers: ContainerItem[];
  vessels: VesselItem[];
  yardBlocks: YardBlockItem[];
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  containers,
  vessels,
  yardBlocks
}) => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: 'Halo! Saya Asisten AI Operasional Terminal Peti Kemas PortTerminal Pro. Saya dapat menganalisis data Yard Occupancy Rate (YOR), jadwal kapal, dan memberikan rekomendasi optimasi bongkar muat secara real-time. Ada yang bisa saya bantu?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });

      const contextSummary = `
      Data Terminal Peti Kemas Saat Ini:
      - Total Kontainer: ${containers.length}
      - Total Kapal: ${vessels.length} (${vessels.map(v => `${v.vesselName} status ${v.status}`).join(', ')})
      - Yard Blocks: ${yardBlocks.map(y => `${y.blockName} terisi ${y.currentOccupied}/${y.capacity}`).join(', ')}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: `Anda adalah pakar sistem operasional terminal peti kemas (Port Operations Expert). Jawablah pertanyaan berikut dalam bahasa Indonesia yang profesional dan operasional.\n\n${contextSummary}\n\nPertanyaan: ${userMsg}` }
            ]
          }
        ]
      });

      const aiText = response.text || 'Maaf, terjadi kesalahan saat memproses analisis AI.';
      setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Maaf, layanan AI sedang sibuk atau API key belum dikonfigurasi.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Didukung Google Gemini AI</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Asisten Cerdas Operasional Terminal</h2>
          <p className="text-sm text-slate-400">Analisis hambatan yard, estimasi waktu bongkar muat kapal, dan rekomendasi strategis pelabuhan.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl p-4 rounded-2xl text-sm ${
                m.sender === 'user' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none shadow-lg' 
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}>
                <div className="font-semibold text-xs mb-1 opacity-70">
                  {m.sender === 'user' ? 'Anda' : 'PortTerminal AI Expert'}
                </div>
                <div className="leading-relaxed whitespace-pre-line">{m.text}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-slate-400 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>AI sedang menganalisis data operasional terminal...</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="pt-4 border-t border-slate-800 flex gap-3 mt-4">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan analisis YOR, efisiensi crane, atau jadwal kapal..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 disabled:opacity-50"
          >
            <span>Kirim</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
