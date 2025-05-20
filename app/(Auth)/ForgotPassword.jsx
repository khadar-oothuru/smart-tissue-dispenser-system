import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import config from '../../components/config';
import { useThemeContext } from '../../context/ThemeContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { themeColors } = useThemeContext();
  const { background, text, primary, border } = themeColors;
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${config.API_URL}/api/auth/forgot/`, { email });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {/* Back icon */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={primary} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: primary }]}>Forgot Password</Text>

      <TextInput
        style={[styles.input, { borderColor: border, color: text }]}
        placeholder="Enter your registered email"
        placeholderTextColor={text}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Hide send button if message is shown */}
      {!message && (
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: email ? primary : '#999' },
          ]}
          onPress={handleSubmit}
          disabled={!email}
        >
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      )}

      {message && (
        <>
          <Text style={[styles.success, { color: 'green' }]}>{message}</Text>
          <TouchableOpacity
            onPress={handleGoBack}
            style={[styles.backAfterSuccess, { backgroundColor: primary }]}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backAfterSuccess: {
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  success: {
    marginTop: 20,
    textAlign: 'center',
  },
});
