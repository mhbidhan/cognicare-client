import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, View, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import SampleSvg from '../assets/sampleSvg';
import Koala from '../assets/Koala';
import ButtonFilled from './../components/common/buttons/ButtonFilled';
import nightWallpaper from '../assets/nightWallpaper.png';
// import Toast from 'react-native-toast-message';
import animationImg from './../assets/night.json';
import globalStyles from './../utils/globalStyle';

export default function HomeScreen({ navigation }) {
  const animation = useRef(null);
  function onPressHandler(page) {
    navigation.navigate(page);
  }

  return (
    // <ImageBackground
    //   source={animationImg}
    //   resizeMode='cover'
    //   style={{ flex: 1 }}
    // >
    <View
      // style={{
      //   flex: 1,
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   gap: 90,
      // }}
      style={{ flex: 1, position: 'relative', height: '100%', width: '100%' }}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: -1,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={animationImg}
        imageAssetsFolder='lottie/welcomeScreen/images'
        resizeMode='cover'
      />
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
    </View>
    // </ImageBackground>
  );
}
