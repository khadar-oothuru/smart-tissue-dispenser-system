import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import config from "../../components/config";
import CustomInput from "../../components/CustomInput";
import { useThemeContext } from "../../context/ThemeContext";

const API_URL = config.API_URL;

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const { themeColors } = useThemeContext();
  const { background, text, primary } = themeColors;

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    const userData = { username, email, password, role: "user" };

    try {
      const response = await fetch(`${API_URL}/api/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Alert.alert("Success", "Account created!");
        router.push("Login");
      } else {
        const errorData = await response.json();
        const firstError = Object.values(errorData)[0];
        Alert.alert("Error", firstError[0] || "Something went wrong!");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to register. Please try again later.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      
      <Text style={[styles.signUpTitle, { color: primary }]}>Sign Up</Text>

      <Text style={[styles.subtitle, { color: text }]}>
        Create your new account
      </Text>

      <CustomInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        isFocused={isUsernameFocused}
        onFocus={() => setUsernameFocused(true)}
        onBlur={() => setUsernameFocused(false)}
      />

      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        isFocused={isEmailFocused}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
      />

      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        isFocused={isPasswordFocused}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
      />

      <TouchableOpacity
        style={[styles.registerButton, { backgroundColor: primary }]}
        onPress={handleRegister}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={[styles.loginText, { color: text }]}>
        Already have an account?{" "}
        <Text
          style={[styles.loginLink, { color: primary }]}
          onPress={() => router.replace("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  signUpTitle: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  registerButton: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    textAlign: "center",
  },
  loginLink: {
    fontWeight: "600",
  },
});
