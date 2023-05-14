import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import nightWallpaper from '../../assets/nightWallpaper.png';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';
import globalStyles from '../../utils/globalStyle';
import getPatientDetailsFromStorage from '../../utils/getPatientDetailsFromStorage';
import TaskRunner from '../../components/Cron/TaskRunner';
import BackgroundFetchScreen from '../../components/Cron/TaskRunner';

const PatientActivityScreen = () => {
  const [showOkayaInfo, setShowOkayaInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [okayaPass, setOkayaPass] = useState();
  const [patientEmail, setPatientEmail] = useState();
  const [patientName, setPatientName] = useState();
  const [patientId, setPatientId] = useState();
  const [gotBackgroundPermission, setGotBackgroundPermission] = useState(false);

  const handleOpenBrowser = async () => {
    try {
      const okayaUrl = `https://www.okaya.me/dashboard/DirectAccess/landing?company=527437`;
      const url = `${okayaUrl}&ciid=${patientId}`;
      console.log(url);
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.log(error);
    }
  };

  const startCron = () => {};

  const stopCron = () => {};

  const handleOkayaCheckIn = async () => {
    try {
      const patientData = await getPatientDetailsFromStorage();
      const { patientName, patientId, okayaPass, patientEmail } = patientData;
      setPatientName(patientName);
      setPatientId(patientId);
      setOkayaPass(okayaPass);
      setPatientEmail(patientEmail);
      setShowOkayaInfo(true);
    } catch (error) {
      console.log(error);
    }
  };

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
      <View style={[globalStyles.container, { opacity: 1 }]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 10,
          }}
        >
          <ButtonFilled
            text='Okaya Checkin'
            onPressHandler={handleOkayaCheckIn}
            icon='video-plus'
            width={155}
          />
          {showOkayaInfo && (
            <View
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: Dimensions.get('window').width - 60,
                height: 500,
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                shadowColor: '#000',
                gap: 20,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}
                >
                  Your credentials for okaya checkin
                </Text>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>
                  Email: {patientEmail && patientEmail}
                </Text>
                <Text style={{ fontSize: 20 }}>
                  password:{'  '}
                  {!showPassword ? (
                    <Text style={{ fontSize: 20 }}>
                      ******{'   '}
                      <MaterialCommunityIcons
                        name='eye-outline'
                        size={20}
                        color='blue'
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 20 }}>
                      {okayaPass && okayaPass}
                      {'   '}
                      <MaterialCommunityIcons
                        name='eye-off-outline'
                        size={20}
                        color='blue'
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    </Text>
                  )}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: 10,
                  height: 30,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <ButtonFilled
                  text='Close'
                  onPressHandler={() => setShowOkayaInfo(false)}
                  icon='close-circle-outline'
                />
                <ButtonFilled
                  text='Open Browser'
                  onPressHandler={handleOpenBrowser}
                  icon='open-in-app'
                />
              </View>
            </View>
          )}
        </View>
        {gotBackgroundPermission ? (
          <View>
            <ButtonFilled
              text='Add Cron'
              icon='play-circle-outline'
              onPressHandler={startCron}
            />
            <ButtonFilled
              text='Stop Cron'
              icon='stop-circle-outline'
              onPressHandler={stopCron}
            />
          </View>
        ) : (
          <BackgroundFetchScreen />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default PatientActivityScreen;
