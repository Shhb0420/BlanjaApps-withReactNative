import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {COLOR_MAIN} from '../../utils/constans';
import {API_URL} from '@env';
//import socketIO from 'socket.io-client';

//context
import {useSocket} from '../../utils/Context/index';

//redux
import {useSelector} from 'react-redux';
//const socket = socketIO(`${API_URL}`);

const ChatScreen = ({route}) => {
  const socket = useSocket();
  const [sellerId, setSellerId] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  //sender id
  const user_id = useSelector((state) => state.authReducer.user_id);
  const user_name = useSelector((state) => state.authReducer.fullname);
  //recipe id

  useEffect(() => {
    if (route.params && route.params.sellerId) {
      console.log("wkwk", route.params.sellerId);
      setSellerId(route.params.sellerId);
    }
  }, []);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChatMessages((chatMessages) => [...chatMessages, msg]);
      if (user_id != msg.sender) {
        setSellerId(msg.sender);
      }
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  const submitChatMessage = () => {
    socket.emit(
      'chat message',
      {chatMessage, sender: user_id, senderName: user_name},
      sellerId,
    );
    setChatMessage('');
  };
  console.log("USER ID ",user_id);
  console.log("SellerID" ,sellerId);
  console.log('length ' + chatMessages.length);
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'flex-start',
        justifyContent: 'space-between',
      }}>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.wrapmsgSender}>
            {chatMessages.length !== 0 &&
              chatMessages.map(({chatMessage, sender, senderName}, index) => {
                return (
                  <View
                    key={index}
                    style={
                      user_id == sender ? styles.msgSender : styles.msgRecipient
                    }>
                    <Text
                      style={
                        user_id == sender
                          ? styles.textMsgSender
                          : styles.textMsgRecipient
                      }>
                      {chatMessage}
                    </Text>
                    <Text style={styles.textNameSender}>
                      {sender == user_id ? 'You' : senderName}
                    </Text>
                  </View>
                );
              })}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.wrapTextInput}>
          <View>
            <TextInput
              multiline={true}
              style={styles.form}
              placeholder="Message"
              value={chatMessage}
              onSubmitEditing={() => submitChatMessage()}
              onChangeText={(chatMessage) => {
                setChatMessage(chatMessage);
              }}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={submitChatMessage}>
            <Text style={{color: '#fff'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapTextInput: {
    marginHorizontal: 14,
    marginBottom: 10,
  },
  form: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 4,
    height: 80,
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: 'red',
    height: 30,
    justifyContent: 'center',
    borderRadius: 8,
    width: 75,
    alignItems: 'center',
  },
  wrapmsgSender: {
    //width: windowWidth * 0.4,
    //alignSelf: 'flex-end',
    //justifyContent: 'flex-end',
    marginHorizontal: windowWidth * 0.03,
    marginVertical: 10,
  },
  msgSender: {
    marginTop: 3,
    backgroundColor: 'blue',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 3,
    width: windowWidth * 0.4,
    alignSelf: 'flex-end',
  },
  textMsgSender: {
    color: '#fff',
    fontSize: 15,
  },
  textNameSender: {
    color: 'lightgrey',
    fontSize: 12,
  },
  msgRecipient: {
    marginTop: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 3,
    width: windowWidth * 0.4,
    alignSelf: 'flex-start',
  },
  textMsgRecipient: {
    color: 'black',
    fontSize: 15,
  },
  textNameRecipient: {
    color: 'lightgrey',
    fontSize: 12,
  },
});
