import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import AddPatient from './src/screens/CareTakerScreens/AddPatient/AddPatient';
import LoginScreen from './src/screens/CareTakerScreens/LoginScreen/LoginScreen';
import PatientDetails from './src/screens/CareTakerScreens/PatientDetails/PatientDetails';
import PatientList from './src/screens/CareTakerScreens/PatientList/PatientList';
import SignupScreen from './src/screens/CareTakerScreens/SignupScreen/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import PatientContactScreen from './src/screens/patient/PatientContactScreen';
import PatientDashBoard from './src/screens/patient/PatientDashBoard';
import PatientProfileScreen from './src/screens/patient/PatientProfileScreen';
import PatientRoutineTimelineScreen from './src/screens/patient/PatientRoutineTimelineScreen';
import SignInScreen from './src/screens/patient/SignInScreen';
import store from './src/store/store';

import MeditationGame from './src/components/MeditationGame/MeditationGame';
import Stat from './src/components/PatientsDetails/Stat';
import AddContact from './src/screens/CareTakerScreens/AddContact/AddContact';
import TestingFile from './src/screens/CareTakerScreens/NotificationModalFileFile/MeditationModal';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#343C87',
    background: '#343C87',
    card: '#343C87',
    text: 'white',
    border: '#343C87',
    notification: '#343C87',
  },
};

const App = () => {
  const [isCareTaker, setIsCareTaker] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [isNoUser, setIsNoUser] = useState(false);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState(null);
  const [patient, setPatient] = useState(null);

  const getPatient = useCallback(async () => {
    const user = await getPatientDetailsFromStorage();

    setPatient(user);
  }, []);

  useEffect(() => {
    getPatient();
  }, [getPatient]);

  useEffect(() => {
    if (patient) {
      const socket = io(SERVER_URL, {
        query: {
          userId: patient.patientId,
        },
      });

      setSocket(socket);
    }
  }, [patient]);

  useEffect(() => {
    if (socket) {
      socket.on('taskReminder', (data) => {
        console.log('data', data);
      });
    }
  }, [socket]);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(MyTheme.colors.primary);
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
    const setScreens = async () => {
      try {
        const careTakerToken = await AsyncStorage.getItem('caretakerToken');
        const patientToken = careTakerToken
          ? null
          : await AsyncStorage.getItem('patientToken');
        if (careTakerToken) {
          setIsPatient(false);
          setIsNoUser(false);
          setIsCareTaker(true);
          return;
        }
        if (patientToken) {
          setIsCareTaker(false);
          setIsNoUser(false);
          setIsPatient(true);
          return;
        }
        setIsCareTaker(false);
        setIsPatient(false);
        setIsNoUser(true);
      } catch (error) {
        console.log(error);
      }
    };
    setScreens();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
        <StatusBar backgroundColor={MyTheme.colors.background} />
        <NavigationContainer theme={MyTheme}>
          {isNoUser && (
            <Unauthenticated
              isPatientState={setIsPatient}
              isNoUserState={setIsNoUser}
              isCareTakerState={setIsCareTaker}
            />
          )}
          {isCareTaker && (
            <CaretakerNav
              isPatientState={setIsPatient}
              isNoUserState={setIsNoUser}
              isCareTakerState={setIsCareTaker}
            />
          )}
          {isPatient && (
            <PatientNav
              isPatientState={setIsPatient}
              isNoUserState={setIsNoUser}
              isCareTakerState={setIsCareTaker}
            />
          )}
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
