import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  // Text,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Avatar, BottomNavigation, Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import globalStyles from './../../../utils/globalStyle';
import PatientCard from '../../../components/PatientCard/PatientCard';
import { getData } from './../../../localStorage';
import { useGetAllPatientsQuery } from './../../../features/patient/patientApi';
import pic from './../../../assets/pic.jpg';
import ButtonFilled from './../../../components/common/buttons/ButtonFilled';
import Stat from './../../../components/PatientsDetails/Stat';
import Routine from './../../../components/PatientsDetails/Routine';
import Info from './../../../components/PatientsDetails/Info';

const Tab = createMaterialBottomTabNavigator();

function PatienDetails({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Info' component={Info} />
      <Tab.Screen name='Routine' component={Routine} />
      <Tab.Screen name='Stat' component={Stat} />
    </Tab.Navigator>
  );
}

export default PatienDetails;
