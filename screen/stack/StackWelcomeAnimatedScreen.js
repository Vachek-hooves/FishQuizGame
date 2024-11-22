import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const StackWelcomeAnimatedScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../../assets/lottie/TransparentAquarium.json')}
          // source={require('../../assets/lottie/camera.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </View>
  );
};

export default StackWelcomeAnimatedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieContainer: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  lottie: {
    width: '100%',
    height: 200,
  },
});
