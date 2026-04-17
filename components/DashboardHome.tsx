import React from 'react';
import { Shield, TrendingUp, FileCheck, Users } from 'lucide-react';

export const DashboardHome: React.FC<{ setActiveTab: (t: string) => void }> = ({ setActiveTab }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          Benvenuto in <img src="/logo.png" alt="PROEcoAgent" className="h-8 w-auto inline-block" />
        </h2>
        <p className="text-slate-500">L'immobile "Green" non è una scelta etica, è l'unico asset liquido del 2026.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border-2 border-[#54b032] shadow-sm flex flex-col items-start group hover:shadow-md transition-all cursor-default">
          <div className="p-2 bg-[#54b032]/10 text-[#54b032] rounded-lg mb-3 transition-colors duration-300 group-hover:bg-[#54b032] group-hover:text-white">
            <Shield className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">60%</h3>
          <p className="text-sm text-slate-500">Immobili in Classe G (Rischio)</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl border-2 border-[#54b032] shadow-sm flex flex-col items-start group hover:shadow-md transition-all cursor-default">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mb-3 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
            <TrendingUp className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">+15%</h3>
          <p className="text-sm text-slate-500">Green Premium Medio</p>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-[#54b032] shadow-sm flex flex-col items-start group hover:shadow-md transition-all cursor-default">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg mb-3 transition-colors duration-300 group-hover:bg-purple-600 group-hover:text-white">
            <FileCheck className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">12</h3>
          <p className="text-sm text-slate-500">Passaporti Generati</p>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-[#54b032] shadow-sm flex flex-col items-start group hover:shadow-md transition-all cursor-default">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg mb-3 transition-colors duration-300 group-hover:bg-orange-600 group-hover:text-white">
            <Users className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">8</h3>
          <p className="text-sm text-slate-500">Incarichi "Sostenibili"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div 
          onClick={() => setActiveTab('roi')}
          className="bg-gradient-to-br from-[#54b032] to-[#469329] p-6 rounded-2xl text-white cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1 border-4 border-[#d1d5db]"
        >
          <h3 className="text-xl font-bold mb-2">Calcolatore ROI</h3>
          <p className="text-white/90 mb-4 text-sm">Analizza e Genera Proiezioni sul Ritorno degli Investimenti</p>
          <span className="inline-block bg-white/20 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
            Apri Strumento →
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('passport')}
          className="bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] p-6 rounded-2xl text-slate-800 cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105 border-4 border-[#54b032]"
        >
          <h3 className="text-xl font-bold mb-2 text-slate-900">Passaporto Digitale</h3>
          <p className="text-slate-700 mb-4 text-sm">Certifica gli interventi riqualificativi</p>
          <span className="inline-block bg-white/60 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm text-slate-900 shadow-sm">
            Genera Passaporto →
          </span>
        </div>
      </div>

      <div className="mt-16 pb-8 flex flex-col items-center justify-center text-slate-500 space-y-2">
        <p className="text-xs">Creato da</p>
        <img 
          src="/prospero-logo.png" 
          alt="PROSPERO Real Estate Strategy" 
          className="h-10 w-auto"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden text-lg font-bold text-slate-800">PROSPERO Real Estate Strategy</div>
      </div>
    </div>
  );
};
