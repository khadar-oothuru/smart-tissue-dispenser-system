import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";

function Layout() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        user.role === "admin" ? (
          <Stack.Screen name="(Admin)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )
      ) : (
        <>
          <Stack.Screen name="Login" />
          <Stack.Screen name="SignUp" />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}
