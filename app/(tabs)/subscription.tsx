
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
  gradient: string[];
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
      gradient: [colors.card, colors.highlight],
    },
    {
      id: 'mid',
      name: t('midTier'),
      price: '€29,99',
      description: t('midTierDesc'),
      features: [
        t('midTierFeature1'),
        t('midTierFeature2'),
        t('midTierFeature3'),
        t('midTierFeature4'),
      ],
      color: colors.secondary,
      gradient: ['#E8DAEF', '#D7BDE2'],
    },
    {
      id: 'premium',
      name: t('premiumTier'),
      price: '€59,99',
      description: t('premiumTierDesc'),
      features: [
        t('premiumTierFeature1'),
        t('premiumTierFeature2'),
        t('premiumTierFeature3'),
        t('premiumTierFeature4'),
      ],
      color: colors.accent,
      gradient: ['#FFE5B4', '#FFDAB9'],
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

    const tierName = tier === 'mid' ? 'The Tribe' : 'Premium Live (The Tribe, täglich live)';
    const tierPrice = tier === 'mid' ? '€29,99' : '€59,99';

    Alert.alert(
      'Kauf bestätigen',
      `Möchtest du ${tierName} für ${tierPrice}/Monat kaufen?\n\nHinweis: Dies ist eine Demo. In der Produktion würde dies über Apple/Google In-App-Käufe abgewickelt.`,
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
          <View style={styles.headerContainer}>
            <IconSymbol
              ios_icon_name="crown.fill"
              android_material_icon_name="workspace_premium"
              size={48}
              color={colors.accent}
            />
            <Text style={styles.header}>{t('subscriptionTitle')}</Text>
          </View>

          {tiers.map((tier, index) => {
            const isCurrentTier = tier.id === currentTier;
            return (
              <LinearGradient
                key={index}
                colors={tier.gradient}
                style={[
                  styles.tierCard,
                  isCurrentTier && styles.tierCardActive,
                ]}
              >
                <View style={styles.tierHeader}>
                  <View style={styles.tierHeaderLeft}>
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
                        size={22}
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
                    { 
                      backgroundColor: isCurrentTier ? tier.color : colors.card,
                      borderColor: tier.color,
                    },
                  ]}
                  onPress={() => handleSelectTier(tier.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.selectButtonText,
                      isCurrentTier && styles.selectButtonTextActive,
                      { color: isCurrentTier ? colors.card : tier.color },
                    ]}
                  >
                    {isCurrentTier ? t('currentPlan') : t('selectPlan')}
                  </Text>
                  {isCurrentTier && (
                    <IconSymbol
                      ios_icon_name="checkmark.circle.fill"
                      android_material_icon_name="check_circle"
                      size={20}
                      color={colors.card}
                    />
                  )}
                </TouchableOpacity>
              </LinearGradient>
            );
          })}

          <TouchableOpacity
            style={styles.restoreButton}
            onPress={handleRestorePurchases}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="arrow.clockwise.circle.fill"
              android_material_icon_name="refresh"
              size={24}
              color={colors.secondary}
            />
            <Text style={styles.restoreButtonText}>{t('restorePurchases')}</Text>
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={24}
              color={colors.info}
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
    textAlign: 'center',
  },
  tierCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 6,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  tierCardActive: {
    borderColor: colors.primary,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  tierHeaderLeft: {
    flex: 1,
  },
  tierName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  tierDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  tierPrice: {
    fontSize: 32,
    fontWeight: '800',
  },
  perMonth: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  featureText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
    fontWeight: '500',
  },
  selectButton: {
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    flexDirection: 'row',
    gap: 8,
  },
  selectButtonActive: {
    borderColor: 'transparent',
  },
  selectButtonText: {
    fontSize: 17,
    fontWeight: '700',
  },
  selectButtonTextActive: {
    color: colors.card,
  },
  restoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 10,
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  restoreButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.secondary,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    gap: 12,
    borderWidth: 2,
    borderColor: colors.info,
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: colors.text,
    fontWeight: '500',
  },
});
