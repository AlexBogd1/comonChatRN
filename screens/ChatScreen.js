import React, {useCallback, useState, useRef, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
import BackImg from '../assets/images/back1.png';

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
    flatRef.current.scrollToEnd();
  }, [flatRef]);

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

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  if (loading) {
    return <ActivityIndicator animating={true} color={Colors.primary} />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <ImageBackground style={styles.backgroundImage} source={BackImg}>
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
          scrollList={scrollToIndex}
          action={() => {
            sendMessage(user.uid, user.displayName, message);
          }}
        />
      </ImageBackground>
    </KeyboardAvoidingView>
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
