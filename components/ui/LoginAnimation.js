import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';

const LoginAnimation = () => {
  return (
    <LottieView
      source={require('../../assets/lottie/loginPersons.json')}
      style={styles.lottie}
      autoPlay
      loop
    />
  );
};

export default LoginAnimation;

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 250,
  },
});
