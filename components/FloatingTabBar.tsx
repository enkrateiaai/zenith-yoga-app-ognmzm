
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
}

export default function FloatingTabBar({ tabs }: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    return pathname.startsWith(route);
  };

  const getIconName = (iconName: string) => {
    const iconMap: { [key: string]: { ios: string; android: string } } = {
      home: { ios: 'house.fill', android: 'home' },
      target: { ios: 'target', android: 'track_changes' },
      'bar-chart': { ios: 'chart.bar.fill', android: 'bar_chart' },
      settings: { ios: 'gearshape.fill', android: 'settings' },
    };
    return iconMap[iconName] || { ios: iconName, android: iconName };
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const active = isActive(tab.route);
            const icons = getIconName(tab.icon);
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tab}
                onPress={() => router.push(tab.route as any)}
                activeOpacity={0.7}
              >
                <IconSymbol
                  ios_icon_name={icons.ios}
                  android_material_icon_name={icons.android}
                  size={24}
                  color={active ? colors.primary : colors.text}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingHorizontal: 20,
  },
  blurContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
