import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

const FishImage = () => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const floatingImage = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );

    floatingImage.start();
    return () => floatingImage.stop;
  }, []);

  const yOffSet = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  return (
    <View>
      <Animated.Image
        source={require('../../assets/icons/fish.png')}
        style={[
          styles.fishImage,
          {
            transform: [{translateY: yOffSet}],
          },
        ]}
      />
    </View>
  );
};

export default FishImage;

const styles = StyleSheet.create({
  fishImage: {
    width: 200,
    height: 200,
    marginTop: 100,
    marginBottom: 30,
  },
});
