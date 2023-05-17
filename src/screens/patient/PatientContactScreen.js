import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import nightWallpaper from '../../assets/nightWallpaper.png';
import globalStyles from '../../utils/globalStyle';
import VideoMeeting from '../../components/VideoMeeting/VideoMeeting';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import PatientContactCard from '../../components/PatientContactCard/PatientContactCard';

const PatientContactScreen = () => {
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
        <ScrollView contentContainerStyle={{ gap: 20 }}>
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
          </View>
          <View style={styles.contactRow}>
            <PatientContactCard />
            <PatientContactCard />
          </View>
          <View style={styles.contactRow}>
            <PatientContactCard />
            <PatientContactCard />
          </View>
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
