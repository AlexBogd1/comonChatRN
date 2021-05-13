import React, {useCallback, useState, useRef, useEffect} from 'react';
import {View, FlatList, StyleSheet, TextInput} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {firestore, auth} from '../App';
import firebase from 'firebase';
import Message from '../components/Message';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMessagesFromFirebase,
  sendNewMessage,
  removeMessage,
} from '../state/message-reducer';

const ChatScreen = () => {
  const messages = useSelector(store => store.messages.messages);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const flatRef = useRef();

  useEffect(() => {
    dispatch(getMessagesFromFirebase());
  }, [dispatch]);

  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 200 * index,
    index,
  });
  const scrollToIndex = useCallback(() => {
    flatRef.current.scrollToIndex({
      animated: true,
      index: messages.length - 1,
    });
  }, [messages, flatRef]);

  const sendMessage = useCallback(
    (userId, userName, message) => {
      dispatch(sendNewMessage(userId, userName, message));
      setMessage('');
      if (messages.length > 0) {
        scrollToIndex();
      }
    },
    [dispatch, messages.length, scrollToIndex],
  );

  const deleteMessage = useCallback(
    messageId => {
      dispatch(removeMessage(messageId));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <FlatList
        initialScrollIndex={messages.length > 0 ? messages.length - 1 : 0}
        initialNumToRender={3}
        getItemLayout={getItemLayout}
        ref={flatRef}
        data={messages}
        renderItem={dataItem => (
          <Message
            id={dataItem.item.id}
            text={dataItem.item.text}
            userName={dataItem.item.userName}
            isOwner={dataItem.item.UID === user.uid}
            time={dataItem.item.time}
            removeMessage={deleteMessage}
          />
        )}
        keyExtractor={item => item.time}
      />
      <View style={styles.sendMessageBlock}>
        <TextInput
          style={styles.messageInput}
          selectionColor={Colors.secondary}
          underlineColor={'transparent'}
          multiline={true}
          value={message}
          onChangeText={message => setMessage(message)}
        />
        <IconButton
          style={styles.messageButton}
          icon={'send'}
          size={35}
          onPress={() => {
            sendMessage(user.uid, user.displayName, message);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  sendMessageBlock: {
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
  },
  messageInput: {
    flex: 1,
    fontSize: 15,
    padding: 15,
  },
  messageButton: {
    textAlign: 'center',
  },
});

export default ChatScreen;
