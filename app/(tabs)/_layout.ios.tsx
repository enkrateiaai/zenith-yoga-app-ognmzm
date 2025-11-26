
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
          title: 'Start',
          tabBarIcon: ({ color }) => ({ sfSymbol: 'house.fill', hierarchicalColor: color }),
        }}
      />
      <NativeTabs.Screen
        name="challenge"
        options={{
          title: 'Challenge',
          tabBarIcon: ({ color }) => ({ sfSymbol: 'flame.fill', hierarchicalColor: color }),
        }}
      />
      <NativeTabs.Screen
        name="youtube"
        options={{
          title: 'The Tribe',
          tabBarIcon: ({ color }) => ({ sfSymbol: 'person.3.fill', hierarchicalColor: color }),
        }}
      />
      <NativeTabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ color }) => ({ sfSymbol: 'video.fill', hierarchicalColor: color }),
        }}
      />
      <NativeTabs.Screen
        name="subscription"
        options={{
          title: 'Abo',
          tabBarIcon: ({ color }) => ({ sfSymbol: 'crown.fill', hierarchicalColor: color }),
        }}
      />
      <NativeTabs.Screen
        name="stats"
        options={{
          title: 'Statistik',
          href: null,
          tabBarIcon: ({ color }) => ({ sfSymbol: 'chart.bar.fill', hierarchicalColor: color }),
        }}
      />
      <NativeTabs.Screen
        name="settings"
        options={{
          title: 'Einstellungen',
          href: null,
          tabBarIcon: ({ color }) => ({ sfSymbol: 'gearshape.fill', hierarchicalColor: color }),
        }}
      />
    </NativeTabs>
  );
}
