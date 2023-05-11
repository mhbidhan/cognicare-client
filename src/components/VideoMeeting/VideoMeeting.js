import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createMeeting } from '../../services/vonageService';
import { WebView } from 'react-native-webview';

const VideoMeeting = () => {
  const [hostUrl, setHostUrl] = useState();
  const [guestUrl, setGuestUrl] = useState();
  async function handlePress() {
    try {
      const data = await createMeeting();
      console.log(data);
      setHostUrl(data._links.host_url.href);
      setGuestUrl(data._links.guest_url.href);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Testing Video - Meeting</Text>
      {hostUrl ? (
        <WebView style={{ flex: 1 }} source={{ uri: hostUrl }} />
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
