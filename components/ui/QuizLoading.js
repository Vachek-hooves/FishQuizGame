import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const QuizLoading = () => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#E6F3F8', '#003399']}
      style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/lottie/fishSiluet.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.loadingText}>Preparing Your Quiz...</Text>
      </View>
    </LinearGradient>
  );
};

export default QuizLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 36,
    fontWeight: '600',
    color: '#003399',
    textAlign: 'center',
  },
});
