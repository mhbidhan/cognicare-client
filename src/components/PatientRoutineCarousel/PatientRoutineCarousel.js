import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
// import exerciseIcon from '../../assets/carousel/weight-dumbbell-svgrepo-com.png';
// import exerciseIcon from '../../assets/carousel/star-fill.png';
import exerciseIcon from '../../assets/carousel/clock.png';

const PatientRoutineCarousel = ({ setTaskCount }) => {
  const [patientRoutine, setPatientRoutine] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('night');

  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) setTimeOfDay('day');
    else setTimeOfDay('night');
  };

  const convertToCarouselData = (
    routine,
    currentRoutineId,
    currentTimeInNumber
  ) => {
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
          const routineForCarousel = convertToCarouselData(
            routineElement,
            currentRoutineId,
            currentTimeInNumber
          );
          currentItems.push(routineForCarousel);
        }
      });
      const taskOverPercentage =
        total === 0 ? 0 : Math.floor((over / total) * 100);
      setPatientRoutine(currentItems);
      setTaskCount([over, total, taskOverPercentage]);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsCompleted = async (routineElementId, currentRoutineId) => {
    try {
      await markRoutineElementAsCompleted(routineElementId, currentRoutineId);
      fetchRoutine();
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      fetchRoutine();

      return () => {
        isActive = false;
      };
    }, [])
  );

  useEffect(() => {
    getTimeOfDay();
    fetchRoutine();
  }, []);

  const renderItem = ({ item, index }) => {
    const iconSize = item.type === 'exercise' ? 40 : 40;
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
              style={{ width: iconSize, height: iconSize }}
            />
          ) : (
            <Text>Icon</Text>
          )}
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
        {item.startTimeInNumber <= item.currentTimeInNumber && (
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
          Upcoming tasks
        </Text>
        {/* <Button
          icon='reload'
          onPress={fetchRoutine}
          mode='contained'
          dark={true}
        >
          Reload
        </Button> */}
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
