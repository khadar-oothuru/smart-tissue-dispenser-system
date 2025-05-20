import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";

const CustomDrawer = (props) => {
  const { logout } = useAuth();
  const { theme, setTheme, isDark, themeColors } = useThemeContext();

  const styles = getStyles(themeColors);

  const handleThemeChange = (value) => {
    setTheme(value);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Theme Switch</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Dark Mode</Text>
          <Switch
            value={theme === "dark" || (theme === "system" && isDark)}
            onValueChange={(val) => handleThemeChange(val ? "dark" : "light")}
            trackColor={{ false: "#767577", true: themeColors.primary }}
            thumbColor={isDark ? themeColors.primary : "#f4f3f4"}
          />
        </View>

        <Text style={styles.sectionTitle}>Theme Settings</Text>
        {["light", "dark", "system"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.themeOption,
              theme === option && styles.selectedOption,
            ]}
            onPress={() => handleThemeChange(option)}
          >
            {option === "light" && (
              <MaterialIcons
                name="lightbulb-outline"
                size={20}
                color={theme === option ? themeColors.primary : themeColors.text}
              />
            )}
            {option === "dark" && (
              <Ionicons
                name="moon"
                size={20}
                color={theme === option ? themeColors.primary : themeColors.text}
              />
            )}
            {option === "system" && (
              <MaterialIcons
                name="settings"
                size={20}
                color={theme === option ? themeColors.primary : themeColors.text}
              />
            )}
            <Text
              style={[
                styles.themeOptionText,
                theme === option && styles.selectedText,
              ]}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 10,
      backgroundColor: theme.background,
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: theme.border || "#ddd",
    },
    headerTitle: {
      color: theme.heading,
      fontSize: 18,
      fontWeight: "bold",
    },
    content: {
      padding: 20,
      paddingBottom: 100,
    },
    sectionTitle: {
      color: theme.heading,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 12,
    },
    toggleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      backgroundColor: theme.inputbg,
      borderRadius: 10,
      padding: 15,
    },
    toggleLabel: {
      color: theme.heading,
      fontSize: 15,
    },
    themeOption: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: theme.inputbg,
      marginBottom: 10,
    },
    themeOptionText: {
      marginLeft: 10,
      fontSize: 15,
      color: theme.text,
    },
    selectedOption: {
      borderColor: theme.primary,
      borderWidth: 1,
    },
    selectedText: {
      color: theme.primary,
    },
    footer: {
      marginTop: 120,
      borderTopWidth: 1,
      borderColor: theme.border || "#ddd",
      padding: 20,
      backgroundColor: theme.background,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#e74c3c",
      padding: 12,
      borderRadius: 8,
      justifyContent: "center",
    },
    logoutText: {
      color: "#fff",
      fontSize: 16,
      marginLeft: 10,
    },
  });
