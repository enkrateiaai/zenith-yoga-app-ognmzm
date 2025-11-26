
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/commonStyles';
import { getStoredData, UserStats } from '@/utils/storage';
import { IconSymbol } from '@/components/IconSymbol';
import { t } from '@/data/translations';

export default function StatsScreen() {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getStoredData();
    setStats(data);
  };

  const getChallengeCompletion = () => {
    if (!stats) return 0;
    const completed = stats.challengeProgress.filter(d => d).length;
    return Math.round((completed / 40) * 100);
  };

  const getMotivationMessage = () => {
    if (!stats) return t('motivationStart');
    
    if (stats.currentStreak === 0) {
      return t('motivationStart');
    } else if (stats.currentStreak < 7) {
      return t('motivationWeek1');
    } else if (stats.currentStreak < 21) {
      return t('motivationWeek3');
    } else if (stats.currentStreak < 40) {
      return t('motivationWeek6');
    } else {
      return t('motivationMaster');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.highlight]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.header}>{t('yourProgress')}</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="calendar"
                android_material_icon_name="calendar_today"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>{stats?.totalDays || 0}</Text>
              <Text style={styles.statLabel}>{t('totalDays')}</Text>
            </View>

            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="flame.fill"
                android_material_icon_name="local_fire_department"
                size={32}
                color={colors.secondary}
              />
              <Text style={styles.statValue}>{stats?.currentStreak || 0}</Text>
              <Text style={styles.statLabel}>{t('currentStreak')}</Text>
            </View>

            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="trophy.fill"
                android_material_icon_name="emoji_events"
                size={32}
                color={colors.accent}
              />
              <Text style={styles.statValue}>{stats?.longestStreak || 0}</Text>
              <Text style={styles.statLabel}>{t('longestStreak')}</Text>
            </View>

            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="target"
                android_material_icon_name="track_changes"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>{getChallengeCompletion()}%</Text>
              <Text style={styles.statLabel}>{t('challengeProgress')}</Text>
            </View>
          </View>

          <View style={styles.motivationCard}>
            <Text style={styles.motivationTitle}>{t('keepGoing')}</Text>
            <Text style={styles.motivationText}>
              {getMotivationMessage()}
            </Text>
          </View>

          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>{t('practiceInsights')}</Text>
            <View style={styles.insightRow}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.insightText}>
                {t('consistencyKey')}
              </Text>
            </View>
            <View style={styles.insightRow}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
                size={20}
                color={colors.secondary}
              />
              <Text style={styles.insightText}>
                {t('neuralPathways')}
              </Text>
            </View>
            <View style={styles.insightRow}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
                size={20}
                color={colors.accent}
              />
              <Text style={styles.insightText}>
                {t('dailyCompounds')}
              </Text>
            </View>
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
    marginBottom: 24,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  motivationCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  motivationTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  motivationText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    textAlign: 'center',
  },
  insightCard: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  insightText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
});
