import React, {useState} from 'react';
import {TextInput, HelperText} from 'react-native-paper';
import {View} from 'react-native';

const HelperTextInput = props => {
  const {visible, errorMessage, ...inputProps} = props;
  return (
    <View>
      <TextInput {...inputProps} />
      <HelperText type={'error'} visible={visible}>
        {errorMessage}
      </HelperText>
    </View>
  );
};

export default HelperTextInput;
