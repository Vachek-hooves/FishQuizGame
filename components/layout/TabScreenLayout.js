import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const TabScreenLayout = ({children}) => {
  return (
    <LinearGradient
      colors={[
        'lightblue',
        'lightblue',
        '#93C5FD',
        '#93C5FD',
        '#003399',
        '#003399',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0.3, 0.4, 0.5, 0.7, 0.9, 1]}
      style={styles.gradientContainer}>
      {children}
    </LinearGradient>
  );
};

export default TabScreenLayout;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
});
