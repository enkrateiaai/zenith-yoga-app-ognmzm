
import React from 'react';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  return (
    <NativeTabs
      backBehavior="history"
      tabBarActiveTintColor={colors.primary}
      tabBarInactiveTintColor={colors.textSecondary}
    >
      <NativeTabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => ({ sfSymbol: 'house.fill', hierarchicalColor: color }),
        }}
      />
      <NativeTabs.Screen
        name="challenge"
        options={{
          title: 'Challenge',
          tabBarIcon: ({ color }) => ({ sfSymbol: 'target', hierarchicalColor: color }),
        }}
      />
      <NativeTabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => ({ sfSymbol: 'chart.bar.fill', hierarchicalColor: color }),
        }}
      />
      <NativeTabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => ({ sfSymbol: 'gearshape.fill', hierarchicalColor: color }),
        }}
      />
    </NativeTabs>
  );
}
