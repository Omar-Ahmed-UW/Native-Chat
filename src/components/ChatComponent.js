import React from 'react';
import {Channel, Chat, MessageList} from 'stream-chat-react-native';
import TranslatedMessage from './TranslatedMessage';
import CustomMessageInput from './CustomMessageInput';

const ChatComponent = ({channel}) => {
  return (
    <Chat>
      <Channel channel={channel} Message={TranslatedMessage}>
        <MessageList />
        <CustomMessageInput />
      </Channel>
    </Chat>
  );
};
export default ChatComponent;
