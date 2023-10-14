import React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import {useChatClient} from './src/components/useChatClient';
import {AppProvider, useAppContext} from './AppContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  Thread,
} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import {chatApiKey, chatUserId} from './configs/chatConfig';
import {
  fecthTranslatedMessage,
  translateAndStoreMessage,
} from './src/services/messageService';
const Stack = createStackNavigator();
const filters = {
  members: {
    $in: [chatUserId],
  },
};

const sort = {
  last_message_at: -1,
};

const ChannelListScreen = props => {
  const {setChannel} = useAppContext();
  return (
    <ChannelList
      onSelect={channel => {
        const {navigation} = props;
        setChannel(channel);
        navigation.navigate('ChatComponent');
      }}
      filters={filters}
      sort={sort}
    />
  );
};

const ChatComponent = () => {
  const {channel} = useAppContext();
  const doSendMessageRequest = async (channelId, message) => {
    try {
      // Send the message to your backend for translation and storage
      await translateAndStoreMessage(message.text, channelId);

      // Send the message using Stream.io SDK
      return channel.sendMessage(message);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error; // Propagate the error so Stream SDK can handle it
    }
  };
  return (
    <Chat>
      <Channel
        channel={channel}
        doSendMessageRequest={doSendMessageRequest}
        Message={TranslatedMessage}>
        <MessageList />
        <CustomMessageInput />
      </Channel>
    </Chat>
  );
};

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

const ChannelScreen = props => {
  const {navigation} = props;
  const {channel, setThread} = useAppContext();
  return (
    <Channel channel={channel}>
      <MessageList
        onThreadSelect={message => {
          if (channel?.id) {
            setThread(message);
            navigation.navigate('ThreadScreen');
          }
        }}
      />
      <MessageInput />
    </Channel>
  );
};

const ThreadScreen = props => {
  const {channel, thread} = useAppContext();

  return (
    <Channel channel={channel} thread={thread}>
      <Thread />
    </Channel>
  );
};

const chatClient = StreamChat.getInstance(chatApiKey);

const NavigationStack = () => {
  const {clientIsReady} = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading Chat ...</Text>;
  }
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen
            name="ChannelList"
            component={ChannelListScreen}
            options={{title: 'Chats'}}
          />
          <Stack.Screen
            name="ChatComponent"
            component={ChatComponent}
            options={{title: 'Omar'}}
          />
          <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default () => {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <NavigationStack />
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </AppProvider>
  );
};
