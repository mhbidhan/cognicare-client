import { StyleSheet } from 'react-native';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PatientRoutineTimelineScreen from '../screens/patient/PatientRoutineTimelineScreen';
import PatientContactScreen from '../screens/patient/PatientContactScreen';
import PatientDashBoard from '../screens/patient/PatientDashBoard';
import PatientActivityScreen from '../screens/patient/PatientActivityScreen';
import PatientProfileScreen from '../screens/patient/PatientProfileScreen';
import PatientGameScreen from '../screens/patient/PatientGameScreen';
import MyTheme from '../assets/Theme/myTheme';

const Tab = createMaterialBottomTabNavigator();

const PatientNav = ({ isPatientState, isNoUserState, isCareTakerState }) => {
  return (
    <Tab.Navigator
      initialRouteName='PatientDashboard'
      labeled={false}
      barStyle={{ backgroundColor: 'white' }}
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
        component={PatientActivityScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
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
      <Tab.Screen
        name='PatientGame'
        component={PatientGameScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
export default PatientNav;
