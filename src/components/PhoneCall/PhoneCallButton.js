import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import * as Linking from 'expo-linking';

const PhoneCallButton = ({ phoneNumber }) => {
  const handleCallButtonPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <IconButton
      icon='phone'
      iconColor={MD3Colors.primary}
      size={20}
      onPress={handleCallButtonPress}
      mode='contained'
    />
  );
};

const styles = StyleSheet.create({});
export default PhoneCallButton;
