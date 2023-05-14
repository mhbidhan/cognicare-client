import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import * as WebBrowser from 'expo-web-browser';

import Timeline from 'react-native-timeline-flatlist';
import ButtonFilled from '../common/buttons/ButtonFilled';
import globalStyles from '../../utils/globalStyle';
import { useSelector } from 'react-redux';
import { patientApi } from '../../features/patient/patientApi';
import nightWallpaper from '../../assets/nightWallpaper.png';

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
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 30,
              width: Dimensions.get('window').width - 60,
              height: 500,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              shadowColor: '#000',
              gap: 20,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <View>
              <Text
                style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}
              >
                Register patient & checkin
              </Text>
              <Text style={{ fontSize: 20 }}>
                1. Go to this url from your PC:
                https://www.okaya.me/dashboard/DirectAccess/landing?company=527437
                {'\n'}
                2. Register the patient by giving the required information.{' '}
                {'\n'}
                3. Use 'Invite2023' as Invite code. And then do the first
                checkin.
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                gap: 10,
                height: 30,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <ButtonFilled
                text='Close'
                onPressHandler={() => setShowOkayaPatientInfo(false)}
                icon='close-circle-outline'
              />
              <ButtonFilled
                text='Open Browser'
                onPressHandler={handleOpenBrowser}
                icon='open-in-app'
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default RoutineList;
