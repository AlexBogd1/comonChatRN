import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';

const Message = ({id, text, userName, isOwner, time, removeMessage}) => {
  const messageOwnerBackColor = 'rgba(86, 147, 32, 0.8)';
  const avatarName = userName
    .split(' ')
    .map(str => str[0])
    .join('');
  const mesDate = new Date(time);
  const ownerContainerStyles = isOwner
    ? {...styles.messageContainer, justifyContent: 'flex-end'}
    : styles.messageContainer;
  const ownerMessageStyles = isOwner
    ? {...styles.message, backgroundColor: messageOwnerBackColor}
    : styles.message;
  return (
    <View style={ownerContainerStyles}>
      <View style={styles.avatarBlock}>
        <Avatar.Text label={avatarName} size={30} />
      </View>
      <View style={styles.messageBlock}>
        <View style={ownerMessageStyles}>
          <Text>{text}</Text>
          <View style={styles.messageDate}>
            <Text style={styles.messageDateText}>
              {mesDate.toISOString().slice(0, 10)}
            </Text>
            <Text style={styles.messageDateText}>
              {mesDate.toTimeString().slice(0, 8)}
            </Text>
          </View>
        </View>
      </View>
      {isOwner && (
        <IconButton
          size={25}
          icon={'delete'}
          onPress={() => removeMessage(id)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    width: '97%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatarBlock: {
    marginRight: 5,
    marginBottom: 12,
    alignSelf: 'flex-end',
  },
  message: {
    textAlign: 'center',
    backgroundColor: 'rgba(216, 182, 86, 0.8)',
    minWidth: '40%',
    maxWidth: 250,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  messageDate: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  messageDateText: {
    fontSize: 10,
    color: '#707070',
  },
});

export default React.memo(Message);
