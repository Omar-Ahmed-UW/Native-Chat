import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {
  chatApiKey,
  chatUserId,
  chatUserName,
  chatUserToken,
} from '../../configs/chatConfig';

const user = {
  id: chatUserId,
  name: chatUserName,
};

const chatClient = StreamChat.getInstance(chatApiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      try {
        chatClient.connectUser(user, chatUserToken);
        setClientIsReady(true);
      } catch (error) {
        if (error instanceof Error) {
          console.log('An error occured while connecting user', error.message);
        }
      }
    };
    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {
    clientIsReady,
  };
};
