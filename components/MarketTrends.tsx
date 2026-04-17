import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { AlertTriangle, TrendingUp, Info } from 'lucide-react';

const data = [
  { year: '2024', classeG: 100, classeA: 100 },
  { year: '2025', classeG: 98, classeA: 102 },
  { year: '2026', classeG: 95, classeA: 105 },
  { year: '2027', classeG: 91, classeA: 108 },
  { year: '2028', classeG: 86, classeA: 112 },
  { year: '2029', classeG: 80, classeA: 116 },
  { year: '2030', classeG: 72, classeA: 122 }, // EPBD Deadline impact
];

export const MarketTrends: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="print:hidden">
        <h2 className="text-2xl font-bold text-slate-900">Brown Discount vs Green Premium</h2>
        <p className="text-slate-500">Proiezione del valore immobiliare in base alla classe energetica (Base 100 = Valore 2024).</p>
      </div>

      {/* Header visibile solo in stampa PDF */}
      <div className="hidden print:flex items-center gap-4 mb-8 border-b border-slate-200 pb-6">
        <img src="/logo.png" alt="Pro EcoAgent" className="h-16 w-auto" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analisi di Mercato e Tendenze</h1>
          <p className="text-slate-500">Pro EcoAgent - Immobili Sostenibili</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
        <div className="bg-white p-6 rounded-xl border-4 border-[#d1d5db] shadow-sm print:border-none print:shadow-none print:p-0 print:mb-10 print:break-inside-avoid">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Andamento Valore di Mercato (%)</h3>
            
            <div className="flex gap-3 print:hidden">
              {/* Tooltip Dati Storici */}
              <div className="group relative flex items-center gap-1 text-xs font-medium text-white cursor-help bg-[#54b032] px-2 py-1 rounded shadow-sm">
                <Info className="w-3 h-3" /> Dati 2024-25
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-64 bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] border border-[#d1d5db] text-slate-800 text-xs rounded-lg p-3 shadow-xl z-10">
                  <p className="font-bold text-[#54b032] mb-1">Dati Certi (Storico):</p>
                  <p className="text-slate-700 mb-2">
                    I valori fino al 2025 sono dati consolidati. Il divario di prezzo tra immobili efficienti e non efficienti è già una realtà misurata.
                  </p>
                  <a href="https://www.fiaip.it/osservatorio-immobiliare/" target="_blank" rel="noopener noreferrer" className="text-[#54b032] font-semibold hover:underline">
                    Fonte: Rapporto ENEA-FIAIP / OMI ↗
                  </a>
                  <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[#d1d5db] transform rotate-45 border-b border-r border-[#d1d5db]"></div>
                </div>
              </div>

              {/* Tooltip Proiezioni */}
              <div className="group relative flex items-center gap-1 text-xs font-medium text-slate-800 cursor-help bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] border border-[#d1d5db] px-2 py-1 rounded shadow-sm">
                <Info className="w-3 h-3" /> Proiezioni 2026-30
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-72 bg-[#54b032] text-white text-xs rounded-lg p-3 shadow-xl z-10">
                  <p className="font-bold text-slate-900 mb-1">Come avvalorare la stima:</p>
                  <p className="text-[#f3f4f6]">
                    "La svalutazione non dipenderà solo dalla legge, ma dalle <strong className="text-white">Banche</strong>. Già oggi applicano tassi agevolati (Mutui Green) alle classi A, mentre dal 2027 gli immobili in classe G subiranno una stretta creditizia (direttive ESG), riducendo drasticamente il bacino di acquirenti finanziabili."
                  </p>
                  <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[#54b032] transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[320px] print:h-[320px] print:block">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, '']}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                
                {/* Linea di demarcazione tra Storico e Proiezione */}
                <ReferenceLine x="2025" stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'top', value: 'Inizio Proiezioni', fill: '#94a3b8', fontSize: 10 }} />
                
                <Line type="monotone" dataKey="classeA" name="Classe A (Green Premium)" stroke="#54b032" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} isAnimationActive={false} />
                <Line type="monotone" dataKey="classeG" name="Classe G (Brown Discount)" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4 print:space-y-6 print:block">
          <div className="bg-red-50 p-5 rounded-xl border-4 border-[#d1d5db] shadow-sm print:p-4 print:break-inside-avoid">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-bold">Il Rischio "Brown Discount"</h4>
            </div>
            <p className="text-sm text-red-900/80 mb-2">
              Gli immobili in Classe G subiranno una svalutazione accelerata verso il 2030. Il motivo principale non è solo l'obbligo di legge, ma la <strong>stretta creditizia</strong>: le banche, per rispettare i parametri ESG, concederanno mutui con spread molto più alti per queste case, riducendo il potere d'acquisto dei futuri compratori.
            </p>
            <div className="bg-white/60 p-3 rounded-lg text-sm font-medium text-red-800 print:p-2">
              "Signor Venditore, il mercato oggi non sconta solo lo stato d'uso, ma la futura difficoltà di accesso al credito. Vendere ora significa anticipare la svalutazione."
            </div>
          </div>

          <div className="bg-[#54b032] p-5 rounded-xl border-4 border-[#d1d5db] shadow-sm print:p-4 print:break-inside-avoid">
            <div className="flex items-center gap-2 text-white mb-2">
              <TrendingUp className="w-5 h-5" />
              <h4 className="font-bold">L'Opportunità "Green Premium"</h4>
            </div>
            <p className="text-sm text-white/90 mb-2">
              Gli immobili riqualificati acquisiscono un "premio" di mercato immediato. Oltre all'abbattimento delle bollette, beneficiano dei <strong className="text-white">Mutui Green</strong>: le banche offrono tassi agevolati (sconti sullo spread) a chi acquista case in classe A o B.
            </p>
            <div className="bg-white/20 p-3 rounded-lg text-sm font-medium text-white print:p-2">
              "Questa non è solo una casa a zero emissioni, è un asset che le banche premiano con mutui più convenienti, aumentando il bacino di potenziali acquirenti."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
