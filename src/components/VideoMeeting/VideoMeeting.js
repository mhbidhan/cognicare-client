import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { createMeeting } from '../../services/vonageService';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import ButtonFilled from '../common/buttons/ButtonFilled';
import { sendSMS } from '../../screens/patient/SendSmsScreen';

const VideoMeeting = () => {
  const [hostUrl, setHostUrl] = useState();
  const [guestUrl, setGuestUrl] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const webViewRef = useRef(null);

  async function handlePress() {
    try {
      const data = await createMeeting();
      console.log(data);
      setHostUrl(data._links.host_url.href);
      setGuestUrl(data._links.guest_url.href);
      setIsVisible(true);
      console.log(data._links.host_url.href);
      console.log(data._links.guest_url.href);
      const response = await sendSMS(
        '8801827600970',
        `The dementia patient wants to have a video cal with you. Please join here- ${data._links.guest_url.href}`
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

  //   const INJECTED_JAVASCRIPT = `(function() {
  //     window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  // })();`;

  // const fillInput = (syntheticEvent) => {
  //   const { nativeEvent } = syntheticEvent;
  //   console.log('nativeEvent', nativeEvent);
  //   webViewRef.current.injectJavaScript(`
  //     const nameInputInterval = setInterval(() => {
  //       const input = document.querySelectorAll('input[slot="formInputElement"]')[1];
  //       if (input) {
  //         input.value = 'Mubtasim Shahriar';
  //         const joinMeetingBtn = document.querySelectorAll('vwc-button')[0];
  //         // window.alert(JSON.stringify(joinMeetingBtn))
  //         joinMeetingBtn.click();
  //         clearInterval(nameInputInterval);
  //         nameInputInterval = null;

  //       }
  //     }, 100);
  //   `);
  //   console.log('webviewRef', webViewRef.current);
  // };

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
          {/* <WebView
            ref={webViewRef}
            style={{ flex: 1 }}
            source={{ uri: hostUrl }}
            javaScriptEnabled
            scalesPageToFit
            isVisible={isVisible}
            // injectedJavaScript={INJECTED_JAVASCRIPT}
            // onMessage={this.onMessage}
            onLoad={fillInput}
            // injectedJavaScript={runFirst}
            allowWebRtc={true}
          /> */}
          <ButtonFilled text='close' onPressHandler={onClose} color='white' />
        </View>
      ) : null}
      {!guestUrl && (
        <ButtonFilled text='Create Meeting' onPressHandler={handlePress} />
      )}
      {/* <WebView
        source={{ uri: 'https://reactnative.dev/' }}
        style={{ flex: 1 }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
export default VideoMeeting;
