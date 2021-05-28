import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import {Platform} from 'react-native';
import Colors from '../constants/Colors';
import ChatScreen from '../screens/ChatScreen';
import {Button} from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import {useDispatch} from 'react-redux';
import {
  setIsLoggedIn,
  setLoginError,
  setSignupError,
} from '../state/auth/auth-actions';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {ChatErrors} from '../constants/Errors';

const Stack = createStackNavigator();

const CommonChatNavigator = () => {
  const dispatch = useDispatch();
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
        name={'Signup'}
        component={SignupScreen}
        options={({navigation}) => ({
          headerTitle: 'Create Account',
          headerLeft: () => (
            <Button
              icon={() => (
                <MaterialCommunityIcon name={'arrow-left'} size={25} />
              )}
              onPress={() => {
                dispatch(setSignupError(ChatErrors.signIn.userNameError, ''));
                dispatch(setSignupError(ChatErrors.signIn.invalidEmail, ''));
                dispatch(setSignupError(ChatErrors.signIn.weakPassword, ''));
                dispatch(
                  setSignupError(ChatErrors.signIn.emailAlreadyInUse, ''),
                );
                dispatch(
                  setSignupError(ChatErrors.signIn.wrongConfirmation, ''),
                );
                navigation.navigate('Welcome');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={({navigation}) => ({
          headerTitle: 'Login',
          headerLeft: () => (
            <Button
              icon={() => (
                <MaterialCommunityIcon name={'arrow-left'} size={25} />
              )}
              onPress={() => {
                dispatch(setLoginError(ChatErrors.login.userDisabled, ''));
                dispatch(setLoginError(ChatErrors.login.invalidEmail, ''));
                dispatch(setLoginError(ChatErrors.login.userNotFound, ''));
                navigation.navigate('Welcome');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name={'Chat'}
        component={ChatScreen}
        options={({navigation}) => ({
          headerTitle: 'Your Chat',
          headerLeft: () => (
            <Button
              icon={() => <MaterialCommunityIcon name={'logout'} size={23} />}
              color={'black'}
              labelStyle={{fontWeight: 'bold'}}
              onPress={() => {
                dispatch(setIsLoggedIn(false));
                navigation.navigate('Welcome');
              }}>
              Logout
            </Button>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default CommonChatNavigator;
