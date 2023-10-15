export const fetchTranslatedMessage = async messageId => {
  try {
    const response = await fetch(`/api/message/${messageId}`);
    const data = await response.json();
    return data.translatedMessage;
  } catch (error) {
    console.error('Error fetching translated message:', error);
    throw error; // Or handle error as per your requirement
  }
};

export const translateAndStoreMessage = message => {
  try {
    console.log('Translating and storing message:', message);
    const response = fetch(
      'http://localhost:3000/api/translate/translateMessage',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({message}),
      },
    );
    if (!response.staus == 200) {
      console.error('Error translating/storing message:', response);
      return message;
    } else {
      console.log('Returned body:', response);
      return response;
    }
  } catch (error) {
    console.error('Error translating/storing message:', error);
    throw error; // Or handle error as per your requirement
  }
};
