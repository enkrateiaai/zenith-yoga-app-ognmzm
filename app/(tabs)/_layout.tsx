
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: 'Start',
    },
    {
      name: 'challenge',
      route: '/(tabs)/challenge',
      icon: 'target',
      label: 'Challenge',
    },
    {
      name: 'youtube',
      route: '/(tabs)/youtube',
      icon: 'play',
      label: 'YouTube',
    },
    {
      name: 'live',
      route: '/(tabs)/live',
      icon: 'radio',
      label: 'Live',
    },
    {
      name: 'subscription',
      route: '/(tabs)/subscription',
      icon: 'star',
      label: 'Abo',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="challenge" name="challenge" />
        <Stack.Screen key="stats" name="stats" />
        <Stack.Screen key="settings" name="settings" />
        <Stack.Screen key="youtube" name="youtube" />
        <Stack.Screen key="live" name="live" />
        <Stack.Screen key="subscription" name="subscription" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
