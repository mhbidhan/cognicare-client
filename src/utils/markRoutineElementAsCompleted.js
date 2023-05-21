import { SERVER_URL } from '../config';

const markRoutineElementAsCompleted = async (
  routineElementId,
  currentRoutineId
) => {
  try {
    const url = `${SERVER_URL}/routineLogs`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        routineId: currentRoutineId,
        routineElementId: routineElementId,
        status: 'complete',
      }),
    };
    const respone = await fetch(url, options);
    return await respone.json();
  } catch (error) {
    console.log(error);
  }
};

export default markRoutineElementAsCompleted;
