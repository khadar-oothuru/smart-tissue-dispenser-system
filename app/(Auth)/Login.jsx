// Login.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../components/config";
import CustomInput from "../../components/CustomInput";
import GoogleSignInButton from "../../components/GoogleSignInButton";

// const isWeb = Platform.OS === "web";
// let GoogleSignin, statusCodes;

// Dynamically import Google Sign-In SDK only if not running on web
// if (!isWeb) {
//   const googleSignInModule = require("@react-native-google-signin/google-signin");
//   GoogleSignin = googleSignInModule.GoogleSignin;
//   statusCodes = googleSignInModule.statusCodes;
// }

const API_URL = config.API_URL;

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const { themeColors } = useThemeContext();
  const { background, text, primary, border } = themeColors;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  // Configure Google Sign-In on component mount (only for mobile)
  // useEffect(() => {
  //   if (!isWeb) {
  //     GoogleSignin.configure({
  //       webClientId: config.GOOGLE_WEB_CLIENT_ID, // For Google token authentication (OAuth 2.0)
  //       androidClientId: config.GOOGLE_ANDROID_CLIENT_ID,
  //       offlineAccess: true, // To allow backend access for refresh tokens
  //     });
  //   }
  // }, []);

  // Handle login using email and password
  const handleLogin = async () => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login/`, {
        email,
        password,
      });

      const { access, refresh } = response.data;

      const userResponse = await axios.get(`${API_URL}/api/auth/user/`, {
        headers: { Authorization: `Bearer ${access}` },
      });

      const user = userResponse.data;
      await AsyncStorage.multiSet([
        ["accessToken", access],
        ["refreshToken", refresh],
        ["user", JSON.stringify(user)],
      ]);

      login(access, refresh, user);
      router.replace(user.role === "admin" ? "admindash" : "Home");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error. Please try again.");
    }
  };

  // Handle Google Sign-In authentication
  const handleGoogleSignIn = async () => {
    Alert.alert("Not implemented plz use Normal email password login");

    router.push("SignUp");

    //   // Google Sign-In not supported on web
    //   if (isWeb) {
    //     Alert.alert("Unsupported", "Google Sign-In is not supported on Web.");
    //     return;
    //   }
    //   try {
    //     // Ensure Google Play Services are available
    //     await GoogleSignin.hasPlayServices();
    //     // Start the sign-in process
    //     const userInfo = await GoogleSignin.signIn();
    //     // Extract idToken from the Google account
    //     const { idToken } = userInfo;
    //     // Send the idToken to backend to get JWT tokens
    //     const response = await axios.post(`${API_URL}/api/auth/google-login/`, {
    //       id_token: idToken,
    //     });
    //     const { access, refresh, user } = response.data;
    //     // Save tokens and user data locally
    //     await AsyncStorage.multiSet([
    //       ["accessToken", access],
    //       ["refreshToken", refresh],
    //       ["user", JSON.stringify(user)],
    //     ]);
    //     // Authenticate user in the context and navigate
    //     login(access, refresh, user);
    //     router.replace(user.role === "admin" ? "admindash" : "Home");
    //   } catch (error) {
    //     console.error("Google Sign-In Error:", error);
    //     // Handle common Google sign-in errors
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //       Alert.alert("Cancelled", "Google Sign-In was cancelled");
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //       Alert.alert("In Progress", "Google Sign-In is already in progress");
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //       Alert.alert("Play Services Error", "Play services not available");
    //     } else {
    //       Alert.alert("Login Failed", "Something went wrong with Google login");
    //     }
    //   }
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={[styles.title, { color: primary }]}>Sign In</Text>
      <Text style={[styles.subtitle, { color: text }]}>
        Welcome back! Login to your account
      </Text>

      <View style={styles.socialContainer}>
        {/* Google Sign-In button */}
        <GoogleSignInButton onPress={handleGoogleSignIn} />
      </View>

      <View style={styles.hrContainer}>
        <View style={[styles.hr, { borderColor: border }]} />
        <Text style={[styles.orText, { color: text }]}>Or</Text>
        <View style={[styles.hr, { borderColor: border }]} />
      </View>

      {error && <Text style={styles.errorText}>{error} </Text>}

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

      <TouchableOpacity onPress={() => router.push("ForgotPassword")}>
        <Text style={[styles.forgotText, { color: text }]}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: primary }]}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={[styles.signupText, { color: text }]}>
        Don’t have an account?{" "}
        <Text
          style={[styles.signupLink, { color: primary }]}
          onPress={() => router.push("SignUp")}
        >
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
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  hrContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  hr: {
    borderTopWidth: 1,
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    fontWeight: "500",
  },
  forgotText: {
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    padding: 16,
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
  },
  signupLink: {
    fontWeight: "600",
  },
});
