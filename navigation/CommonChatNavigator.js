import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import {Platform} from 'react-native';
import Colors from '../constants/Colors';
import ChatScreen from '../screens/ChatScreen';
import {Button} from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn} from '../state/auth/auth-actions';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

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
        options={{headerTitle: 'Create Account'}}
      />
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{headerTitle: 'Login'}}
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
              onPress={() => {
                dispatch(setIsLoggedIn(false));
                navigation.navigate('Welcome');
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default CommonChatNavigator;
