import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import React, { useCallback, useEffect, useState } from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import io from 'socket.io-client';
import MyTheme from '../assets/Theme/myTheme';
import { SERVER_URL } from '../config';
import NotificationScreen from '../screens/patient/NotificationScreen/Notification';
import PatientContactScreen from '../screens/patient/PatientContactScreen';
import PatientDashBoard from '../screens/patient/PatientDashBoard';
import PatientGameScreen from '../screens/patient/PatientGameScreen';
import PatientProfileScreen from '../screens/patient/PatientProfileScreen';
import PatientRoutineTimelineScreen from '../screens/patient/PatientRoutineTimelineScreen';
import getPatientDetailsFromStorage from '../utils/getPatientDetailsFromStorage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

const PatientNav = ({ isPatientState, isNoUserState, isCareTakerState }) => {
  const [socket, setSocket] = useState(null);
  const [patient, setPatient] = useState(null);
  const [notification, setNotification] = useState(null);
  const [currentGame, setCurrentGame] = useState('');

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
      initialRouteName='PatientDashboard'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconText;

          // if (route.name === 'PatientDashboard') {
          //   iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          // } else if (route.name === 'PatientRoutineTimeline') {
          //   iconName = focused ? 'timeline' : 'timeline-outline';
          // } else if (route.name === 'PatientContact') {
          //   iconName = focused
          //     ? 'card-account-phone'
          //     : 'card-account-phone-outline';
          // } else if (route.name === 'PatientActivity') {
          //   iconName = focused
          //     ? 'microsoft-xbox-controller-battery-full'
          //     : 'microsoft-xbox-controller-battery-empty';
          // } else if (route.name === 'PatientProfile') {
          //   iconName = focused ? 'account' : 'account-outline';
          // } else if (route.name === 'PatientGame') {
          //   iconName = focused ? 'gamepad-circle' : 'gamepad-circle-outline';
          // }

          if (route.name === 'PatientDashboard') {
            iconName = focused ? 'home' : 'home-outline';
            iconText = 'Home';
          } else if (route.name === 'PatientRoutineTimeline') {
            iconName = focused ? 'timeline' : 'timeline-outline';
            iconText = 'Routine';
          } else if (route.name === 'PatientContact') {
            iconName = focused ? 'contacts' : 'contacts-outline';
            iconText = 'Contact';
          } else if (route.name === 'PatientActivity') {
            iconName = focused
              ? 'gamepad-circle-left'
              : 'gamepad-circle-outline';
            iconText = 'Activity';
          } else if (route.name === 'PatientProfile') {
            iconName = focused ? 'account' : 'account-outline';
            iconText = 'Profile';
          } else if (route.name === 'PatientGame') {
            iconName = focused
              ? 'gamepad-circle-left'
              : 'gamepad-circle-outline';
            iconText = 'Game';
          }

          // You can return any component that you like here!
          console.log('iconName, focused', iconName, focused);
          return (
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name={iconName} size={25} color={color} />
              {focused && (
                <Text variant='labelSmall' style={{ color: color }}>
                  {iconText}
                </Text>
              )}
            </View>
          );
          // return <Ionic name={iconName} size={32} color={color} />;
        },
        tabBarStyle: { height: 63, alignItems: 'center' },
        tabBarShowLabel: false,
        headerShown: false,
        // tabBarIconStyle: { color: 'black' },
        tabBarActiveBackgroundColor: 'white',
        tabBarActiveTintColor: MyTheme.colors.primary,
        tabBarInactiveTintColor: '#a6a6a6',
        tabBarItemStyle: { borderRadius: 25, marginVertical: 8 },
      })}
    >
      <Tab.Screen
        name='PatientRoutineTimeline'
        component={PatientRoutineTimelineScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Tab.Screen
        name='PatientContact'
        component={PatientContactScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Tab.Screen
        name='PatientDashboard'
        component={PatientDashBoard}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Tab.Screen
        name='PatientActivity'
        children={() => (
          <PatientGameScreen
            currentGame={currentGame}
            setCurrentGame={setCurrentGame}
          />
        )}
        listeners={{
          tabPress: (e) => setCurrentGame(''),
        }}
      />
      <Tab.Screen
        name='PatientProfile'
        component={PatientProfileScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
    </Tab.Navigator>
  );
};

export default PatientNav;
