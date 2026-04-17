/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DashboardHome } from './components/DashboardHome';
import { RoiCalculator } from './components/RoiCalculator';
import { MarketTrends } from './components/MarketTrends';
import { DigitalPassport } from './components/DigitalPassport';
import { Resources } from './components/Resources';
import { ProblemSolving } from './components/ProblemSolving';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFullPrint, setIsFullPrint] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFullPrint = () => {
    setIsFullPrint(true);
    
    // 1. Attendiamo che React aggiorni il DOM (display: block sui componenti nascosti)
    setTimeout(() => {
      // 2. Forziamo un evento resize per far ricalcolare le dimensioni ai grafici Recharts (ResponsiveContainer)
      window.dispatchEvent(new Event('resize'));
      
      // 3. Attendiamo che i grafici SVG vengano disegnati fisicamente prima di stampare
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.error("Stampa bloccata dall'iframe", e);
          alert("La funzione di stampa diretta è bloccata in questa anteprima. Prova ad aprire l'app in una nuova scheda.");
        } finally {
          setIsFullPrint(false);
        }
      }, 800);
    }, 100);
  };

  const getDisplayClasses = (tabName: string, addPageBreak: boolean = false) => {
    const isActive = activeTab === tabName;
    if (isFullPrint) {
      // In modalità Report Completo, mostriamo Passaporto, ROI e Trends
      if (['passport', 'roi', 'trends'].includes(tabName)) {
        // Rimuoviamo 'hidden' per forzare il render a schermo dei grafici SVG prima della stampa
        return `block print:block ${addPageBreak ? 'print:break-after-page' : ''}`;
      }
      return `hidden print:hidden`;
    }
    // In modalità normale, mostriamo solo il tab attivo
    return `${isActive ? 'block print:block' : 'hidden print:hidden'}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans flex print:bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4 print:hidden">
        <div className="w-10"></div> {/* Spacer per bilanciare il flex */}
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src="/logo.png" 
            alt="Pro EcoAgent" 
            className="h-10 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg relative z-10"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden print:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }} 
        onFullPrint={handleFullPrint} 
        isOpen={isMobileMenuOpen}
      />
      
      <main className="flex-1 min-w-0 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8 print:ml-0 print:p-0 relative w-full overflow-x-hidden">
        {/* Logo in alto a destra (solo desktop) */}
        <div className="hidden lg:block absolute top-8 right-8 print:top-4 print:right-4 z-10">
          <img 
            src="/ICONA 1.JPG" 
            alt="Logo" 
            className="h-12 w-auto object-contain"
            onError={(e) => {
              // Mostra un placeholder se l'utente non ha ancora caricato il file
              (e.target as HTMLImageElement).src = 'https://placehold.co/120x48/e2e8f0/64748b?text=Il+tuo+Logo';
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto print:max-w-none lg:mt-4">
          <div className={getDisplayClasses('dashboard')}>
            <DashboardHome setActiveTab={setActiveTab} />
          </div>
          <div className={getDisplayClasses('passport', true)}>
            <DigitalPassport />
          </div>
          <div className={getDisplayClasses('roi', true)}>
            <RoiCalculator />
          </div>
          <div className={getDisplayClasses('trends', false)}>
            <MarketTrends />
          </div>
          <div className={getDisplayClasses('resources')}>
            <Resources />
          </div>
          <div className={getDisplayClasses('problemsolving')}>
            <ProblemSolving />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
