import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackWelcomeScreen,StackQuizGame} from './screen/stack';
import {FishStoreProvider} from './store/fishStore';

import TabNagation from './TabNavigation/TabNagation';
const Stack = createNativeStackNavigator();


function App() {
  return (
    <FishStoreProvider>

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
          animationDuration: 1000,
        }}>
        <Stack.Screen name="StackWelcomeScreen" component={StackWelcomeScreen} />
        <Stack.Screen name="TabNagation" component={TabNagation} />
        <Stack.Screen name="StackQuizGame" component={StackQuizGame} />
      </Stack.Navigator>
    </NavigationContainer>
          </FishStoreProvider>
  );
}

export default App;
