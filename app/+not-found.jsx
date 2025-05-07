import { Unmatched } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CustomUnmatched() {
  return (
    <View style={styles.container}>
      <Unmatched />
      <Text style={styles.text}>Oops! The page you are looking for doesn't exist.</Text>
      <Text style={styles.text}>Please check the URL or go back to the homepage.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
});
