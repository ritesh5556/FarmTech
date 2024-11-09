import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Leaf, CloudSun, BarChart3, Tractor, Home, Camera, LayoutDashboard, User } from 'lucide-react-native';
import NavBar from "../common/NavBar";

const FarmCard = ({ title, description, Icon }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.cardIconContainer}>
      <Icon size={24} color="#FFFFFF" />
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </TouchableOpacity>
);

export default function HomePage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Leaf size={32} color="#4CAF50" />
          <Text style={styles.logoText}>FarmTech</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome to FarmTech</Text>
        <Text style={styles.subText}>Your smart farming companion</Text>
        <View style={styles.cardContainer}>
          <FarmCard
            title="Crop Health"
            description="Monitor your crop health with AI-powered insights"
            Icon={Leaf}
          />
          <FarmCard
            title="Weather Forecast"
            description="Get accurate weather predictions for your farm"
            Icon={CloudSun}
          />
          <FarmCard
            title="Market Prices"
            description="Stay updated with real-time market prices for your produce"
            Icon={BarChart3}
          />
          <FarmCard
            title="Equipment Management"
            description="Track and maintain your farming equipment efficiently"
            Icon={Tractor}
          />
        </View>
        <Image
          source={{ uri: "/placeholder.svg?height=200&width=400" }}
          style={styles.bannerImage}
        />
      </ScrollView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Success')}>
          <Home size={24} color="#4CAF50" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('CameraPage')} >
          <Camera size={24} color="#8BC34A" />
          <Text style={styles.tabLabel}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Dashboard')}>
          <LayoutDashboard size={24} color="#8BC34A" />
          <Text style={styles.tabLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
          <User size={24} color="#8BC34A" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 8,
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2E7D32',
  },
  subText: {
    fontSize: 16,
    marginBottom: 24,
    color: '#558B2F',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIconContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2E7D32',
  },
  cardDescription: {
    fontSize: 12,
    color: '#558B2F',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 24,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    height: 60,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#4CAF50',
  },
});