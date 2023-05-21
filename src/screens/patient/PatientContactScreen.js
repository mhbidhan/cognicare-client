import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Text, IconButton, MD3Colors, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import globalStyles from '../../utils/globalStyle';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import PatientContactCard from '../../components/PatientContactCard/PatientContactCard';
import getPatientContacts from '../../utils/getPatientContacts';
import day from '../../assets/lotties/9878-background-full-screen.json';
import night from '../../assets/lotties/night.json';

const PatientContactScreen = () => {
  const [contacts, setContacts] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('night');

  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) setTimeOfDay('day');
    else setTimeOfDay('night');
  };

  const getContacts = async () => {
    try {
      const patientContatcts = await getPatientContacts();
      setContacts(patientContatcts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTimeOfDay();
    getContacts();
  }, [getTimeOfDay, getContacts]);

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
      {/* <LottiePatientBackground /> */}
      <LottieView
        autoPlay
        source={timeOfDay === 'day' ? day : night}
        style={{
          position: 'absolute',
          height: Dimensions.get('screen').height,
        }}
      />
      <View style={[globalStyles.container, { gap: 30 }]}>
        {/* <VideoMeeting /> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Text
            variant='headlineMedium'
            style={{
              color: timeOfDay === 'day' ? 'rgb(105, 15, 117)' : 'white',
              fontWeight: 'bold',
            }}
          >
            Contacts
          </Text>
          {!contacts && (
            <Button
              icon='reload'
              onPress={getContacts}
              mode='contained'
              dark={true}
            >
              Reload
            </Button>
          )}
        </View>

        <ScrollView contentContainerStyle={{ gap: 20 }}>
          {contacts &&
            contacts.map((contact, idx) => {
              return <PatientContactCard contact={contact} key={idx} />;
            })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
});

export default PatientContactScreen;
