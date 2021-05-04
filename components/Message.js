import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import {Text} from 'react-native-paper';

const Message = ({text}) => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      <Text style={styles.message}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    backgroundColor: 'rgba(216, 182, 86, 0.2)',
    textAlign: 'center',
    minWidth: '15%',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
});

export default Message;
