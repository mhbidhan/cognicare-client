import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  Alert,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import SampleSvg from '../assets/sampleSvg';
import Koala from '../assets/Koala';
import ButtonFilled from './../components/common/buttons/ButtonFilled';
import yellowBackground from '../assets/yellowBackground.png';
import blueBackground from '../assets/blueBackground.png';
import nightWallpaper from '../assets/nightWallpaper.png';

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
      {/* <Text>Hello</Text> */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 90,
        }}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}
        >
          {/* <SampleSvg /> */}
          <Koala />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 20,
          }}
        >
          <ButtonFilled
            text='Care-Taker'
            onPressHandler={() => onPressHandler('CareTakerLogIn')}
          />
          <ButtonFilled
            text='Patient'
            onPressHandler={() => onPressHandler('PatientSignIn')}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
