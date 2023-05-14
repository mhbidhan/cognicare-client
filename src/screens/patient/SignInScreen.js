import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import globalStyles from '../../utils/globalStyle';
import { usePatientLoginQuery } from '../../features/patient/patientApi';
import { useDispatch, useSelector } from 'react-redux';
import { setPatient } from '../../features/patient/patientSlice';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';
import nightWallpaper from '../../assets/nightWallpaper.png';
import { storeData, getData } from '../../localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [foundData, setFoundData] = useState(false);
  const patientData = useSelector((state) => state.patient);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = usePatientLoginQuery();

  const { isPatientState, isNoUserState, isCareTakerState } = route.params;

  // const getData = async (key) => {
  //   const value = await AsyncStorage.getItem(key);
  //   return value;
  // };
  // getData('token').then((val) => {
  //     console.log('api', val);
  //     headers.set('x-auth-token', val);
  //   });

  useEffect(() => {
    const getPatienToken = async () => {};
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // navigation.navigate("PatientDashBoardScreen");
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDVmMmM2ZDgxNDI3MDhiMDdmMGM2NDgiLCJpYXQiOjE2ODM5NTg4OTN9.7LW7TjxDKc78tff9QqcRLsWQJQEhwmwObbFMuSjHxyM';
    const token = data;
    console.log(data);
    const ngRokUrl = 'https://5e2f-113-11-37-34.ap.ngrok.io';
    const patientId = '64577a4cb7a4f333e3dd6985';
    fetch(`${ngRokUrl}/patients/own`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // dispatch(setPatient(data));
        // setFoundData(true);
        // return data;
        const sendToMain = async () => {
          try {
            console.log(JSON.stringify(data));
            await AsyncStorage.setItem('patientToken', JSON.stringify(data));
            isNoUserState(false);
            isCareTakerState(false);
            isPatientState(true);
          } catch (error) {
            console.log(error);
          }
        };
        sendToMain();
      })
      .catch((error) => {
        console.log('Error fetching', error);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function onSuccess(e) {
    console.log(e);
  }
  return (
    <View style={[styles.container, { position: 'relative' }]}>
      <ImageBackground
        source={nightWallpaper}
        resizeMode='cover'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          opacity: 0.3,
        }}
      ></ImageBackground>
      <Text style={{ color: globalStyles.colors.primaryLight, fontSize: 20 }}>
        Scan QR Code
      </Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[{ height: 400, width: 400 }]}
      />

      {/* {foundData && (
        <ButtonFilled
          text='Dashboard'
          icon='view-dashboard'
          onPressHandler={() => {
            navigation.navigate('PatientDashboard');
          }}
        />
      )} */}
      {scanned && (
        <ButtonFilled
          text='Tap to Scan Again'
          icon='qrcode-scan'
          onPressHandler={(e) => {
            setScanned(false);
            console.log(e);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
    rowGap: 20,
  },
});

export default SignInScreen;
