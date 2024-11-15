import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabMainScreen,
  TabQuizScreen,
  TabInformationScreen,
  TabProfileScreen,
} from '../screen/tab';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

const TabNagation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 2000,
        tabBarStyle: {
          backgroundColor: '#1E6B8C',
          height: 80,
          paddingTop: 4,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.5)',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIconStyle: {
          marginBottom: 6,
        },
        tabBarHideOnKeyboard: true,
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
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      />
      <Tab.Screen
        name="TabMainScreen"
        component={TabMainScreen}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="home" color={focused ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)'}  size={36} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      />
      <Tab.Screen
        name="TabQuizScreen"
        component={TabQuizScreen}
        options={{
          tabBarLabel: 'Quiz',
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="question" color={focused ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)'}  size={36} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      />
      {/* <Tab.Screen
        name="TabInformationScreen"
        component={TabInformationScreen}
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="info" color={focused ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)'}  size={36} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNagation;

const styles = StyleSheet.create({});
