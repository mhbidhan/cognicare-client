import { StyleSheet } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ModalScreen from '../screens/ModalScreen';
import AddContact from '../screens/CareTakerScreens/AddContact/AddContact';
import Notification from '../components/PushNotification/Notification';
import RoutineList from '../components/RoutineList/RoutineList';
import AddRoutine from '../screens/CareTakerScreens/AddRoutine/AddRoutine';
import Stat from '../components/PatientsDetails/Stat';
import PatientList from '../screens/CareTakerScreens/PatientList/PatientList';
import AddPatient from '../screens/CareTakerScreens/AddPatient/AddPatient';
import PatientDetails from '../screens/CareTakerScreens/PatientDetails/PatientDetails';

const Drawer = createDrawerNavigator();

const CaretakerNav = ({ isPatientState, isNoUserState, isCareTakerState }) => {
  return (
    <Drawer.Navigator initialRouteName='Patient_List' defaultStatus='closed'>
      <Drawer.Screen
        name='ModalScreen'
        component={ModalScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Drawer.Screen
        name='Add-Contact'
        component={AddContact}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Drawer.Screen
        name='Notification'
        component={Notification}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Drawer.Screen
        name='Routine-List'
        component={RoutineList}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Drawer.Screen
        name='Add-Routine'
        component={AddRoutine}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Drawer.Screen
        name='Stat'
        component={Stat}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Drawer.Screen
        name='Patient_List'
        component={PatientList}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Drawer.Screen
        name='Add_Patient'
        component={AddPatient}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Drawer.Screen
        name='Patient_Details'
        component={PatientDetails}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});
export default CaretakerNav;
