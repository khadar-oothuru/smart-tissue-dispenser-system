import React, { createContext, useContext, useState, useEffect } from 'react';
import { AsyncStorage, View } from 'react-native'; // For storing JWT tokens
import { useRouter } from 'expo-router';
import { Text } from '@react-navigation/elements';

// Create the AuthContext
const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [accessToken, setAccessToken] = useState(null); // Store access token
  const [refreshToken, setRefreshToken] = useState(null); // Store refresh token
  const [loading, setLoading] = useState(true); // Loading state

  const router = useRouter();

  useEffect(() => {
    // Fetch auth details from AsyncStorage
    const fetchAuthDetails = async () => {
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedAccessToken && storedUser) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        setUser(JSON.parse(storedUser));
      }

      setLoading(false); // Set loading to false after fetching auth details
    };

    fetchAuthDetails();
  }, []);

  // Handle login
  const login = async (access, refresh, user) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    setUser(user);

    // Store tokens and user info for persistence
    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    router.replace('Home'); // Redirect to Home after login
  };

  // Handle logout
  const logout = async () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    // Clear stored tokens and user info
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');

    router.replace('Login'); // Redirect to Login after logout
  };

  // If data is still loading, render a loading state
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Example Loading Component for React Native
const LoadingComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
  </View>
);
