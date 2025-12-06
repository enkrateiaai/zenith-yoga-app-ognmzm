
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { t } from '@/data/translations';
import { hasAccessToLive, isDemoModeActive, getSubscriptionTier } from '@/utils/subscriptionManager';

export default function LiveScreen() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const access = await hasAccessToLive();
    const demo = await isDemoModeActive();
    const tier = await getSubscriptionTier();
    
    setHasAccess(access);
    setIsDemo(demo && tier === 'free');
  };

  const embedHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background-color: #000;
            overflow: hidden;
          }
          .video-container {
            position: relative;
            width: 100%;
            height: 100vh;
            padding-bottom: 56.25%;
          }
          iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <div class="video-container">
          <iframe 
            src="https://player.onestream.live/embed?token=MjE3NTkyMw==&type=up" 
            scrolling="no" 
            frameborder="0" 
            allow="autoplay; fullscreen" 
            allowfullscreen>
          </iframe>
        </div>
      </body>
    </html>
  `;

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
            <Text style={styles.lockedTitle}>{t('premiumRequired')}</Text>
            <Text style={styles.lockedText}>{t('premiumMessage')}</Text>
            
            <TouchableOpacity
              style={styles.demoButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push('/(tabs)/subscription');
              }}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="video.fill"
                android_material_icon_name="videocam"
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
      <View style={styles.header}>
        <LinearGradient
          colors={[colors.primary, colors.accent]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            {isDemo && (
              <View style={styles.demoBadge}>
                <IconSymbol
                  ios_icon_name="sparkles"
                  android_material_icon_name="auto_awesome"
                  size={16}
                  color={colors.text}
                />
                <Text style={styles.demoBadgeText}>{t('demo')}</Text>
              </View>
            )}
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <Text style={styles.headerTitle}>{t('liveMeditation')}</Text>
            <Text style={styles.headerSubtitle}>{t('liveStream')}</Text>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.webViewContainer}>
        <WebView
          source={{ html: embedHTML }}
          style={styles.webView}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  demoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
    gap: 6,
  },
  demoBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 1,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.card,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.card,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.card,
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.card,
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '600',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  webView: {
    flex: 1,
    backgroundColor: '#000',
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
    backgroundColor: colors.accent,
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
    backgroundColor: colors.accent,
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
