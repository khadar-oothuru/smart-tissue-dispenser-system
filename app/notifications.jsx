import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router"; 

export default function Notifications() {
  const router = useRouter(); 

  // Handle back navigation
  const handleBackPress = () => {
    router.replace("Home"); 
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          padding: 10,
        }}
        onPress={handleBackPress}
      >
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={{ fontSize: 20 }}>🔔 Notifications Page</Text>
    </View>
  );
}
