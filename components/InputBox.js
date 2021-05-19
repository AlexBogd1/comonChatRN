import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';

const InputBox = ({message, setMessage, action}) => {
  console.log(message[0]);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput value={message} onChangeText={setMessage} multiline />
      </View>
      <View style={styles.buttonContainer}>
        <IconButton icon={'send'} size={30} onPress={action} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 5,
    backgroundColor: 'rgba(17, 119, 34, 0.2)',
    borderRadius: 30,
  },
  inputContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 30,
  },
  buttonContainer: {
    borderRadius: 30,
    marginHorizontal: 5,
  },
});

export default InputBox;
