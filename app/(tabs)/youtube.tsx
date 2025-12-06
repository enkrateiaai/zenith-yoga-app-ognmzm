
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { t } from '@/data/translations';
import { hasAccessToYouTube, isDemoModeActive, getSubscriptionTier } from '@/utils/subscriptionManager';

interface Playlist {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  androidIcon: string;
  color: string;
}

export default function YouTubeScreen() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const access = await hasAccessToYouTube();
    const demo = await isDemoModeActive();
    const tier = await getSubscriptionTier();
    
    setHasAccess(access);
    setIsDemo(demo && tier === 'free');
  };

  const playlists: Playlist[] = [
    {
      id: '1',
      title: 'Kundalini Yoga Grundlagen',
      description: 'Einführung in Kundalini Yoga für Anfänger',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_1',
      icon: 'figure.yoga',
      androidIcon: 'self_improvement',
      color: colors.secondary,
    },
    {
      id: '2',
      title: 'Geführte Meditationen',
      description: 'Tägliche Meditationen für inneren Frieden',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_2',
      icon: 'brain.head.profile',
      androidIcon: 'psychology',
      color: colors.primary,
    },
    {
      id: '3',
      title: 'Atemübungen',
      description: 'Pranayama-Techniken für Energie und Klarheit',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_3',
      icon: 'wind',
      androidIcon: 'air',
      color: colors.success,
    },
    {
      id: '4',
      title: 'Fortgeschrittene Praxis',
      description: 'Tiefere Kundalini Yoga Sequenzen',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_4',
      icon: 'flame.fill',
      androidIcon: 'local_fire_department',
      color: colors.accent,
    },
    {
      id: '5',
      title: 'Chakra Heilung',
      description: 'Meditationen für jedes Chakra',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_5',
      icon: 'sparkles',
      androidIcon: 'auto_awesome',
      color: colors.info,
    },
    {
      id: '6',
      title: 'Entspannung & Schlaf',
      description: 'Yoga Nidra und Entspannungstechniken',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_6',
      icon: 'moon.stars.fill',
      androidIcon: 'nightlight',
      color: colors.primary,
    },
  ];

  const handlePlaylistPress = async (playlist: Playlist) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (!hasAccess) {
      Alert.alert(
        t('upgradeRequired'),
        t('upgradeMessage'),
        [
          { text: 'Abbrechen', style: 'cancel' },
          {
            text: t('upgradeNow'),
            onPress: () => router.push('/(tabs)/subscription'),
          },
        ]
      );
      return;
    }

    try {
      const supported = await Linking.canOpenURL(playlist.url);
      if (supported) {
        await Linking.openURL(playlist.url);
      } else {
        Alert.alert('Fehler', 'YouTube-Link konnte nicht geöffnet werden.');
      }
    } catch (error) {
      console.error('Error opening YouTube:', error);
      Alert.alert('Fehler', 'Beim Öffnen des Links ist ein Fehler aufgetreten.');
    }
  };

  if (!hasAccess) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.background, colors.highlight]}
          style={styles.gradient}
        >
          <View style={styles.lockedContainer}>
            <View style={styles.lockedIconContainer}>
              <IconSymbol
                ios_icon_name="lock.fill"
                android_material_icon_name="lock"
                size={64}
                color={colors.card}
              />
            </View>
            <Text style={styles.lockedTitle}>{t('upgradeRequired')}</Text>
            <Text style={styles.lockedText}>{t('upgradeMessage')}</Text>
            
            <TouchableOpacity
              style={styles.demoButton}
              onPress={() => {
                if (Platform.OS !== 'web') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
                router.push('/(tabs)/settings');
              }}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="sparkles"
                android_material_icon_name="auto_awesome"
                size={24}
                color={colors.text}
              />
              <Text style={styles.demoButtonText}>{t('tryDemo')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => {
                if (Platform.OS !== 'web') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
                router.push('/(tabs)/subscription');
              }}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="crown.fill"
                android_material_icon_name="workspace_premium"
                size={24}
                color={colors.card}
              />
              <Text style={styles.upgradeButtonText}>{t('upgradeNow')}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.highlight]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {isDemo && (
            <LinearGradient
              colors={['#FFD93D', '#FFC107']}
              style={styles.demoBanner}
            >
              <IconSymbol
                ios_icon_name="sparkles"
                android_material_icon_name="auto_awesome"
                size={24}
                color={colors.text}
              />
              <Text style={styles.demoBannerText}>{t('demoModeActive')}</Text>
            </LinearGradient>
          )}

          <View style={styles.headerContainer}>
            <IconSymbol
              ios_icon_name="person.3.fill"
              android_material_icon_name="groups"
              size={48}
              color={colors.secondary}
            />
            <Text style={styles.header}>{t('youtubeGallery')}</Text>
            <Text style={styles.subtitle}>{t('playlists')}</Text>
          </View>

          <View style={styles.playlistGrid}>
            {playlists.map((playlist, index) => (
              <TouchableOpacity
                key={index}
                style={styles.playlistCard}
                onPress={() => handlePlaylistPress(playlist)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={[playlist.color, playlist.color + 'CC']}
                  style={styles.playlistGradient}
                >
                  <View style={styles.playlistIconContainer}>
                    <IconSymbol
                      ios_icon_name={playlist.icon}
                      android_material_icon_name={playlist.androidIcon}
                      size={40}
                      color={colors.card}
                    />
                  </View>
                  <View style={styles.playlistInfo}>
                    <Text style={styles.playlistTitle}>{playlist.title}</Text>
                    <Text style={styles.playlistDescription}>
                      {playlist.description}
                    </Text>
                  </View>
                  <View style={styles.playButton}>
                    <IconSymbol
                      ios_icon_name="play.fill"
                      android_material_icon_name="play_arrow"
                      size={24}
                      color={colors.card}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
    gap: 10,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  demoBannerText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
  },
  playlistGrid: {
    gap: 16,
  },
  playlistCard: {
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 6,
  },
  playlistGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playlistIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 14,
    color: colors.card,
    lineHeight: 20,
    opacity: 0.9,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  lockedIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
    elevation: 8,
  },
  lockedTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  lockedText: {
    fontSize: 17,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
    fontWeight: '500',
  },
  demoButton: {
    backgroundColor: colors.warning,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
    elevation: 6,
    marginBottom: 16,
  },
  demoButtonText: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
  },
  upgradeButton: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
    elevation: 6,
  },
  upgradeButtonText: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.card,
  },
});
