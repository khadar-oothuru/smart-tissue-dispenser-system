import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";





export default function Home() {
  const { setLoggedIn } = useAuth();
  const { logout } = useAuth();
  const router = useRouter();

  // const logout = () => {
  //   setLoggedIn(false);
  //   router.replace("Login");
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Home</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
