import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const showToast = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};

export const sendSMS = async (number, content) => {
  try {
    const url = 'https://rest.nexmo.com/sms/json';

    // The "to" number is a string that includes the area code. Example: "8801742646813";
    // The content is a string containing what you want to send through text.
    const bodyData = {
      api_key: '18e51d6d',
      api_secret: 'FF2RhkA12J3S24zR',
      from: '13652660851',
      to: number,
      text: content,
    };
    const bodyJSON = JSON.stringify(bodyData);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyJSON,
    };
    const res = await fetch(url, options);
    const resJson = await res.json();
    console.log('resJson form sendSms', resJson);
    const response = resJson.messages[0].status;
    if (response !== '0') {
      showToast('error', 'Not sent', "Couldn't send message");
    } else {
      showToast(
        'success',
        'Sent',
        'Message sent successfully. Opening video browser in 5 seconds.'
      );
    }
    // const response = '0';
    return response;
  } catch (error) {
    console.log(error);
  }
};

// const SendSmsScreen = () => {
//   const [phone, setPhone] = useState('');
//   const [message, setMessage] = useState('');
//   const [phoneError, setPhoneError] = useState(false);
//   const [messageError, setMessageError] = useState(false);
//   const [messageRespone, setMessageRespone] = useState('Initial Response');

//   async function sendSMS(number, content) {
//     try {
//       const url = 'https://rest.nexmo.com/sms/json';

//       // The "to" number is a string that includes the area code. Example: "8801742646813";
//       // The content is a string containing what you want to send through text.
//       const bodyData = {
//         api_key: '18e51d6d',
//         api_secret: 'FF2RhkA12J3S24zR',
//         from: '13652660851',
//         to: 8801715325040,
//         text: `I want to have a meet with you. Join through this link: `,
//       };
//       const bodyJSON = JSON.stringify(bodyData);
//       const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: bodyJSON,
//       };
//       const res = await fetch(url, options);
//       const resJson = await res.json();
//       if (resJson.messages[0].status !== '0') return -1;
//       return 1;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const validatePhone = (txt) => {
//     return txt.length >= 9;
//   };

//   const validateMessage = (txt) => {
//     return txt.trim().length !== 0;
//   };

//   const showToast = (type, text1, text2) => {
//     Toast.show({
//       type,
//       text1,
//       text2,
//     });
//   };

//   const handleSendSMS = async () => {
//     try {
//       if (!validatePhone(phone)) {
//         setPhoneError(true);
//         return;
//       } else {
//         setPhoneError(false);
//       }
//       if (!validateMessage(message)) {
//         setMessageError(true);
//         return;
//       } else {
//         setMessageError(false);
//       }
//       const response = await sendSMS(phone, message);
//       if (response === -1) {
//         showToast('error', 'Not sent', "Couldn't send message");
//       } else {
//         showToast('success', 'Sent', 'Message sent successfully');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, position: 'relative', alignItems: 'center' }}>
//       <ImageBackground
//         source={nightWallpaper}
//         resizeMode='cover'
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           bottom: 0,
//           right: 0,
//           opacity: 0.3,
//         }}
//       ></ImageBackground>
//       <TextInput
//         style={globalStyles.textInput}
//         placeholder='Enter Phone Number'
//         onChangeText={setPhone}
//         value={phone}
//         inputMode='tel'
//         placeholderTextColor='white'
//         selectionColor='white'
//       />
//       {phoneError && (
//         <Text style={styles.error}>
//           Number should be 11 digits starting with 01
//         </Text>
//       )}
//       <TextInput
//         style={globalStyles.textInput}
//         placeholder='Enter Text'
//         onChangeText={setMessage}
//         value={message}
//         multiline={true}
//         numberOfLines={10}
//         placeholderTextColor='white'
//         selectionColor='white'
//       />
//       {messageError && (
//         <Text style={styles.error}>Message should not be empty</Text>
//       )}
//       <View
//         style={{
//           alignItems: 'center',
//           marginTop: 30,
//           // marginLeft: 20,
//           // marginRight: 20,
//         }}
//       >
//         <ButtonFilled
//           text='Send SMS'
//           width={155}
//           onPressHandler={handleSendSMS}
//           icon='message-processing'
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   error: {
//     color: 'white',
//   },
// });

// export default SendSmsScreen;
