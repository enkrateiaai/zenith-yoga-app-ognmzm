
export interface MotivationalQuote {
  id: number;
  text: string;
  category: 'Wissenschaft' | 'Yoga' | 'Praktisch';
}

export const motivationalQuotes: MotivationalQuote[] = [
  // Wissenschaft Kategorie
  { id: 1, text: 'Meditation reduziert den Cortisolspiegel um bis zu 50% und hilft dir, Stress auf natürliche Weise zu bewältigen.', category: 'Wissenschaft' },
  { id: 2, text: 'Regelmäßige Meditation erhöht die Dichte der grauen Substanz in Gehirnregionen, die mit Gedächtnis und emotionaler Regulation verbunden sind.', category: 'Wissenschaft' },
  { id: 3, text: 'Studien zeigen, dass 8 Wochen Meditation dein Gehirn für besseren Fokus und Klarheit neu verdrahten können.', category: 'Wissenschaft' },
  { id: 4, text: 'Meditation aktiviert das parasympathische Nervensystem und fördert tiefe Entspannung und Heilung.', category: 'Wissenschaft' },
  { id: 5, text: 'Forschung beweist, dass Meditation die Immunfunktion verbessert, indem sie die Antikörperproduktion erhöht.', category: 'Wissenschaft' },
  { id: 6, text: 'Achtsamkeitsmeditation reduziert Entzündungsmarker im Körper und unterstützt die allgemeine Gesundheit.', category: 'Wissenschaft' },
  { id: 7, text: 'Gehirnscans zeigen, dass Meditation die Aktivität in Bereichen erhöht, die mit Mitgefühl und Empathie verbunden sind.', category: 'Wissenschaft' },
  { id: 8, text: 'Regelmäßige Praxis kann den Blutdruck senken und das Risiko von Herzerkrankungen reduzieren.', category: 'Wissenschaft' },
  { id: 9, text: 'Meditation verbessert die Neuroplastizität und ermöglicht es deinem Gehirn, neue, positive neuronale Bahnen zu bilden.', category: 'Wissenschaft' },
  { id: 10, text: 'Studien zeigen, dass Meditation die zelluläre Alterung verlangsamen kann, indem sie Telomere in der DNA schützt.', category: 'Wissenschaft' },
  { id: 11, text: 'Meditation erhöht den GABA-Spiegel, einen Neurotransmitter, der Ruhe fördert und Angst reduziert.', category: 'Wissenschaft' },
  { id: 12, text: 'Forschung zeigt, dass Meditation die Schlafqualität verbessert, indem sie zirkadiane Rhythmen reguliert.', category: 'Wissenschaft' },
  { id: 13, text: 'Meditation stärkt den präfrontalen Kortex und verbessert Entscheidungsfindung und Selbstkontrolle.', category: 'Wissenschaft' },
  { id: 14, text: 'Studien zeigen, dass Meditation Symptome von Depressionen genauso effektiv reduzieren kann wie Medikamente.', category: 'Wissenschaft' },
  { id: 15, text: 'Regelmäßige Meditationspraxis erhöht die Serotoninproduktion und steigert Stimmung und Wohlbefinden.', category: 'Wissenschaft' },
  { id: 16, text: 'Meditation verbessert die Aufmerksamkeitsspanne und kognitive Leistung in nur 4 Tagen Praxis.', category: 'Wissenschaft' },
  { id: 17, text: 'Gehirnbildgebung zeigt, dass Meditation die Aktivität im Default-Mode-Netzwerk reduziert und mentales Geplapper beruhigt.', category: 'Wissenschaft' },
  { id: 18, text: 'Meditation verbessert die emotionale Resilienz, indem sie Verbindungen zwischen Gehirnregionen stärkt.', category: 'Wissenschaft' },
  
  // Yoga Kategorie
  { id: 19, text: 'Kundalini Yoga erweckt deine innere Energie und verbindet dich mit deinem höchsten Potenzial.', category: 'Yoga' },
  { id: 20, text: 'Der Atem ist die Brücke zwischen Körper und Geist. Beherrsche ihn, und du beherrschst dich selbst.', category: 'Yoga' },
  { id: 21, text: 'In der Stille findest du dein wahres Selbst. In der Praxis wirst du es.', category: 'Yoga' },
  { id: 22, text: 'Kundalini-Energie steigt durch die Chakren auf und erleuchtet deinen Weg zur Erleuchtung.', category: 'Yoga' },
  { id: 23, text: 'Dein Körper ist ein Tempel. Behandle ihn mit Ehrfurcht durch tägliche Praxis.', category: 'Yoga' },
  { id: 24, text: 'Die Praxis geht nicht um Perfektion, sondern um Präsenz und Bewusstsein.', category: 'Yoga' },
  { id: 25, text: 'Jeder Atemzug ist ein Geschenk. Jeder Moment der Praxis ist ein Schritt zur Befreiung.', category: 'Yoga' },
  { id: 26, text: 'Kundalini Yoga balanciert das Drüsensystem und harmonisiert Körper, Geist und Seele.', category: 'Yoga' },
  { id: 27, text: 'Die Morgenpraxis gibt den Ton für deinen ganzen Tag an. Beginne mit Absicht.', category: 'Yoga' },
  { id: 28, text: 'Durch Meditation transzendierst du die Grenzen des Egos und berührst die Unendlichkeit.', category: 'Yoga' },
  { id: 29, text: 'Die Wirbelsäule ist die Autobahn zum Bewusstsein. Halte sie flexibel und stark.', category: 'Yoga' },
  { id: 30, text: 'Kundalini Yoga ist das Yoga des Bewusstseins und erweckt dich zu deiner göttlichen Natur.', category: 'Yoga' },
  { id: 31, text: 'Deine Gedanken erschaffen deine Realität. Meditation hilft dir, sie weise zu wählen.', category: 'Yoga' },
  { id: 32, text: 'Die Praxis von Sat Nam verbindet dich mit deiner wahren Identität und deinem Zweck.', category: 'Yoga' },
  { id: 33, text: 'Abendreflexion ermöglicht es dir, den Tag loszulassen und dich auf erholsamen Schlaf vorzubereiten.', category: 'Yoga' },
  { id: 34, text: 'Kundalini Yoga stärkt das Nervensystem und baut Resilienz und Vitalität auf.', category: 'Yoga' },
  { id: 35, text: 'Das Mantra ist ein Werkzeug, um den Geist zu fokussieren und das Bewusstsein zu erheben.', category: 'Yoga' },
  { id: 36, text: 'Durch konsequente Praxis richtest du dich am Rhythmus des Universums aus.', category: 'Yoga' },
  
  // Praktisch Kategorie
  { id: 37, text: 'Nur 10 Minuten tägliche Meditation können deine mentale Klarheit und deinen Fokus transformieren.', category: 'Praktisch' },
  { id: 38, text: 'Beständigkeit schlägt Intensität. Erscheine jeden Tag, auch wenn es nur für ein paar Atemzüge ist.', category: 'Praktisch' },
  { id: 39, text: 'Morgenmeditation gibt einen positiven Ton für den ganzen Tag vor.', category: 'Praktisch' },
  { id: 40, text: 'Verfolge deinen Fortschritt. Feiere kleine Erfolge. Baue täglich Schwung auf.', category: 'Praktisch' },
  { id: 41, text: 'Schaffe einen dedizierten Raum für die Praxis. Deine Umgebung formt deine Erfahrung.', category: 'Praktisch' },
  { id: 42, text: 'Fange klein an. Selbst 3 Minuten Meditation sind besser als keine.', category: 'Praktisch' },
  { id: 43, text: 'Abendreflexion hilft dir, den Tag zu verarbeiten und friedlicher zu schlafen.', category: 'Praktisch' },
  { id: 44, text: 'Verwende Erinnerungen, um die Gewohnheit aufzubauen. Dein zukünftiges Ich wird es dir danken.', category: 'Praktisch' },
  { id: 45, text: 'Tritt einer Gemeinschaft bei. Gemeinsames Üben verstärkt die Vorteile und hält dich motiviert.', category: 'Praktisch' },
  { id: 46, text: 'Die 40-Tage-Challenge verdrahtet deine Gewohnheiten neu und transformiert dein Leben.', category: 'Praktisch' },
  { id: 47, text: 'Meditation ist wie Training für den Geist. Je mehr du übst, desto stärker wirst du.', category: 'Praktisch' },
  { id: 48, text: 'Führe ein Tagebuch. Dokumentiere deine Reise und Erkenntnisse aus der Praxis.', category: 'Praktisch' },
  { id: 49, text: 'Atemarbeit ist der schnellste Weg, deinen Zustand zu ändern. Nutze sie den ganzen Tag über.', category: 'Praktisch' },
  { id: 50, text: 'Mache es nicht verhandelbar. Plane deine Praxis wie jeden wichtigen Termin.', category: 'Praktisch' },
  { id: 51, text: 'Nutze Apps und Tools zur Unterstützung deiner Praxis, aber lass sie sie nicht ersetzen.', category: 'Praktisch' },
  { id: 52, text: 'Teile deine Praxis mit anderen. Lehren verstärkt dein eigenes Verständnis.', category: 'Praktisch' },
  { id: 53, text: 'Feiere Meilensteine. Erkenne deine Hingabe und dein Wachstum an.', category: 'Praktisch' },
  { id: 54, text: 'Wenn du einen Tag verpasst, gib nicht auf. Fange einfach morgen wieder an.', category: 'Praktisch' },
  { id: 55, text: 'Integriere Achtsamkeit in tägliche Aktivitäten. Jeder Moment ist eine Gelegenheit zu üben.', category: 'Praktisch' },
];

export const getDailyQuote = (): MotivationalQuote => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % motivationalQuotes.length;
  return motivationalQuotes[index];
};
