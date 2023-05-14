import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

import Timeline from 'react-native-timeline-flatlist';
import ButtonFilled from '../common/buttons/ButtonFilled';
import globalStyles from '../../utils/globalStyle';
import { useSelector } from 'react-redux';
import { patientApi } from '../../features/patient/patientApi';

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
  const [showOkayaPatientInfo, setShowOkayaPatientInfo] = useState(false);
  const { thisPatient } = useSelector((state) => state.caretaker);

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

    // console.log('patientData from routineList', thisPatient);

    setRoutineData(routineData);
  }, []);

  const showOkaya = async () => {
    try {
      setShowOkayaPatientInfo(true);
    } catch (error) {
      console.log(error);
    }
  };

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
    <View style={globalStyles.container}>
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
      )}
      <Button mode='contained' onPress={() => setView('activityType')}>
        Add Task
      </Button>
      {!showOkayaPatientInfo ? (
        <ButtonFilled
          text='Register Patient to Okaya'
          onPressHandler={() => setShowOkayaPatientInfo(true)}
          icon='video-plus'
          width={155}
        />
      ) : (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 32 }}>
            1. Go to this url from your PC:
            https://www.okaya.me/dashboard/DirectAccess/landing?company=527437
            {'\n'}
            2. Register the patient by giving the required information. {'\n'}
            3. Use 'Invite2023' as Invite code. And then do the first checkin.
          </Text>
          <ButtonFilled
            text='Close Info'
            onPressHandler={() => setShowOkayaPatientInfo(false)}
            icon='video-plus'
            width={155}
          />
        </View>
      )}
    </View>
  );
};

export default RoutineList;
