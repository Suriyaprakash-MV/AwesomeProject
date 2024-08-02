import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import LoginFullScreen from './LoginFullScreen';
import SignInCredentials from './SignInCredentials';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;

          if (route.name === 'Home Screen') {
            iconSource = 'https://cdn-icons-png.flaticon.com/512/25/25694.png';
          } else if (route.name === 'SignIn') {
            iconSource =
              'https://cdn-icons-png.flaticon.com/512/2250/2250092.png';
          } else if (route.name === 'Credentials') {
            iconSource =
              'https://cdn-icons-png.flaticon.com/512/5509/5509636.png';
          }

          return (
            <Image
              source={{uri: iconSource}}
              style={{width: size, height: size, tintColor: color}}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="SignIn" component={LoginFullScreen} />
      <Tab.Screen name="Credentials" component={SignInCredentials} />
    </Tab.Navigator>
  );
};

export default HomeTab;
