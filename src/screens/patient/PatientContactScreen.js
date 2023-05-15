import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import nightWallpaper from '../../assets/nightWallpaper.png';
import globalStyles from '../../utils/globalStyle';
import VideoMeeting from '../../components/VideoMeeting/VideoMeeting';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';

const PatientContactScreen = () => {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* <ImageBackground
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
      ></ImageBackground> */}
      <LottiePatientBackground />
      <View
        style={[globalStyles.container, { justifyContent: 'space-between' }]}
      >
        <VideoMeeting />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default PatientContactScreen;
