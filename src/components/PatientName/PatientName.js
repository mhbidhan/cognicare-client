import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientName = () => {
  const [patientToken, setPatientToken] = useState('');
  useEffect(() => {
    const showToken = async () => {
      try {
        const currentPatientToken = await AsyncStorage.getItem('patientToken');
        console.log(currentPatientToken);
        setPatientToken(currentPatientToken);
      } catch (error) {
        console.log(error);
      }
    };
    showToken();
  }, []);

  return <Text>{patientToken && JSON.parse(patientToken).name}</Text>;
};

const styles = StyleSheet.create({});
export default PatientName;
