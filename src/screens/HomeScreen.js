import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import SampleSvg from '../assets/sampleSvg';
import Koala from '../assets/Koala';
import ButtonFilled from './../components/common/buttons/ButtonFilled';
import nightWallpaper from '../assets/nightWallpaper.png';
// import Toast from 'react-native-toast-message';

export default function HomeScreen({ navigation }) {
  function onPressHandler(page) {
    navigation.navigate(page);
  }

  return (
    <ImageBackground
      source={nightWallpaper}
      resizeMode='cover'
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 90,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Koala />
          <SampleSvg />
        </View>
        <View style={{ gap: 20 }}>
          <ButtonFilled
            text='Care-Taker'
            icon='account-eye'
            onPressHandler={() => onPressHandler('CareTakerLogIn')}
          />
          <ButtonFilled
            text='Patient'
            icon='account-plus-outline'
            onPressHandler={() => onPressHandler('PatientSignIn')}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
