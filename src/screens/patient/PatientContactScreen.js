import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { Text, IconButton, MD3Colors, Button } from 'react-native-paper';

import React, { useEffect, useState } from 'react';
import nightWallpaper from '../../assets/nightWallpaper.png';
import globalStyles from '../../utils/globalStyle';
import VideoMeeting from '../../components/VideoMeeting/VideoMeeting';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import PatientContactCard from '../../components/PatientContactCard/PatientContactCard';
import getPatientDetailsFromStorage from '../../utils/getPatientDetailsFromStorage';
import getPatientContacts from '../../utils/getPatientContacts';

const PatientContactScreen = () => {
  const [contacts, setContacts] = useState(null);

  const getContacts = async () => {
    try {
      const patientContatcts = await getPatientContacts();
      console.log('patientContacts', patientContatcts);
      setContacts(patientContatcts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

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
      <LottiePatientBackground />
      <View style={[globalStyles.container, { gap: 30 }]}>
        <VideoMeeting />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Text variant='headlineMedium' style={{ color: 'white' }}>
            Contacts
          </Text>
          {!contacts && (
            <Button
              icon='download'
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
              if (idx % 2 === 1) return null;
              if (idx === contacts.length - 1) {
                return (
                  <View style={styles.contactRow} key={idx}>
                    <PatientContactCard contact={contact} />
                  </View>
                );
              }
              return (
                <View style={styles.contactRow} key={idx}>
                  <PatientContactCard contact={contact} />
                  <PatientContactCard contact={contacts[idx + 1]} />
                </View>
              );
            })}

          {/* <View style={styles.contactRow}>
            <PatientContactCard />
            <PatientContactCard />
          </View>
          <View style={styles.contactRow}>
            <PatientContactCard />
            <PatientContactCard />
          </View>
          <View style={styles.contactRow}>
            <PatientContactCard />
            <PatientContactCard />
          </View>
          <View style={styles.contactRow}>
            <PatientContactCard />
            <PatientContactCard />
          </View>
          <View style={styles.contactRow}>
            <PatientContactCard />
            <PatientContactCard />
          </View> */}
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
