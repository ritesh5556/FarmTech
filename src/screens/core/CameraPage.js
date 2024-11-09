import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "@env";
import { Camera, Leaf, Send, Info } from 'lucide-react-native';

const CameraPage = ({ navigation }) => {
  const [photoUri, setPhotoUri] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const handleLaunchCamera = () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled the photo capture');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const { uri } = response.assets[0];
        setPhotoUri(uri);
      }
    });
  };

  const handleSave = async () => {
    if (!photoUri || !description) {
      Alert.alert('Incomplete', 'Please take a photo and add a description');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('jwtToken');

      if (!token) {
        Alert.alert('Error', 'No authentication token found.');
        return;
      }

      const formData = new FormData();
      formData.append('description', description);
      formData.append('photo', {
        uri: photoUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      setIsLoading(true); // Start the loader

      const response = await fetch(`${BASE_URL}/api/v1/image/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      setIsLoading(false); // Stop the loader

      if (response.ok) {
        Alert.alert('Success', 'Your crop photo has been saved successfully!');
        setPhotoUri(null);
        setDescription('');
      } else {
        Alert.alert('Error', result.message || 'Failed to save photo and description');
      }

    } catch (error) {
      setIsLoading(false); // Stop the loader in case of an error
      console.error('Error saving data:', error);
      Alert.alert('Error', 'An error occurred while saving your crop photo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Leaf size={24} color="#4CAF50" />
          <Text style={styles.headerText}>Crop Capture</Text>
        </View>

        <View style={styles.infoBox}>
          <Info size={20} color="#4CAF50" />
          <Text style={styles.infoText}>
            Take a clear photo of your crop and add a brief description. This helps our AI analyze your crop's health more accurately.
          </Text>
        </View>

        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Camera size={48} color="#4CAF50" />
            <Text style={styles.placeholderText}>No photo taken yet</Text>
          </View>
        )}

        <TouchableOpacity style={styles.cameraButton} onPress={handleLaunchCamera}>
          <Camera size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Describe your crop (e.g., growth stage, concerns)"
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity 
          style={[styles.saveButton, (!photoUri || !description) && styles.disabledButton]} 
          onPress={handleSave}
          disabled={!photoUri || !description}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" /> // Loader when saving
          ) : (
            <>
              <Send size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Save Crop Photo</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F0',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 10,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    color: '#1B5E20',
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  placeholderImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    marginTop: 10,
    color: '#4CAF50',
    fontSize: 16,
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#A5D6A7',
  },
  loadingText: { marginTop: 10, color: '#fff', fontSize: 16 },
});

export default CameraPage;
