import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import CaretakerNav from './src/Navigations/CaretakerNav';
import PatientNav from './src/Navigations/PatientNav';
import Unauthenticated from './src/Navigations/Unauthenticated';
import MyTheme from './src/assets/Theme/myTheme';
import store from './src/store/store';

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
            <Unauthenticated
              isPatientState={setIsPatient}
              isNoUserState={setIsNoUser}
              isCareTakerState={setIsCareTaker}
            />
          )}
          {isCareTaker && (
            <CaretakerNav
              isPatientState={setIsPatient}
              isNoUserState={setIsNoUser}
              isCareTakerState={setIsCareTaker}
            />
          )}
          {isPatient && (
            <PatientNav
              isPatientState={setIsPatient}
              isNoUserState={setIsNoUser}
              isCareTakerState={setIsCareTaker}
            />
          )}
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
