
export interface MotivationalQuote {
  id: number;
  text: string;
  category: 'Science' | 'Yoga' | 'Practical';
}

export const motivationalQuotes: MotivationalQuote[] = [
  // Science Category
  { id: 1, text: 'Meditation reduces cortisol levels by up to 50%, helping you manage stress naturally.', category: 'Science' },
  { id: 2, text: 'Regular meditation increases gray matter density in brain regions linked to memory and emotional regulation.', category: 'Science' },
  { id: 3, text: 'Studies show that 8 weeks of meditation can rewire your brain for better focus and clarity.', category: 'Science' },
  { id: 4, text: 'Meditation activates the parasympathetic nervous system, promoting deep relaxation and healing.', category: 'Science' },
  { id: 5, text: 'Research proves meditation improves immune function by increasing antibody production.', category: 'Science' },
  { id: 6, text: 'Mindfulness meditation reduces inflammation markers in the body, supporting overall health.', category: 'Science' },
  { id: 7, text: 'Brain scans show meditation increases activity in areas associated with compassion and empathy.', category: 'Science' },
  { id: 8, text: 'Regular practice can lower blood pressure and reduce the risk of heart disease.', category: 'Science' },
  { id: 9, text: 'Meditation enhances neuroplasticity, allowing your brain to form new, positive neural pathways.', category: 'Science' },
  { id: 10, text: 'Studies indicate meditation can slow cellular aging by protecting telomeres in DNA.', category: 'Science' },
  { id: 11, text: 'Meditation increases GABA levels, a neurotransmitter that promotes calmness and reduces anxiety.', category: 'Science' },
  { id: 12, text: 'Research shows meditation improves sleep quality by regulating circadian rhythms.', category: 'Science' },
  { id: 13, text: 'Meditation strengthens the prefrontal cortex, enhancing decision-making and self-control.', category: 'Science' },
  { id: 14, text: 'Studies reveal meditation can reduce symptoms of depression as effectively as medication.', category: 'Science' },
  { id: 15, text: 'Regular meditation practice increases serotonin production, boosting mood and well-being.', category: 'Science' },
  { id: 16, text: 'Meditation improves attention span and cognitive performance in just 4 days of practice.', category: 'Science' },
  { id: 17, text: 'Brain imaging shows meditation reduces activity in the default mode network, quieting mental chatter.', category: 'Science' },
  { id: 18, text: 'Meditation enhances emotional resilience by strengthening connections between brain regions.', category: 'Science' },
  
  // Yoga Category
  { id: 19, text: 'Kundalini Yoga awakens your inner energy, connecting you to your highest potential.', category: 'Yoga' },
  { id: 20, text: 'The breath is the bridge between body and mind. Master it, and you master yourself.', category: 'Yoga' },
  { id: 21, text: 'In stillness, you find your true self. In practice, you become it.', category: 'Yoga' },
  { id: 22, text: 'Kundalini energy rises through the chakras, illuminating your path to enlightenment.', category: 'Yoga' },
  { id: 23, text: 'Your body is a temple. Treat it with reverence through daily practice.', category: 'Yoga' },
  { id: 24, text: 'The practice is not about perfection, but about presence and awareness.', category: 'Yoga' },
  { id: 25, text: 'Each breath is a gift. Each moment of practice is a step toward liberation.', category: 'Yoga' },
  { id: 26, text: 'Kundalini Yoga balances the glandular system, harmonizing body, mind, and spirit.', category: 'Yoga' },
  { id: 27, text: 'The morning practice sets the tone for your entire day. Start with intention.', category: 'Yoga' },
  { id: 28, text: 'Through meditation, you transcend the limitations of the ego and touch infinity.', category: 'Yoga' },
  { id: 29, text: 'The spine is the highway to consciousness. Keep it flexible and strong.', category: 'Yoga' },
  { id: 30, text: 'Kundalini Yoga is the yoga of awareness, awakening you to your divine nature.', category: 'Yoga' },
  { id: 31, text: 'Your thoughts create your reality. Meditation helps you choose them wisely.', category: 'Yoga' },
  { id: 32, text: 'The practice of Sat Nam connects you to your true identity and purpose.', category: 'Yoga' },
  { id: 33, text: 'Evening reflection allows you to release the day and prepare for restful sleep.', category: 'Yoga' },
  { id: 34, text: 'Kundalini Yoga strengthens the nervous system, building resilience and vitality.', category: 'Yoga' },
  { id: 35, text: 'The mantra is a tool to focus the mind and elevate consciousness.', category: 'Yoga' },
  { id: 36, text: 'Through consistent practice, you align with the rhythm of the universe.', category: 'Yoga' },
  
  // Practical Category
  { id: 37, text: 'Just 10 minutes of daily meditation can transform your mental clarity and focus.', category: 'Practical' },
  { id: 38, text: 'Consistency beats intensity. Show up every day, even if just for a few breaths.', category: 'Practical' },
  { id: 39, text: 'Morning meditation sets a positive tone for the entire day ahead.', category: 'Practical' },
  { id: 40, text: 'Track your progress. Celebrate small wins. Build momentum daily.', category: 'Practical' },
  { id: 41, text: 'Create a dedicated space for practice. Your environment shapes your experience.', category: 'Practical' },
  { id: 42, text: 'Start small. Even 3 minutes of meditation is better than none.', category: 'Practical' },
  { id: 43, text: 'Evening reflection helps you process the day and sleep more peacefully.', category: 'Practical' },
  { id: 44, text: 'Use reminders to build the habit. Your future self will thank you.', category: 'Practical' },
  { id: 45, text: 'Join a community. Practicing together amplifies the benefits and keeps you motivated.', category: 'Practical' },
  { id: 46, text: 'The 40-day challenge rewires your habits and transforms your life.', category: 'Practical' },
  { id: 47, text: 'Meditation is like exercise for the mind. The more you practice, the stronger you become.', category: 'Practical' },
  { id: 48, text: 'Keep a journal. Document your journey and insights from practice.', category: 'Practical' },
  { id: 49, text: 'Breathwork is the fastest way to shift your state. Use it throughout the day.', category: 'Practical' },
  { id: 50, text: 'Make it non-negotiable. Schedule your practice like any important appointment.', category: 'Practical' },
  { id: 51, text: 'Use apps and tools to support your practice, but don&apos;t let them replace it.', category: 'Practical' },
  { id: 52, text: 'Share your practice with others. Teaching reinforces your own understanding.', category: 'Practical' },
  { id: 53, text: 'Celebrate milestones. Acknowledge your dedication and growth.', category: 'Practical' },
  { id: 54, text: 'When you miss a day, don&apos;t quit. Just start again tomorrow.', category: 'Practical' },
  { id: 55, text: 'Integrate mindfulness into daily activities. Every moment is an opportunity to practice.', category: 'Practical' },
];

export const getDailyQuote = (): MotivationalQuote => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % motivationalQuotes.length;
  return motivationalQuotes[index];
};
