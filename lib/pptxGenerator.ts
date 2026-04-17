import pptxgen from "pptxgenjs";

export const generateEcoAgentPptx = async () => {
  // 1. Create a new Presentation
  let pres = new pptxgen();

  // Set presentation properties
  pres.author = "Pro EcoAgent";
  pres.company = "PROSPERO Real Estate Strategy";
  pres.subject = "Report di Sostenibilità e Riqualificazione";
  pres.title = "Presentazione Immobile";

  // Define custom colors
  const GREEN = "54b032";
  const SILVER = "d1d5db";
  const DARK = "0f172a"; // slate-900
  const GRAY = "64748b"; // slate-500

  // --- SLIDE 1: Titolo ---
  let slide1 = pres.addSlide();
  slide1.background = { color: "FFFFFF" };
  
  slide1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.5, fill: { color: GREEN } });
  
  slide1.addText("PRO ECOAGENT", {
    x: 1, y: 2, w: "80%", h: 1,
    fontSize: 44, bold: true, color: GREEN,
  });
  slide1.addText("Report di Sostenibilità e Riqualificazione", {
    x: 1, y: 3, w: "80%", h: 1,
    fontSize: 24, color: DARK,
  });
  slide1.addText("Strategia di valorizzazione immobiliare in vista della Direttiva EPBD 2030", {
    x: 1, y: 3.8, w: "80%", h: 1,
    fontSize: 14, color: GRAY,
  });

  // --- SLIDE 2: Il Contesto (EPBD 2030) ---
  let slide2 = pres.addSlide();
  slide2.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.5, fill: { color: GREEN } });
  slide2.addText("Il Contesto: Direttiva Case Green (EPBD)", {
    x: 0.5, y: 0.8, w: "90%", h: 0.8,
    fontSize: 28, bold: true, color: DARK,
  });
  slide2.addText([
    { text: "Entro il 2030: ", options: { bold: true, color: GREEN } },
    { text: "Tutti gli immobili residenziali dovranno raggiungere almeno la classe energetica E.\n\n" },
    { text: "Entro il 2033: ", options: { bold: true, color: GREEN } },
    { text: "L'obbligo si estenderà alla classe energetica D.\n\n" },
    { text: "Il Rischio: ", options: { bold: true, color: "EF4444" } },
    { text: "Gli immobili nelle classi F e G (attualmente il 60% del patrimonio italiano) subiranno una forte svalutazione di mercato e saranno più difficili da vendere o affittare." }
  ], {
    x: 0.5, y: 2, w: "90%", h: 3,
    fontSize: 18, color: DARK, bullet: true,
  });

  // --- SLIDE 3: Il Green Premium ---
  let slide3 = pres.addSlide();
  slide3.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.5, fill: { color: GREEN } });
  slide3.addText("L'Opportunità: Il Green Premium", {
    x: 0.5, y: 0.8, w: "90%", h: 0.8,
    fontSize: 28, bold: true, color: DARK,
  });
  slide3.addText("+15%", {
    x: 0.5, y: 2, w: 3, h: 1.5,
    fontSize: 64, bold: true, color: GREEN, align: "center"
  });
  slide3.addText("È l'aumento medio di valore (Green Premium) per gli immobili che effettuano un salto di classe energetica (da G ad A/B).", {
    x: 4, y: 2, w: 5, h: 1.5,
    fontSize: 20, color: DARK,
  });
  slide3.addText("Oltre all'aumento di valore, un immobile riqualificato garantisce:\n• Tempi di vendita dimezzati\n• Accesso a Mutui Green a tassi agevolati\n• Abbattimento dei costi in bolletta", {
    x: 0.5, y: 4, w: "90%", h: 1.5,
    fontSize: 18, color: GRAY,
  });

  // --- SLIDE 4: Passaporto Digitale ---
  let slide4 = pres.addSlide();
  slide4.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.5, fill: { color: GREEN } });
  slide4.addText("Passaporto di Ristrutturazione", {
    x: 0.5, y: 0.8, w: "90%", h: 0.8,
    fontSize: 28, bold: true, color: DARK,
  });
  slide4.addText("Dati Immobile (Da compilare)", {
    x: 0.5, y: 1.8, w: "90%", h: 0.5,
    fontSize: 18, bold: true, color: GREEN,
  });
  slide4.addTable([
    [{ text: "Indirizzo", options: { bold: true, fill: SILVER } }, { text: "..." }],
    [{ text: "Classe Attuale", options: { bold: true, fill: SILVER } }, { text: "..." }],
    [{ text: "Classe Obiettivo", options: { bold: true, fill: SILVER } }, { text: "..." }],
    [{ text: "Costo Stimato", options: { bold: true, fill: SILVER } }, { text: "..." }]
  ], { x: 0.5, y: 2.5, w: 8, colW: [3, 5], border: { type: "solid", color: SILVER } });

  // 4. Save the Presentation
  await pres.writeFile({ fileName: "ProEcoAgent_Report.pptx" });
};
