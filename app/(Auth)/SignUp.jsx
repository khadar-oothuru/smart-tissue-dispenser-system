import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import COLORS from "../../themes/theme";

export default function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    const userData = {
      username: username,
      email: email,
      password: password,
      role: "user", // important for backend validation
    };

    try {
      const response = await fetch("http://10.0.53.177:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <View style={styles.container}>
      <Text style={styles.signUpTitle}>Sign Up</Text>
      <Text style={styles.subtitle}>Create your new account</Text>

      <TextInput
        style={[styles.input, isUsernameFocused && { borderColor: COLORS.primary }]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        onFocus={() => setUsernameFocused(true)}
        onBlur={() => setUsernameFocused(false)}
      />

      <TextInput
        style={[styles.input, isEmailFocused && { borderColor: COLORS.primary }]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
      />

      <TextInput
        style={[styles.input, isPasswordFocused && { borderColor: COLORS.primary }, { marginBottom: 40 }]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={() => router.back()}>
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
    backgroundColor: COLORS.background,
  },
  signUpTitle: {
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
  input: {
    backgroundColor: COLORS.inputbg,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 60,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
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
    color: COLORS.text,
  },
  loginLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
