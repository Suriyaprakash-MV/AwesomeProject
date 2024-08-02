import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginFullScreen from './src/LoginFullScreen';
import SignInCredentials from './src/SignInCredentials';
import ProfileScreen from './src/ProfileScreen';
import {StyleSheet} from 'react-native';
import HomeTab from './src/HomeTab';
import DetailScreen from './src/DetailScreen';
import userOnBoardScreen from './src/UserOnBoardScreen';
import MyProfileDetailScreen from './src/MyProfileDetailScreen';
import FriendsAndFamilyDetails from './src/FriendsAndFamilyDetails';
import ChatScreen from './src/ChatScreen';
import FoodLoginScreen from './src/FoodLoginScreen';
// import FoodHomeScreen from './src/FoodHomeScreen';
// import DrawerNavigator from './src/DrawerNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginFullScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Sign in"
            component={SignInCredentials}
            options={{title: 'Sign in'}}
          />
          {/* <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{title: 'chats'}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{title: 'Profile'}}
          />
          <Stack.Screen
            name="OnBoard"
            component={userOnBoardScreen}
            options={{title: 'OnBoard'}}
          />
          <Stack.Screen
            name="MyProfileDetailScreen"
            component={MyProfileDetailScreen}
            options={{title: 'My profile detail'}}
          />
          <Stack.Screen
            name="FriendsAndFamilyDetails"
            component={FriendsAndFamilyDetails}
            options={{title: 'Friends and Family details'}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{title: 'Chat Screen'}}
          />
          <Stack.Screen
            name="FoodLoginScreen"
            component={FoodLoginScreen}
            options={{title: 'Food Login Screen'}}
          />
          {/* <Stack.Screen
            name="FoodHomeScreen"
            component={FoodHomeScreen}
            options={{title: 'Food Home Screen'}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
