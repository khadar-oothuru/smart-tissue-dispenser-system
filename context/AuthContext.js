import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Define platform-specific storage
const Storage =
  Platform.OS === 'web'
    ? {
        getItem: async (key) => localStorage.getItem(key),
        setItem: async (key, value) => localStorage.setItem(key, value),
        removeItem: async (key) => localStorage.removeItem(key),
      }
    : {
        getItem: AsyncStorage.getItem,
        setItem: AsyncStorage.setItem,
        removeItem: AsyncStorage.removeItem,
      };

// Create the AuthContext
const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchAuthDetails = async () => {
      try {
        const storedAccessToken = await Storage.getItem('accessToken');
        const storedRefreshToken = await Storage.getItem('refreshToken');
        const storedUser = await Storage.getItem('user');

        if (storedAccessToken && storedUser) {
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error fetching auth details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthDetails();
  }, []);

  const login = async (access, refresh, user) => {
    try {
      await Storage.setItem('accessToken', access);
      await Storage.setItem('refreshToken', refresh);
      await Storage.setItem('user', JSON.stringify(user));

      setAccessToken(access);
      setRefreshToken(refresh);
      setUser(user);

      router.replace('Home');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await Storage.removeItem('accessToken');
      await Storage.removeItem('refreshToken');
      await Storage.removeItem('user');

      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      router.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, loading }}>
      {loading ? <LoadingComponent /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
const LoadingComponent = () => <View />;
