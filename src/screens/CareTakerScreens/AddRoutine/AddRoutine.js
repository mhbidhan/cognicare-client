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

const AddRoutineScreen = ({ patientId }) => {
  const [view, setView] = useState('genaral');
  const [formData, setFormData] = useState({
    routineType: '',
    patient: '',
    date: '',
    routineElements: [],
  });
  const [currentActivity, setCurrentActivity] = useState(null);

  useEffect(() => {
    setFormData((formData) => ({ ...formData, patient: patientId }));
  }, [patientId]);

  return (
    <Container styles={{ alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
        }}
      >
        {!view ? (
          <RoutineList setView={setView} data={formData.routineElements} />
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
    </Container>
  );
};

export default AddRoutineScreen;
