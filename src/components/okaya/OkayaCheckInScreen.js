import React from 'react';
import { Button } from 'react-native';
import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import ButtonFilled from './../common/buttons/ButtonFilled';

function OkayaCheckInScreen() {
  const handleOpenBrowser = async () => {
    await WebBrowser.openBrowserAsync(
      'https://www.okaya.me/dashboard/DirectAccess/landing?company=527437'
    );
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ButtonFilled
        text='Open Okaya in Browser'
        onPressHandler={handleOpenBrowser}
      />
    </View>
  );
}

export default OkayaCheckInScreen;
