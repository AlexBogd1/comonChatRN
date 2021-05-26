import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Card, TextInput, Title} from 'react-native-paper';
import HelperTextInput from '../components/HelperTextInput';
import Colors from '../constants/Colors';
import PlatformButton from '../components/PlatformButton';
import {ChatErrors} from '../constants/Errors';
import {useSelector, useDispatch} from 'react-redux';
import {logInUser, setLoginError} from '../state/auth/auth-actions';
import {loginSelector} from '../state/selectors';

const LoginScreen = ({navigation}) => {
  const {isLoggedIn, loginError} = useSelector(loginSelector);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const signInUser = useCallback(() => {
    dispatch(logInUser(email, password));
  }, [dispatch, password, email]);

  if (isLoggedIn) {
    navigation.navigate('Chat');
  }

  const buttonIcon = (
    <TextInput.Icon
      name={'eye'}
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    />
  );

  return (
    <View>
      <Card>
        <Card.Content style={styles.cardContainer}>
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
            value={password}
            secureTextEntry={secureTextEntry}
            onChangeText={password => {
              setPassword(password);
              dispatch(setLoginError(ChatErrors.login.wrongPassword, ''));
            }}
            visible={loginError[ChatErrors.login.wrongPassword]}
            errorMessage={loginError[ChatErrors.login.wrongPassword]}
            right={buttonIcon}
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
  cardContainer: {
    justifyContent: 'center',
  },
  button: {
    marginTop: 25,
    borderRadius: 20,
    alignSelf: 'center',
    width: '60%',
  },
});

export default LoginScreen;
