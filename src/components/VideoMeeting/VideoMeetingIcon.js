import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { createMeeting } from '../../services/vonageService';
import * as WebBrowser from 'expo-web-browser';
import { IconButton, MD3Colors } from 'react-native-paper';
import ButtonFilled from '../common/buttons/ButtonFilled';
import { sendSMS } from '../../screens/patient/SendSmsScreen';
import getPatientDetailsFromStorage from '../../utils/getPatientDetailsFromStorage';
import showToast from '../Toast/showToast';

const VideoMeetingIcon = ({ phoneNumber }) => {
  const [hostUrl, setHostUrl] = useState();
  const [guestUrl, setGuestUrl] = useState();

  async function handlePress() {
    try {
      const data = await createMeeting();

      if (!data) {
        showToast('error', 'Error', 'Check your connection');
        return;
      }

      const patientdata = await getPatientDetailsFromStorage();
      const { patientName } = patientdata;

      console.log(data);
      setHostUrl(data._links.host_url.href);
      setGuestUrl(data._links.guest_url.href);
      console.log(data._links.host_url.href);
      console.log(data._links.guest_url.href);
      const response = await sendSMS(
        phoneNumber, // phone number should be in this format '8801827600970' (inlcuding the country code). Otherwise message will not work,
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

  if (guestUrl)
    return (
      <IconButton
        icon='close-circle-outline'
        iconColor={MD3Colors.primary}
        size={20}
        onPress={onClose}
        mode='contained'
      />
    );
  return (
    <IconButton
      icon='video-check'
      iconColor={MD3Colors.primary}
      size={20}
      onPress={handlePress}
      mode='contained'
    />
  );
};

const styles = StyleSheet.create({});
export default VideoMeetingIcon;
