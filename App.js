import React from 'react';
import { Provider } from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import SignupScreen from './src/screens/CareTakerScreens/SignupScreen/SignupScreen';
import LoginScreen from './src/screens/CareTakerScreens/LoginScreen/LoginScreen';
import SignInScreen from './src/screens/patient/SignInScreen';
import PatientDashBoardScreen from './src/screens/patient/PatientDashBoardScreen';
import PatientList from './src/screens/CareTakerScreens/PatientList/PatientList';
import AddPatient from './src/screens/CareTakerScreens/AddPatient/AddPatient';
import PatientDetails from './src/screens/CareTakerScreens/PatientDetails/PatientDetails';
import SendSmsScreen from './src/screens/patient/SendSmsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Detail' component={DetailScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='CareTakerLogIn' component={LoginScreen} />
            <Stack.Screen name='PatientSignIn' component={SignInScreen} />
            <Stack.Screen
              name='PatientDashBoardScreen'
              component={PatientDashBoardScreen}
            />
            <Stack.Screen name='Patient_List' component={PatientList} />
            <Stack.Screen name='Add_Patient' component={AddPatient} />
            <Stack.Screen name='Patient_Details' component={PatientDetails} />
            <Stack.Screen name='PatientSendSms' component={SendSmsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
