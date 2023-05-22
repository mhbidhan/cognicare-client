import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Stat from '../components/PatientsDetails/Stat';
import Notification from '../components/PushNotification/Notification';
import RoutineList from '../components/RoutineList/RoutineList';
import AddContact from '../screens/CareTakerScreens/AddContact/AddContact';
import AddPatient from '../screens/CareTakerScreens/AddPatient/AddPatient';
import AddRoutine from '../screens/CareTakerScreens/AddRoutine/AddRoutine';
import PatientDetails from '../screens/CareTakerScreens/PatientDetails/PatientDetails';
import PatientList from '../screens/CareTakerScreens/PatientList/PatientList';
import ModalScreen from '../screens/ModalScreen';

const Stack = createStackNavigator();

const CaretakerNav = ({ isPatientState, isNoUserState, isCareTakerState }) => {
  return (
    <Stack.Navigator initialRouteName="Patient List">
      <Stack.Screen
        name="ModalScreen"
        component={ModalScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name="Add-Contact"
        component={AddContact}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name="Routine-List"
        component={RoutineList}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name="Add-Routine"
        component={AddRoutine}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name="Stat"
        component={Stat}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name="Patient List"
        component={PatientList}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name="Add Patient"
        component={AddPatient}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name="Patient Details"
        component={PatientDetails}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
export default CaretakerNav;
