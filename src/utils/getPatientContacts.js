import { SERVER_URL } from '../config';
import getPatientDetailsFromStorage from './getPatientDetailsFromStorage';

const getPatientContacts = async () => {
  try {
    const {
      patientId,
      emergencyImage,
      emergenyContact,
      emergencyPhone,
      emergencyName,
      emergencyRelation,
    } = await getPatientDetailsFromStorage();
    const url = `${SERVER_URL}/patients/${patientId}/contacts`;
    const response = await (await fetch(url)).json();
    const emergencyIncluded = [
      {
        imgUrl: emergencyImage,
        name: emergencyName,
        phone: emergencyPhone,
        relation: emergencyRelation,
      },
      ...response,
    ];
    console.log(emergencyIncluded);
    return emergencyIncluded;
  } catch (error) {
    console.log(error);
  }
};

export default getPatientContacts;
