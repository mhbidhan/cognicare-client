import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createMeeting } from '../../services/vonageService';
import * as WebBrowser from 'expo-web-browser';
import ButtonFilled from '../common/buttons/ButtonFilled';
import { sendSMS } from '../../screens/patient/SendSmsScreen';
import getPatientDetailsFromStorage from '../../utils/getPatientDetailsFromStorage';

const VideoMeeting = () => {
  const [hostUrl, setHostUrl] = useState();
  const [guestUrl, setGuestUrl] = useState();

  async function handlePress() {
    try {
      const data = await createMeeting();
      const patientdata = await getPatientDetailsFromStorage();
      const { patientName, emergencyPhone } = patientdata;

      console.log(data);
      setHostUrl(data._links.host_url.href);
      setGuestUrl(data._links.guest_url.href);
      console.log(data._links.host_url.href);
      console.log(data._links.guest_url.href);
      const response = await sendSMS(
        emergencyPhone, // phone number should be in this format '8801827600970' (inlcuding the country code). Otherwise message will not work,
        `CogniCare: ${patientName} wants to have a video call with you. Please join here- ${data._links.guest_url.href}`
      );
      console.log('response', response);
      if (response === '0')
        setTimeout(() => {
          WebBrowser.openBrowserAsync(data._links.host_url.href);
        }, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  const onClose = () => {
    setHostUrl(false);
    setGuestUrl(false);
  };

  return (
    <View>
      {hostUrl ? (
        <View style={{ flex: 1 }}>
          <ButtonFilled
            text='Close'
            onPressHandler={onClose}
            color='white'
            icon='close-circle-outline'
          />
        </View>
      ) : null}
      {!guestUrl && (
        <ButtonFilled
          text='Start New Meeting'
          onPressHandler={handlePress}
          icon='video-check-outline'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
export default VideoMeeting;
