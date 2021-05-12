import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Card, Title} from 'react-native-paper';
import Colors from '../constants/Colors';
import PlatformButton from '../components/PlatformButton';
import HelperTextInput from '../components/HelperTextInput';
import {ChatErrors} from '../constants/Errors';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser, setSignupError} from '../state/auth-reducer';

const SignupScreen = ({navigation}) => {
  const {isLoggedIn, signupError} = useSelector(state => state.auth);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const loginUser = useCallback(() => {
    dispatch(signUpUser(email, password, userName));
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
              dispatch(setSignupError(ChatErrors.signIn.emailAlreadyInUse, ''));
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
            secureTextEntry={true}
            value={password}
            onChangeText={password => {
              setPassword(password);
              dispatch(setSignupError(ChatErrors.signIn.weakPassword, ''));
            }}
            visible={signupError[ChatErrors.signIn.weakPassword]}
            errorMessage={signupError[ChatErrors.signIn.weakPassword]}
          />
          <PlatformButton
            style={styles.button}
            color={Colors.secondary}
            platform={Platform.OS}
            text={'Signup'}
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

export default SignupScreen;
