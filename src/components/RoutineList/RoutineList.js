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
import axios from 'axios';

import Timeline from 'react-native-timeline-flatlist';
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonFilled from '../common/buttons/ButtonFilled';
import globalStyles from '../../utils/globalStyle';
import { useSelector } from 'react-redux';
import { patientApi } from '../../features/patient/patientApi';
import nightWallpaper from '../../assets/nightWallpaper.png';
import { SERVER_URL } from '../../config';
import { TextInput } from 'react-native-paper';
import { getData } from '../../localStorage';
import showToast from '../Toast/showToast';

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

const RoutineList = ({
  data = [],
  setView,
  saveHandeler,
  loading,
  routineElements,
  routineType,
  setRoutineType,
}) => {
  const [routineData, setRoutineData] = useState([]);
  const [showOkayaPatientInfo, setShowOkayaPatientInfo] = useState(false);
  const { thisPatient } = useSelector((state) => state.caretaker);
  const [openType, setOpenType] = useState(false);
  const [okayaPass, setOkayaPass] = useState('');

  const routineTypeItems = [
    { label: 'Daily', value: 'daily' },
    { label: 'Special', value: 'special' },
  ];

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

  const handleSavePass = async () => {
    try {
      const url = `${SERVER_URL}/patients/${thisPatient._id}/setokayapass`;
      const body = { okayaPass };
      const caretakertoken = await getData('caretakerToken');
      console.log('caretakertoken patientId', caretakertoken, thisPatient._id);
      const response = await axios.put(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': caretakertoken,
        },
      });
      showToast('info', 'Saved', 'Patient mood password has been saved');
      setShowOkayaPatientInfo(false);
    } catch (error) {
      showToast('error', 'Error', 'Check your network');
      console.log(error);
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      <View style={[globalStyles.container, { opacity: 1 }]}>
        {!data.length ? (
          <>
            <View style={{ zIndex: 3 }}>
              <DropDownPicker
                open={openType}
                value={routineType}
                items={routineTypeItems}
                setOpen={setOpenType}
                setValue={setRoutineType}
                placeholder='Select Routine type'
                // zIndex={1000}
                style={{
                  marginBottom: 10,
                  width: 300,
                  borderRadius: 5,
                  // backgroundColor: globalStyles.colors.primary,
                }}
                containerStyle={{
                  width: 300,
                }}
                textStyle={{
                  color: '#000',
                  opacity: 0.4,
                }}
              />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 15,
                color: '#fff',
                textAlign: 'center',
              }}
            >
              There are no routine to add
            </Text>
          </>
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
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Button
            icon='content-save'
            mode='contained'
            onPress={saveHandeler}
            disabled={!routineElements.length}
            loading={loading}
          >
            Save
          </Button>
          <Button
            icon='calendar-range'
            mode='contained'
            onPress={() => setView('activityType')}
          >
            Add Task
          </Button>
        </View>
        {!showOkayaPatientInfo ? (
          // <ButtonFilled
          //   text='Register Patient to Okaya'
          //   onPressHandler={() => setShowOkayaPatientInfo(true)}
          //   icon='video-plus'
          //   width={155}
          // />
          <Button
            icon='video-plus'
            onPress={() => setShowOkayaPatientInfo(true)}
            mode='contained'
          >
            Register Patient to Okaya
          </Button>
        ) : (
          <View
            style={{
              position: 'absolute',
              top: 20,
              left: 5,
              width: Dimensions.get('window').width - 60,
              // height: 500,
              flex: 1,
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
              zIndex: 100,
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
                checkin. 4. Fill the email as the same email of the patient.
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                gap: 10,
                // height: 30,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'center',
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
              <View style={{ marginTop: 10 }}></View>
              <TextInput
                label='Okaya pass'
                value={okayaPass}
                onChangeText={(okayaPass) => setOkayaPass(okayaPass)}
                placeholder='Okaya Pass'
                style={{ width: 200 }}
              />
              <ButtonFilled
                text='Save Okaya Pass for this user'
                onPressHandler={handleSavePass}
                // icon='open-in-app'
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default RoutineList;
