import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import store from './src/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import SignupScreen from './src/screens/CareTakerScreens/SignupScreen/SignupScreen';
import LoginScreen from './src/screens/CareTakerScreens/LoginScreen/LoginScreen';
import SignInScreen from './src/screens/patient/SignInScreen';
import PatientRoutineTimelineScreen from './src/screens/patient/PatientRoutineTimelineScreen';
import PatientList from './src/screens/CareTakerScreens/PatientList/PatientList';
import AddPatient from './src/screens/CareTakerScreens/AddPatient/AddPatient';
import PatientDetails from './src/screens/CareTakerScreens/PatientDetails/PatientDetails';
import SendSmsScreen from './src/screens/patient/SendSmsScreen';
import PatientDashBoard from './src/screens/patient/PatientDashBoard';
import PatientContactScreen from './src/screens/patient/PatientContactScreen';
import PatientActivityScreen from './src/screens/patient/PatientActivityScreen';
import PatientProfileScreen from './src/screens/patient/PatientProfileScreen';
import * as NavigationBar from 'expo-navigation-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import globalStyles from './src/utils/globalStyle';
import EditMeal from './src/components/EditForms/EditMeal';
import Notification from './src/components/PushNotification/Notification';
import AddRoutine from './src/screens/CareTakerScreens/AddRoutine/AddRoutine';
import RoutineList from './src/components/RoutineList/RoutineList';
import Stat from './src/components/PatientsDetails/Stat';
import TestingFile from './src/screens/CareTakerScreens/TestingFile/TestingFile';

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
            <Stack.Navigator>
              <Stack.Screen
                name='Home'
                component={HomeScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Stack.Screen
                name='CareTakerLogIn'
                component={LoginScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Stack.Screen
                name='PatientSignIn'
                component={SignInScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Stack.Screen
                name='Signup'
                component={SignupScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
            </Stack.Navigator>
          )}
          {isCareTaker && (
            <Drawer.Navigator
              initialRouteName='Add-Routine'
              defaultStatus='closed'
            >
              <Drawer.Screen
                name='TestingFile'
                component={TestingFile}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Drawer.Screen
                name='Notification'
                component={Notification}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Drawer.Screen
                name='Routine-List'
                component={RoutineList}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Drawer.Screen
                name='Add-Routine'
                component={AddRoutine}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Drawer.Screen
                name='Stat'
                component={Stat}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Drawer.Screen
                name='Patient_List'
                component={PatientList}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Drawer.Screen
                name='Add_Patient'
                component={AddPatient}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Drawer.Screen
                name='Patient_Details'
                component={PatientDetails}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
            </Drawer.Navigator>
          )}
          {isPatient && (
            <Tab.Navigator
              initialRouteName='PatientDashboard'
              shifting={true}
              tabBarShowLabel={false}
              labeled={false}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'PatientDashboard') {
                    iconName = focused
                      ? 'view-dashboard'
                      : 'view-dashboard-outline';
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
                name='PatientRoutineTimeline'
                component={PatientRoutineTimelineScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Tab.Screen
                name='PatientContact'
                component={PatientContactScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Tab.Screen
                name='PatientDashboard'
                component={PatientDashBoard}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Tab.Screen
                name='PatientActivity'
                component={PatientActivityScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Tab.Screen
                name='PatientProfile'
                component={PatientProfileScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
            </Tab.Navigator>
          )}
          {/* <Tab.Navigator>
            <Tab.Screen name='PatientDashboard' component={PatientDashBoard} />
            <Tab.Screen name='PatientSendSms' component={SendSmsScreen} />
            <Tab.Screen
              name='PatientRoutineTimeline'
              component={PatientRoutineTimelineScreen}
            />
            
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='CareTakerLogIn' component={LoginScreen} />
            <Tab.Screen name='PatientSignIn' component={SignInScreen} />
            <Tab.Screen name='Signup' component={SignupScreen} />

            <Tab.Screen name='Detail' component={DetailScreen} />
            <Tab.Screen name='Patient_List' component={PatientList} />
            <Tab.Screen name='Add_Patient' component={AddPatient} />
            <Tab.Screen name='Patient_Details' component={PatientDetails} />
          </Tab.Navigator> */}
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
