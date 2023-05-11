import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ButtonFilled from '../common/buttons/ButtonFilled';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logout = async (isPatientState, isCareTakerState, isNoUserState) => {
  try {
    await AsyncStorage.setItem('patientToken', '');
    isPatientState(false);
    isCareTakerState(false);
    isNoUserState(true);
  } catch (error) {
    console.log(error);
  }
};

const LogoutPatient = ({ isPatientState, isCareTakerState, isNoUserState }) => {
  return (
    <ButtonFilled
      text='Logout'
      onPressHandler={() =>
        logout(isPatientState, isCareTakerState, isNoUserState)
      }
      icon='logout'
      width={100}
      color='white'
    />
  );
};

export default LogoutPatient;

const styles = StyleSheet.create({});
