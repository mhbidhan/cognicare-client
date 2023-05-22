import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import LottieView from 'lottie-react-native';
import globalStyles from '../../utils/globalStyle';
import PatientName from '../../components/PatientName/PatientName';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import getPatientRoutine from '../../utils/getPatientRoutine';
import { sortRoutine } from '../../utils/routine';
import getPatientTodayLogs from '../../utils/getPatientTodayLogs';
import convertTimeToNumber from '../../utils/convertTimeToNumber';
import day from '../../assets/lotties/9878-background-full-screen.json';
import night from '../../assets/lotties/night.json';
import dayPng from '../../assets/dayPng.png';
import nightPng from '../../assets/nightPng.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 20,
    paddingTop: 10,
  },
});

const data = [
  {
    time: '09:00',
    title: 'Breakfast',
    description:
      'For breakfast you are going to eat below things:\n1. Egg\n2. Bread\n3. Jelly',
    circleColor: '#009688',
    lineColor: '#009688',
  },
  {
    time: '10:00',
    title: 'Medicine',
    description:
      'Take the medicines listed below:\n1. Donepezil Aricept®\n2. Galantamine Razadyne®\n3. Rivastigmine Exelon®',
  },
  { time: '13:00', title: 'Shower', description: 'Remember to take a shower' },
  {
    time: '14:00',
    title: 'Lunch',
    description:
      'For lunch you are going to eat below things:\n1. rice\n2. beef\n3. fish\n4. egg',
    lineColor: '#009688',
  },
  {
    time: '16:30',
    title: 'Go to Fitness center',
    description: "Head out to Fitness Gym for your today's workout",
    circleColor: '#009688',
  },
];

const PatientRoutineTimelineScreen = ({ navigation }) => {
  const [routine, setRoutine] = useState();
  const [dataForTimeline, setDataForTimeline] = useState();
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

  const convertedToTimelineData = (
    routineItem,
    currentTimeInNumber,
    todaysLogs,
    isDay
  ) => {
    const dataForTimeline = {};
    dataForTimeline.time = routineItem.startTime.timeInString;
    const activityType = routineItem.activityType;
    dataForTimeline.title = routineItem[activityType].name;
    dataForTimeline.description = routineItem[activityType].description;
    dataForTimeline.circleColor = '#009688';
    dataForTimeline.lineColor = '#009688';
    let completed = false;
    todaysLogs.forEach((logItem) => {
      if (
        logItem.routineElementId === routineItem._id &&
        logItem.status === 'complete'
      ) {
        completed = true;
      }
    });
    dataForTimeline.completed = completed;
    const timePassed = routineItem.endTime.timeInNumber < currentTimeInNumber;
    dataForTimeline.timePassed = timePassed;
    if (timePassed) {
      if (!completed) {
        dataForTimeline.circleColor = 'red';
        dataForTimeline.lineColor = 'red';
      } else {
        dataForTimeline.circleColor = '#009688';
        dataForTimeline.lineColor = '#009688';
      }
    } else {
      dataForTimeline.circleColor = isDay ? '#333333' : 'white';
      dataForTimeline.lineColor = isDay ? '#333333' : 'white';
    }
    return dataForTimeline;
  };

  const setCurrentRoutine = useCallback(async (isDay) => {
    const routine = await getPatientRoutine();
    const currentRoutineId = routine._id;
    const todaysLogs = await getPatientTodayLogs(currentRoutineId);
    const currentTime = convertTimeToNumber();
    const currentTimeInNumber = currentTime.timeInNumber;
    const currentRoutine = routine.routineElements;
    sortRoutine(currentRoutine);
    const currentItems = [];
    currentRoutine.forEach((routineItem) => {
      const dataForTimeline = convertedToTimelineData(
        routineItem,
        currentTimeInNumber,
        todaysLogs,
        isDay
      );
      currentItems.push(dataForTimeline);
    });
    setRoutine(currentRoutine);
    setDataForTimeline(currentItems);
  }, []);

  useEffect(() => {
    getTimeOfDay();
    const currentHour = new Date().getHours();
    let isDay = false;
    if (currentHour >= 6 && currentHour < 18) isDay = true;
    setCurrentRoutine(isDay);
    console.log('patientRoutineTimeline useEffect');
  }, []);

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
      <View style={[globalStyles.container, { opacity: 1 }]}>
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
        <ScrollView>
          {dataForTimeline && (
            <Timeline
              style={styles.list}
              data={dataForTimeline}
              separator={true}
              circleSize={20}
              timeContainerStyle={{ width: 68, marginTop: 0 }}
              timeStyle={{
                textAlign: 'center',
                backgroundColor: timeOfDay === 'day' ? '#404040' : '#cccccc',
                color: timeOfDay === 'day' ? 'white' : 'black',
                padding: 5,
                borderRadius: 13,
                overflow: 'hidden',
              }}
              titleStyle={{
                color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
              }}
              descriptionStyle={{
                color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
              }}
              options={{
                style: { paddingTop: 5 },
              }}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default PatientRoutineTimelineScreen;
