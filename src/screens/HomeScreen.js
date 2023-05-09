import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native';
import SampleSvg from '../assets/sampleSvg';
import ButtonFilled from './../components/common/buttons/ButtonFilled';

export default function HomeScreen({ navigation }) {
  function onPressHandler(page) {
    navigation.navigate(page);
  }
  return (
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
        <SampleSvg />
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
  );
}
