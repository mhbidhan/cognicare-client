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
    const patientRelationshipStatus = currentPatientToken.relationship;
    const patientGender = currentPatientToken.gender;
    const patientImage = currentPatientToken.imgUrl;
    const emergencyPhone = currentPatientToken.emergencyContact.phone;
    const patientLoginCode = currentPatientToken.loginCode;
    const emergenyContact = currentPatientToken.emergencyContact;
    const emergencyImage = currentPatientToken.emergencyContact.imgUrl;
    const emergencyName = currentPatientToken.emergencyContact.name;
    const emergencyRelation = currentPatientToken.emergencyContact.relation;
    // console.log('emergencyContact', emergenyContact);
    return {
      patientName,
      patientId,
      okayaPass,
      patientEmail,
      patientRelationshipStatus,
      patientGender,
      patientImage,
      patientLoginCode,
      emergencyPhone,
      emergencyImage,
      emergencyName,
      emergencyRelation,
    };
  } catch (error) {
    console.log(error);
  }
};

export default getPatientDetailsFromStorage;
