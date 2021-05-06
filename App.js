import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CommonChatNavigator from './navigation/CommonChatNavigator';
import firebase from 'firebase';
import {
  API_KEY,
  AUTH_DOMAIN,
  STORAGE_BUCKET,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID,
} from '@env';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
  });
  firebase.firestore().settings({experimentalForceLongPolling: true});
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const App = () => {
  return (
      <NavigationContainer>
        <CommonChatNavigator />
      </NavigationContainer>
  );
};

export default App;
