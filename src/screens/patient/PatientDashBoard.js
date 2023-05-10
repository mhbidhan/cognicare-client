import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import nightWallpaper from '../../assets/nightWallpaper.png';
import globalStyles from '../../utils/globalStyle';
import Meal from '../../assets/cognicare-assets/meal/meal-assistance-female-svgrepo-com.png';
import Medicine from '../../assets/cognicare-assets/medicine/medicines-pill-svgrepo-com.png';
import Exercise from '../../assets/cognicare-assets/exercise/exercise-autumn-svgrepo-com.png';

const PatientDashBoard = () => {
  // const items = [
  //   { title: 'Item 1' },
  //   { title: 'Item 2' },
  //   { title: 'Item 3' },
  //   { title: 'Item 4' },
  //   { title: 'Item 5' },
  //   { title: 'Item 6' },
  // ];

  const items = [
    {
      time: '09:00',
      title: 'Breakfast',
      description:
        'For breakfast you are going to eat below things:\n1. Egg\n2. Bread\n3. Jelly',
      circleColor: '#009688',
      lineColor: '#009688',
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
      lineColor: '#009688',
    },
    {
      time: '16:30',
      title: 'Go to Fitness center',
      description: "Head out to Fitness Gym for your today's workout",
      circleColor: '#009688',
      type: 'exercise',
    },
  ];

  const renderItem = ({ item, index }) => {
    console.log(Meal);
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
      <View
        style={[globalStyles.container, { justifyContent: 'space-between' }]}
      >
        <View style={styles.trackBackground}>
          <Text style={[{ color: 'white', fontSize: 32, fontWeight: 'bold' }]}>
            Good morning, Touhid
          </Text>
        </View>
        <View style={styles.trackBackground}>
          <Text style={[styles.subtitle, { paddingBottom: 5 }]}>
            Next tasks
          </Text>
          <Carousel
            data={items}
            renderItem={renderItem}
            sliderWidth={Math.round(Dimensions.get('window').width * 0.88)}
            itemWidth={270}
            loop={false}
            activeSlideAlignment='start'
            containerCustomStyle={{}}
            inactiveSlideScale={1}
          />
        </View>
        <View style={styles.trackBackground}>
          <Text>Today's Progress</Text>
        </View>
        <View style={styles.trackBackground}>
          <Text>Planning</Text>
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
    fontSize: 24,
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

export default PatientDashBoard;
