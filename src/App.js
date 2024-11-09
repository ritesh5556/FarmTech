import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LandingPage from './screens/core/Auth/LandingPage';
import LoginPage from './screens/core/Auth/LoginScreen';
import Signup from './screens/core/Auth/Singnup';
import HomePage from './screens/core/HomePage';
import Dashboard from './screens/core/Dashboard';
import Profile from './screens/core/Profile';
import CameraPage from './screens/core/CameraPage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token); // Check if user is logged in
    };

    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'HomePage' : 'Landing'}>
        <Stack.Screen 
          name="Landing" 
          component={LandingPage} 
          options={{ headerShown: false }} // Disable header for LandingPage
        />
        <Stack.Screen 
          name="Login" 
          component={LoginPage} 
          options={{ headerShown: false }} // Disable header for LoginPage
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ headerShown: false }} // Disable header for Signup
        />
        <Stack.Screen name="Success" component={HomePage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
