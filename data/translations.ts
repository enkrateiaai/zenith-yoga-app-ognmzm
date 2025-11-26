
export const translations = {
  // Home Screen
  dailyInspiration: 'Tägliche Inspiration',
  tapToExpand: 'Zum Erweitern tippen',
  tapToCollapse: 'Zum Einklappen tippen',
  dayStreak: 'Tage Streak',
  dailyPractice: 'Tägliche Praxis',
  morningRoutine: 'Morgenroutine',
  meditation: 'Meditation',
  eveningReflection: 'Abendreflexion',
  todayIsSunday: 'Heute ist Sonntag! 🙏',
  tomorrowIsSunday: 'Morgen ist Sonntag! 🙏',
  daysUntilSunday: 'Tage bis Sonntag Meditation',
  
  // Challenge Screen
  challengeTitle: '40-Tage-Challenge',
  days: 'Tage',
  milestones: 'Meilensteine',
  day: 'Tag',
  days1to20: 'Tage 1-20',
  days21to40: 'Tage 21-40',
  
  // Stats Screen
  yourProgress: 'Dein Fortschritt',
  totalDays: 'Gesamttage',
  currentStreak: 'Aktuelle Serie',
  longestStreak: 'Längste Serie',
  challengeProgress: 'Challenge-Fortschritt',
  keepGoing: 'Weiter so! 💪',
  practiceInsights: 'Praxis-Einblicke',
  consistencyKey: 'Beständigkeit ist der Schlüssel zur Transformation',
  neuralPathways: '40 Tage schaffen dauerhafte neuronale Bahnen',
  dailyCompounds: 'Tägliche Praxis summiert sich mit der Zeit',
  
  // Motivation Messages
  motivationStart: 'Beginne deine Reise heute! Jeder Experte war einmal ein Anfänger.',
  motivationWeek1: 'Großartiger Start! Die erste Woche ist die schwerste. Du baust Schwung auf!',
  motivationWeek3: 'Erstaunlicher Fortschritt! Du bildest eine dauerhafte Gewohnheit. Weiter so!',
  motivationWeek6: 'Unglaubliche Hingabe! Du transformierst dein Leben einen Tag nach dem anderen.',
  motivationMaster: 'Du bist ein Meditationsmeister! Deine Beständigkeit ist wirklich inspirierend.',
  
  // Settings Screen
  notificationSettings: 'Benachrichtigungseinstellungen',
  morningReminder: 'Morgenerinnerung',
  middayReminder: 'Mittagserinnerung',
  eveningReminder: 'Abenderinnerung',
  sundayCommunity: 'Sonntags-Gemeinschaft',
  notificationInfo: 'Aktiviere Benachrichtigungen, um tägliche Erinnerungen für deine Meditationspraxis zu erhalten. Du kannst die Zeit für jede Erinnerung anpassen.',
  
  // Subscription Screen
  subscriptionTitle: 'Wähle dein Abo',
  freeTier: 'Kostenlos',
  freeTierDesc: 'Grundlegende Meditations-App',
  freeTierFeature1: 'Tägliche Motivationen',
  freeTierFeature2: '40-Tage-Challenge',
  freeTierFeature3: 'Fortschrittsverfolgung',
  freeTierFeature4: 'Benachrichtigungen',
  
  midTier: 'YouTube Galerie',
  midTierDesc: 'Zugang zu YouTube-Playlists',
  midTierFeature1: 'Alle kostenlosen Funktionen',
  midTierFeature2: 'YouTube-Playlist-Galerie',
  midTierFeature3: 'Geführte Meditationen',
  midTierFeature4: 'Yoga-Tutorials',
  
  premiumTier: 'Premium Live',
  premiumTierDesc: 'Vollständiger Zugang + Live-Stream',
  premiumTierFeature1: 'Alle Mid-Tier-Funktionen',
  premiumTierFeature2: 'Live-Meditations-Stream',
  premiumTierFeature3: 'Exklusive Inhalte',
  premiumTierFeature4: 'Prioritäts-Support',
  
  currentPlan: 'Aktueller Plan',
  selectPlan: 'Plan auswählen',
  perMonth: '/Monat',
  restorePurchases: 'Käufe wiederherstellen',
  
  // YouTube Gallery
  youtubeGallery: 'YouTube Galerie',
  playlists: 'Playlists',
  upgradeRequired: 'Upgrade erforderlich',
  upgradeMessage: 'Upgrade auf YouTube Galerie, um auf diese Funktion zuzugreifen.',
  upgradeNow: 'Jetzt upgraden',
  
  // Live Meditation
  liveMeditation: 'Live Meditation',
  liveStream: 'Live-Stream',
  premiumRequired: 'Premium erforderlich',
  premiumMessage: 'Upgrade auf Premium Live, um auf den Live-Stream zuzugreifen.',
  
  // Tab Labels
  home: 'Start',
  challenge: 'Challenge',
  stats: 'Statistik',
  youtube: 'YouTube',
  live: 'Live',
  subscription: 'Abo',
};

export type TranslationKey = keyof typeof translations;

export const t = (key: TranslationKey): string => {
  return translations[key] || key;
};
