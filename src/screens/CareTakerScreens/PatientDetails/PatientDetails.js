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
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import globalStyles from './../../../utils/globalStyle';
import PatientCard from '../../../components/PatientCard/PatientCard';
import { getData } from './../../../localStorage';
import { useGetAllPatientsQuery } from './../../../features/patient/patientApi';
import pic from './../../../assets/pic.jpg';
import ButtonFilled from './../../../components/common/buttons/ButtonFilled';
import Stat from './../../../components/PatientsDetails/Stat';
import Routine from './../../../components/PatientsDetails/Routine';
import Info from './../../../components/PatientsDetails/Info';
import MyTheme from '../../../assets/Theme/myTheme';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

function PatientDetails({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName='PatientDashStatboard'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Stat') {
            iconName = focused ? 'chart-box' : 'chart-box-outline';
            iconText = 'Stats';
          } else if (route.name === 'Routine') {
            iconName = focused ? 'timeline' : 'timeline-outline';
            iconText = 'Routine';
          } else if (route.name === 'Info') {
            iconName = focused ? 'account' : 'account-outline';
            iconText = 'Profile';
          }

          // You can return any component that you like here!
          // return (
          //   <MaterialCommunityIcons
          //     name={iconName}
          //     size={32}
          //     color={MyTheme.colors.primary}
          //   />
          // );
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
      <Tab.Screen name='Info' component={Info} />
      <Tab.Screen name='Routine' component={Routine} />
      <Tab.Screen name='Stat' component={Stat} />
    </Tab.Navigator>
  );
}

export default PatientDetails;
