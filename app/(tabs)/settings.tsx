
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Switch,
  Alert,
  ScrollView,
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

  const notificationTypes = [
    {
      type: 'morning' as const,
      title: t('morningReminder'),
      icon: 'sunrise.fill',
      androidIcon: 'wb_sunny',
      color: colors.accent,
      gradient: ['#FFE5B4', '#FFDAB9'],
    },
    {
      type: 'midday' as const,
      title: t('middayReminder'),
      icon: 'figure.mind.and.body',
      androidIcon: 'self_improvement',
      color: colors.secondary,
      gradient: ['#E8DAEF', '#D7BDE2'],
    },
    {
      type: 'evening' as const,
      title: t('eveningReminder'),
      icon: 'moon.stars.fill',
      androidIcon: 'nightlight',
      color: colors.primary,
      gradient: ['#FFD6E8', '#FFC1D9'],
    },
    {
      type: 'sunday' as const,
      title: t('sundayCommunity'),
      icon: 'person.3.fill',
      androidIcon: 'groups',
      color: colors.success,
      gradient: ['#D4F1F4', '#B8E6E9'],
    },
  ];

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
              ios_icon_name="bell.badge.fill"
              android_material_icon_name="notifications_active"
              size={48}
              color={colors.primary}
            />
            <Text style={styles.header}>{t('notificationSettings')}</Text>
          </View>

          {notificationTypes.map((item, index) => {
            const enabled = settings[`${item.type}Enabled`];
            const time = settings[`${item.type}Time`];
            
            return (
              <LinearGradient
                key={index}
                colors={item.gradient}
                style={styles.settingCard}
              >
                <View style={styles.settingHeader}>
                  <View style={styles.settingTitleRow}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                      <IconSymbol
                        ios_icon_name={item.icon}
                        android_material_icon_name={item.androidIcon}
                        size={28}
                        color={colors.card}
                      />
                    </View>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                  </View>
                  <Switch
                    value={enabled}
                    onValueChange={() => handleToggle(item.type)}
                    trackColor={{ false: colors.textSecondary, true: item.color }}
                    thumbColor={colors.card}
                    ios_backgroundColor={colors.textSecondary}
                  />
                </View>
                {enabled && (
                  <TouchableOpacity
                    style={[styles.timeButton, { borderColor: item.color }]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setShowTimePicker({ type: item.type });
                    }}
                    activeOpacity={0.7}
                  >
                    <IconSymbol
                      ios_icon_name="clock.fill"
                      android_material_icon_name="schedule"
                      size={24}
                      color={item.color}
                    />
                    <Text style={[styles.timeButtonText, { color: item.color }]}>
                      {formatTime(time.hour, time.minute)}
                    </Text>
                    <IconSymbol
                      ios_icon_name="chevron.right"
                      android_material_icon_name="chevron_right"
                      size={20}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                )}
              </LinearGradient>
            );
          })}

          <View style={styles.infoCard}>
            <IconSymbol
              ios_icon_name="lightbulb.fill"
              android_material_icon_name="lightbulb"
              size={28}
              color={colors.warning}
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
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingHorizontal: 20,
    paddingBottom: 100,
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
  settingCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
    elevation: 5,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  settingTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  timeButton: {
    marginTop: 16,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  timeButtonText: {
    fontSize: 24,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    gap: 14,
    borderWidth: 2,
    borderColor: colors.warning,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
    fontWeight: '500',
  },
});
