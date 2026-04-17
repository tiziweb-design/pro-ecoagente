import React from 'react';
import { LayoutDashboard, Calculator, LineChart, FileText, BookOpen, Sparkles, Presentation } from 'lucide-react';
import { cn } from '../lib/utils';
import { generateEcoAgentPptx } from '../lib/pptxGenerator';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onFullPrint?: () => void;
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onFullPrint, isOpen = false }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roi', label: 'Calcolatore ROI', icon: Calculator },
    { id: 'trends', label: 'Market Trends', icon: LineChart },
    { id: 'passport', label: 'Passaporto Digitale', icon: FileText },
    { id: 'resources', label: 'Materiale Extra', icon: BookOpen },
    { id: 'problemsolving', label: 'PROblem Solving', icon: Sparkles },
  ];

  return (
    <div className={cn(
      "w-64 bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] text-slate-800 flex flex-col h-screen fixed left-0 top-0 print:hidden border-r-4 border-[#54b032] shadow-lg z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6">
        <div className="flex flex-col items-center justify-center mb-1">
          <img 
            src="/logo.png" 
            alt="Pro EcoAgent" 
            className="h-16 w-auto bg-white px-3 py-2 rounded-lg shadow-sm"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <p className="text-xs text-slate-500 font-medium tracking-wider uppercase mt-3 text-center">Immobili Sostenibili</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-white text-[#54b032] shadow-sm" 
                  : "hover:bg-white/50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-[#54b032]" : "text-slate-500")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 m-4 bg-white/60 rounded-xl space-y-4 border border-white/40">
        {onFullPrint && (
          <div className="space-y-2">
            <button 
              onClick={onFullPrint}
              className="w-full flex items-center justify-center gap-2 bg-[#54b032] hover:bg-[#469329] text-white px-3 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-[#54b032]/20"
            >
              <FileText className="w-4 h-4" />
              Report Completo PDF
            </button>
            <button 
              onClick={() => generateEcoAgentPptx()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] hover:border-[#54b032] border-2 border-transparent text-slate-800 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Presentation className="w-4 h-4 text-[#54b032]" />
              Presentazione PPTX
            </button>
          </div>
        )}
        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium">Direttiva EPBD 2030</p>
          <div className="w-full bg-slate-300 rounded-full h-1.5 mb-1">
            <div className="bg-[#54b032] h-1.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-[10px] text-slate-500 text-right">Scadenza in avvicinamento</p>
        </div>
      </div>
    </div>
  );
};
