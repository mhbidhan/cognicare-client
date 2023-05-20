import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import globalStyles from '../../utils/globalStyle';
import PatientName from '../../components/PatientName/PatientName';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import getPatientRoutine from '../../utils/getPatientRoutine';
import { sortRoutine } from '../../utils/routine';
import getPatientTodayLogs from '../../utils/getPatientTodayLogs';
import convertTimeToNumber from '../../utils/convertTimeToNumber';

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

  const convertedToTimelineData = (
    routineItem,
    currentTimeInNumber,
    todaysLogs
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
      dataForTimeline.circleColor = 'white';
      dataForTimeline.lineColor = 'white';
    }
    return dataForTimeline;
  };

  const setCurrentRoutine = useCallback(async () => {
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
        todaysLogs
      );
      currentItems.push(dataForTimeline);
    });
    setRoutine(currentRoutine);
    setDataForTimeline(currentItems);
  }, []);

  useEffect(() => {
    setCurrentRoutine();
  }, [setCurrentRoutine]);

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
      <View style={[globalStyles.container, { opacity: 1 }]}>
        <Text
          style={{ fontSize: globalStyles.fontSizes.large, color: 'white' }}
        >
          Greetings, <PatientName />
        </Text>
        <ScrollView>
          {dataForTimeline && (
            <Timeline
              style={styles.list}
              data={dataForTimeline}
              separator={true}
              circleSize={20}
              circleColor='#cccccc'
              lineColor='rgb(45,156,219)'
              timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
              timeStyle={{
                textAlign: 'center',
                backgroundColor: '#cccccc',
                color: 'black',
                padding: 5,
                borderRadius: 13,
                overflow: 'hidden',
              }}
              titleStyle={{ color: 'white' }}
              descriptionStyle={{ color: '#cccccc' }}
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
