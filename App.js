import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  ImageBackground,
  Text,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store/store';
import { storeData, getData } from './src/localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import SignupScreen from './src/screens/CareTakerScreens/SignupScreen/SignupScreen';
import LoginScreen from './src/screens/CareTakerScreens/LoginScreen/LoginScreen';
import SignInScreen from './src/screens/patient/SignInScreen';
import PatientRoutineTimelineScreen from './src/screens/patient/PatientRoutineTimelineScreen';
import PatientList from './src/screens/CareTakerScreens/PatientList/PatientList';
import AddPatient from './src/screens/CareTakerScreens/AddPatient/AddPatient';
import PatientDetails from './src/screens/CareTakerScreens/PatientDetails/PatientDetails';
import SendSmsScreen from './src/screens/patient/SendSmsScreen';
import PatientDashBoard from './src/screens/patient/PatientDashBoard';
// import YellowBackground from './src/assets/yellowWallpaper';
import YellowBackground from './src/assets/yellowBackground.png';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#454EAE',
    // background: '#454EAE',
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
    const setScreens = async () => {
      try {
        const careTakerToken = await AsyncStorage.getItem('caretakerToken');
        const patientToken = careTakerToken
          ? null
          : await AsyncStorage.getItem('patientToken');
        if (careTakerToken) {
          setIsCareTaker(true);
          setIsPatient(false);
          setIsNoUser(false);
          return;
        }
        if (patientToken) {
          setIsCareTaker(false);
          setIsPatient(true);
          setIsNoUser(false);
          return;
        }
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
            <Tab.Navigator>
              <Tab.Screen name='Home' component={HomeScreen} />
              <Tab.Screen name='CareTakerLogIn' component={LoginScreen} />
              <Tab.Screen
                name='PatientSignIn'
                component={SignInScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Tab.Screen name='Signup' component={SignupScreen} />
            </Tab.Navigator>
          )}
          {isCareTaker && (
            <Stack.Navigator>
              <Stack.Screen name='Detail' component={DetailScreen} />
              <Stack.Screen name='Patient_List' component={PatientList} />
              <Stack.Screen name='Add_Patient' component={AddPatient} />
              <Stack.Screen name='Patient_Details' component={PatientDetails} />
            </Stack.Navigator>
          )}
          {isPatient && (
            <Tab.Navigator>
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
                name='PatientSendSms'
                component={SendSmsScreen}
                initialParams={{
                  isPatientState: setIsPatient,
                  isNoUserState: setIsNoUser,
                  isCareTakerState: setIsCareTaker,
                }}
              />
              <Tab.Screen
                name='PatientRoutineTimeline'
                component={PatientRoutineTimelineScreen}
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
