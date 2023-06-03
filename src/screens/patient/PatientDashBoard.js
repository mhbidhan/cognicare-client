import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import globalStyles from '../../utils/globalStyle';
import ProgressCircle from 'react-native-progress-circle';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import PatientName from '../../components/PatientName/PatientName';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import PatientRoutineCarousel from '../../components/PatientRoutineCarousel/PatientRoutineCarousel';
import day from '../../assets/lotties/9878-background-full-screen.json';
import night from '../../assets/lotties/night.json';
import LottieView from 'lottie-react-native';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';
import getPatientDetailsFromStorage from '../../utils/getPatientDetailsFromStorage';
import * as WebBrowser from 'expo-web-browser';

const PatientDashBoard = ({ route }) => {
  const [showOkayaInfo, setShowOkayaInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [okayaPass, setOkayaPass] = useState();
  const [patientEmail, setPatientEmail] = useState();
  const [patientName, setPatientName] = useState();
  const [patientId, setPatientId] = useState();
  const [taskCount, setTaskCount] = useState(); // [completed, total, percentage]
  const [timeOfDay, setTimeOfDay] = useState('night');
  const [greetingTimeOfDay, setGreetingTimeOfDay] = useState('morning');
  const [emergencyPhone, setEmergencyPhone] = useState();
  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) setTimeOfDay('day');
    else setTimeOfDay('night');

    if (currentHour <= 11) setGreetingTimeOfDay('morning');
    else if (currentHour <= 17) setGreetingTimeOfDay('afternoon');
    else setGreetingTimeOfDay('evening');
  };

  const handleCallButtonPress = () => {
    Linking.openURL(`tel:${emergencyPhone}`);
  };

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

  useEffect(() => {
    getTimeOfDay();
    const setEmergencyPhoneNumber = async () => {
      const { emergencyPhone } = await getPatientDetailsFromStorage();
      setEmergencyPhone(emergencyPhone);
    };
    setEmergencyPhoneNumber();
    console.log('patientDashboard useEffect');
  }, []);

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
      {/* <LottiePatientBackground /> */}
      <LottieView
        autoPlay
        source={timeOfDay === 'day' ? day : night}
        style={{
          position: 'absolute',
          height: Dimensions.get('screen').height,
        }}
      />
      <View
        style={[globalStyles.container, { justifyContent: 'space-between' }]}
      >
        <View style={styles.greeting}>
          <Text
            style={[
              {
                color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
                fontSize: 30,
                fontWeight: 'bold',
              },
            ]}
          >
            Good {greetingTimeOfDay}, <PatientName />
          </Text>
        </View>
        <View style={styles.trackBackground}>
          <PatientRoutineCarousel setTaskCount={setTaskCount} />
        </View>
        {taskCount && (
          <View
            style={[
              styles.cardBackground,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 20,
                paddingRight: 20,
              },
            ]}
          >
            <View style={{ gap: 5 }}>
              <Text
                style={{
                  color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                }}
              >
                Today's{'\n'}Progress
              </Text>
              <Text
                style={{
                  color: timeOfDay === 'day' ? 'black' : 'white',
                  fontSize: 18,
                }}
              >
                {taskCount[0]} of {taskCount[1]} completed
              </Text>
            </View>
            <View>
              {/* <Image source={Meal} style={{ width: 50, height: 50 }} /> */}
              <ProgressCircle
                percent={taskCount[2]}
                radius={50}
                borderWidth={5}
                color='white'
                shadowColor={
                  timeOfDay === 'day' ? '#8998b0' : globalStyles.colors.primary
                }
                bgColor={timeOfDay === 'day' ? '#5f94e8' : '#343C87'}
                // bgColor=''
              >
                <Text
                  style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}
                >
                  {taskCount[2]}%
                </Text>
              </ProgressCircle>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'space-between',
          }}
        >
          <ButtonFilled
            text='Daily Journal'
            onPressHandler={handleOkayaCheckIn}
            icon='video-plus'
            width={155}
          />
          <ButtonFilled
            text='Emergency Call'
            color={'rgb(252, 61, 3)'}
            onPressHandler={handleCallButtonPress}
          />
          {showOkayaInfo && (
            <View
              style={{
                position: 'absolute',
                top: -400,
                left: 10,
                width: Dimensions.get('window').width - 60,
                height: 350,
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
                zIndex: 100,
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}
                >
                  Your credentials for mood checkin
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 100,
    padding: 12,
    marginLeft: 4,
    marginRight: 4,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d4d4d',
  },
  trackBackground: {},
  greeting: {
    marginTop: 50,
  },
  cardBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default PatientDashBoard;
