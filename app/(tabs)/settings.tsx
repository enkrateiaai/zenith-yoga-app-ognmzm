
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/styles/commonStyles';
import {
  requestNotificationPermissions,
  updateNotifications,
  NotificationSettings,
} from '@/utils/notifications';
import { IconSymbol } from '@/components/IconSymbol';
import { t } from '@/data/translations';

const SETTINGS_KEY = '@notification_settings';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<NotificationSettings>({
    morningEnabled: false,
    morningTime: { hour: 7, minute: 0 },
    middayEnabled: false,
    middayTime: { hour: 12, minute: 0 },
    eveningEnabled: false,
    eveningTime: { hour: 20, minute: 0 },
    sundayEnabled: false,
    sundayTime: { hour: 10, minute: 0 },
  });

  const [showTimePicker, setShowTimePicker] = useState<{
    type: 'morning' | 'midday' | 'evening' | 'sunday' | null;
  }>({ type: null });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings: NotificationSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      await updateNotifications(newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleToggle = async (
    type: 'morning' | 'midday' | 'evening' | 'sunday'
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const key = `${type}Enabled` as keyof NotificationSettings;
    const newValue = !settings[key];

    if (newValue) {
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) {
        Alert.alert(
          'Berechtigung erforderlich',
          'Bitte aktiviere Benachrichtigungen in deinen Geräteeinstellungen, um Erinnerungen zu erhalten.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    const newSettings = { ...settings, [key]: newValue };
    await saveSettings(newSettings);
  };

  const handleTimeChange = async (
    type: 'morning' | 'midday' | 'evening' | 'sunday',
    event: any,
    selectedDate?: Date
  ) => {
    if (Platform.OS === 'android') {
      setShowTimePicker({ type: null });
    }

    if (selectedDate) {
      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();
      const timeKey = `${type}Time` as keyof NotificationSettings;
      const newSettings = {
        ...settings,
        [timeKey]: { hour, minute },
      };
      await saveSettings(newSettings);
    }
  };

  const formatTime = (hour: number, minute: number) => {
    const displayHour = hour.toString().padStart(2, '0');
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute}`;
  };

  const getDateFromTime = (hour: number, minute: number) => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.highlight]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.header}>{t('notificationSettings')}</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <View style={styles.settingTitleRow}>
                <IconSymbol
                  ios_icon_name="sunrise.fill"
                  android_material_icon_name="wb_sunny"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.settingTitle}>{t('morningReminder')}</Text>
              </View>
              <Switch
                value={settings.morningEnabled}
                onValueChange={() => handleToggle('morning')}
                trackColor={{ false: colors.textSecondary, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
            {settings.morningEnabled && (
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowTimePicker({ type: 'morning' });
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.timeButtonText}>
                  {formatTime(settings.morningTime.hour, settings.morningTime.minute)}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <View style={styles.settingTitleRow}>
                <IconSymbol
                  ios_icon_name="sun.max.fill"
                  android_material_icon_name="wb_sunny"
                  size={24}
                  color={colors.secondary}
                />
                <Text style={styles.settingTitle}>{t('middayReminder')}</Text>
              </View>
              <Switch
                value={settings.middayEnabled}
                onValueChange={() => handleToggle('midday')}
                trackColor={{ false: colors.textSecondary, true: colors.secondary }}
                thumbColor={colors.card}
              />
            </View>
            {settings.middayEnabled && (
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowTimePicker({ type: 'midday' });
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.timeButtonText}>
                  {formatTime(settings.middayTime.hour, settings.middayTime.minute)}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <View style={styles.settingTitleRow}>
                <IconSymbol
                  ios_icon_name="moon.stars.fill"
                  android_material_icon_name="nightlight"
                  size={24}
                  color={colors.accent}
                />
                <Text style={styles.settingTitle}>{t('eveningReminder')}</Text>
              </View>
              <Switch
                value={settings.eveningEnabled}
                onValueChange={() => handleToggle('evening')}
                trackColor={{ false: colors.textSecondary, true: colors.accent }}
                thumbColor={colors.card}
              />
            </View>
            {settings.eveningEnabled && (
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowTimePicker({ type: 'evening' });
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.timeButtonText}>
                  {formatTime(settings.eveningTime.hour, settings.eveningTime.minute)}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <View style={styles.settingTitleRow}>
                <IconSymbol
                  ios_icon_name="person.3.fill"
                  android_material_icon_name="groups"
                  size={24}
                  color={colors.secondary}
                />
                <Text style={styles.settingTitle}>{t('sundayCommunity')}</Text>
              </View>
              <Switch
                value={settings.sundayEnabled}
                onValueChange={() => handleToggle('sunday')}
                trackColor={{ false: colors.textSecondary, true: colors.secondary }}
                thumbColor={colors.card}
              />
            </View>
            {settings.sundayEnabled && (
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowTimePicker({ type: 'sunday' });
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.timeButtonText}>
                  {formatTime(settings.sundayTime.hour, settings.sundayTime.minute)}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.infoCard}>
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={24}
              color={colors.secondary}
            />
            <Text style={styles.infoText}>
              {t('notificationInfo')}
            </Text>
          </View>

          {showTimePicker.type && (
            <DateTimePicker
              value={getDateFromTime(
                settings[`${showTimePicker.type}Time`].hour,
                settings[`${showTimePicker.type}Time`].minute
              )}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) =>
                handleTimeChange(showTimePicker.type!, event, date)
              }
            />
          )}
        </View>
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
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  settingCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  timeButton: {
    marginTop: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
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
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
});
