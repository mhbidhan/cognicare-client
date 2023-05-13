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

const RoutineList = ({ data = [], setView }) => {
  const [routineData, setRoutineData] = useState([]);

  useEffect(() => {
    const routineData = data
      .sort((a, b) => {
        if (a.startTime.timeInNumber > b.startTime.timeInNumber) return 1;
        else if (a.startTime.timeInNumber < b.startTime.timeInNumber) return -1;
        else 0;
      })
      .map((routineElement) => {
        const { name, startTime, activityType } = routineElement;

        return {
          time: startTime.timeInString,
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
          circleColor="#cccccc"
          lineColor="rgb(45,156,219)"
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
      )}
      <Button mode="contained" onPress={() => setView('activityType')}>
        Add Task
      </Button>
    </View>
  );
};

export default RoutineList;
