import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import LottiePatientBackground from '../LottieBackgrounds/LottiePatientBackground';
import { SERVER_URL } from './../../config';
import { setThisPatientRoutine } from './../../features/caretaker/caretakerSlice';
import globalStyles from './../../utils/globalStyle';
import Description from './Description';
import HeroSection from './HeroSection';

function Info({ navigation }) {
  const dispatch = useDispatch();
  const { thisPatient, patientRoutine } = useSelector(
    (state) => state.caretaker
  );
  const PatientLoginCode = thisPatient.loginCode;
  // console.log('this-patient', thisPatient);
  // console.log('info-> thisPatientRoutine', patientRoutine);

  useEffect(() => {
    fetch(`${SERVER_URL}/patientRoutine`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-patient-token': thisPatient.loginCode,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // if (res.length > 0) {
        const tempRoutine = [];
        // console.log('this patient routine response', res);
        res.map((item, i) => {
          item.routineElements
            .sort((a, b) => a.startTime.timeInNumber - b.startTime.timeInNumber)
            .map((routine) => {
              const data = {
                time: routine.startTime.timeInString,
                title: routine.name,
                description: routine[routine.activityType].description,
                circleColor: '#009688',
              };
              tempRoutine.push(data);
            });
        });

        dispatch(
          setThisPatientRoutine({
            patientRoutine: tempRoutine,
          })
        );
        // }
      })
      .catch((error) => {
        console.log('Error fetching', error);
      });
  }, [PatientLoginCode]);

  const handleChange = (value) => {
    if (value === 'addRoutine') {
      navigation.navigate('Add-Routine');
    } else {
      navigation.navigate('Add-Contact');
    }
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <LottiePatientBackground />
      <HeroSection thisPatient={thisPatient} />
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginHorizontal: 10,
        }}
      >
        <ToggleButton.Row onValueChange={handleChange}>
          <ToggleButton
            icon='card-account-phone-outline'
            value='addContact'
            iconColor='white'
          />
          <ToggleButton
            icon='calendar-range'
            value='addRoutine'
            iconColor='white'
          />
        </ToggleButton.Row>
      </View>
      <Description patient={thisPatient} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: globalStyles.colors.primary,
    shadowColor: globalStyles.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: globalStyles.colors.primary,
  },
  textView: {
    flexDirection: 'row',
    gap: 6,
  },
  lable: {
    fontWeight: '900',
    color: globalStyles.colors.primary,
  },
  text: {
    color: globalStyles.colors.primary,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  modalParentView: {
    position: 'relative',
  },
  modal: {
    flex: 1,
    padding: 10,
    backgroundColor: globalStyles.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonView: {
    marginTop: 30,
  },
  descView: {
    flex: 1,
  },
});

export default Info;
