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

export const translateAndStoreMessage = async message => {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error('Failed to translate and store message');
    }
  } catch (error) {
    console.error('Error translating/storing message:', error);
    throw error; // Or handle error as per your requirement
  }
};
