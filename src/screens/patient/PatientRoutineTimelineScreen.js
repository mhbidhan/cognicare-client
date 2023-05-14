import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';
import * as WebBrowser from 'expo-web-browser';
import globalStyles from '../../utils/globalStyle';
import OkayaCheckInScreen from '../../components/okaya/OkayaCheckInScreen';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';
import { ImageBackground } from 'react-native';
import nightWallpaper from '../../assets/nightWallpaper.png';
import PatientName from '../../components/PatientName/PatientName';

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
  const patientData = useSelector((state) => state.patient.patientData);

  const handleOpenBrowser = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.okaya.me/dashboard/DirectAccess/landing?company=527437'
      );
    } catch (error) {
      console.log(error);
    }
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
      <View style={[globalStyles.container, { opacity: 1 }]}>
        <Text
          style={{ fontSize: globalStyles.fontSizes.large, color: 'white' }}
        >
          Greetings, <PatientName />
        </Text>
        <Timeline
          style={styles.list}
          data={data}
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
        {/* <OkayaCheckInScreen /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 10,
          }}
        >
          <ButtonFilled
            text='Okaya Check In'
            onPressHandler={handleOpenBrowser}
            icon='video-plus'
            width={155}
          />
          {/* <ButtonFilled
            text='Send SMS'
            onPressHandler={() => navigation.navigate('PatientSendSms')}
            icon='message-processing'
            width={155}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default PatientRoutineTimelineScreen;
