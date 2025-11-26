
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SubscriptionTier = 'free' | 'mid' | 'premium';

const SUBSCRIPTION_KEY = '@subscription_tier';

export interface SubscriptionInfo {
  tier: SubscriptionTier;
  purchaseDate: string | null;
  expiryDate: string | null;
}

export const getSubscriptionTier = async (): Promise<SubscriptionTier> => {
  try {
    const stored = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
    if (stored) {
      const info: SubscriptionInfo = JSON.parse(stored);
      return info.tier;
    }
  } catch (error) {
    console.error('Error getting subscription tier:', error);
  }
  return 'free';
};

export const setSubscriptionTier = async (tier: SubscriptionTier): Promise<void> => {
  try {
    const info: SubscriptionInfo = {
      tier,
      purchaseDate: new Date().toISOString(),
      expiryDate: null, // For demo purposes, no expiry
    };
    await AsyncStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(info));
    console.log('Subscription tier set to:', tier);
  } catch (error) {
    console.error('Error setting subscription tier:', error);
  }
};

export const hasAccessToYouTube = async (): Promise<boolean> => {
  const tier = await getSubscriptionTier();
  return tier === 'mid' || tier === 'premium';
};

export const hasAccessToLive = async (): Promise<boolean> => {
  const tier = await getSubscriptionTier();
  return tier === 'premium';
};

export const getSubscriptionInfo = async (): Promise<SubscriptionInfo> => {
  try {
    const stored = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error getting subscription info:', error);
  }
  return {
    tier: 'free',
    purchaseDate: null,
    expiryDate: null,
  };
};
