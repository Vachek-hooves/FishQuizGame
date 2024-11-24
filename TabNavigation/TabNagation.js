import {useEffect, useState} from 'react';
import {AppState, StyleSheet, TouchableOpacity, } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabMainScreen, TabQuizScreen, TabProfileScreen} from '../screen/tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  pauseBackgroundMusic,
  playBackgroundMusic,
  setupPlayer,
  toggleBackgroundMusic,
} from '../components/musicSet/setPlayer';

const Tab = createBottomTabNavigator();

const EmptyComponent = () => null;

const TabNagation = () => {
  const [isMusicPlay, setIsMusicPlay] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isMusicPlay) {
        playBackgroundMusic();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        pauseBackgroundMusic();
      }
    });
    const initMusic = async () => {
      await setupPlayer();
      await playBackgroundMusic();
      setIsMusicPlay(true);
    };

    initMusic();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, []);

  const playMusicToggle = () => {
    const newState = toggleBackgroundMusic();
    setIsMusicPlay(newState);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 2000,
        tabBarStyle: styles.barStyle,
        tabBarLabelStyle: styles.barLabel,
        tabBarIconStyle: {
          marginBottom: 6,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <Tab.Screen
        name="TabProfileScreen"
        component={TabProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              color={focused ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)'}
              size={36}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TabMainScreen"
        component={TabMainScreen}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name="home"
              color={focused ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)'}
              size={36}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TabQuizScreen"
        component={TabQuizScreen}
        options={{
          tabBarLabel: 'Quiz',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name="question"
              color={focused ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)'}
              size={36}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Music"
        component={EmptyComponent}
        options={{
          tabBarLabel: 'Music',
          tabBarIcon: () => (
            <TouchableOpacity onPress={playMusicToggle}>
              <Icon
                name="music"
                color={isMusicPlay ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)'}
                size={28}
              />
            </TouchableOpacity>
          ),
          tabBarLabelStyle: {
            color: isMusicPlay ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)',
          },
        }}
        listeners={{tabPress: e => e.preventDefault()}}
      />
    </Tab.Navigator>
  );
};

export default TabNagation;

const styles = StyleSheet.create({
  barStyle: {
    // backgroundColor: '#003399',
    height: 90,
    paddingTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    backgroundColor: 'rgba(0, 51, 153, 0.0)',
    borderTopWidth: 0,
    elevation: 0, // Removes Android shadow
    shadowOpacity: 0, // Removes iOS shadow
  },
  barLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
});
