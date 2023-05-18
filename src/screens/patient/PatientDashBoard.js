import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../utils/globalStyle';
import ProgressCircle from 'react-native-progress-circle';
import PatientName from '../../components/PatientName/PatientName';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import PatientRoutineCarousel from '../../components/PatientRoutineCarousel/PatientRoutineCarousel';

const PatientDashBoard = ({ route }) => {
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
      <View
        style={[globalStyles.container, { justifyContent: 'space-between' }]}
      >
        <View style={styles.trackBackground}>
          <Text style={[{ color: 'white', fontSize: 32, fontWeight: 'bold' }]}>
            Good morning, <PatientName />
          </Text>
        </View>
        <View style={styles.trackBackground}>
          <PatientRoutineCarousel />
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
