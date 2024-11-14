import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, height = 8 }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View 
        style={[
          styles.progress, 
          { 
            width: `${progress * 100}%`,
            height 
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    backgroundColor: '#4CD964',
    borderRadius: 4,
  },
});

export default ProgressBar;