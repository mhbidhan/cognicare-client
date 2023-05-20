import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../utils/globalStyle';
import ProgressCircle from 'react-native-progress-circle';
import PatientName from '../../components/PatientName/PatientName';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import PatientRoutineCarousel from '../../components/PatientRoutineCarousel/PatientRoutineCarousel';
import day from '../../assets/lotties/9878-background-full-screen.json';
import night from '../../assets/lotties/night.json';
import LottieView from 'lottie-react-native';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';

const PatientDashBoard = ({ route }) => {
  const [taskCount, setTaskCount] = useState(); // [over, total, percentage]
  const [timeOfDay, setTimeOfDay] = useState('night');
  const [greetingTimeOfDay, setGreetingTimeOfDay] = useState('morning');
  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) setTimeOfDay('day');
    else setTimeOfDay('night');

    if (currentHour <= 11) setGreetingTimeOfDay('morning');
    else if (currentHour <= 17) setGreetingTimeOfDay('afternoon');
    else setGreetingTimeOfDay('evening');
  };

  useEffect(() => {
    getTimeOfDay();
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
        <View style={styles.trackBackground}>
          {/* <Text>{patientToken && patientToken}</Text> */}
          {/* <ButtonFilled text='Logout' width={20} onPressHandler={logout} /> */}
          <ButtonFilled text='Emergency Call' color={'rgb(252, 61, 3)'} />
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
