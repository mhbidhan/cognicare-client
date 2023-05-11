import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import nightWallpaper from '../../assets/nightWallpaper.png';
import LogoutPatient from '../../components/Logout/Logout.Patient';
import globalStyles from '../../utils/globalStyle';

const PatientProfileScreen = ({ route }) => {
  const { isPatientState, isNoUserState, isCareTakerState } = route.params;
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
      <View style={[globalStyles.container]}>
        <LogoutPatient
          isPatientState={isPatientState}
          isNoUserState={isNoUserState}
          isCareTakerState={isCareTakerState}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default PatientProfileScreen;
