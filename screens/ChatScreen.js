import React, {useCallback, useState, useRef, useEffect} from 'react';
import {View, FlatList, StyleSheet, ImageBackground} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {auth} from '../App';
import Message from '../components/Message';
import {useAuthState} from 'react-firebase-hooks/auth';
import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMessagesFromFirebase,
  sendNewMessage,
  removeMessage,
  setMessages,
} from '../state/message/message-actions';
import {getMessagesSelector} from '../state/selectors';
import {firestore} from '../App';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import InputBox from '../components/InputBox';
import BackImg from '../assets/images/backImgGray.jpg';

const ChatScreen = () => {
  const messages = useSelector(getMessagesSelector);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const [messagesFromFirebase, loading] = useCollectionData(
    firestore.collection('messages').orderBy('time'),
  );

  useEffect(() => {
    dispatch(getMessagesFromFirebase());
  }, [dispatch]);

  const flatRef = useRef();

  if (messagesFromFirebase && messagesFromFirebase.length !== messages.length) {
    dispatch(setMessages(messagesFromFirebase));
  }

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

  if (loading) {
    return <ActivityIndicator animating={true} color={Colors.primary} />;
  }
  return (
    <ImageBackground style={styles.backgroundImage} source={BackImg}>
      <View style={styles.container}>
        <FlatList
          initialScrollIndex={messages.length > 0 ? messages.length - 1 : 0}
          initialNumToRender={1}
          onContentSizeChange={scrollToIndex}
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

        <InputBox
          message={message}
          setMessage={setMessage}
          action={() => {
            sendMessage(user.uid, user.displayName, message);
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
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
