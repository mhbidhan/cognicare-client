import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import ActivityTypeList from '../../../components/ActivityTypeList/ActivityTypeList';
import GenaralActivityForm from '../../../components/GenaralActivityForm/GenaralActivityForm';
import MealActivityForm from '../../../components/MealActivityForm/MealActivityForm';
import MedicineActivityForm from '../../../components/MedicineActivityForm/MedicineActivityForm';
import RoutineList from '../../../components/RoutineList/RoutineList';
import Container from '../../../components/common/Container/Container';

const AddRoutineScreen = ({ patientId }) => {
  const [view, setView] = useState('');
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
          <View>
            <Text>Exercise</Text>
            <Button mode="contained" onPress={() => setView('')}>
              Back
            </Button>
          </View>
        ) : null}
        {view === 'Game' ? (
          <View>
            <Text>Game</Text>
            <Button mode="contained" onPress={() => setView('')}>
              Back
            </Button>
          </View>
        ) : null}
        {view === 'Contact' ? (
          <View>
            <Text>Contact</Text>
            <Button mode="contained" onPress={() => setView('')}>
              Back
            </Button>
          </View>
        ) : null}
      </View>
    </Container>
  );
};

export default AddRoutineScreen;
