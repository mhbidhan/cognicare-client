import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/CareTakerScreens/LoginScreen/LoginScreen';
import SignInScreen from '../screens/patient/SignInScreen';
import SignupScreen from '../screens/CareTakerScreens/SignupScreen/SignupScreen';

const Stack = createStackNavigator();

const Unauthenticated = ({
  isPatientState,
  isNoUserState,
  isCareTakerState,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name='CareTakerLogIn'
        component={LoginScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name='PatientSignIn'
        component={SignInScreen}
        initialParams={{
          isPatientState,
          isNoUserState,
          isCareTakerState,
        }}
      />
      <Stack.Screen
        name='Signup'
        component={SignupScreen}
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
export default Unauthenticated;
