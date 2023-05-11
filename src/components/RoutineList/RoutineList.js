import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';

const styles = StyleSheet.create({
  container: {
    width: 500,
  },
  list: {
    width: Dimensions.get('window').width - 60,
    height: 'auto',
    marginTop: 10,
  },
});

const routineData = [
  {
    time: '09:00',
    title: 'Archery Training',
    circleColor: '#009688',
    lineColor: '#009688',
  },
  {
    time: '10:45',
    title: 'Play Badminton',
  },
  { time: '12:00', title: 'Lunch' },
  {
    time: '14:00',
    title: 'Watch Soccer',
    lineColor: '#009688',
  },
  {
    time: '16:30',
    title: 'Go to Fitness center',
  },
  {
    time: '16:30',
    title: 'Go to Fitness center',
  },
];

const RoutineList = ({ data = [], setView }) => {
  const [routineData, setRoutineData] = useState([]);

  useEffect(() => {
    const routineData = data.map((routineElement) => {
      const { name, startTime, activityType } = routineElement;

      return {
        time: startTime.timeInStringr,
        title: name,
        description: activityType,
      };
    });

    setRoutineData(routineData);
  }, [data]);
  return (
    <View style={styles}>
      {!data.length ? (
        <Text style={{ fontSize: 15, color: '#fff' }}>
          There are no routine to be shown
        </Text>
      ) : (
        <Timeline
          style={styles.list}
          data={routineData}
          separator={true}
          circleSize={20}
          circleColor="rgb(45,156,219)"
          lineColor="rgb(45,156,219)"
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
      )}
      <Button mode="contained" onPress={() => setView('activityType')}>
        Add Task
      </Button>
    </View>
  );
};

export default RoutineList;
