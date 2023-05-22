import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import { Avatar, Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import day from '../../assets/lotties/9878-background-full-screen.json';
import LogoutPatient from '../../components/Logout/Logout.Patient';
import globalStyles from '../../utils/globalStyle';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import night from '../../assets/lottieNightPatient.json';
import getPatientDetailsFromStorage from '../../utils/getPatientDetailsFromStorage';
// import night from '../../assets/lotties/night.json';
import LottieView from 'lottie-react-native';
import dayPng from '../../assets/dayPng.png';
import nightPng from '../../assets/nightPng.png';

const PatientProfileScreen = ({ route }) => {
  const { isPatientState, isNoUserState, isCareTakerState } = route.params;
  const [patientDetails, setPatientDetails] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('night');

  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) setTimeOfDay('day');
    else setTimeOfDay('night');
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        const patientDetailsFromStorage = await getPatientDetailsFromStorage();
        setPatientDetails(patientDetailsFromStorage);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
    getTimeOfDay();
    console.log('patientProfile useEffect');
  }, []);

  const logout = () => {
    const clearAndLogout = async () => {
      await AsyncStorage.setItem('patientToken', '');
      isPatientState(false);
      isCareTakerState(false);
      isNoUserState(true);
    };
    clearAndLogout();
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ImageBackground
        source={timeOfDay === 'day' ? dayPng : nightPng}
        resizeMode='cover'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          opacity: 1,
        }}
      ></ImageBackground>
      {/* {timeOfDay !== 'day' ? (
        <LottiePatientBackground />
      ) : (
        <LottieView
          autoPlay
          source={day}
          style={{
            position: 'absolute',
            height: Dimensions.get('screen').height,
          }}
        />
      )} */}
      <View style={[globalStyles.container, { opacity: 1, gap: 40 }]}>
        {patientDetails && (
          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
              gap: 30,
              flex: 1,
              justifyContent: 'center',
            }}
          >
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
                  style={{
                    color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Name
                </Text>
                <Text
                  variant='bodyLarge'
                  style={{
                    color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Relationship Status
                </Text>
                <Text
                  variant='bodyLarge'
                  style={{
                    color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Gender
                </Text>
              </View>
              <View>
                <Text
                  variant='bodyLarge'
                  style={{
                    color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
                  }}
                >
                  : {patientDetails.patientName}
                </Text>
                <Text
                  variant='bodyLarge'
                  style={{
                    color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
                  }}
                >
                  : {patientDetails.patientRelationshipStatus}
                </Text>
                <Text
                  variant='bodyLarge'
                  style={{
                    color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
                  }}
                >
                  : {patientDetails.patientGender}
                </Text>
              </View>
            </View>
            <Button icon='logout' mode='contained' dark={true} onPress={logout}>
              Logout
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default PatientProfileScreen;
