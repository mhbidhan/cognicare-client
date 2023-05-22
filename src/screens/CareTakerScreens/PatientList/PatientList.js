import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import LottiePatientBackground from '../../../components/LottieBackgrounds/LottiePatientBackground';
import PatientCard from '../../../components/PatientCard/PatientCard';
import { useGetAllPatientsQuery } from './../../../features/patient/patientApi';
import globalStyles from './../../../utils/globalStyle';

const fullHeight = Dimensions.get('window').height;
const fullWidth = Dimensions.get('window').width;

function PatientList({ navigation, route }) {
  const { isPatientState, isNoUserState, isCareTakerState } = route.params;
  const { data, isLoading, isError } = useGetAllPatientsQuery();
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setPatientList(data);
    }
  }, [isLoading, data]);

  const logout = async () => {
    try {
      await AsyncStorage.setItem('caretakerToken', '');
      isCareTakerState(false);
      isPatientState(false);
      isNoUserState(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LottiePatientBackground />
      <ScrollView
        style={{
          width: fullWidth,
        }}
      >
        <View
          style={{
            width: fullWidth - 1,
            backgroundColor: 'transparent',
            opacity: 1,
          }}
        >
          <View style={styles.buttonContainer}>
            <Button icon="logout" mode="contained" onPress={logout}>
              logout
            </Button>

            <Button
              icon="plus"
              mode="contained"
              onPress={() => navigation.navigate('Add Patient')}
            >
              Add new patient
            </Button>
          </View>
          {patientList.length ? (
            <View style={styles.cardListView}>
              {patientList.map((patient, i) => (
                <PatientCard
                  key={i}
                  patient={patient}
                  navigation={navigation}
                />
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
    width: fullWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: globalStyles.colors.primary,
  },
  cardListView: {
    padding: 20,
  },
});

export default PatientList;
