// components/CustomTabBar.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useRouter, usePathname } from "expo-router";
import { useThemeContext } from "../context/ThemeContext";  

export default function CustomTabBar({ tabs }) {
 
  const { themeColors } = useThemeContext();  
  const { background, text, primary } = themeColors;

  const router = useRouter();  
  const pathname = usePathname();  

  return (
    <Animated.View style={[styles.tabContainer, { backgroundColor: background }]}>
      {tabs.map((tab) => {
        
        const isFocused = pathname.includes(tab.name);

        const scale = useSharedValue(isFocused ? 1.2 : 1); 
        const circleScale = useSharedValue(isFocused ? 1 : 0);  

        React.useEffect(() => {
          scale.value = withSpring(isFocused ? 1.2 : 1, {
            damping: 12,
            mass: 0.5,
            stiffness: 120,
          });
          circleScale.value = withSpring(isFocused ? 1 : 0, {
            damping: 15,
            mass: 0.5,
            stiffness: 100,
          });
        }, [isFocused]);

        // Animated styles for smooth transformations
        const animatedIconStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
        }));

        const animatedCircleStyle = useAnimatedStyle(() => ({
          transform: [{ scale: circleScale.value }],
          opacity: circleScale.value,
        }));

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.replace(`${tab.name}`)} 
            style={styles.tabButton}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
          
              <Animated.View style={[styles.circle, { backgroundColor: primary }, animatedCircleStyle]} />
              <Animated.View style={animatedIconStyle}>
                <Ionicons
                  name={tab.icon}
                  size={26}
                  color={isFocused ? background : text}  
                />
              </Animated.View>
            </View>
            
            {!isFocused && (
              <Text style={[styles.tabLabel, { color: text }]}>{tab.label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
  
    bottom: Platform.OS === "android" ?10 : 20,

    left: 20,
    right: 20,
    height: 75,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 6,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  circle: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: -1,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: "700",
  },
});
