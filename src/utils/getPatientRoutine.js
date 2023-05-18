import { SERVER_URL } from '../config';
import getPatientDetailsFromStorage from './getPatientDetailsFromStorage';

const getPatientRoutine = async () => {
  try {
    const { patientLoginCode } = await getPatientDetailsFromStorage();
    const url = `${SERVER_URL}/patientRoutine`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-patient-token': patientLoginCode,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('from patient routine', error);
  }
};

export default getPatientRoutine;
