import React from 'react';
import { Book, Phone, ShieldAlert, FileCheck } from 'lucide-react';

export const Resources: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Materiale Extra & Script</h2>
        <p className="text-slate-500">Risorse per trasformarti in un consulente insostituibile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Script di Chiamata */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#54b032]/10 rounded-lg text-[#54b032]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">Script: Protocollo EPBD 2030</h3>
          </div>
          <div className="bg-[#54b032]/5 p-4 rounded-lg text-sm text-slate-800 space-y-3 border border-[#54b032]/20">
            <p><strong className="text-[#54b032]">Agente:</strong> "Buongiorno [Nome], la chiamo non per venderle casa, ma per offrirle una consulenza tecnica gratuita."</p>
            <p><strong className="text-[#54b032]">Agente:</strong> "Stiamo mappando la conformità UE degli immobili in zona. La mia agenzia non prende incarichi se prima non abbiamo verificato l'indice di vendibilità energetica dell'immobile."</p>
            <p><strong className="text-[#54b032]">Agente:</strong> "Ho analizzato i dati energetici del suo isolato e la sua palazzina risulta tra le più esposte al rischio svalutazione 2030. Fissiamo un Check-up Energetico Gratuito?"</p>
          </div>
        </div>

        {/* Playbook Obiezioni */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">Playbook Obiezioni</h3>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 pl-3">
              <p className="text-sm font-semibold text-slate-800">"Non mi interessa la classe energetica, la casa è bella."</p>
              <p className="text-sm text-slate-600 mt-1">"Capisco, ma il mercato oggi non sconta solo lo stato d'uso, ma il costo dell'adeguamento futuro. Vendere ora significa anticipare la svalutazione."</p>
            </div>
            <div className="border-l-4 border-red-400 pl-3">
              <p className="text-sm font-semibold text-slate-800">"I lavori costano troppo."</p>
              <p className="text-sm text-slate-600 mt-1">"Questa casa le farà risparmiare 150€ al mese di bolletta. In 5 anni, la differenza è già azzerata. Le mostro il calcolo del ROI."</p>
            </div>
            <div className="border-l-4 border-red-400 pl-3">
              <p className="text-sm font-semibold text-slate-800">"Come fai a dire che spenderò così poco di bolletta?"</p>
              <p className="text-sm text-slate-600 mt-1">"Non lo dico io, lo dicono i dati ENEA. Passando da una classe G a una classe A2, l'abbattimento medio del fabbisogno energetico (EPgl,nren) è del 75%. È matematica applicata all'immobile."</p>
            </div>
          </div>
        </div>

        {/* Documenti Ufficiali */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#54b032]/10 rounded-lg text-[#54b032]">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">Documenti Ufficiali & Guide</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://www.agenziaentrate.gov.it/portale/aree-tematiche/casa/agevolazioni/agevolazioni-per-le-ristrutturazioni-edilizie#:~:text=Tuttavia%2C%20per%20le%20spese%20sostenute,note%20come%20%E2%80%9CSisma%20bonus%E2%80%9D." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] rounded-xl border border-[#d1d5db] hover:border-[#54b032] hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#54b032] group-hover:scale-110 transition-transform shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm mb-0.5">Guida Ristrutturazioni 2026</p>
                <p className="text-xs text-slate-600">PDF Ufficiale Agenzia delle Entrate sulle agevolazioni fiscali</p>
              </div>
            </a>
            
            <a 
              href="https://biblus.acca.it/bonus-ristrutturazione/#:~:text=Table_title:%20Il%20quadro%20aggiornato%20Table_content:%20header:%20%7C,massima:%2048.000%20euro)%20%7C%20row:%20%7C%20:" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-[#54b032] rounded-xl border border-[#469329] hover:bg-[#469329] hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#94a3b8] group-hover:scale-110 transition-transform shrink-0">
                <Book className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-0.5">Tabella Bonus Aggiornata</p>
                <p className="text-xs text-white/90">Quadro sinottico completo delle detrazioni e massimali</p>
              </div>
            </a>
          </div>
        </div>

        {/* Glossario */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#54b032]/10 rounded-lg text-[#54b032]">
              <Book className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">Glossario Tecnico</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="https://www.certificato-energetico.it/articoli/energia-zero/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-50 rounded-lg border border-transparent hover:border-emerald-200 hover:bg-emerald-50/50 transition-all block group"
            >
              <span className="font-bold text-slate-800 block mb-1 group-hover:text-emerald-700 flex items-center justify-between">
                NZEB <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 text-xs">↗</span>
              </span>
              <span className="text-xs text-slate-600">Nearly Zero Energy Building. Edifici ad altissima prestazione energetica.</span>
            </a>
            <a 
              href="https://www.edilportale.com/news/2026/01/focus/potenziale-di-riscaldamento-globale-degli-edifici-cos-e-il-gwp-e-cosa-prevede-la-direttiva-epbd_108714_67.html#:~:text=Il%20GWP%20(Global%20Warming%20Potential,serra%2C%20responsabili%20dei%20cambiamenti%20climatici."
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-50 rounded-lg border border-transparent hover:border-emerald-200 hover:bg-emerald-50/50 transition-all block group"
            >
              <span className="font-bold text-slate-800 block mb-1 group-hover:text-emerald-700 flex items-center justify-between">
                GWP <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 text-xs">↗</span>
              </span>
              <span className="text-xs text-slate-600">Global Warming Potential. Indica l'impatto ambientale dei materiali usati.</span>
            </a>
            <a 
              href="https://www.efficienzaenergetica.enea.it/vi-segnaliamo/gli-attestati-di-prestazione-energetica-ape.html"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-50 rounded-lg border border-transparent hover:border-emerald-200 hover:bg-emerald-50/50 transition-all block group"
            >
              <span className="font-bold text-slate-800 block mb-1 group-hover:text-emerald-700 flex items-center justify-between">
                EPgl,nren <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 text-xs">↗</span>
              </span>
              <span className="text-xs text-slate-600">Indice di prestazione energetica globale non rinnovabile.</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
