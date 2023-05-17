import { SERVER_URL } from '../config';
import getPatientDetailsFromStorage from './getPatientDetailsFromStorage';

const getPatientContacts = async () => {
  try {
    const { patientId } = await getPatientDetailsFromStorage();
    const url = `${SERVER_URL}/patients/${patientId}/contacts`;
    const response = await (await fetch(url)).json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getPatientContacts;
