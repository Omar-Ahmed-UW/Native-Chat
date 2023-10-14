import React from 'react';
import {MessageInput} from 'stream-chat-react-native';

const CustomMessageInput = props => {
  const sendMessage = async message => {
    try {
      // Send the message using Stream.io SDK
      await props.sendMessage(message);
      // Send the message for translation and storage
      useTranslateMessage(message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return <MessageInput {...props} sendMessage={sendMessage} />;
};
export default CustomMessageInput;
