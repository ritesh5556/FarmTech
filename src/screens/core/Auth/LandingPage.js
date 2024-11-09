import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Leaf, Users, MessageCircle, Send } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
// import {agriculture} from "../../../../assets/agriculture-background.jpg"
const agriculture = require("../../../../assets/agriculture.jpg");
const AGRI_IMAGE = Image.resolveAssetSource(agriculture).uri;
const expert = require("../../../../assets/expert.jpg")
const EXPERT_IMAGE = Image.resolveAssetSource(expert).uri;
const farm = require("../../../../assets/farm.jpg")
const FARM_IMAGE = Image.resolveAssetSource(farm).uri;





// import LoginPage from './LoginScreen';
// import Signup from './Singnup';

export default function LandingPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Leaf size={24} color="#4CAF50" />
            <Text style={styles.logoText}>FarmTech</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonOutlineText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonFilled} onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.buttonFilledText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: "https://images.app.goo.gl/gND9SRqL8fgGQe79A" }}
            style={styles.heroImage}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Empowering Farmers with AI and Technology</Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <FeatureCard
            icon={<Leaf size={40} color="#4CAF50" />}
            title="AI Crop Disease Detection"
            description="Detect and diagnose crop diseases early with our advanced AI technology."
            image= {AGRI_IMAGE}
          />
          <FeatureCard
            icon={<MessageCircle size={40} color="#FFA000" />}
            title="Expert Assistance"
            description="Get real-time advice from agricultural experts to optimize your farm's productivity."
            image= {EXPERT_IMAGE}
          />
          <FeatureCard
            icon={<Users size={40} color="#1976D2" />}
            title="Community & Knowledge Sharing"
            description="Connect with fellow farmers and share valuable insights and experiences."
            image= {FARM_IMAGE}
          />
        </View>

        {/* Testimonials Section */}
        <View style={styles.testimonialsSection}>
          <Text style={styles.sectionTitle}>What Our Users Say</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TestimonialCard
              name="John Doe"
              role="Corn Farmer"
              text="FarmTech has revolutionized the way I manage my crops. The AI disease detection has saved me thousands!"
            />
            <TestimonialCard
              name="Jane Smith"
              role="Organic Farmer"
              text="The expert assistance feature is like having a personal agronomist. It's invaluable for my organic farm."
            />
            <TestimonialCard
              name="Mike Johnson"
              role="Wheat Grower"
              text="The community on FarmTech is amazing. I've learned so much from other farmers and improved my yields significantly."
            />
          </ScrollView>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactForm}>
            <TextInput style={styles.input} placeholder="Name" />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Message" multiline numberOfLines={4} />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Users size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MessageCircle size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Send size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <Text style={styles.contactInfo}>
            Email: info@farmtech.com | Phone: (123) 456-7890
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ icon, title, description, image }) {
  return (
    <View style={styles.featureCard}>
      <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.featureImage} />
      <View style={styles.featureContent}>
        {icon}
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}



function TestimonialCard({ name, role, text }) {
  return (
    <View style={styles.testimonialCard}>
      <Text style={styles.testimonialText}>{text}</Text>
      <Text style={styles.testimonialName}>{name}</Text>
      <Text style={styles.testimonialRole}>{role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#4CAF50',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  buttonOutline: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 4,
    marginRight: 8,
  },
  buttonOutlineText: {
    color: '#4CAF50',
  },
  buttonFilled: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  buttonFilledText: {
    color: '#FFFFFF',
  },
  heroSection: {
    position: 'relative',
    height: 400,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FFA000',
    borderRadius: 4,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresSection: {
    padding: 16,
  },
  featureCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featureImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featureContent: {
    padding: 16,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#333333',
  },
  featureDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  testimonialsSection: {
    padding: 16,
    backgroundColor: '#E8F5E9',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  testimonialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    width: 300,
  },
  testimonialText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  testimonialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  testimonialRole: {
    fontSize: 14,
    color: '#666666',
  },
  contactSection: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  contactForm: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconButton: {
    marginHorizontal: 8,
  },
  contactInfo: {
    textAlign: 'center',
    color: '#666666',
  },
});