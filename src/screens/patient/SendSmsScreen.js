import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import globalStyles from '../../utils/globalStyle';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';
import {
  VONAGE_SMS_API_KEY,
  VONAGE_SMS_API_SECRET,
  VONAGE_SMS_API_OUR_NUMBER,
} from '../../config';

const SendSmsScreen = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [messageRespone, setMessageRespone] = useState('Initial Response');

  async function sendSMS(number, content) {
    const url = 'https://rest.nexmo.com/sms/json';

    // The "to" number is a string that includes the area code. Example: "8801742646813";
    // The content is a string containing what you want to send through text.
    const options = {
      method: 'POST',
      body: {
        api_key: VONAGE_SMS_API_KEY,
        api_secret: VONAGE_SMS_API_SECRET,
        from: VONAGE_SMS_API_OUR_NUMBER,
        to: number,
        text: content,
      },
    };

    const res = await fetch(url, options);
    return res.json();
  }

  const handleSendSms = async () => {
    validatePhone(phone);
    validateMessage(message);
    if (phoneError || messageError) return;
    const response = await sendSMS(phone, message);
    console.log(response);
    setMessageRespone(response);
  };

  return (
    <View style={[globalStyles.container, { alignItems: 'center' }]}>
      <TextInput
        style={globalStyles.textInput}
        placeholder='Enter Phone Number'
        onChangeText={setPhone}
        value={phone}
        inputMode='tel'
      />
      <Text style={styles.error}>Error</Text>
      <TextInput
        style={globalStyles.textInput}
        placeholder='Enter Text'
        onChangeText={setMessage}
        value={phone}
        multiline={true}
        numberOfLines={10}
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: 30,
          // marginLeft: 20,
          // marginRight: 20,
        }}
      >
        <ButtonFilled
          text='Send SMS'
          width={300}
          onPressHandler={handleSendSms}
        />
      </View>
      <Text>{messageRespone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});

export default SendSmsScreen;
