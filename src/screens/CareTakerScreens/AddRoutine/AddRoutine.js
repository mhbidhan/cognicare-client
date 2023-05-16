import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import ActivityTypeList from '../../../components/ActivityTypeList/ActivityTypeList';
import GenaralActivityForm from '../../../components/GenaralActivityForm/GenaralActivityForm';
import MealActivityForm from '../../../components/MealActivityForm/MealActivityForm';
import MedicineActivityForm from '../../../components/MedicineActivityForm/MedicineActivityForm';
import ExerciseActivityForm from '../../../components/ExerciseActivityForm/ExerciseActivityForm';
import ContactActivityForm from '../../../components/ContactActivityForm/ContactActivityForm';
import GameActivityForm from '../../../components/GameActivityForm/GameActivityForm';
import RoutineList from '../../../components/RoutineList/RoutineList';
import Container from '../../../components/common/Container/Container';
import LottieBackground from '../../../components/LottieBackgrounds/LottiePatientBackground';
import { usePostRoutineElementMutation } from './../../../features/caretaker/caretakerApi';

const AddRoutineScreen = ({ patientId }) => {
  const [view, setView] = useState('');
  const [currentActivity, setCurrentActivity] = useState(null);
  const [formData, setFormData] = useState({
    routineType: '',
    patient: '',
    date: '',
    routineElements: [],
  });
  const [postRoutineElement, { data, isLoading, isError }] =
    usePostRoutineElementMutation() || {};

  // useEffect(() => {
  //   console.log(formData.routineElements);
  // }, [formData]);

  useEffect(() => {
    setFormData((formData) => ({ ...formData, patient: patientId }));
  }, [patientId]);

  const saveHandeler = () => {
    formData.routineElements.map((item) => {
      console.log(item);
      // postRoutineElement(item);
    });
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
