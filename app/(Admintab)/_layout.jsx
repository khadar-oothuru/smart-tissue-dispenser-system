// app/(tabs)/_layout.js

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../themes/theme";
import CustomTabBar from "../../components/CustomTabBar";

export default function TabLayout() {
  const tabs = [
    {
      name: "admindash",
      label: "Dashboard",
      icon: "grid-outline",
    },
    {
      name: "DeviceList",
      label: "Devices",
      icon: "hardware-chip-outline",
    },
    {
      name: "Analytics",
      label: "Analytics",
      icon: "bar-chart-outline",
    },
    {
      name: "AdminSettings",
      label: "Settings",
      icon: "settings-outline",
    },
  ];

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.text,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            height: 0, // Hides default tab bar
          },
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTitleStyle: {
            color: COLORS.heading,
            fontWeight: "bold",
          },
        }}
      >
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.label,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={tab.icon} size={size} color={color} />
              ),
            }}
          />
        ))}
      </Tabs>

      <CustomTabBar tabs={tabs} />
    </>
  );
}
