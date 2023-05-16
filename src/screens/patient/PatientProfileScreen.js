import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text, Button } from 'react-native-paper';

import LogoutPatient from '../../components/Logout/Logout.Patient';
import globalStyles from '../../utils/globalStyle';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';

const PatientProfileScreen = ({ route }) => {
  const { isPatientState, isNoUserState, isCareTakerState } = route.params;

  const logout = () => {
    isPatientState(false);
    isCareTakerState(false);
    isNoUserState(true);
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* <ImageBackground
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
      ></ImageBackground> */}
      <LottiePatientBackground />
      <View style={[globalStyles.container, { opacity: 1, gap: 40 }]}>
        <View style={{ alignItems: 'center', marginVertical: 20, gap: 30 }}>
          <Avatar.Image
            size={200}
            source={{
              uri: 'https://res.cloudinary.com/dimsduru1/image/upload/v1684038187/cognicare/zqdtvs0lml0vqfwxpnfm.jpg',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: 30,
            }}
          >
            <View>
              <Text
                variant='bodyLarge'
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                Name
              </Text>
              <Text
                variant='bodyLarge'
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                Relationship Status
              </Text>
              <Text
                variant='bodyLarge'
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                Gender
              </Text>
            </View>
            <View>
              <Text variant='bodyLarge' style={{ color: 'white' }}>
                : Mubtasim Shahriar
              </Text>
              <Text variant='bodyLarge' style={{ color: 'white' }}>
                : Single
              </Text>
              <Text variant='bodyLarge' style={{ color: 'white' }}>
                : Male
              </Text>
            </View>
          </View>
        </View>
        {/* <LogoutPatient
          isPatientState={isPatientState}
          isNoUserState={isNoUserState}
          isCareTakerState={isCareTakerState}
        /> */}
        <Button icon='logout' mode='contained' dark={true} onPress={logout}>
          Logout
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default PatientProfileScreen;
