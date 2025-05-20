import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import { useThemeContext } from "../context/ThemeContext";  // Importing theme context

const SmartHeader = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const { themeColors } = useThemeContext();  // Accessing dynamic theme colors
  const { background, text, primary } = themeColors;

  const handleNotificationPress = () => {
    router.push("/notifications");
  };

  const handleDrawerOpen = () => {
    navigation.openDrawer?.();
  };

  return (
    <View
      style={[
        styles.headerContainer,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10, backgroundColor: background },
      ]}
    >
      <View style={styles.userInfoContainer}>
        <View style={[styles.profileImageContainer, { borderColor: primary }]}>
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341",
            }}
            style={styles.profileImage}
          />
        </View>

        <View>
          <Text style={[styles.greetingText, { color: text }]}>Good morning 👋</Text>
          <Text style={[styles.userName, { color: text }]}>John Williams</Text>
        </View>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleNotificationPress}>
          <Ionicons name="notifications-outline" size={28} color={text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDrawerOpen}>
          <Ionicons name="menu-outline" size={35} color={text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight - 50 : -0,
    
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  greetingText: {
    fontSize: 13,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 16,
  },
});

export default SmartHeader;
