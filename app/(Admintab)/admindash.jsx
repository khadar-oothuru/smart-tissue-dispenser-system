import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth } from "../../context/AuthContext"

const admindash = () => {
   const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <View>
      <Text>home</Text>


      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default admindash

const styles = StyleSheet.create({})