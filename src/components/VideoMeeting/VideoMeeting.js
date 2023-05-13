import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createMeeting } from '../../services/vonageService';
import { WebView } from 'react-native-webview';
import ButtonFilled from '../common/buttons/ButtonFilled';

const VideoMeeting = () => {
  const [hostUrl, setHostUrl] = useState();
  const [guestUrl, setGuestUrl] = useState();
  const [isVisible, setIsVisible] = useState(false);
  async function handlePress() {
    try {
      const data = await createMeeting();
      console.log(data);
      setHostUrl(data._links.host_url.href);
      setGuestUrl(data._links.guest_url.href);
      setIsVisible(true);
    } catch (error) {
      console.log(error);
    }
  }

  const onClose = () => {
    setIsVisible(false);
    setHostUrl(false);
    setGuestUrl(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Testing Video - Meeting</Text>
      {hostUrl ? (
        <View style={{ flex: 1 }}>
          <WebView
            style={{ flex: 1 }}
            source={{ uri: hostUrl }}
            javaScriptEnabled
            scalesPageToFit
            isVisible={isVisible}
          />
          <ButtonFilled text='close' onPressHandler={onClose} color='white' />
        </View>
      ) : null}
      {!guestUrl && <Button title='Create Meeting' onPress={handlePress} />}
      {/* <WebView
        source={{ uri: 'https://reactnative.dev/' }}
        style={{ flex: 1 }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
export default VideoMeeting;
