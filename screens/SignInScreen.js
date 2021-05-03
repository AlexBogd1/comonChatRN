import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Card, TextInput, Title} from 'react-native-paper';
import HelperTextInput from '../components/HelperTextInput';
import Colors from '../constants/Colors';
import PlatformButton from '../components/PlatformButton';
import firebase from 'firebase';
import {ChatErrors} from '../constants/Errors';

const SignInScreen = ({navigation}) => {
  const initError = {};
  for (let key in ChatErrors.login) {
    initError[ChatErrors.login[key]] = '';
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [currentError, setCurrentError] = useState(initError);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const buttonIcon = (
    <TextInput.Icon
      name={'eye'}
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    />
  );

  const signInUser = useCallback(() => {
    if (password === confPassword) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          navigation.navigate('Chat');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setCurrentError({
            ...currentError,
            [errorCode]: errorMessage,
          });
        });
    } else {
      setCurrentError({
        ...currentError,
        [ChatErrors.signIn.wrongConfirmation]:
          'Confirmation password not match',
      });
    }
  }, [password, confPassword, email, navigation, currentError]);

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
              setCurrentError({
                ...currentError,
                [ChatErrors.signIn.userDisabled]: '',
                [ChatErrors.signIn.invalidEmail]: '',
                [ChatErrors.signIn.userNotFound]: '',
              });
            }}
            visible={
              currentError[ChatErrors.signIn.userDisabled] ||
              currentError[ChatErrors.signIn.invalidEmail] ||
              currentError[ChatErrors.signIn.userNotFound]
            }
            errorMessage={
              currentError[ChatErrors.signIn.userDisabled]
                ? currentError[ChatErrors.signIn.userDisabled]
                : currentError[ChatErrors.signIn.invalidEmail]
                ? currentError[ChatErrors.signIn.invalidEmail]
                : currentError[ChatErrors.signIn.userNotFound]
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
              setCurrentError({
                ...currentError,
                [ChatErrors.signIn.wrongPassword]: '',
              });
            }}
            visible={currentError[ChatErrors.signIn.wrongPassword]}
            errorMessage={currentError[ChatErrors.signIn.wrongPassword]}
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
              setCurrentError({
                ...currentError,
                [ChatErrors.signIn.wrongConfirmation]: '',
              });
            }}
            visible={currentError[ChatErrors.signIn.wrongConfirmation]}
            errorMessage={currentError[ChatErrors.signIn.wrongConfirmation]}
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
