
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.highlight]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.header}>Your Progress</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="calendar"
                android_material_icon_name="calendar_today"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>{stats?.totalDays || 0}</Text>
              <Text style={styles.statLabel}>Total Days</Text>
            </View>

            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="flame.fill"
                android_material_icon_name="local_fire_department"
                size={32}
                color={colors.secondary}
              />
              <Text style={styles.statValue}>{stats?.currentStreak || 0}</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
            </View>

            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="trophy.fill"
                android_material_icon_name="emoji_events"
                size={32}
                color={colors.accent}
              />
              <Text style={styles.statValue}>{stats?.longestStreak || 0}</Text>
              <Text style={styles.statLabel}>Longest Streak</Text>
            </View>

            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="target"
                android_material_icon_name="track_changes"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>{getChallengeCompletion()}%</Text>
              <Text style={styles.statLabel}>Challenge Progress</Text>
            </View>
          </View>

          <View style={styles.motivationCard}>
            <Text style={styles.motivationTitle}>Keep Going! 💪</Text>
            <Text style={styles.motivationText}>
              {stats?.currentStreak === 0
                ? 'Start your journey today! Every expert was once a beginner.'
                : stats?.currentStreak < 7
                ? 'Great start! The first week is the hardest. You&apos;re building momentum!'
                : stats?.currentStreak < 21
                ? 'Amazing progress! You&apos;re forming a lasting habit. Keep it up!'
                : stats?.currentStreak < 40
                ? 'Incredible dedication! You&apos;re transforming your life one day at a time.'
                : 'You&apos;re a meditation master! Your consistency is truly inspiring.'}
            </Text>
          </View>

          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Practice Insights</Text>
            <View style={styles.insightRow}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.insightText}>
                Consistency is key to transformation
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
                40 days creates lasting neural pathways
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
                Daily practice compounds over time
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
