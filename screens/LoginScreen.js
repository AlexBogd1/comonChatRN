import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Card, Title} from 'react-native-paper';
import Colors from '../constants/Colors';
import PlatformButton from '../components/PlatformButton';
import HelperTextInput from '../components/HelperTextInput';
import {ChatErrors} from '../constants/Errors';
import {useDispatch, useSelector} from 'react-redux';
import {logInUser, setLoginError} from '../state/auth-reducer';

const LoginScreen = ({navigation}) => {
  const {isLoggedIn, loginError} = useSelector(state => state.auth);
  console.log(isLoggedIn);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const loginUser = useCallback(() => {
    dispatch(logInUser(email, password, userName));
  }, [dispatch, email, password, userName]);

  if (isLoggedIn) {
    navigation.navigate('Chat');
  }

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
              dispatch(setLoginError(ChatErrors.login.userNameError, ''));
            }}
            visible={loginError[ChatErrors.login.userNameError]}
            errorMessage={loginError[ChatErrors.login.userNameError]}
          />
          <HelperTextInput
            theme={{colors: {primary: Colors.secondary}}}
            selectionColor={Colors.secondary}
            label={'Email'}
            value={email}
            onChangeText={text => {
              setEmail(text);
              dispatch(setLoginError(ChatErrors.login.emailAlreadyInUse, ''));
              dispatch(setLoginError(ChatErrors.login.invalidEmail, ''));
            }}
            visible={
              loginError[ChatErrors.login.emailAlreadyInUse] ||
              loginError[ChatErrors.login.invalidEmail]
            }
            errorMessage={
              loginError[ChatErrors.login.emailAlreadyInUse]
                ? loginError[ChatErrors.login.emailAlreadyInUse]
                : loginError[ChatErrors.login.invalidEmail]
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
              dispatch(setLoginError(ChatErrors.login.weakPassword, ''));
            }}
            visible={loginError[ChatErrors.login.weakPassword]}
            errorMessage={loginError[ChatErrors.login.weakPassword]}
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
