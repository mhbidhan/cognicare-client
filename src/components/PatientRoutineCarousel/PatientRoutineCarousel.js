import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { IconButton, MD3Colors, Button } from 'react-native-paper';
import Meal from '../../assets/cognicare-assets/meal/meal-assistance-female-svgrepo-com.png';
import Medicine from '../../assets/cognicare-assets/medicine/medicines-pill-svgrepo-com.png';
import Exercise from '../../assets/cognicare-assets/exercise/exercise-autumn-svgrepo-com.png';
import getPatientRoutine from '../../utils/getPatientRoutine';
import convertTimeToNumber from '../../utils/convertTimeToNumber';

const PatientRoutineCarousel = () => {
  const [patientRoutine, setPatientRoutine] = useState(null);

  const convertToChart = (routine) => {
    const item = {};
    const activityType = routine.activityType;
    item.title = routine[activityType].name;
    item.description = routine[activityType].description;
    item.time = routine.startTime.timeInString;
    item.type = activityType;
    return item;
  };

  const fetchRoutine = async () => {
    try {
      const routines = await getPatientRoutine();
      const currentRoutines = routines[0].routineElements;
      const currentItems = [];
      const currentTime = convertTimeToNumber();
      const currentTimeInNumber = currentTime.timeInNumber;
      currentRoutines.forEach((routine) => {
        if (routine.endTime.timeInNumber > currentTimeInNumber) {
          const routineForChart = convertToChart(routine);
          currentItems.push(routineForChart);
        }
      });
      // console.log(currentItems);
      setPatientRoutine(currentItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
        <View>
          {item.type ? (
            <Image
              source={
                (item.type === 'meal' && Meal) ||
                (item.type === 'medicine' && Medicine) ||
                (item.type === 'exercise' && Exercise)
              }
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Text>Icon</Text>
          )}
        </View>
        <View>
          <Text style={styles.text}>
            {item.time} - {item.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        <Text style={[styles.subtitle, { paddingBottom: 5 }]}>Next tasks</Text>
        <Button
          icon='download'
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
});
export default PatientRoutineCarousel;
