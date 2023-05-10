import React from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import nightWallpaper from '../../assets/nightWallpaper.png';

const PatientDashBoard = () => {
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
    </View>
  );
};

export default PatientDashBoard;
