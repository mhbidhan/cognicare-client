import React, { useState } from 'react';
import {
  View,
  Text,
  // Button,
  TextInput,
  Image,
  Alert,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import SampleSvg from '../assets/sampleSvg';
import { Button } from 'react-native-paper';
import Koala from '../assets/Koala';
// import ButtonFilled from './../components/common/buttons/ButtonFilled';
import yellowBackground from '../assets/yellowBackground.png';
import blueBackground from '../assets/blueBackground.png';
import nightWallpaper from '../assets/nightWallpaper.png';
import globalStyles from '../utils/globalStyle';

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
        <Koala />
        <View style={{ gap: 20 }}>
          <Button
            icon='account-eye'
            mode='elevated'
            buttonColor={globalStyles.colors.primary}
            textColor={globalStyles.colors.primaryLight}
            contentStyle={{
              width: 300,
              paddingVertical: 10,
            }}
            style={{ borderRadius: 10 }}
            labelStyle={{ fontSize: 17 }}
            onPress={() => onPressHandler('CareTakerLogIn')}
          >
            Care-Taker
          </Button>
          <Button
            icon='account-plus-outline'
            mode='elevated'
            buttonColor={globalStyles.colors.primary}
            textColor={globalStyles.colors.primaryLight}
            contentStyle={{
              width: 300,
              paddingVertical: 10,
            }}
            style={{ borderRadius: 10 }}
            labelStyle={{ fontSize: 17 }}
            onPress={() => onPressHandler('PatientSignIn')}
          >
            Patient
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}
