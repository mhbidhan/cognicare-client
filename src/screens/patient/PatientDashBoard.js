import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import nightWallpaper from '../../assets/nightWallpaper.png';
import globalStyles from '../../utils/globalStyle';
import Meal from '../../assets/cognicare-assets/meal/meal-assistance-female-svgrepo-com.png';
import Medicine from '../../assets/cognicare-assets/medicine/medicines-pill-svgrepo-com.png';
import Exercise from '../../assets/cognicare-assets/exercise/exercise-autumn-svgrepo-com.png';
import ProgressCircle from 'react-native-progress-circle';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';

const PatientDashBoard = ({ route }) => {
  const [patientToken, setPatientToken] = useState('');
  useEffect(() => {
    const showToken = async () => {
      try {
        const currentPatientToken = await AsyncStorage.getItem('patientToken');
        console.log(currentPatientToken);
        setPatientToken(currentPatientToken);
      } catch (error) {
        console.log(error);
      }
    };
    showToken();
  }, []);

  const { isPatientState, isNoUserState, isCareTakerState } = route.params;

  const logout = async () => {
    try {
      await AsyncStorage.setItem('patientToken', '');
      isPatientState(false);
      isCareTakerState(false);
      isNoUserState(true);
    } catch (error) {
      console.log(error);
    }
  };

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
            Good morning, {patientToken && JSON.parse(patientToken).name}
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
        <View
          style={[
            styles.trackBackground,
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
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
              Today's{'\n'}Progress
            </Text>
            <Text style={{ color: '#cccccc', fontSize: 18 }}>
              1 of 12 completed
            </Text>
          </View>
          <View>
            {/* <Image source={Meal} style={{ width: 50, height: 50 }} /> */}
            <ProgressCircle
              percent={30}
              radius={50}
              borderWidth={3}
              color='white'
              shadowColor={globalStyles.colors.primaryDarker}
              bgColor='#343C87'
              // bgColor=''
            >
              <Text
                style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}
              >
                {'30%'}
              </Text>
            </ProgressCircle>
          </View>
        </View>
        <View style={styles.trackBackground}>
          {/* <Text>{patientToken && patientToken}</Text> */}
          {/* <ButtonFilled text='Logout' width={20} onPressHandler={logout} /> */}
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
});

export default PatientDashBoard;
