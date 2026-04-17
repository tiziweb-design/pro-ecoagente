import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Search, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini API
console.log("API Key type:", typeof process.env.GEMINI_API_KEY);
console.log("API Key length:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const ProblemSolving: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Ciao! Sono il tuo assistente **PROblem Solving**. Posso cercare su Google in tempo reale per darti informazioni aggiornate su bonus edilizi, tassi dei mutui, normative EPBD e molto altro. Come posso aiutarti oggi?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Format history for Gemini
      const history = messages.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "Sei un assistente esperto in ambito immobiliare, riqualificazione energetica, mutui green e normative europee (EPBD). Usa Google Search per fornire risposte aggiornate e precise. Cita sempre le fonti se possibile. Rispondi in italiano in modo professionale ma accessibile."
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Non sono riuscito a trovare una risposta.' }]);
    } catch (error: any) {
      console.error("Errore durante la generazione:", error);
      setMessages(prev => [...prev, { role: 'model', text: `Scusa, si è verificato un errore: ${error?.message || String(error)}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-8rem)] flex flex-col">
      <div className="print:hidden">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#54b032]" />
          PROblem Solving
        </h2>
        <p className="text-slate-500">Il tuo assistente AI connesso a Google per normative, bonus e tassi aggiornati in tempo reale.</p>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden print:hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-[#54b032]/10 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-[#54b032]" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-[#54b032] text-white rounded-tr-none shadow-sm' : 'bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] border border-[#d1d5db] text-slate-800 rounded-tl-none shadow-sm'}`}>
                {msg.role === 'model' ? (
                  <div className="prose prose-sm prose-emerald max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 rounded-full bg-slate-400" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#54b032]/10 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-[#54b032]" />
              </div>
              <div className="bg-gradient-to-br from-[#f3f4f6] to-[#d1d5db] border border-[#d1d5db] rounded-2xl rounded-tl-none p-4 flex items-center gap-3 shadow-sm">
                <Loader2 className="w-4 h-4 text-[#54b032] animate-spin" />
                <span className="text-sm text-slate-600 flex items-center gap-2">
                  <Search className="w-3 h-3" /> Ricerca su Google in corso...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-[#54b032]/10 border-t border-[#54b032]/20">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Chiedi informazioni su bonus, tassi dei mutui, direttiva case green..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#54b032] focus:border-[#54b032] outline-none text-sm shadow-sm bg-white"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-[#54b032] text-white rounded-lg hover:bg-[#469329] disabled:opacity-50 disabled:hover:bg-[#54b032] transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[10px] text-[#54b032] font-medium mt-2">
            PROblem Solving usa Google Search per trovare informazioni aggiornate in tempo reale.
          </p>
        </div>
      </div>
    </div>
  );
};
