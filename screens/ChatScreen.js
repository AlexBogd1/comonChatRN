import React, {useState} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {db} from '../App';
import firebase from 'firebase';
import Message from '../components/Message';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messageFromFirebase, setMessageFromFirebase] = useState([]);
  const user = firebase.auth();
  const sendMessage = (userId, userName, message) => {
    const newMessage = {
      UID: userId,
      userName: userName,
      text: message,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection('messages')
      .add(newMessage)
      .then(res => console.log('succes'));
  };

  const getData = () => {
    setMessageFromFirebase([]);
    db.collection('messages')
      .get()
      .then(querySnapshot => {
        const arrayMessages = [];
        querySnapshot.forEach(doc => {
          arrayMessages.push(doc.data().text);
          console.log(doc.id, ' => ', doc.data().text);
        });
        setMessageFromFirebase(arrayMessages);
      });
  };

  return (
    <View>
      <FlatList
        style={{height: '70%'}}
        data={messageFromFirebase}
        renderItem={dataItem => <Message text={dataItem.item} />}
        keyExtractor={item => item}
      />
      <View>
        <TextInput onChangeText={message => setMessage(message)} />
        <Button
          icon={'send'}
          onPress={() =>
            sendMessage(
              user.currentUser.uid,
              user.currentUser.displayName,
              message,
            )
          }
        />
        <Button icon={'send'} onPress={getData} />
      </View>
    </View>
  );
};

export default ChatScreen;
