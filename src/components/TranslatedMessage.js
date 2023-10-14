import React, {useEffect, useState} from 'react';
import {MessageSimple} from 'stream-chat-react-native';

const TranslatedMessage = props => {
  const [translatedText, setTranslatedText] = useState(props.message.text);

  useEffect(() => {
    // Assume fetchTranslatedMessage is a function that fetches the
    // translated message from your backend.
    fetchTranslatedMessage(props.message.id)
      .then(translatedMessage => {
        setTranslatedText(translatedMessage.text);
      })
      .catch(error => {
        console.error('Error fetching translated message:', error);
      });
  }, [props.message]);

  return (
    <MessageSimple
      {...props}
      message={{...props.message, text: translatedText}}
    />
  );
};

export default TranslatedMessage;
