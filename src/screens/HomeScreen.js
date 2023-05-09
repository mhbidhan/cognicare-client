import React, { useState } from 'react';
import { View } from 'react-native';
import SampleSvg from '../assets/sampleSvg';
// import ButtonFilled from './../components/common/buttons/ButtonFilled';
import { Button } from 'react-native-paper';
import globalStyles from '../utils/globalStyle';

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
  );
}
