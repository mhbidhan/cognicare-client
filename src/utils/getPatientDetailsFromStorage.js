import AsyncStorage from '@react-native-async-storage/async-storage';

const getPatientDetailsFromStorage = async () => {
  try {
    const currentPatientToken = JSON.parse(
      await AsyncStorage.getItem('patientToken')
    );
    const patientName = currentPatientToken.name;
    const patientId = currentPatientToken._id;
    return { patientName, patientId };
  } catch (error) {
    console.log(error);
  }
};

export default getPatientDetailsFromStorage;
