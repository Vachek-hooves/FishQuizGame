import {StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import LottieView from 'lottie-react-native';
import TabScreenLayout from '../layout/TabScreenLayout';

const SimpleLoading = () => {
  return (
    <TabScreenLayout>
      <View>
        <LottieView
          source={require('../../assets/lottie/roundLoading.json')}
          style={styles.lottiAnimation}
          autoPlay
          loop
          speed={1.5}
        />
        <Text style={styles.savingText}>Saving Data in Progress</Text>
      </View>
    </TabScreenLayout>
  );
};

export default SimpleLoading;

const styles = StyleSheet.create({
  lottiAnimation: {
    width: '100%',
    height: 200,
  },
  savingText: {
    marginTop: 20,
    fontSize: 36,
    fontWeight: '600',
    color: '#003399',
    textAlign: 'center',
  },
});
