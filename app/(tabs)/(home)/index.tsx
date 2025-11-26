
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '@/styles/commonStyles';
import { getDailyQuote } from '@/data/motivationalContent';
import { getStoredData, updateCheckIn, getTodayCheckIn, UserStats } from '@/utils/storage';
import { IconSymbol } from '@/components/IconSymbol';
import { t } from '@/data/translations';

export default function HomeScreen() {
  const [expanded, setExpanded] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [todayCheckIn, setTodayCheckIn] = useState({
    morningRoutine: false,
    meditation: false,
    eveningReflection: false,
  });

  const dailyQuote = getDailyQuote();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getStoredData();
    setStats(data);
    const today = getTodayCheckIn(data.checkIns);
    if (today) {
      setTodayCheckIn(today);
    }
  };

  const handleCheckIn = async (type: 'morningRoutine' | 'meditation' | 'eveningReflection') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const updatedData = await updateCheckIn(type);
    setStats(updatedData);
    const today = getTodayCheckIn(updatedData.checkIns);
    if (today) {
      setTodayCheckIn(today);
    }
  };

  const getSundayCountdown = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    
    if (daysUntilSunday === 0) {
      return t('todayIsSunday');
    } else if (daysUntilSunday === 1) {
      return t('tomorrowIsSunday');
    } else {
      return `${daysUntilSunday} ${t('daysUntilSunday')}`;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.highlight]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.header}>{t('dailyInspiration')}</Text>
          
          <TouchableOpacity
            style={styles.quoteCard}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setExpanded(!expanded);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.quoteBadge}>
              <Text style={styles.quoteBadgeText}>{dailyQuote.category}</Text>
            </View>
            <Text
              style={styles.quoteText}
              numberOfLines={expanded ? undefined : 2}
            >
              {dailyQuote.text}
            </Text>
            <Text style={styles.tapToExpand}>
              {expanded ? t('tapToCollapse') : t('tapToExpand')}
            </Text>
          </TouchableOpacity>

          <View style={styles.streakCard}>
            <IconSymbol
              ios_icon_name="flame.fill"
              android_material_icon_name="local_fire_department"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.streakText}>
              {stats?.currentStreak || 0} {t('dayStreak')}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>{t('dailyPractice')}</Text>
          
          <View style={styles.checkInContainer}>
            <TouchableOpacity
              style={[
                styles.checkInButton,
                todayCheckIn.morningRoutine && styles.checkInButtonActive,
              ]}
              onPress={() => handleCheckIn('morningRoutine')}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="sunrise.fill"
                android_material_icon_name="wb_sunny"
                size={28}
                color={todayCheckIn.morningRoutine ? colors.card : colors.primary}
              />
              <Text
                style={[
                  styles.checkInText,
                  todayCheckIn.morningRoutine && styles.checkInTextActive,
                ]}
              >
                {t('morningRoutine')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.checkInButton,
                todayCheckIn.meditation && styles.checkInButtonActive,
              ]}
              onPress={() => handleCheckIn('meditation')}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="figure.mind.and.body"
                android_material_icon_name="self_improvement"
                size={28}
                color={todayCheckIn.meditation ? colors.card : colors.secondary}
              />
              <Text
                style={[
                  styles.checkInText,
                  todayCheckIn.meditation && styles.checkInTextActive,
                ]}
              >
                {t('meditation')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.checkInButton,
                todayCheckIn.eveningReflection && styles.checkInButtonActive,
              ]}
              onPress={() => handleCheckIn('eveningReflection')}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="moon.stars.fill"
                android_material_icon_name="nightlight"
                size={28}
                color={todayCheckIn.eveningReflection ? colors.card : colors.accent}
              />
              <Text
                style={[
                  styles.checkInText,
                  todayCheckIn.eveningReflection && styles.checkInTextActive,
                ]}
              >
                {t('eveningReflection')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sundayCard}>
            <IconSymbol
              ios_icon_name="person.3.fill"
              android_material_icon_name="groups"
              size={24}
              color={colors.secondary}
            />
            <Text style={styles.sundayText}>{getSundayCountdown()}</Text>
          </View>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  quoteCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  quoteBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  quoteBadgeText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '700',
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    marginBottom: 8,
  },
  tapToExpand: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  streakText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  checkInContainer: {
    gap: 12,
    marginBottom: 24,
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  checkInButtonActive: {
    backgroundColor: colors.primary,
  },
  checkInText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 16,
  },
  checkInTextActive: {
    color: colors.card,
  },
  sundayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  sundayText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 12,
  },
});
