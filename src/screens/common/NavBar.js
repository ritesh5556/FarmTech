// components/NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing user token

const NavBar = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    // Remove user token or session data (if using AsyncStorage or any other method)
    await AsyncStorage.removeItem('userToken'); // Example if token is stored in AsyncStorage
    navigation.replace('Login'); // Navigate back to the login screen
  };

  return (
    <View style={styles.navBar}>
      <Text style={styles.logo}>FarmTech</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text style={styles.signOut}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signOut: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NavBar;
