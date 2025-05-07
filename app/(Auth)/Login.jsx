import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../themes/theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Updated import for AsyncStorage

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // Login function from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    try {
      // Send a POST request to your Django backend to get JWT tokens
      const response = await axios.post("http://10.0.53.177:8000/api/auth/login/", {
        email,
        password,
      });

      const { access, refresh } = response.data;

      // Fetch user details to check role
      const userResponse = await axios.get("http://10.0.53.177:8000/api/auth/user/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      const user = userResponse.data;

      // Store tokens and user info in AsyncStorage
      await AsyncStorage.setItem('accessToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Pass the data to context
      login(access, refresh, user);

      // Redirect to appropriate screen based on user role
      if (user.role === 'admin') {
        router.replace("AdminDashboard"); // Redirect to Admin Dashboard
      } else {
        router.replace("Home"); // Redirect to Home page
      }
    } catch (err) {
      setError("Invalid credentials or something went wrong");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signInTitle}>Sign In</Text>
      <Text style={styles.subtitle}>Welcome back! Login to your account</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={20} color="#3b5998" />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={20} color="#db4437" />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hrContainer}>
        <View style={styles.hr} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.hr} />
      </View>

      <TextInput
        style={[styles.input, isEmailFocused && { borderColor: COLORS.primary }]}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
      />

      <TextInput
        style={[styles.input, isPasswordFocused && { borderColor: COLORS.primary }]}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
      />

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don’t have an account?{" "}
        <Text style={styles.signupLink} onPress={() => router.push("SignUp")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  signInTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputbg,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  socialText: {
    marginLeft: 8,
    color: COLORS.heading,
    fontWeight: "500",
  },
  input: {
    backgroundColor: COLORS.inputbg,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 60,
  },
  forgotText: {
    color: COLORS.text,
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    textAlign: "center",
    color: COLORS.text,
  },
  signupLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  hrContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    color: COLORS.text,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
