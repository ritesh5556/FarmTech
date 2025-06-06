import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import {BASE_URL} from '@env'

const ACCOUNT_TYPE = {
  FARMER: 'Farmer',
  EXPERT: 'Expert',
};

function SignupForm() {
  const [formData, setFormData] = useState({
    accountType: ACCOUNT_TYPE.FARMER,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { accountType, firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async () => {
    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    try {
      console.log('Making API call to:', `${BASE_URL}/api/v1/auth/signup`);
      const requestData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
      };
      console.log('With data:', requestData);

      const response = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create account');
      }

      if (result.token) {
        // Successfully created account and got token
        Alert.alert(
          'Success', 
          'Account created successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Here you would typically navigate to the login screen
                // or store the token and navigate to the main app
                console.log('Success, token received:', result.token);
              }
            }
          ]
        );
      } else {
        throw new Error('No token received from server');
      }
      
    } catch (error) {
      console.error('Signup error details:', {
        message: error.message,
        stack: error.stack,
      });
      
      if (error.message.includes('Network request failed')) {
        Alert.alert(
          'Network Error',
          'Please check your internet connection and try again. If the problem persists, the server might be temporarily unavailable.'
        );
      } else {
        Alert.alert(
          'Error',
          error.message || 'Failed to create account. Please try again.'
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Role Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            accountType === ACCOUNT_TYPE.FARMER ? styles.activeButton : null,
          ]}
          onPress={() => handleOnChange('accountType', ACCOUNT_TYPE.FARMER)}
        >
          <Text style={styles.toggleText}>Farmer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            accountType === ACCOUNT_TYPE.EXPERT ? styles.activeButton : null,
          ]}
          onPress={() => handleOnChange('accountType', ACCOUNT_TYPE.EXPERT)}
        >
          <Text style={styles.toggleText}>Expert</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => handleOnChange('firstName', text)}
        />

        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => handleOnChange('lastName', text)}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => handleOnChange('email', text)}
        />

        <Text>Create Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={(text) => handleOnChange('password', text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.icon}>{showPassword ? <Icon name = "eye-slash" size={38} /> : <Icon name = "eye" size={38} />}</Text>
             {/* <Text style={styles.icon} > <Icon name = "circle-thin" size={38} /> </Text> */}
          </TouchableOpacity>
        </View>

        <Text>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
            value={confirmPassword}
            onChangeText={(text) => handleOnChange('confirmPassword', text)}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Text style={styles.icon}>{showConfirmPassword ? <Icon name = "eye-slash" size={38} /> : <Icon name = "eye" size={38} />}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleOnSubmit}>
          <Text style={styles.submitButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  toggleText: {
    color: '#ffffff',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
