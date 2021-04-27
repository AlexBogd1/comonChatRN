import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignInScreen from '../screens/SignInScreen';
import {Platform} from 'react-native';
import Colors from '../constants/Colors';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

const CommonChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        },
        headerTitleStyle: {
          fontFamily: 'Montserrat-Bold',
        },
      }}>
      <Stack.Screen
        name={'Welcome'}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{headerTitle: 'Create Account'}}
      />
      <Stack.Screen
        name={'Signin'}
        component={SignInScreen}
        options={{headerTitle: 'Sign in'}}
      />
      <Stack.Screen
        name={'Chat'}
        component={ChatScreen}
        options={{headerTitle: 'Chat Screen'}}
      />
    </Stack.Navigator>
  );
};
export default CommonChatNavigator;
