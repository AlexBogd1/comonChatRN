import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Card, Title} from 'react-native-paper';
import Colors from '../constants/Colors';
import PlatformButton from '../components/PlatformButton';
import HelperTextInput from '../components/HelperTextInput';
import firebase from 'firebase';
import {ChatErrors} from '../constants/Errors';
import {useDispatch} from 'react-redux';
import {logInUser} from '../state/auth-reducer';

const LoginScreen = ({navigation}) => {
  const initError = {};
  for (let key in ChatErrors.login) {
    initError[ChatErrors.login[key]] = '';
  }
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentError, setCurrentError] = useState(initError);
  const dispatch = useDispatch();
  
  const loginUser = useCallback(() => {
    
    if (userName.trim().length >= 3) {
      console.log('LoginScreen')
      dispatch(logInUser(email, password, userName));
      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then(userCredential => {
      //     const user = userCredential.user;
      //     user.updateProfile({
      //       displayName: userName,
      //     });
      //     navigation.navigate('Chat');
      //   })
      //   .catch(error => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     setCurrentError({
      //       ...currentError,
      //       [errorCode]: errorMessage,
      //     });
      //   });
    } else {
      setCurrentError({
        ...currentError,
        ['userName-error']: 'The user name must be at least 3 character',
      });
    }
  }, [userName, email, password, currentError, navigation]);

  return (
    <View>
      <Card>
        <Card.Content style={{justifyContent: 'center'}}>
          <Title>Type Your Data Below</Title>
          <HelperTextInput
            style={{marginTop: 25}}
            theme={{colors: {primary: Colors.secondary}}}
            selectionColor={Colors.secondary}
            label={'User Name'}
            value={userName}
            onChangeText={userName => {
              setUserName(userName);
              setCurrentError({
                ...currentError,
                [ChatErrors.login.userNameError]: '',
              });
            }}
            visible={currentError[ChatErrors.login.userNameError]}
            errorMessage={currentError[ChatErrors.login.userNameError]}
          />
          <HelperTextInput
            theme={{colors: {primary: Colors.secondary}}}
            selectionColor={Colors.secondary}
            label={'Email'}
            value={email}
            onChangeText={text => {
              setEmail(text);
              setCurrentError({
                ...currentError,
                [ChatErrors.login.emailAlreadyInUse]: '',
                [ChatErrors.login.invalidEmail]: '',
              });
            }}
            visible={
              currentError[ChatErrors.login.emailAlreadyInUse] ||
              currentError[ChatErrors.login.invalidEmail]
            }
            errorMessage={
              currentError[ChatErrors.login.emailAlreadyInUse]
                ? currentError[ChatErrors.login.emailAlreadyInUse]
                : currentError[ChatErrors.login.invalidEmail]
            }
          />
          <HelperTextInput
            theme={{colors: {primary: Colors.secondary}}}
            selectionColor={Colors.secondary}
            label={'Password'}
            secureTextEntry={true}
            value={password}
            onChangeText={password => {
              setPassword(password);
              setCurrentError({
                ...currentError,
                [ChatErrors.login.weakPassword]: '',
              });
            }}
            visible={currentError[ChatErrors.login.weakPassword]}
            errorMessage={currentError[ChatErrors.login.weakPassword]}
          />
          <PlatformButton
            style={styles.button}
            color={Colors.secondary}
            platform={Platform.OS}
            text={'Login'}
            onPress={loginUser}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
    borderRadius: 20,
    alignSelf: 'center',
    width: '60%',
  },
});

export default LoginScreen;
