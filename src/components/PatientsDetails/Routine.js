import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';
import globalStyles from './../../utils/globalStyle';
import ButtonFilled from './../common/buttons/ButtonFilled';
import LottiePatientBackground from '../LottieBackgrounds/LottiePatientBackground';
import { deleteThisPatientRoutineElement } from './../../features/caretaker/caretakerSlice';

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

const Routine = ({ navigation }) => {
  const dispatch = useDispatch();
  const { patientRoutine } = useSelector((state) => state.caretaker);
  // console.log('patientRoutine', patientRoutine);

  const deleteHandeler = (item) => {
    dispatch(deleteThisPatientRoutineElement({ element: item }));
  };

  const renderDetail = (rowData, sectionID, rowID) => {
    let title = (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>
          {rowData.title}
        </Text>
        <TouchableOpacity
          style={{
            color: '#fff',
            backgroundColor: globalStyles.colors.primaryDarker,
            width: 20,
            height: 20,
            borderRadius: 20,
          }}
          onPress={() => deleteHandeler(rowData)}
        >
          <Text
            style={{
              color: '#fff',
              // paddingTop: 2,
              // paddingHorizontal: 2,
              // paddingBottom: 3,
              textAlign: 'center',
            }}
          >
            x
          </Text>
        </TouchableOpacity>
      </View>
    );
    var desc = null;
    if (rowData.description)
      desc = (
        <View>
          {/* <Image source={{ uri: rowData.imageUrl }} style={styles.image} /> */}
          <Text>{rowData.description}</Text>
        </View>
      );

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 5,
          gap: 10,
        }}
      >
        {title}
        {desc}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <LottiePatientBackground />
      <ScrollView>
        <View style={[globalStyles.container, { opacity: 1 }]}>
          {patientRoutine && (
            <Timeline
              style={styles.list}
              data={patientRoutine}
              separator={true}
              circleSize={20}
              timeContainerStyle={{ width: 68, marginTop: 0 }}
              timeStyle={{
                textAlign: 'center',
                backgroundColor: '#cccccc', //'#404040',
                color: 'white', // 'black',
                padding: 5,
                borderRadius: 13,
                overflow: 'hidden',
              }}
              titleStyle={{
                color: 'white', //'rgb(105, 15, 117)',
              }}
              descriptionStyle={{
                color: 'white', //'rgb(105, 15, 117)',
              }}
              options={{
                style: { paddingTop: 5 },
              }}
              renderDetail={renderDetail}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Routine;
