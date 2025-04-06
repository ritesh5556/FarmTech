import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env';
import { Leaf, Lock, Mail } from 'lucide-react-native';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('jwtToken', token);
    } catch (e) {
      console.error('Failed to save the token.', e);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      console.log('Attempting login to:', `${BASE_URL}/api/v1/auth/login`);
      console.log('With email:', email);

      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // First get the raw text to see what we're receiving
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let result;
      try {
        // Try to parse as JSON
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}...`);
      }

      if (response.ok) {
        if (result.token) {
          await storeToken(result.token);
          Alert.alert(
            'Success', 
            'Login successful!',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Success');
                }
              }
            ]
          );
        } else {
          throw new Error('No token received from server');
        }
      } else {
        throw new Error(result.message || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        stack: error.stack,
      });
      
      if (error.message.includes('Network request failed')) {
        Alert.alert(
          'Network Error',
          'Please check your internet connection and try again. If the problem persists, the server might be temporarily unavailable.'
        );
      } else if (error.message.includes('Server returned invalid JSON')) {
        Alert.alert(
          'Server Error',
          'The server returned an invalid response. Please try again later.'
        );
      } else {
        Alert.alert(
          'Error',
          error.message || 'Failed to login. Please try again.'
        );
      }
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Leaf size={40} color="#4CAF50" />
        <Text style={styles.logoText}>FarmTech</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>
        <View style={styles.inputContainer}>
          <Mail size={20} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Lock size={20} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupLink} onPress={handleSignUp}>
          <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupTextBold}>Sign up</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F0F4F0',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 10,
  },
  loginContainer: {
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  signupTextBold: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});