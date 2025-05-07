import { Stack } from 'expo-router';
import { useAuth } from "../context/AuthContext"

export default function Layout() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        user.role === 'admin' ? (
          <Stack.Screen name="AdminDashboard" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )
      ) : (
        <>
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </>
      )}
    </Stack>
  );
}
