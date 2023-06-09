import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { IconButton, MD3Colors, Button } from 'react-native-paper';
import Meal from '../../assets/cognicare-assets/meal/meal-assistance-female-svgrepo-com.png';
import Medicine from '../../assets/cognicare-assets/medicine/medicines-pill-svgrepo-com.png';
import Exercise from '../../assets/cognicare-assets/exercise/exercise-autumn-svgrepo-com.png';
import getPatientRoutine from '../../utils/getPatientRoutine';
import convertTimeToNumber from '../../utils/convertTimeToNumber';
import { sortRoutine } from '../../utils/routine';
import getPatientTodayLogs from '../../utils/getPatientTodayLogs';
import markRoutineElementAsCompleted from '../../utils/markRoutineElementAsCompleted';
import callIcon from '../../assets/carousel/call-day-heart-svgrepo-com.png';
import gameIcon from '../../assets/carousel/game-card-svgrepo-com.png';
import mealIcon from '../../assets/carousel/have-a-meal-svgrepo-com.png';
import exerciseIcon from '../../assets/carousel/weight-dumbbell-svgrepo-com.png';

const PatientRoutineCarousel = ({ setTaskCount }) => {
  const [patientRoutine, setPatientRoutine] = useState(null);
  const [routineId, setRoutineId] = useState();
  const [todaysLogs, setTodaysLogs] = useState();
  const [timeOfDay, setTimeOfDay] = useState('night');

  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) setTimeOfDay('day');
    else setTimeOfDay('night');
  };

  const convertToChart = (routine, currentRoutineId, currentTimeInNumber) => {
    const item = {};
    const activityType = routine.activityType;
    item.title = routine[activityType].name;
    item.description = routine[activityType].description;
    item.time = routine.startTime.timeInString;
    item.startTimeInNumber = routine.startTime.timeInNumber;
    item.currentTimeInNumber = currentTimeInNumber;
    item.type = activityType;
    item.routineElementId = routine._id;
    item.currentRoutineId = currentRoutineId;
    return item;
  };

  const isCompleted = (routineElement, todaysLogs) => {
    let completed = false;
    todaysLogs.forEach((logItem) => {
      if (
        logItem.routineElementId === routineElement._id &&
        logItem.status === 'complete'
      ) {
        completed = true;
      }
    });
    return completed;
  };

  const fetchRoutine = async () => {
    try {
      const routines = await getPatientRoutine();
      const currentRoutines = routines.routineElements;
      const currentRoutineId = routines._id;
      const todaysLogs = await getPatientTodayLogs(currentRoutineId);
      sortRoutine(currentRoutines);
      const currentItems = [];
      const currentTime = convertTimeToNumber();
      const currentTimeInNumber = currentTime.timeInNumber;
      let total = 0;
      let over = 0;
      currentRoutines.forEach((routineElement) => {
        total++;
        const isOnNext =
          routineElement.endTime.timeInNumber > currentTimeInNumber;
        const completed = isCompleted(routineElement, todaysLogs);
        if (completed) over++;

        if (isOnNext && !completed) {
          const routineForChart = convertToChart(
            routineElement,
            currentRoutineId,
            currentTimeInNumber
          );
          currentItems.push(routineForChart);
        }
      });
      const taskOverPercentage =
        total === 0 ? 0 : Math.floor((over / total) * 100);
      setPatientRoutine(currentItems);
      setTaskCount([over, total, taskOverPercentage]);
      setRoutineId(currentRoutineId);
      setTodaysLogs(todaysLogs);
    } catch (error) {
      console.log('hello', error);
    }
  };

  const markAsCompleted = async (routineElementId, currentRoutineId) => {
    try {
      const data = await markRoutineElementAsCompleted(
        routineElementId,
        currentRoutineId
      );
      fetchRoutine();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTimeOfDay();
    fetchRoutine();
  }, []);

  const items = [
    {
      time: '09:00',
      title: 'Breakfast',
      description:
        'For breakfast you are going to eat below things:\n1. Egg\n2. Bread\n3. Jelly',
      type: 'meal',
    },
    {
      time: '10:00',
      title: 'Medicine',
      description:
        'Take the medicines listed below:\n1. Donepezil Aricept®\n2. Galantamine Razadyne®\n3. Rivastigmine Exelon®',
      type: 'medicine',
    },
    {
      time: '13:00',
      title: 'Shower',
      description: 'Remember to take a shower',
    },
    {
      time: '14:00',
      title: 'Lunch',
      description:
        'For lunch you are going to eat below things:\n1. rice\n2. beef\n3. fish\n4. egg',
    },
    {
      time: '16:30',
      title: 'Go to Fitness center',
      description: "Head out to Fitness Gym for your today's workout",
      type: 'exercise',
    },
  ];
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <View style={{ justifyContent: 'space-between' }}>
          {item.type ? (
            <Image
              source={
                (item.type === 'meal' && mealIcon) ||
                (item.type === 'medicine' && Medicine) ||
                (item.type === 'exercise' && exerciseIcon) ||
                (item.type === 'game' && gameIcon)
              }
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <Text>Icon</Text>
          )}
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
        {item.startTimeInNumber < item.currentTimeInNumber && (
          <IconButton
            icon='check'
            iconColor={MD3Colors.primary0}
            size={20}
            onPress={() =>
              markAsCompleted(item.routineElementId, item.currentRoutineId)
            }
            mode='contained'
            style={{ alignSelf: 'center' }}
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
          marginBottom: 20,
        }}
      >
        <Text
          style={[
            styles.subtitle,
            {
              paddingBottom: 5,
              color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
            },
          ]}
        >
          Next tasks
        </Text>
        <Button
          icon='reload'
          onPress={fetchRoutine}
          mode='contained'
          dark={true}
        >
          Reload
        </Button>
      </View>

      {patientRoutine && (
        <Carousel
          data={patientRoutine}
          renderItem={renderItem}
          sliderWidth={Math.round(Dimensions.get('window').width * 0.88)}
          itemWidth={270}
          loop={false}
          activeSlideAlignment='start'
          containerCustomStyle={{}}
          inactiveSlideScale={1}
        />
      )}
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
    height: 150,
    padding: 12,
    marginLeft: 4,
    marginRight: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'stretch',
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
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d4d4d',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4d4d4d',
  },
  trackBackground: {},
});
export default PatientRoutineCarousel;
