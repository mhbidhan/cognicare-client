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
    console.log('patientLogincode, url', patientLoginCode, url);
    return await (await fetch(url, options)).json();
  } catch (error) {
    console.log(error);
  }
};

export default getPatientRoutine;
