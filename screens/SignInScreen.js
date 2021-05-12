import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Card, TextInput, Title} from 'react-native-paper';
import HelperTextInput from '../components/HelperTextInput';
import Colors from '../constants/Colors';
import PlatformButton from '../components/PlatformButton';
import {ChatErrors} from '../constants/Errors';
import {useSelector, useDispatch} from 'react-redux';
import {signUpUser, setSignupError} from '../state/auth-reducer';

const SignInScreen = ({navigation}) => {
  const {isLoggedIn, signupError} = useSelector(state => state.auth);
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
    dispatch(signUpUser(email, password, confPassword));
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
              dispatch(setSignupError(ChatErrors.signIn.userDisabled, ''));
              dispatch(setSignupError(ChatErrors.signIn.invalidEmail, ''));
              dispatch(setSignupError(ChatErrors.signIn.userNotFound, ''));
            }}
            visible={
              signupError[ChatErrors.signIn.userDisabled] ||
              signupError[ChatErrors.signIn.invalidEmail] ||
              signupError[ChatErrors.signIn.userNotFound]
            }
            errorMessage={
              signupError[ChatErrors.signIn.userDisabled]
                ? signupError[ChatErrors.signIn.userDisabled]
                : signupError[ChatErrors.signIn.invalidEmail]
                ? signupError[ChatErrors.signIn.invalidEmail]
                : signupError[ChatErrors.signIn.userNotFound]
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
              dispatch(setSignupError(ChatErrors.signIn.wrongPassword, ''));
            }}
            visible={signupError[ChatErrors.signIn.wrongPassword]}
            errorMessage={signupError[ChatErrors.signIn.wrongPassword]}
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
              dispatch(setSignupError(ChatErrors.signIn.wrongConfirmation, ''));
            }}
            visible={signupError[ChatErrors.signIn.wrongConfirmation]}
            errorMessage={signupError[ChatErrors.signIn.wrongConfirmation]}
            icon={buttonIcon}
          />
          <PlatformButton
            style={styles.button}
            color={Colors.secondary}
            platform={Platform.OS}
            text={'Sign In'}
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

export default SignInScreen;
