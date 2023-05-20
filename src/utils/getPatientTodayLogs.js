import { SERVER_URL } from '../config';

const getPatientTodayLogs = async (routineId) => {
  try {
    const url = `${SERVER_URL}/routineLogs?routineId=${routineId}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default getPatientTodayLogs;
