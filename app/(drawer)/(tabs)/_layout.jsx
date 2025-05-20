// app/(drawer)/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import CustomTabBar from "../../../components/CustomTabBar";
import SmartHeader from "../../../components/SmartHeader";
import { View } from "react-native";

const tabConfig = [
  { name: "Home", icon: "home-outline", label: "Home" },
  { name: "DeviceList", icon: "search-outline", label: "Devices" },
  { name: "Demo", icon: "flash-outline", label: "Demo" },
  { name: "profile", icon: "person-outline", label: "Profile" },
];

export default function TabLayout() {
  return (
    <>
      <SmartHeader />

      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />

        <CustomTabBar tabs={tabConfig} />
      </View>
    </>
  );
}
