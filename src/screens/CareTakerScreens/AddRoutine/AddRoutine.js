import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_URL } from './../../../config';
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
import { setThisPatientRoutine } from './../../../features/caretaker/caretakerSlice';

const AddRoutineScreen = ({ patientId, navigation }) => {
  const dispatch = useDispatch();
  const [view, setView] = useState('');
  const [routineType, setRoutineType] = useState('daily');
  const [currentActivity, setCurrentActivity] = useState(null);
  const { caretakerToken, thisPatient } = useSelector(
    (state) => state.caretaker
  );
  const [formData, setFormData] = useState({
    routineType: '',
    patient: '',
    date: '',
    routineElements: [],
  });
  const [postRoutineElement, { data, isLoading, isError }] =
    usePostRoutineElementMutation() || {};

  useEffect(() => {
    setFormData((formData) => ({ ...formData, patient: patientId }));
  }, [patientId]);

  const saveHandeler = () => {
    const thisPatientRoutine = [];
    const routineLength = formData.routineElements.length;
    formData.routineElements.map((item, i) => {
      fetch(`${SERVER_URL}/routineElement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': caretakerToken,
        },
        body: JSON.stringify(item),
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log('routine element', res);
          thisPatientRoutine.push(res);
          if (i === routineLength - 1) {
            console.log('ultimate call', thisPatientRoutine);
            const data = {
              routineType: routineType,
              patient: thisPatient._id,
              date: '',
              routineElements: thisPatientRoutine,
            };
            fetch(`https://ac67-113-11-37-34.ngrok-free.app/patientRoutine`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': caretakerToken,
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.routineElements) {
                  // console.log('this patient routine', res);
                  // dispatch(
                  //   setThisPatientRoutine({
                  //     patientRoutine: res.routineElements,
                  //   })
                  // );
                  setFormData({
                    routineType: '',
                    patient: '',
                    date: '',
                    routineElements: [],
                  });
                  //     navigation.navigate('Patient_Details');
                }
              })
              .catch((error) => {
                console.log('Error fetching', error);
              });
          }
        })
        .catch((error) => {
          console.log('Error fetching', error);
        });
    });
  };

  // useEffect(() => {
  //   if (!isLoading && !isError && data) {
  //     console.log(data);
  //     navigation.navigate('Patient_Details');
  //   }
  // }, [isLoading, data]);

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
            loading={isLoading}
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
