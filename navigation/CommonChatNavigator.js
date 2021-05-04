import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignInScreen from '../screens/SignInScreen';
import {Platform, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import ChatScreen from '../screens/ChatScreen';
import PlatformButton from '../components/PlatformButton';
import {Button, TextInput} from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';

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
        options={({navigation}) => ({
          headerTitle: 'Your Chat',
          headerLeft: () => (
            <Button
              icon={() => (
                <MaterialCommunityIcon name={'arrow-left'} size={30} />
              )}
              onPress={() => navigation.navigate('Welcome')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default CommonChatNavigator;
