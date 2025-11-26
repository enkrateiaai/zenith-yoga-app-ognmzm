
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CheckInData {
  date: string;
  morningRoutine: boolean;
  meditation: boolean;
  eveningReflection: boolean;
}

export interface UserStats {
  totalDays: number;
  currentStreak: number;
  longestStreak: number;
  checkIns: CheckInData[];
  challengeStartDate: string | null;
  challengeProgress: boolean[];
}

const STORAGE_KEY = '@meditation_app_data';

export const getStoredData = async (): Promise<UserStats> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
  } catch (e) {
    console.error('Error reading stored data:', e);
  }
  
  return {
    totalDays: 0,
    currentStreak: 0,
    longestStreak: 0,
    checkIns: [],
    challengeStartDate: null,
    challengeProgress: Array(40).fill(false),
  };
};

export const saveData = async (data: UserStats): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

export const getTodayCheckIn = (checkIns: CheckInData[]): CheckInData | null => {
  const today = new Date().toISOString().split('T')[0];
  return checkIns.find(c => c.date === today) || null;
};

export const updateCheckIn = async (
  type: 'morningRoutine' | 'meditation' | 'eveningReflection'
): Promise<UserStats> => {
  const data = await getStoredData();
  const today = new Date().toISOString().split('T')[0];
  
  let todayCheckIn = data.checkIns.find(c => c.date === today);
  
  if (!todayCheckIn) {
    todayCheckIn = {
      date: today,
      morningRoutine: false,
      meditation: false,
      eveningReflection: false,
    };
    data.checkIns.push(todayCheckIn);
  }
  
  todayCheckIn[type] = !todayCheckIn[type];
  
  const allChecked = todayCheckIn.morningRoutine && todayCheckIn.meditation && todayCheckIn.eveningReflection;
  
  if (allChecked) {
    data.totalDays++;
    data.currentStreak = calculateCurrentStreak(data.checkIns);
    data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
  }
  
  await saveData(data);
  return data;
};

const calculateCurrentStreak = (checkIns: CheckInData[]): number => {
  const sortedCheckIns = [...checkIns]
    .filter(c => c.morningRoutine && c.meditation && c.eveningReflection)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sortedCheckIns.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < sortedCheckIns.length; i++) {
    const checkInDate = new Date(sortedCheckIns[i].date);
    checkInDate.setHours(0, 0, 0, 0);
    
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);
    
    if (checkInDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const updateChallengeProgress = async (dayIndex: number): Promise<UserStats> => {
  const data = await getStoredData();
  
  if (!data.challengeStartDate) {
    data.challengeStartDate = new Date().toISOString();
  }
  
  data.challengeProgress[dayIndex] = !data.challengeProgress[dayIndex];
  
  await saveData(data);
  return data;
};
