import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Card, TextInput, Title} from 'react-native-paper';
import HelperTextInput from '../components/HelperTextInput';
import Colors from '../constants/Colors';
import PlatformButton from '../components/PlatformButton';
import {ChatErrors} from '../constants/Errors';
import {useSelector, useDispatch} from 'react-redux';
import {logInUser, setLoginError} from '../state/auth-reducer';

const LoginScreen = ({navigation}) => {
  const {isLoggedIn, loginError} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const buttonIcon = (
    <TextInput.Icon
      name={'eye'}
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    />
  );

  const signInUser = useCallback(() => {
    dispatch(logInUser(email, password, confPassword));
  }, [dispatch, password, confPassword, email]);

  if (isLoggedIn) {
    navigation.navigate('Chat');
  }

  return (
    <View>
      <Card>
        <Card.Content style={{justifyContent: 'center'}}>
          <Title>Type Your Data Below</Title>
          <HelperTextInput
            theme={{colors: {primary: Colors.secondary}}}
            selectionColor={Colors.secondary}
            label={'Email'}
            value={email}
            onChangeText={text => {
              setEmail(text);
              dispatch(setLoginError(ChatErrors.login.userDisabled, ''));
              dispatch(setLoginError(ChatErrors.login.invalidEmail, ''));
              dispatch(setLoginError(ChatErrors.login.userNotFound, ''));
            }}
            visible={
              loginError[ChatErrors.login.userDisabled] ||
              loginError[ChatErrors.login.invalidEmail] ||
              loginError[ChatErrors.login.userNotFound]
            }
            errorMessage={
              loginError[ChatErrors.login.userDisabled]
                ? loginError[ChatErrors.login.userDisabled]
                : loginError[ChatErrors.login.invalidEmail]
                ? loginError[ChatErrors.login.invalidEmail]
                : loginError[ChatErrors.login.userNotFound]
            }
          />
          <HelperTextInput
            theme={{colors: {primary: Colors.secondary}}}
            selectionColor={Colors.secondary}
            label={'Password'}
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={password => {
              setPassword(password);
              dispatch(setLoginError(ChatErrors.login.wrongPassword, ''));
            }}
            visible={loginError[ChatErrors.login.wrongPassword]}
            errorMessage={loginError[ChatErrors.login.wrongPassword]}
          />
          <HelperTextInput
            theme={{colors: {primary: Colors.secondary}}}
            selectionColor={Colors.secondary}
            label={'Confirm Password'}
            secureTextEntry={secureTextEntry}
            value={confPassword}
            right={buttonIcon}
            onChangeText={password => {
              setConfPassword(password);
              dispatch(setLoginError(ChatErrors.login.wrongConfirmation, ''));
            }}
            visible={loginError[ChatErrors.login.wrongConfirmation]}
            errorMessage={loginError[ChatErrors.login.wrongConfirmation]}
            icon={buttonIcon}
          />
          <PlatformButton
            style={styles.button}
            color={Colors.secondary}
            platform={Platform.OS}
            text={'Login'}
            onPress={signInUser}
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
