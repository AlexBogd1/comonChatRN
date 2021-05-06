import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const PlatformButton = props => {
  const {text, platform, ...restProp} = props;
  return (
    <Button
      mode={platform === 'android' ? 'contained' : 'text'}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonFont}
      {...restProp}>
      {text}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    width: 200,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonFont: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default React.memo(PlatformButton);
