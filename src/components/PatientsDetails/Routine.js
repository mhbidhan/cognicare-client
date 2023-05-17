import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';
import globalStyles from './../../utils/globalStyle';
import ButtonFilled from './../common/buttons/ButtonFilled';
import LottiePatientBackground from '../LottieBackgrounds/LottiePatientBackground';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: 'white',
  },
  list: {
    // flex: 1,
    // marginTop: 20,
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

const Routine = ({ navigation }) => {
  const { patientRoutine } = useSelector((state) => state.caretaker);
  console.log('routine-page', patientRoutine);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <LottiePatientBackground />
      <View style={[globalStyles.container, { opacity: 1 }]}>
        <Timeline
          style={styles.list}
          data={patientRoutine}
          separator={true}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
          timeStyle={{
            textAlign: 'center',
            backgroundColor: '#ff9797',
            color: 'white',
            padding: 5,
            borderRadius: 13,
            overflow: 'hidden',
          }}
          descriptionStyle={{ color: 'gray' }}
          options={{
            style: { paddingTop: 5 },
          }}
        />
      </View>
      {/* <ButtonFilled text='Send SMS' /> */}
    </View>
  );
};

export default Routine;
