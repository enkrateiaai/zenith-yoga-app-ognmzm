
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
import { getStoredData, updateChallengeProgress, UserStats } from '@/utils/storage';
import { IconSymbol } from '@/components/IconSymbol';
import { t } from '@/data/translations';

export default function ChallengeScreen() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const daysPerPage = 20;
  const totalPages = 2;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getStoredData();
    setStats(data);
  };

  const handleDayToggle = async (dayIndex: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const updatedData = await updateChallengeProgress(dayIndex);
    setStats(updatedData);
  };

  const getCompletedDays = () => {
    return stats?.challengeProgress.filter(d => d).length || 0;
  };

  const getMilestoneStatus = (milestone: number) => {
    const completed = getCompletedDays();
    return completed >= milestone;
  };

  const renderDayGrid = () => {
    if (!stats) return null;

    const startIndex = currentPage * daysPerPage;
    const endIndex = Math.min(startIndex + daysPerPage, 40);
    const days = [];

    for (let i = startIndex; i < endIndex; i++) {
      const isCompleted = stats.challengeProgress[i];
      const isMilestone = i === 6 || i === 20 || i === 39;

      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dayBox,
            isCompleted && styles.dayBoxCompleted,
            isMilestone && styles.dayBoxMilestone,
          ]}
          onPress={() => handleDayToggle(i)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.dayText,
              isCompleted && styles.dayTextCompleted,
            ]}
          >
            {i + 1}
          </Text>
          {isMilestone && (
            <IconSymbol
              ios_icon_name="star.fill"
              android_material_icon_name="star"
              size={12}
              color={isCompleted ? colors.card : colors.accent}
              style={styles.milestoneIcon}
            />
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.highlight]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.header}>{t('challengeTitle')}</Text>
          
          <View style={styles.progressCard}>
            <Text style={styles.progressText}>
              {getCompletedDays()} / 40 {t('days')}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(getCompletedDays() / 40) * 100}%` },
                ]}
              />
            </View>
          </View>

          <View style={styles.milestonesCard}>
            <Text style={styles.milestonesTitle}>{t('milestones')}</Text>
            <View style={styles.milestonesRow}>
              <View style={styles.milestoneItem}>
                <IconSymbol
                  ios_icon_name={getMilestoneStatus(7) ? 'checkmark.circle.fill' : 'circle'}
                  android_material_icon_name={getMilestoneStatus(7) ? 'check_circle' : 'radio_button_unchecked'}
                  size={24}
                  color={getMilestoneStatus(7) ? colors.primary : colors.textSecondary}
                />
                <Text style={styles.milestoneText}>{t('day')} 7</Text>
              </View>
              <View style={styles.milestoneItem}>
                <IconSymbol
                  ios_icon_name={getMilestoneStatus(21) ? 'checkmark.circle.fill' : 'circle'}
                  android_material_icon_name={getMilestoneStatus(21) ? 'check_circle' : 'radio_button_unchecked'}
                  size={24}
                  color={getMilestoneStatus(21) ? colors.secondary : colors.textSecondary}
                />
                <Text style={styles.milestoneText}>{t('day')} 21</Text>
              </View>
              <View style={styles.milestoneItem}>
                <IconSymbol
                  ios_icon_name={getMilestoneStatus(40) ? 'checkmark.circle.fill' : 'circle'}
                  android_material_icon_name={getMilestoneStatus(40) ? 'check_circle' : 'radio_button_unchecked'}
                  size={24}
                  color={getMilestoneStatus(40) ? colors.accent : colors.textSecondary}
                />
                <Text style={styles.milestoneText}>{t('day')} 40</Text>
              </View>
            </View>
          </View>

          <View style={styles.gridContainer}>
            <View style={styles.dayGrid}>
              {renderDayGrid()}
            </View>
          </View>

          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[
                styles.pageButton,
                currentPage === 0 && styles.pageButtonActive,
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setCurrentPage(0);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.pageButtonText,
                  currentPage === 0 && styles.pageButtonTextActive,
                ]}
              >
                {t('days1to20')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.pageButton,
                currentPage === 1 && styles.pageButtonActive,
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setCurrentPage(1);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.pageButtonText,
                  currentPage === 1 && styles.pageButtonTextActive,
                ]}
              >
                {t('days21to40')}
              </Text>
            </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  progressText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  progressBar: {
    height: 12,
    backgroundColor: colors.background,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  milestonesCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  milestonesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  milestonesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  milestoneItem: {
    alignItems: 'center',
    gap: 4,
  },
  milestoneText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  gridContainer: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayBox: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.textSecondary,
  },
  dayBoxCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayBoxMilestone: {
    borderColor: colors.accent,
    borderWidth: 3,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  dayTextCompleted: {
    color: colors.card,
  },
  milestoneIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  paginationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  pageButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.textSecondary,
  },
  pageButtonActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  pageButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  pageButtonTextActive: {
    color: colors.card,
  },
});
