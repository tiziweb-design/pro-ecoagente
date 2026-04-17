import React, { useState, useEffect } from 'react';
import { Calculator, Euro, TrendingUp, Zap, Wand2, Download, Percent } from 'lucide-react';
import { AreaChart, Area, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Stime medie di risparmio rispetto a una Classe G (basate su dati ENEA/Cresme)
const SAVINGS_RATES: Record<string, number> = {
  'G': 0,
  'F': 0.15,
  'E': 0.25,
  'D': 0.35,
  'C': 0.45,
  'B': 0.55,
  'A1': 0.65,
  'A2': 0.75,
  'A3': 0.80,
  'A4': 0.85,
};

export const RoiCalculator: React.FC = () => {
  const [currentBill, setCurrentBill] = useState<number>(250);
  const [newBill, setNewBill] = useState<number>(62);
  const [upgradeCost, setUpgradeCost] = useState<number>(35000);
  
  // Stati per le detrazioni fiscali
  const [houseType, setHouseType] = useState<'prima' | 'seconda'>('prima');
  const [workYear, setWorkYear] = useState<'2026' | '2027'>('2026');
  const [taxDeduction, setTaxDeduction] = useState<number>(50);

  // Effetto per calcolare la detrazione fiscale in base a tipo casa e anno
  useEffect(() => {
    if (houseType === 'prima') {
      setTaxDeduction(workYear === '2026' ? 50 : 36);
    } else {
      setTaxDeduction(workYear === '2026' ? 36 : 30);
    }
  }, [houseType, workYear]);
  
  // Stati per la stima automatica
  const [useEstimator, setUseEstimator] = useState<boolean>(true);
  const [currentClass, setCurrentClass] = useState<string>('G');
  const [targetClass, setTargetClass] = useState<string>('A2');

  // Effetto per calcolare automaticamente la nuova bolletta se lo stimatore è attivo
  useEffect(() => {
    if (useEstimator) {
      const currentRate = SAVINGS_RATES[currentClass] || 0;
      const targetRate = SAVINGS_RATES[targetClass] || 0;
      
      // Calcolo del risparmio relativo tra le due classi
      // Se parto da G (0) e vado ad A2 (0.75), risparmio il 75%.
      // Se parto da E (0.25) e vado ad A2 (0.75), il calcolo è proporzionale.
      const relativeSavings = Math.max(0, (targetRate - currentRate) / (1 - currentRate));
      
      const estimatedNewBill = currentBill * (1 - relativeSavings);
      setNewBill(Math.round(estimatedNewBill));
    }
  }, [currentBill, currentClass, targetClass, useEstimator]);

  // Calcoli Finanziari Reali (Flusso di cassa e ROI)
  const maxDeductible = 96000;
  const eligibleCost = Math.min(upgradeCost, maxDeductible);
  const totalDeduction = eligibleCost * (taxDeduction / 100);
  const annualDeduction = totalDeduction / 10; // Recupero in 10 anni

  const monthlySavings = currentBill - newBill;
  const annualBillSavings = monthlySavings * 12;
  const totalAnnualBenefit = annualBillSavings + annualDeduction; // Valido per i primi 10 anni

  // Calcolo ROI (Rendimento Annuo nei primi 10 anni)
  const roiPercentage = upgradeCost > 0 ? (totalAnnualBenefit / upgradeCost) * 100 : 0;
  
  // Calcolo accurato del Payback (tiene conto della fine delle detrazioni all'11° anno)
  let paybackYears = 0;
  if (totalAnnualBenefit > 0) {
    const benefit10Years = totalAnnualBenefit * 10;
    if (upgradeCost <= benefit10Years) {
      // Si ripagherà entro i primi 10 anni
      paybackYears = upgradeCost / totalAnnualBenefit;
    } else {
      // Serviranno più di 10 anni. Dal 11° anno il beneficio è solo il risparmio in bolletta.
      const remainingCostAfter10Years = upgradeCost - benefit10Years;
      if (annualBillSavings > 0) {
        paybackYears = 10 + (remainingCostAfter10Years / annualBillSavings);
      } else {
        paybackYears = 99; // Mai ripagato
      }
    }
  }

  // Quanti anni mostrare nel grafico? Minimo 10, massimo 30, idealmente fino al pareggio + 2 anni di margine
  const projectionYears = Math.min(30, Math.max(10, Math.ceil(paybackYears) + 2));

  // Dati per il grafico: Linea Rossa (Esposizione) scende, Linea Verde (Guadagno) sale
  const chartData = Array.from({ length: projectionYears + 1 }, (_, i) => {
    // Le detrazioni si fermano al 10° anno
    const totalDeductionsReceived = Math.min(i, 10) * annualDeduction;
    const totalBillSavings = annualBillSavings * i;
    
    // Il capitale recuperato è la somma dei risparmi in bolletta e delle detrazioni incassate
    const cumulativeRecovery = totalDeductionsReceived + totalBillSavings;
    const esposizione = Math.max(0, upgradeCost - cumulativeRecovery);
    
    const percEsposizione = upgradeCost > 0 ? (esposizione / upgradeCost) * 100 : 0;
    const percGuadagno = upgradeCost > 0 ? (cumulativeRecovery / upgradeCost) * 100 : 0;
    
    return {
      year: new Date().getFullYear() + i,
      esposizione,
      guadagno: cumulativeRecovery,
      percEsposizione,
      percGuadagno,
    };
  });

  const handlePrint = () => {
    // In un iframe, window.print() potrebbe essere bloccato.
    // Creiamo un workaround aprendo il contenuto in una nuova finestra se necessario,
    // oppure proviamo a chiamare il print sul parent se permesso, altrimenti usiamo il print standard.
    try {
      window.print();
    } catch (e) {
      console.error("Stampa bloccata dall'iframe", e);
      alert("La funzione di stampa diretta è bloccata in questa anteprima. Prova ad aprire l'app in una nuova scheda.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Calcolatore ROI Rigenerazione</h2>
          <p className="text-slate-500">Dimostra al cliente il Ritorno sull'Investimento (ROI) e i risparmi netti annui.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#54b032] text-[#f3f4f6] border-2 border-[#d1d5db] px-4 py-2 rounded-lg hover:bg-[#469329] transition-colors text-sm font-medium mr-16 shadow-sm"
        >
          <Download className="w-4 h-4" /> Salva PDF
        </button>
      </div>

      {/* Header visibile solo in stampa PDF */}
      <div className="hidden print:flex items-center gap-4 mb-8 border-b border-slate-200 pb-6">
        <img src="/logo.png" alt="Pro EcoAgent" className="h-16 w-auto" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analisi Finanziaria e ROI Rigenerazione</h1>
          <p className="text-slate-500">Pro EcoAgent - Immobili Sostenibili</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-xl border-2 border-[#d1d5db] shadow-sm space-y-5 lg:col-span-1 print:hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#54b032]" />
              <h3 className="font-semibold text-slate-800">Parametri Immobile</h3>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-slate-700 uppercase">BOLLETTE MENSILI (€)</span>
              <span className="text-xs text-slate-500 font-normal">(Costo Medio Gas + Elettricità)</span>
            </label>
            <input 
              type="number" 
              value={currentBill}
              onChange={(e) => setCurrentBill(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Sezione Stimatore Automatico */}
          <div className="bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] p-4 rounded-lg border-2 border-[#54b032] space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-[#54b032]" />
                Stima Automatica Bolletta
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={useEstimator} onChange={() => setUseEstimator(!useEstimator)} />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#54b032]"></div>
              </label>
            </div>
            
            {useEstimator && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">Da Classe</label>
                  <select value={currentClass} onChange={(e) => setCurrentClass(e.target.value)} className="w-full p-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none">
                    {Object.keys(SAVINGS_RATES).map(c => <option key={`curr-${c}`} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">A Classe</label>
                  <select value={targetClass} onChange={(e) => setTargetClass(e.target.value)} className="w-full p-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 outline-none">
                    {Object.keys(SAVINGS_RATES).map(c => <option key={`tgt-${c}`} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-slate-700 uppercase">BOLLETTE MENSILI PREVISTE (€)</span>
              <span className="text-xs text-slate-500 font-normal">(Costo Medio Mensile Previsto)</span>
            </label>
            <input 
              type="number" 
              value={newBill}
              onChange={(e) => setNewBill(Number(e.target.value))}
              disabled={useEstimator}
              className={`w-full p-2 border-2 border-[#d1d5db] rounded-lg focus:ring-2 focus:ring-[#54b032] focus:border-transparent outline-none font-bold text-lg ${useEstimator ? 'bg-[#54b032]/90 text-white cursor-not-allowed' : 'bg-[#54b032] text-white'}`}
            />
            {useEstimator && (
              <div className="group relative inline-block">
                <p className="text-xs text-[#54b032] font-medium cursor-help border-b border-dashed border-[#54b032]/50">
                  Stima calcolata in base al salto energetico (Dati ENEA) ⓘ
                </p>
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-72 bg-[#54b032] text-white text-xs rounded-lg p-3 shadow-xl z-10">
                  <p className="font-semibold text-slate-900 mb-1">Argomentazione per il cliente:</p>
                  <p className="text-[#f3f4f6] leading-relaxed">
                    "Non lo dico io, lo dicono i dati ENEA. Passando da una classe {currentClass} a una classe {targetClass}, l'abbattimento medio del fabbisogno energetico (EPgl,nren) è stimato. Su una spesa di {currentBill}€, significa scendere matematicamente a circa {newBill}€."
                  </p>
                  <div className="absolute -bottom-1 left-4 w-2 h-2 bg-[#54b032] transform rotate-45"></div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Costo Ristrutturazione (€)</label>
            <input 
              type="number" 
              value={upgradeCost}
              onChange={(e) => setUpgradeCost(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] p-4 rounded-lg border-2 border-[#54b032] space-y-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-[#54b032] flex items-center gap-2">
                <Euro className="w-4 h-4 text-[#54b032]" />
                Detrazioni Fiscali
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Tipo Immobile</label>
                <select 
                  value={houseType} 
                  onChange={(e) => setHouseType(e.target.value as 'prima' | 'seconda')} 
                  className="w-full p-2.5 pr-8 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#54b032] outline-none bg-white shadow-sm cursor-pointer"
                >
                  <option value="prima">Prima Casa</option>
                  <option value="seconda">Seconda Casa</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Anno Lavori</label>
                <select 
                  value={workYear} 
                  onChange={(e) => setWorkYear(e.target.value as '2026' | '2027')} 
                  className="w-full p-2.5 pr-8 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#54b032] outline-none bg-white shadow-sm cursor-pointer"
                >
                  <option value="2026">Entro il 2026</option>
                  <option value="2027">Dal 2027 in poi</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-300">
              <span className="text-sm text-slate-700">Aliquota Applicata:</span>
              <span className="text-lg font-bold text-[#54b032]">{taxDeduction}%</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6 print:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] p-4 rounded-xl border-2 border-[#54b032] shadow-sm">
              <div className="flex items-center gap-2 text-[#54b032] mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold text-slate-800">Beneficio Annuo Netto</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">€{Math.round(totalAnnualBenefit).toLocaleString()}</div>
              <div className="text-[11px] text-slate-600 mt-1 leading-tight">
                (€{Math.round(annualBillSavings).toLocaleString()} risparmio bollette + €{Math.round(annualDeduction).toLocaleString()} detrazione)
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] p-4 rounded-xl border-2 border-[#54b032] shadow-sm">
              <div className="flex items-center gap-2 text-[#54b032] mb-2">
                <Percent className="w-4 h-4" />
                <span className="text-sm font-semibold text-slate-800">ROI (Rendimento)</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{roiPercentage.toFixed(1)}%</div>
              <div className="text-xs text-slate-600 mt-1">
                Rendimento annuo (primi 10 anni)
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] p-4 rounded-xl border-2 border-[#54b032] shadow-sm">
              <div className="flex items-center gap-2 text-[#54b032] mb-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold text-slate-800">Punto di Pareggio</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{paybackYears.toFixed(1)} anni</div>
              <div className="text-xs text-slate-600 mt-1">
                Rientro totale del capitale investito
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Proiezione Recupero Capitale ({projectionYears} Anni)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#54b032" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#54b032" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value/1000}k`} />
                  <Tooltip 
                    formatter={(value: number, name: string, props: any) => {
                      if (name === 'Quota Risparmio/Guadagno (Capitale Rientrato)') {
                        return [`€${Math.round(value).toLocaleString()} (${props.payload.percGuadagno.toFixed(1)}%)`, name];
                      }
                      return [`€${Math.round(value).toLocaleString()} (${props.payload.percEsposizione.toFixed(1)}%)`, name];
                    }}
                    labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="guadagno" name="Quota Risparmio/Guadagno (Capitale Rientrato)" stroke="#54b032" fillOpacity={1} fill="url(#colorA)" isAnimationActive={false} />
                  <Line type="monotone" dataKey="esposizione" name="Capitale Investito (Esposizione di Rischio)" stroke="#ef4444" strokeWidth={3} dot={false} isAnimationActive={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] rounded-lg border-2 border-[#54b032] text-sm text-slate-800 shadow-sm">
              <strong className="text-[#54b032]">Argomentazione Forte:</strong> "Oggi lei investe {upgradeCost.toLocaleString()}€ nell'immobile. Grazie al risparmio in bolletta e alle detrazioni fiscali, ottiene un beneficio netto di {Math.round(totalAnnualBenefit).toLocaleString()}€ ogni anno, pari a un <strong>rendimento garantito del {roiPercentage.toFixed(1)}% annuo</strong>. {paybackYears < 99 ? `In soli ${paybackYears.toFixed(1)} anni avrà recuperato fino all'ultimo centesimo del suo capitale, e da quel momento in poi sarà tutto guadagno netto.` : `L'investimento migliora il comfort e il valore dell'immobile, ripagandosi nel lungo termine.`}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
