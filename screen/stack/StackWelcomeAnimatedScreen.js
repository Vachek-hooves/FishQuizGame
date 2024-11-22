import React, { useEffect, useRef } from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const StackWelcomeAnimatedScreen = () => {
  const moveAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['lightblue','lightblue', '#93C5FD','#93C5FD', '#003399', '#003399']}
      start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0, 0.3,0.4, 0.5, 0.7, 0.9, 1]}
        style={styles.lottieContainer}
      >

          <Animated.Text 
            style={[
              styles.welcomeText,
              {
                transform: [{ translateY: moveAnim }],
              },
            ]}
          >
            <Text style={{fontSize: 32}}>Welcome to the </Text>
            {'\n'}
            <Text style={{fontSize:48}}>Fish Facts & Quiz</Text>
         
          </Animated.Text>
        <LottieView
          source={require('../../assets/lottie/TransparentAquarium.json')}
          // source={require('../../assets/lottie/camera.json')}
          autoPlay
          loop
          style={styles.lottie}
          />
          </LinearGradient>
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
    // paddingBottom: 50,
  },
  lottie: {
    width: '100%',
    height: 200,
    marginBottom: 50,
  },
  welcomeText: {
    // fontSize:48,
    // color: 'white',
    textAlign: 'center',
    position: 'absolute',
    bottom: 500,
    width: '100%',
    fontWeight: 'bold',
    color: '#003399',
  },
});
