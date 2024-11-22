import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FishImage from '../../components/ui/FishImage';

export function StackWelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <FishImage />
      {/* <Image
        source={require('../../assets/icons/fish.png')} // Make sure to add your fish image to assets
        style={styles.fishImage}
      /> */}
      <Text style={styles.title}>Welcome to the{'\n'}WORLD OF BASS FISH</Text>
      <Text style={styles.subtitle}>
        Discover interesting facts about bass, take quizzes, and share your
        knowledge with friends.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TabNavigation')}>
        <Text style={styles.buttonText}>Let's go!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fishImage: {
    width: 200,
    height: 200,
    marginTop: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E6B8C',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#1E6B8C',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StackWelcomeScreen;
