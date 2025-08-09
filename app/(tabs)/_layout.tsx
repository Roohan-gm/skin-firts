// app/(tabs)/_layout.tsx
import React, { FC } from 'react';
import { Tabs } from 'expo-router';
import { ColorValue, View } from 'react-native';
import { HomeIcon, ChatIcon, PersonIcon, CalendarIcon } from '../../components/icons';

type TabIconProps = {
  Icon: FC<{ color?: ColorValue; size?: number }>;
  color: ColorValue;
  size?: number;
};

const TabIcon: FC<TabIconProps> = ({ Icon, color, size = 24 }) => (
  <View className="items-center justify-center">
    <Icon color={color} size={size} />
  </View>
);

const TabsLayout = () => (
  <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#00278C',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarStyle: {
        backgroundColor: '#2260FF',
        height: 48,
        borderRadius: 24,
        marginBottom: 19,
        marginHorizontal: 32,
        borderTopWidth: 0,
        position:'absolute'
      },
      tabBarItemStyle: {
        flex: 1, 
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    }}>
    <Tabs.Screen
      name="home"
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color }) => <TabIcon Icon={HomeIcon} color={color} size={23} />,
      }}
    />
    <Tabs.Screen
      name="message"
      options={{
        title: 'message',
        headerShown: false,
        tabBarIcon: ({ color }) => <TabIcon Icon={ChatIcon} color={color} size={24}/>,
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({ color }) => <TabIcon Icon={PersonIcon} color={color} size={21}/>,
      }}
    />
    <Tabs.Screen
      name="appointment"
      options={{
        title: 'appointment',
        headerShown: false,
        tabBarIcon: ({ color }) => <TabIcon Icon={CalendarIcon} color={color} size={21}/>,
      }}
    />
  </Tabs>
);

export default TabsLayout;
