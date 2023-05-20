import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import io from 'socket.io-client';
import MyTheme from '../assets/Theme/myTheme';
import FindColorGame from '../components/FindColorGame/FindColorGame';
import MeditationGame from '../components/MeditationGame/MeditationGame';
import Wordle from '../components/Wordle/Wordle';
import { SERVER_URL } from '../config';
import NotificationScreen from '../screens/patient/NotificationScreen/Notification';
import PatientContactScreen from '../screens/patient/PatientContactScreen';
import PatientDashBoard from '../screens/patient/PatientDashBoard';
import PatientGameScreen from '../screens/patient/PatientGameScreen';
import PatientProfileScreen from '../screens/patient/PatientProfileScreen';
import PatientRoutineTimelineScreen from '../screens/patient/PatientRoutineTimelineScreen';
import getPatientDetailsFromStorage from '../utils/getPatientDetailsFromStorage';

const Tab = createMaterialBottomTabNavigator();

const PatientNav = ({ isPatientState, isNoUserState, isCareTakerState }) => {
  const [socket, setSocket] = useState(null);
  const [patient, setPatient] = useState(null);
  // const [notification, setNotification] = useState({
  //   type: 'contact',
  //   message: 'Lets call Mubtasim',
  //   time: '3:00 PM',
  //   details: { name: 'meditation' },
  // });
  const [notification, setNotification] = useState(null);

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
        setNotification(data);
      });
    }
  }, [socket]);

  if (notification)
    return (
      <NotificationScreen
        notification={notification}
        setNotification={setNotification}
      />
    );

  return (
    <Tab.Navigator
      initialRouteName="PatientDashboard"
      shifting={true}
      tabBarShowLabel={false}
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'PatientDashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'PatientRoutineTimeline') {
            iconName = focused ? 'timeline' : 'timeline-outline';
          } else if (route.name === 'PatientContact') {
            iconName = focused
              ? 'card-account-phone'
              : 'card-account-phone-outline';
          } else if (route.name === 'PatientActivity') {
            iconName = focused
              ? 'microsoft-xbox-controller-battery-full'
              : 'microsoft-xbox-controller-battery-empty';
          } else if (route.name === 'PatientProfile') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'PatientGame') {
            iconName = focused ? 'gamepad-circle' : 'gamepad-circle-outline';
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={32}
              color={MyTheme.colors.primary}
            />
          );
        },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarShowLabel: false,
        tabBarIconStyle: { color: 'black' },
      })}
    >
      <Tab.Screen
        name="PatientRoutineTimeline"
        component={PatientRoutineTimelineScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Tab.Screen
        name="PatientContact"
        component={PatientContactScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Tab.Screen
        name="PatientDashboard"
        component={PatientDashBoard}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Tab.Screen
        name="PatientActivity"
        component={PatientGameScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Tab.Screen
        name="PatientProfile"
        component={PatientProfileScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Tab.Screen name="gameWrodle" component={Wordle} />
      <Tab.Screen name="gameFindColor" component={FindColorGame} />
      <Tab.Screen name="gameMeditation" component={MeditationGame} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
export default PatientNav;
