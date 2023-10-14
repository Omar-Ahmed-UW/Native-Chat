import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LanguageProvider} from './src/contexts/LanguageContext';
import {useChatClient} from './src/components/useChatClient';
import ChatComponent from './src/components/ChatComponent';
import ChannelListScreen from './src/components/ChannelListScreen'; // Assumed component
// import text
import {Text} from 'react-native';
import {OverlayProvider} from 'stream-chat-react-native';

const Stack = createStackNavigator();

const chatClient = StreamChat.getInstance(chatApiKey);

const NavigationStack = () => {
  const {clientIsReady} = useChatClient(); // Using the chat client setup hook
  if (!clientIsReady) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text>Chat Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen
            name="ChannelList"
            component={ChannelListScreen}
            options={{title: 'Channels'}}
          />
          <Stack.Screen
            name="ChatComponent"
            component={ChatComponent}
            options={({route}) => ({title: route.params.channelName})}
          />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

const App = () => {
  // Optional: Display a loader until the chat client is ready
  if (!clientIsReady) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text>Chat Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <LanguageProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ChannelList"></Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </LanguageProvider>
  );
};

export default App;
