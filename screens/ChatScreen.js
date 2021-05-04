import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {firestore, auth} from '../App';
import firebase from 'firebase';
import Message from '../components/Message';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Colors from '../constants/Colors';

const ChatScreen = () => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const [messageFromFirebase, loading] = useCollectionData(
    firestore.collection('messages').orderBy('time'),
  );
  const indicator = (
    <ActivityIndicator animating={true} color={Colors.primary} />
  );

  const sendMessage = (userId, userName, message) => {
    const newMessage = {
      UID: userId,
      userName: userName,
      text: message,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    };
    firestore
      .collection('messages')
      .add(newMessage)
      .then(res => setMessage(''));
  };

  return loading ? (
    indicator
  ) : (
    <View style={styles.container}>
      <FlatList
        data={messageFromFirebase}
        renderItem={dataItem => (
          <Message
            text={dataItem.item.text}
            userName={dataItem.item.userName}
            isOwner={dataItem.item.UID === user.uid}
            time={dataItem.item.time}
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
