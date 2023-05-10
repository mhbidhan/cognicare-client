import React from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store/store';
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
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
        <StatusBar backgroundColor={MyTheme.colors.background} />
        <NavigationContainer theme={MyTheme}>
          {/* <ImageBackground
            source={YellowBackground}
            resizeMode='cover'
            style={styles.image}
          >
            <Text>Hello</Text>
          </ImageBackground> */}
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Detail' component={DetailScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='CareTakerLogIn' component={LoginScreen} />
            <Stack.Screen name='PatientSignIn' component={SignInScreen} />
            <Stack.Screen
              name='PatientDashboard'
              component={PatientDashBoard}
            />
            <Stack.Screen
              name='PatientRoutineTimeline'
              component={PatientRoutineTimelineScreen}
            />
            <Stack.Screen name='Patient_List' component={PatientList} />
            <Stack.Screen name='Add_Patient' component={AddPatient} />
            <Stack.Screen name='Patient_Details' component={PatientDetails} />
            <Stack.Screen name='PatientSendSms' component={SendSmsScreen} />
          </Stack.Navigator>
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
