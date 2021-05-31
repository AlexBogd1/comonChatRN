import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Card, TextInput, Title} from 'react-native-paper';
import Colors from '../constants/Colors';
import PlatformButton from '../components/PlatformButton';
import HelperTextInput from '../components/HelperTextInput';
import {ChatErrors} from '../constants/Errors';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser, setSignupError} from '../state/auth/auth-actions';
import {signupSelector} from '../state/selectors';

const SignupScreen = ({navigation}) => {
  const {isLoggedIn, signupError} = useSelector(signupSelector);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();

  const loginUser = useCallback(() => {
    dispatch(signUpUser(email, password, userName, confPassword));
  }, [confPassword, dispatch, email, password, userName]);

  const buttonIcon = (
    <TextInput.Icon
      name={'eye'}
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    />
  );

  if (isLoggedIn) {
    navigation.navigate('Chat');
  }

  return (
    <View>
      <Card>
        <Card.Content style={styles.cardContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <Title>Type Your Data Below</Title>
            <ScrollView>
              <HelperTextInput
                style={styles.textInput}
                theme={{colors: {primary: Colors.secondary}}}
                selectionColor={Colors.secondary}
                label={'User Name'}
                value={userName}
                onChangeText={name => {
                  setUserName(name);
                  dispatch(setSignupError(ChatErrors.signIn.userNameError, ''));
                }}
                visible={signupError[ChatErrors.signIn.userNameError]}
                errorMessage={signupError[ChatErrors.signIn.userNameError]}
              />
              <HelperTextInput
                theme={{colors: {primary: Colors.secondary}}}
                selectionColor={Colors.secondary}
                label={'Email'}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  dispatch(
                    setSignupError(ChatErrors.signIn.emailAlreadyInUse, ''),
                  );
                  dispatch(setSignupError(ChatErrors.signIn.invalidEmail, ''));
                }}
                visible={
                  signupError[ChatErrors.signIn.emailAlreadyInUse] ||
                  signupError[ChatErrors.signIn.invalidEmail]
                }
                errorMessage={
                  signupError[ChatErrors.signIn.emailAlreadyInUse]
                    ? signupError[ChatErrors.signIn.emailAlreadyInUse]
                    : signupError[ChatErrors.signIn.invalidEmail]
                }
              />
              <HelperTextInput
                theme={{colors: {primary: Colors.secondary}}}
                selectionColor={Colors.secondary}
                label={'Password'}
                secureTextEntry={secureTextEntry}
                value={password}
                onChangeText={pass => {
                  setPassword(pass);
                  dispatch(setSignupError(ChatErrors.signIn.weakPassword, ''));
                }}
                visible={signupError[ChatErrors.signIn.weakPassword]}
                errorMessage={signupError[ChatErrors.signIn.weakPassword]}
              />
              <HelperTextInput
                theme={{colors: {primary: Colors.secondary}}}
                selectionColor={Colors.secondary}
                label={'Confirm Password'}
                secureTextEntry={secureTextEntry}
                value={confPassword}
                right={buttonIcon}
                onChangeText={pass => {
                  setConfPassword(pass);
                  dispatch(
                    setSignupError(ChatErrors.signIn.wrongConfirmation, ''),
                  );
                }}
                visible={signupError[ChatErrors.signIn.wrongConfirmation]}
                errorMessage={signupError[ChatErrors.signIn.wrongConfirmation]}
                icon={buttonIcon}
              />
            </ScrollView>
            <PlatformButton
              style={styles.button}
              color={Colors.secondary}
              platform={Platform.OS}
              text={'Signup'}
              onPress={loginUser}
            />
          </KeyboardAvoidingView>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 25,
  },
  button: {
    marginTop: 25,
    borderRadius: 20,
    alignSelf: 'center',
    width: '60%',
  },
});

export default SignupScreen;
