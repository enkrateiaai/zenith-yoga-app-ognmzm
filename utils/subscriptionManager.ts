
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SubscriptionTier = 'free' | 'mid' | 'premium';

const SUBSCRIPTION_KEY = '@subscription_tier';
const DEMO_MODE_KEY = '@demo_mode';
const DEMO_EXPIRY_KEY = '@demo_expiry';

export interface SubscriptionInfo {
  tier: SubscriptionTier;
  purchaseDate: string | null;
  expiryDate: string | null;
}

export interface DemoModeInfo {
  enabled: boolean;
  startDate: string | null;
  expiryDate: string | null;
}

// Demo mode duration in milliseconds (24 hours)
const DEMO_DURATION = 24 * 60 * 60 * 1000;

// TEMPORARY: Always return premium access for testing
const ENABLE_FREE_ACCESS = true;

export const getSubscriptionTier = async (): Promise<SubscriptionTier> => {
  // Return premium for free access mode
  if (ENABLE_FREE_ACCESS) {
    return 'premium';
  }

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

export const getDemoModeInfo = async (): Promise<DemoModeInfo> => {
  try {
    const stored = await AsyncStorage.getItem(DEMO_MODE_KEY);
    if (stored) {
      const info: DemoModeInfo = JSON.parse(stored);
      
      // Check if demo has expired
      if (info.enabled && info.expiryDate) {
        const now = new Date().getTime();
        const expiry = new Date(info.expiryDate).getTime();
        
        if (now > expiry) {
          // Demo expired, disable it
          info.enabled = false;
          await AsyncStorage.setItem(DEMO_MODE_KEY, JSON.stringify(info));
        }
      }
      
      return info;
    }
  } catch (error) {
    console.error('Error getting demo mode info:', error);
  }
  return {
    enabled: false,
    startDate: null,
    expiryDate: null,
  };
};

export const setDemoMode = async (enabled: boolean): Promise<DemoModeInfo> => {
  try {
    const now = new Date();
    const expiry = new Date(now.getTime() + DEMO_DURATION);
    
    const info: DemoModeInfo = {
      enabled,
      startDate: enabled ? now.toISOString() : null,
      expiryDate: enabled ? expiry.toISOString() : null,
    };
    
    await AsyncStorage.setItem(DEMO_MODE_KEY, JSON.stringify(info));
    console.log('Demo mode set to:', enabled);
    return info;
  } catch (error) {
    console.error('Error setting demo mode:', error);
    return {
      enabled: false,
      startDate: null,
      expiryDate: null,
    };
  }
};

export const isDemoModeActive = async (): Promise<boolean> => {
  const demoInfo = await getDemoModeInfo();
  return demoInfo.enabled;
};

export const getDemoTimeRemaining = async (): Promise<number> => {
  const demoInfo = await getDemoModeInfo();
  
  if (!demoInfo.enabled || !demoInfo.expiryDate) {
    return 0;
  }
  
  const now = new Date().getTime();
  const expiry = new Date(demoInfo.expiryDate).getTime();
  const remaining = Math.max(0, expiry - now);
  
  return remaining;
};

export const hasAccessToYouTube = async (): Promise<boolean> => {
  // Always grant access in free mode
  if (ENABLE_FREE_ACCESS) {
    return true;
  }

  const tier = await getSubscriptionTier();
  const demoActive = await isDemoModeActive();
  
  return tier === 'mid' || tier === 'premium' || demoActive;
};

export const hasAccessToLive = async (): Promise<boolean> => {
  // Always grant access in free mode
  if (ENABLE_FREE_ACCESS) {
    return true;
  }

  const tier = await getSubscriptionTier();
  const demoActive = await isDemoModeActive();
  
  return tier === 'premium' || demoActive;
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
