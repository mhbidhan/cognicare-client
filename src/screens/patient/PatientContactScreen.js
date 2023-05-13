import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import nightWallpaper from '../../assets/nightWallpaper.png';
import globalStyles from '../../utils/globalStyle';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';
import * as WebBrowser from 'expo-web-browser';
import { createMeeting } from '../../services/vonageService';
import VideoMeeting from '../../components/VideoMeeting/VideoMeeting';

const PatientContactScreen = () => {
  const handleOpenBrowser = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.okaya.me/dashboard/DirectAccess/landing?company=527437'
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ImageBackground
        source={nightWallpaper}
        resizeMode='cover'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          opacity: 0.3,
        }}
      ></ImageBackground>
      <View
        style={[globalStyles.container, { justifyContent: 'space-between' }]}
      >
        {/* <ButtonFilled
          text='Video Call'
          onPressHandler={createMeeting}
          icon='video-plus'
          width={155}
        /> */}
        <VideoMeeting />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default PatientContactScreen;
