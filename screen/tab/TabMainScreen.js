import { View, Text,StyleSheet,SafeAreaView } from 'react-native'
import DailyFacts from '../../components/screenComponents/MainScreen/DailyFacts';


const TabMainScreen = () => {
  return (
    <View>
      <SafeAreaView/>
      <Text style={styles.title}>Collections </Text>
      <DailyFacts />
    </View>
  )
}

export default TabMainScreen
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#007AFF',
    letterSpacing: 1,
  },
});
