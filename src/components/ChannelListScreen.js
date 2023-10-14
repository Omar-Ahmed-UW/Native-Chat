import React, {useContext} from 'react';
import {ChannelList, Chat} from 'stream-chat-react-native';
import {useNavigation} from '@react-navigation/native';
import {useChatClient} from './useChatClient';

import {chatUserId} from '../../configs/chatConfig';

const ChannelListScreen = props => {
  const navigation = useNavigation();
  const {chatClient} = useChatClient();

  const filters = {
    members: {
      $in: [chatUserId], // Assuming user object contains user id
    },
  };
  const sort = {
    last_message_at: -1,
  };

  const onSelectChannel = channel => {
    navigation.navigate('ChatComponent', {
      channelId: channel.id,
      channelName: channel.data.name || channel.data.id,
    });
  };

  return (
    <Chat client={chatClient}>
      <ChannelList
        filters={filters}
        sort={sort}
        onSelect={onSelectChannel}
        // Add more props as per your requirement
      />
    </Chat>
  );
};

export default ChannelListScreen;
