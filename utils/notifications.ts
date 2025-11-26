
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export interface NotificationSettings {
  morningEnabled: boolean;
  morningTime: { hour: number; minute: number };
  middayEnabled: boolean;
  middayTime: { hour: number; minute: number };
  eveningEnabled: boolean;
  eveningTime: { hour: number; minute: number };
  sundayEnabled: boolean;
  sundayTime: { hour: number; minute: number };
}

const NOTIFICATION_IDS = {
  morning: 'morning-reminder',
  midday: 'midday-reminder',
  evening: 'evening-reminder',
  sunday: 'sunday-reminder',
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF8C42',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    return finalStatus === 'granted';
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

export const scheduleNotification = async (
  id: string,
  title: string,
  body: string,
  hour: number,
  minute: number
): Promise<void> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
    
    await Notifications.scheduleNotificationAsync({
      identifier: id,
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
    
    console.log(`Scheduled notification: ${id} at ${hour}:${minute}`);
  } catch (error) {
    console.error(`Error scheduling notification ${id}:`, error);
  }
};

export const cancelNotification = async (id: string): Promise<void> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
    console.log(`Cancelled notification: ${id}`);
  } catch (error) {
    console.error(`Error cancelling notification ${id}:`, error);
  }
};

export const updateNotifications = async (settings: NotificationSettings): Promise<void> => {
  if (settings.morningEnabled) {
    await scheduleNotification(
      NOTIFICATION_IDS.morning,
      'Morning Practice 🌅',
      'Start your day with meditation and intention',
      settings.morningTime.hour,
      settings.morningTime.minute
    );
  } else {
    await cancelNotification(NOTIFICATION_IDS.morning);
  }

  if (settings.middayEnabled) {
    await scheduleNotification(
      NOTIFICATION_IDS.midday,
      'Midday Mindfulness 🧘',
      'Take a moment to breathe and center yourself',
      settings.middayTime.hour,
      settings.middayTime.minute
    );
  } else {
    await cancelNotification(NOTIFICATION_IDS.midday);
  }

  if (settings.eveningEnabled) {
    await scheduleNotification(
      NOTIFICATION_IDS.evening,
      'Evening Reflection 🌙',
      'Wind down with meditation and gratitude',
      settings.eveningTime.hour,
      settings.eveningTime.minute
    );
  } else {
    await cancelNotification(NOTIFICATION_IDS.evening);
  }

  if (settings.sundayEnabled) {
    await scheduleNotification(
      NOTIFICATION_IDS.sunday,
      'Community Meditation 🙏',
      'Join the weekly community meditation practice',
      settings.sundayTime.hour,
      settings.sundayTime.minute
    );
  } else {
    await cancelNotification(NOTIFICATION_IDS.sunday);
  }
};
