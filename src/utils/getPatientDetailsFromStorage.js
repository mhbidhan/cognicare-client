import AsyncStorage from '@react-native-async-storage/async-storage';

const getPatientDetailsFromStorage = async () => {
  try {
    const currentPatientToken = JSON.parse(
      await AsyncStorage.getItem('patientToken')
    );
    const patientName = currentPatientToken.name;
    const patientId = currentPatientToken._id;
    const okayaPass = currentPatientToken.okayaPass;
    const patientEmail = currentPatientToken.email;
    const emergencyPhone = currentPatientToken.emergencyContact.phone;
    return { patientName, patientId, okayaPass, patientEmail, emergencyPhone };
  } catch (error) {
    console.log(error);
  }
};

export default getPatientDetailsFromStorage;
