import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text, Button } from 'react-native-paper';

import LogoutPatient from '../../components/Logout/Logout.Patient';
import globalStyles from '../../utils/globalStyle';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import getPatientDetailsFromStorage from '../../utils/getPatientDetailsFromStorage';

const PatientProfileScreen = ({ route }) => {
  const { isPatientState, isNoUserState, isCareTakerState } = route.params;
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const patientDetailsFromStorage = await getPatientDetailsFromStorage();
        console.log(patientDetailsFromStorage);
        setPatientDetails(patientDetailsFromStorage);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, []);

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
        {patientDetails && (
          <View style={{ alignItems: 'center', marginVertical: 20, gap: 30 }}>
            <Avatar.Image
              size={200}
              source={{
                uri: patientDetails.patientImage,
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
                  : {patientDetails.patientName}
                </Text>
                <Text variant='bodyLarge' style={{ color: 'white' }}>
                  : {patientDetails.patientRelationshipStatus}
                </Text>
                <Text variant='bodyLarge' style={{ color: 'white' }}>
                  : {patientDetails.patientGender}
                </Text>
              </View>
            </View>
          </View>
        )}
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
