import React, { useState } from 'react';
import { FileText, CheckCircle, Download, Home, ShieldCheck, Plus, Trash2, Wrench } from 'lucide-react';

export const DigitalPassport: React.FC = () => {
  const [address, setAddress] = useState('Via Roma 10, Milano');
  const [currentClass, setCurrentClass] = useState('G');
  const [targetClass, setTargetClass] = useState('A2');
  const [estimatedCost, setEstimatedCost] = useState('45000');
  const [generated, setGenerated] = useState(false);
  const [interventions, setInterventions] = useState<string[]>([
    'Isolamento Termico (Cappotto)',
    'Sostituzione Infissi',
    'Pompa di Calore + Fotovoltaico'
  ]);

  const handleInterventionChange = (index: number, value: string) => {
    const newInterventions = [...interventions];
    newInterventions[index] = value;
    setInterventions(newInterventions);
  };

  const addIntervention = () => setInterventions([...interventions, '']);
  const removeIntervention = (index: number) => {
    setInterventions(interventions.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error("Stampa bloccata dall'iframe", e);
      alert("La funzione di stampa diretta è bloccata in questa anteprima. Prova ad aprire l'app in una nuova scheda.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Passaporto di Ristrutturazione Digitale</h2>
        <p className="text-slate-500">Abbatti il timore dei costi di ristrutturazione fornendo preventivi certi.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white p-6 rounded-xl border-4 border-[#d1d5db] shadow-sm space-y-4 print:hidden">
          <h3 className="font-semibold text-slate-800 mb-4">Dati Immobile</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Indirizzo Immobile</label>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Classe Attuale</label>
              <select 
                value={currentClass}
                onChange={(e) => setCurrentClass(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="G">Classe G</option>
                <option value="F">Classe F</option>
                <option value="E">Classe E</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Classe Obiettivo</label>
              <select 
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="A4">Classe A4</option>
                <option value="A3">Classe A3</option>
                <option value="A2">Classe A2</option>
                <option value="A1">Classe A1</option>
                <option value="B">Classe B</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Preventivo Lavori Stimato (€)</label>
            <input 
              type="number" 
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <label className="text-sm font-bold text-slate-700 uppercase">Interventi Previsti</label>
            <div className="space-y-3">
              {interventions.map((intervention, index) => (
                <div key={index} className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-200 shadow-sm transition-all focus-within:border-[#54b032] focus-within:ring-1 focus-within:ring-[#54b032]">
                  <div className="bg-white p-1.5 rounded-md shadow-sm border border-slate-100">
                    <Wrench className="w-4 h-4 text-[#54b032]" />
                  </div>
                  <input
                    type="text"
                    value={intervention}
                    onChange={(e) => handleInterventionChange(index, e.target.value)}
                    className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-slate-700 font-medium text-sm"
                    placeholder="Es. Facciata ventilata"
                  />
                  <button
                    onClick={() => removeIntervention(index)}
                    className="p-1.5 text-red-500 hover:bg-red-100 rounded-md transition-colors"
                    title="Rimuovi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addIntervention}
              className="text-sm text-[#54b032] font-semibold flex items-center gap-1 hover:text-[#469329] mt-2 bg-[#54b032]/10 px-3 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" /> Aggiungi intervento
            </button>
          </div>

          <button 
            onClick={() => setGenerated(true)}
            className="w-full mt-4 bg-[#54b032] text-white py-3 rounded-lg font-medium hover:bg-[#469329] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <FileText className="w-4 h-4" />
            Genera Passaporto
          </button>
        </div>

        {/* Preview */}
        {generated ? (
          <div className="bg-white p-8 rounded-xl border-2 border-[#54b032] shadow-lg relative overflow-hidden animate-fade-in print:border-none print:shadow-none print:p-0 lg:print:col-span-2">
            
            {/* Header visibile solo in stampa PDF */}
            <div className="hidden print:flex items-center gap-4 mb-8 border-b border-slate-200 pb-6">
              <img src="/logo.png" alt="Pro EcoAgent" className="h-16 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Report Consulenza Energetica</h1>
                <p className="text-slate-500">Pro EcoAgent - Immobili Sostenibili</p>
              </div>
            </div>

            <div className="absolute top-0 right-0 bg-[#54b032] text-white px-4 py-1 rounded-bl-xl text-sm font-bold flex items-center gap-1 print:hidden">
              <ShieldCheck className="w-4 h-4" />
              Certificato
            </div>
            
            <div className="text-center mb-8 mt-4">
              <div className="inline-flex items-center justify-center mb-4">
                <img src="/certificato-icon.png" alt="Certificato" className="w-24 h-24 object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Passaporto Digitale</h3>
              <p className="text-slate-500">{address}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-600 font-medium">Salto Energetico</span>
                <div className="flex items-center gap-3 font-bold">
                  <span className="text-red-500 text-lg">{currentClass}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-[#54b032] text-xl">{targetClass}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">Interventi Previsti</h4>
                <ul className="space-y-3">
                  {interventions.filter(i => i.trim() !== '').map((intervention, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
                      <div className="bg-white p-1.5 rounded-full shadow-sm border border-slate-100 mt-0.5">
                        <CheckCircle className="w-5 h-5 text-[#54b032] flex-shrink-0" /> 
                      </div>
                      <span className="text-slate-800 font-medium text-base leading-snug pt-1">{intervention}</span>
                    </li>
                  ))}
                  {interventions.filter(i => i.trim() !== '').length === 0 && (
                    <li className="text-slate-400 text-sm italic p-3 bg-slate-50 rounded-xl border border-slate-100">Nessun intervento specificato</li>
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-slate-500">Costo Garantito Imprese Partner</p>
                    <p className="text-2xl font-bold text-slate-900">€{Number(estimatedCost).toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={handlePrint}
                    className="p-2 text-[#54b032] hover:bg-[#54b032]/10 rounded-lg transition-colors print:hidden flex items-center gap-2 font-medium"
                    title="Scarica PDF"
                  >
                    <Download className="w-5 h-5" />
                    <span className="text-sm">Salva PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[400px]">
            <FileText className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">Nessun Passaporto Generato</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Compila i dati a sinistra per generare il Passaporto di Ristrutturazione Digitale da consegnare al cliente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
