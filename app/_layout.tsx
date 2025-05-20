


import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { ThemeProvider, useThemeContext } from "../context/ThemeContext";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";

function Layout() {
  const { user, loading } = useAuth();
  const { themeColors } = useThemeContext();
  const { background, text } = themeColors;

  useEffect(() => {}, [background]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: background,
        }}
      >
        <ActivityIndicator size="large" color={text} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        style={background === "#090b0a" ? "light" : "dark"} // Set status bar color dynamically
      />
      <View style={{ flex: 1, backgroundColor: background }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            {user ? (
              user.role === "admin" ? (
                <Stack.Screen name="(Admintab)" />
              ) : (
                <Stack.Screen name="(drawer)" />
              )
            ) : (
              <>
                <Stack.Screen name="Login" />
                <Stack.Screen name="SignUp" />
              </>
            )}
          </Stack>
        </SafeAreaView>
      </View>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </ThemeProvider>
  );
}



