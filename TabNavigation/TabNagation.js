import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabMainScreen,
  TabQuizScreen,
  TabInformationScreen,
} from '../screen/tab';
const Tab = createBottomTabNavigator();

const TabNagation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 2000,
      }}>
      <Tab.Screen name="TabMainScreen" component={TabMainScreen} />
      <Tab.Screen name="TabQuizScreen" component={TabQuizScreen} />
      <Tab.Screen
        name="TabInformationScreen"
        component={TabInformationScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNagation;

const styles = StyleSheet.create({});
