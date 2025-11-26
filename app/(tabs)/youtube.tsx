
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
import { hasAccessToYouTube } from '@/utils/subscriptionManager';

interface Playlist {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

export default function YouTubeScreen() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const access = await hasAccessToYouTube();
    setHasAccess(access);
  };

  // Demo playlists - replace with your actual YouTube playlist URLs
  const playlists: Playlist[] = [
    {
      id: '1',
      title: 'Kundalini Yoga Grundlagen',
      description: 'Einführung in Kundalini Yoga für Anfänger',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_1',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    },
    {
      id: '2',
      title: 'Geführte Meditationen',
      description: 'Tägliche Meditationen für inneren Frieden',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_2',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    },
    {
      id: '3',
      title: 'Atemübungen',
      description: 'Pranayama-Techniken für Energie und Klarheit',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_3',
      thumbnail: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400',
    },
    {
      id: '4',
      title: 'Fortgeschrittene Praxis',
      description: 'Tiefere Kundalini Yoga Sequenzen',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_4',
      thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
    },
    {
      id: '5',
      title: 'Chakra Heilung',
      description: 'Meditationen für jedes Chakra',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_5',
      thumbnail: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7?w=400',
    },
    {
      id: '6',
      title: 'Entspannung & Schlaf',
      description: 'Yoga Nidra und Entspannungstechniken',
      url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_6',
      thumbnail: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=400',
    },
  ];

  const handlePlaylistPress = async (playlist: Playlist) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
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
            <IconSymbol
              ios_icon_name="lock.fill"
              android_material_icon_name="lock"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={styles.lockedTitle}>{t('upgradeRequired')}</Text>
            <Text style={styles.lockedText}>{t('upgradeMessage')}</Text>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push('/(tabs)/subscription');
              }}
              activeOpacity={0.7}
            >
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
          <Text style={styles.header}>{t('youtubeGallery')}</Text>
          <Text style={styles.subtitle}>{t('playlists')}</Text>

          <View style={styles.playlistGrid}>
            {playlists.map((playlist, index) => (
              <TouchableOpacity
                key={index}
                style={styles.playlistCard}
                onPress={() => handlePlaylistPress(playlist)}
                activeOpacity={0.7}
              >
                <View style={styles.thumbnailContainer}>
                  <View style={styles.thumbnailPlaceholder}>
                    <IconSymbol
                      ios_icon_name="play.circle.fill"
                      android_material_icon_name="play_circle_filled"
                      size={48}
                      color={colors.primary}
                    />
                  </View>
                </View>
                <View style={styles.playlistInfo}>
                  <Text style={styles.playlistTitle}>{playlist.title}</Text>
                  <Text style={styles.playlistDescription}>
                    {playlist.description}
                  </Text>
                </View>
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
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  playlistGrid: {
    gap: 16,
  },
  playlistCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: colors.highlight,
  },
  thumbnailPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistInfo: {
    padding: 16,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  lockedTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  lockedText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  upgradeButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    elevation: 4,
  },
  upgradeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
});
