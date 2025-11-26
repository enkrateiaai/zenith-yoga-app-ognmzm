
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { t } from '@/data/translations';
import {
  getSubscriptionTier,
  setSubscriptionTier,
  SubscriptionTier,
} from '@/utils/subscriptionManager';

interface TierOption {
  id: SubscriptionTier;
  name: string;
  price: string;
  description: string;
  features: string[];
  color: string;
}

export default function SubscriptionScreen() {
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('free');

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    const tier = await getSubscriptionTier();
    setCurrentTier(tier);
  };

  const tiers: TierOption[] = [
    {
      id: 'free',
      name: t('freeTier'),
      price: '€0',
      description: t('freeTierDesc'),
      features: [
        t('freeTierFeature1'),
        t('freeTierFeature2'),
        t('freeTierFeature3'),
        t('freeTierFeature4'),
      ],
      color: colors.textSecondary,
    },
    {
      id: 'mid',
      name: t('midTier'),
      price: '€4,99',
      description: t('midTierDesc'),
      features: [
        t('midTierFeature1'),
        t('midTierFeature2'),
        t('midTierFeature3'),
        t('midTierFeature4'),
      ],
      color: colors.secondary,
    },
    {
      id: 'premium',
      name: t('premiumTier'),
      price: '€9,99',
      description: t('premiumTierDesc'),
      features: [
        t('premiumTierFeature1'),
        t('premiumTierFeature2'),
        t('premiumTierFeature3'),
        t('premiumTierFeature4'),
      ],
      color: colors.accent,
    },
  ];

  const handleSelectTier = async (tier: SubscriptionTier) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (tier === currentTier) {
      Alert.alert(
        t('currentPlan'),
        'Dies ist bereits dein aktueller Plan.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (tier === 'free') {
      Alert.alert(
        'Downgrade',
        'Möchtest du wirklich zum kostenlosen Plan wechseln?',
        [
          { text: 'Abbrechen', style: 'cancel' },
          {
            text: 'Bestätigen',
            onPress: async () => {
              await setSubscriptionTier(tier);
              setCurrentTier(tier);
              Alert.alert('Erfolg', 'Dein Plan wurde aktualisiert.');
            },
          },
        ]
      );
      return;
    }

    // For demo purposes, we'll simulate a purchase
    // In production, this would integrate with Apple/Google in-app purchases
    Alert.alert(
      'Kauf bestätigen',
      `Möchtest du ${tier === 'mid' ? 'YouTube Galerie' : 'Premium Live'} für ${tier === 'mid' ? '€4,99' : '€9,99'}/Monat kaufen?\n\nHinweis: Dies ist eine Demo. In der Produktion würde dies über Apple/Google In-App-Käufe abgewickelt.`,
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Kaufen',
          onPress: async () => {
            await setSubscriptionTier(tier);
            setCurrentTier(tier);
            Alert.alert(
              'Erfolg! 🎉',
              'Dein Abonnement wurde aktiviert. Vielen Dank für deine Unterstützung!'
            );
          },
        },
      ]
    );
  };

  const handleRestorePurchases = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      t('restorePurchases'),
      'In der Produktion würde dies deine Käufe von Apple/Google wiederherstellen.',
      [{ text: 'OK' }]
    );
  };

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
          <Text style={styles.header}>{t('subscriptionTitle')}</Text>

          {tiers.map((tier, index) => {
            const isCurrentTier = tier.id === currentTier;
            return (
              <View
                key={index}
                style={[
                  styles.tierCard,
                  isCurrentTier && styles.tierCardActive,
                ]}
              >
                <View style={styles.tierHeader}>
                  <View>
                    <Text style={styles.tierName}>{tier.name}</Text>
                    <Text style={styles.tierDescription}>{tier.description}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.tierPrice, { color: tier.color }]}>
                      {tier.price}
                    </Text>
                    {tier.id !== 'free' && (
                      <Text style={styles.perMonth}>{t('perMonth')}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.featuresContainer}>
                  {tier.features.map((feature, featureIndex) => (
                    <View key={featureIndex} style={styles.featureRow}>
                      <IconSymbol
                        ios_icon_name="checkmark.circle.fill"
                        android_material_icon_name="check_circle"
                        size={20}
                        color={tier.color}
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[
                    styles.selectButton,
                    isCurrentTier && styles.selectButtonActive,
                    { backgroundColor: isCurrentTier ? tier.color : colors.card },
                  ]}
                  onPress={() => handleSelectTier(tier.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.selectButtonText,
                      isCurrentTier && styles.selectButtonTextActive,
                    ]}
                  >
                    {isCurrentTier ? t('currentPlan') : t('selectPlan')}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <TouchableOpacity
            style={styles.restoreButton}
            onPress={handleRestorePurchases}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="arrow.clockwise"
              android_material_icon_name="refresh"
              size={20}
              color={colors.secondary}
            />
            <Text style={styles.restoreButtonText}>{t('restorePurchases')}</Text>
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={24}
              color={colors.secondary}
            />
            <Text style={styles.infoText}>
              Hinweis: Dies ist eine Demo-Version. In der Produktion würden Käufe über Apple App Store oder Google Play Store abgewickelt. Abonnements können jederzeit in deinen Kontoeinstellungen gekündigt werden.
            </Text>
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
    marginBottom: 24,
    textAlign: 'center',
  },
  tierCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tierCardActive: {
    borderColor: colors.primary,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tierName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  tierDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  tierPrice: {
    fontSize: 28,
    fontWeight: '800',
  },
  perMonth: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  selectButton: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  selectButtonActive: {
    borderColor: 'transparent',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  selectButtonTextActive: {
    color: colors.card,
  },
  restoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 8,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  restoreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: colors.text,
  },
});
