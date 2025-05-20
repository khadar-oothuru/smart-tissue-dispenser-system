// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// const Home = () => {
//   const navigation = useNavigation();
//   const [userName, setUserName] = useState("Admin");
//   const [deviceStats, setDeviceStats] = useState({
//     total: 12,
//     active: 10,
//     alerts: 2,
//   });

//   const [recentAlerts, setRecentAlerts] = useState([
//     { id: '1', message: 'Low tissue alert from Device #5' },
//     { id: '2', message: 'Device #8 went offline' },
//   ]);

//   useEffect(() => {
//     // WebSocket logic placeholder
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.welcome}>Hello, {userName} 👋</Text>

//       {/* Device Stats */}
//       <View style={styles.sectionCard}>
//         <Text style={styles.sectionTitle}>Device Summary</Text>
//         <View style={styles.statsRow}>
//           <StatBox icon="hardware-chip" color="#4F46E5" label="Total Devices" value={deviceStats.total} />
//           <StatBox icon="wifi" color="#22C55E" label="Active Devices" value={deviceStats.active} />
//           <StatBox icon="alert-circle" color="#EF4444" label="Today's Alerts" value={deviceStats.alerts} />
//         </View>
//       </View>

//       {/* Quick Actions */}
//       <View style={styles.sectionCard}>
//         <Text style={styles.sectionTitle}>Quick Actions</Text>
//         <View style={styles.actionsGrid}>
//           <QuickAction icon={<MaterialCommunityIcons name="server" size={24} color="#1D4ED8" />} label="Devices" onPress={() => navigation.navigate('Devices')} />
//           <QuickAction icon={<MaterialCommunityIcons name="chart-bar" size={24} color="#1D4ED8" />} label="Analytics" onPress={() => navigation.navigate('Analytics')} />
//           <QuickAction icon={<Ionicons name="notifications" size={24} color="#1D4ED8" />} label="Alerts" onPress={() => navigation.navigate('Notifications')} />
//           <QuickAction icon={<Ionicons name="person" size={24} color="#1D4ED8" />} label="Profile" onPress={() => navigation.navigate('Profile')} />
//         </View>
//       </View>

//       {/* Alerts Section */}
//       <View style={styles.sectionCard}>
//         <Text style={styles.sectionTitle}>Recent Alerts</Text>
//         <FlatList
//           data={recentAlerts}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.alertCard}>
//               <FontAwesome5 name="bell" size={16} color="#DC2626" />
//               <Text style={styles.alertText}>{item.message}</Text>
//             </View>
//           )}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// // Reusable Components
// const StatBox = ({ icon, color, label, value }) => (
//   <View style={styles.statBox}>
//     <Ionicons name={icon} size={24} color={color} />
//     <Text style={styles.statNumber}>{value}</Text>
//     <Text style={styles.statLabel}>{label}</Text>
//   </View>
// );

// const QuickAction = ({ icon, label, onPress }) => (
//   <TouchableOpacity style={styles.quickAction} onPress={onPress}>
//     {icon}
//     <Text style={styles.quickText}>{label}</Text>
//   </TouchableOpacity>
// );

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F3F4F6',
//     padding: 20,
//     flexGrow: 1,
//   },
//   welcome: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#111827',
//   },
//   sectionCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 12,
//   },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   statBox: {
//     alignItems: 'center',
//     width: '30%',
//   },
//   statNumber: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 6,
//     color: '#111827',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: 2,
//   },
//   actionsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 10,
//   },
//   quickAction: {
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     padding: 12,
//     width: '47%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 1,
//     marginBottom: 12,
//   },
//   quickText: {
//     marginLeft: 10,
//     fontSize: 15,
//     color: '#1F2937',
//     fontWeight: '500',
//   },
//   alertCard: {
//     backgroundColor: '#FEE2E2',
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 8,
//   },
//   alertText: {
//     marginLeft: 10,
//     fontSize: 14,
//     color: '#B91C1C',
//   },
// });

// export default Home;

import { View, Text } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home