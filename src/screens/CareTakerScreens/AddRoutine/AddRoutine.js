import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActivityTypeList from '../../../components/ActivityTypeList/ActivityTypeList';
import ContactActivityForm from '../../../components/ContactActivityForm/ContactActivityForm';
import ExerciseActivityForm from '../../../components/ExerciseActivityForm/ExerciseActivityForm';
import GameActivityForm from '../../../components/GameActivityForm/GameActivityForm';
import GenaralActivityForm from '../../../components/GenaralActivityForm/GenaralActivityForm';
import LottieBackground from '../../../components/LottieBackgrounds/LottiePatientBackground';
import MealActivityForm from '../../../components/MealActivityForm/MealActivityForm';
import MedicineActivityForm from '../../../components/MedicineActivityForm/MedicineActivityForm';
import RoutineList from '../../../components/RoutineList/RoutineList';
import { getData } from '../../../localStorage';
import { SERVER_URL } from '../../../config';

const AddRoutineScreen = ({ patientId, navigation }) => {
  const dispatch = useDispatch();
  const [view, setView] = useState('');
  const [routineType, setRoutineType] = useState('daily');
  const [currentActivity, setCurrentActivity] = useState(null);
  const { thisPatient } = useSelector((state) => state.caretaker);
  const [formData, setFormData] = useState({
    routineType: '',
    patient: '',
    date: '',
    routineElements: [],
  });

  useEffect(() => {
    setFormData((formData) => ({ ...formData, patient: patientId }));
  }, [patientId]);

  const saveHandeler = async () => {
    try {
      const token = await getData('caretakerToken');
      const thisPatientRoutine = [];

      // Creating routine element for each task
      for (let routineElement of formData.routineElements) {
        const newRoutineElement = await axios.post(
          SERVER_URL + '/routineElement',
          routineElement,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          }
        );

        thisPatientRoutine.push(newRoutineElement.data);
      }

      // Creating the routine
      await axios.post(
        SERVER_URL + '/patientRoutine',
        {
          routineType: routineType,
          patient: thisPatient._id,
          date: '',
          routineElements: thisPatientRoutine,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        }
      );

      navigation.navigate('Patient Details');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <LottieBackground />
      <View
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
        }}
      >
        {!view ? (
          <RoutineList
            setView={setView}
            data={formData.routineElements}
            saveHandeler={saveHandeler}
            routineElements={formData.routineElements}
          />
        ) : null}
        {view === 'activityType' ? (
          <ActivityTypeList setView={setView} />
        ) : null}
        {view === 'genaral' ? (
          <GenaralActivityForm
            setView={setView}
            currentActivity={currentActivity}
            setCurrentActivity={setCurrentActivity}
            setFormData={setFormData}
          />
        ) : null}
        {view === 'Meal' ? (
          <MealActivityForm
            setView={setView}
            setCurrentActivity={setCurrentActivity}
          />
        ) : null}
        {view === 'Medicine' ? (
          <MedicineActivityForm
            setView={setView}
            setCurrentActivity={setCurrentActivity}
          />
        ) : null}
        {view === 'Exercise' ? (
          <ExerciseActivityForm
            setView={setView}
            setCurrentActivity={setCurrentActivity}
          />
        ) : null}
        {view === 'Game' ? (
          <GameActivityForm
            setView={setView}
            setCurrentActivity={setCurrentActivity}
          />
        ) : null}
        {view === 'Contact' ? (
          <ContactActivityForm
            setView={setView}
            setCurrentActivity={setCurrentActivity}
          />
        ) : null}
      </View>
    </View>
  );
};

export default AddRoutineScreen;
