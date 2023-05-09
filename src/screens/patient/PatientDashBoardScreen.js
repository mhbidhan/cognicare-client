import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';
import globalStyles from '../../utils/globalStyle';
import OkayaCheckInScreen from '../../components/okaya/OkayaCheckInScreen';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';
import { ImageBackground } from 'react-native';
import blueBackground from '../../assets/blueBackground.png';
import nightWallpaper from '../../assets/nightWallpaper.png';

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
    title: 'Archery Training',
    description:
      'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
    circleColor: '#009688',
    lineColor: '#009688',
  },
  {
    time: '10:45',
    title: 'Play Badminton',
    description:
      'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
  },
  { time: '12:00', title: 'Lunch' },
  {
    time: '14:00',
    title: 'Watch Soccer',
    description:
      'Team sport played between two teams of eleven players with a spherical ball. ',
    lineColor: '#009688',
  },
  {
    time: '16:30',
    title: 'Go to Fitness center',
    description: 'Look out for the Best Gym & Fitness Centers around me :)',
    circleColor: '#009688',
  },
];

const PatientDashBoard = ({ navigation }) => {
  const patientData = useSelector((state) => state.patient.patientData);

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
          Greetings, {patientData.name ? patientData.name : 'Touhid'}
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
        <OkayaCheckInScreen />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <ButtonFilled
            text='Send SMS'
            onPressHandler={() => navigation.navigate('PatientSendSms')}
          />
        </View>
      </View>
    </View>
  );
};

export default PatientDashBoard;
