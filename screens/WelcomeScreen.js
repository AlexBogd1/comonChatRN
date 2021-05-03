import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Colors from '../constants/Colors';
import PlatformButton from '../components/PlatformButton';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Common</Text>
        <Text style={styles.title}>Chat</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PlatformButton
          style={styles.button}
          text={'Login'}
          platform={Platform.OS}
          color={Colors.secondary}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <PlatformButton
          style={styles.button}
          text={'Signup'}
          platform={Platform.OS}
          color={Colors.secondary}
          onPress={() => {
            navigation.navigate('Signin');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '95%',
  },
  titleSection: {
    padding: 15,
    marginVertical: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 75,
    fontFamily: 'FreckleFace-Regular',
    color: Colors.primary,
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 50,
  },
});

export default WelcomeScreen;
