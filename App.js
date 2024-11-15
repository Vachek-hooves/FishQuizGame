import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  StackWelcomeScreen,
  StackQuizGame,
  StackQuizFinish,
  StackDailyFactDetails,
  StackLikedFacts,
} from './screen/stack';
import {FishStoreProvider} from './store/fishStore';
import PostCardDetails from './components/screenComponents/MainScreen/PostCardDetails';
import CreatePostForm from './components/screenComponents/MainScreen/CreatePostForm';
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
          <Stack.Screen
            name="StackWelcomeScreen"
            component={StackWelcomeScreen}
          />
          <Stack.Screen name="TabNavigation" component={TabNagation} />
          <Stack.Screen name="StackQuizGame" component={StackQuizGame} />
          <Stack.Screen name="StackQuizFinish" component={StackQuizFinish} />
          <Stack.Screen name="StackDailyFactDetails" component={StackDailyFactDetails} />
          <Stack.Screen name="StackLikedFacts" component={StackLikedFacts} />
          <Stack.Screen name="PostCardDetails" component={PostCardDetails} />
          <Stack.Screen name="CreatePostForm" component={CreatePostForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </FishStoreProvider>
  );
}

export default App;
