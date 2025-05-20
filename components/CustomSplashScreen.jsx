import { useEffect } from 'react';
import { StyleSheet, Animated, Easing, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from "../context/AuthContext"

export default function CustomSplashScreen() {
  const router = useRouter();
  const { accessToken, loading, user } = useAuth();

  const scaleAnim = new Animated.Value(0.8);
  const opacityAnim = new Animated.Value(0);

  useEffect(() => {
  Animated.parallel([
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }),
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }),
  ]).start();

  const timer = setTimeout(() => {
    if (!loading) {
      if (accessToken && user?.role === 'admin') {
        router.replace('admindash');
      } else if (accessToken) {
        router.replace('Home');
      } else {
        router.replace('Login');
      }
    }
  }, 3000);

  return () => clearTimeout(timer);
}, [accessToken, user, loading]);

  return (
    <LinearGradient colors={['#0052ff', '#00d4ff']} style={styles.container}>
      <Animated.Image
        source={require('../assets/images/splash.gif')}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: opacityAnim,
          },
        ]}
      >
        FlushAlert
      </Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});
