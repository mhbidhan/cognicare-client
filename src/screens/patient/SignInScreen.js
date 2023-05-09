import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import globalStyles from '../../utils/globalStyle';
import { usePatientLoginQuery } from '../../features/patient/patientApi';
import { useDispatch, useSelector } from 'react-redux';
import { setPatient } from '../../features/patient/patientSlice';

const SignInScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [foundData, setFoundData] = useState(false);
  const patientData = useSelector((state) => state.patient);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = usePatientLoginQuery();

  useEffect(() => {
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
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU3NzRiOWE3ODVhODQ0NDQxNTM2NWUiLCJpYXQiOjE2ODM2Mzk5OTIsImV4cCI6MTY4MzcyNjM5Mn0.bAAMZL6WW26Sqt3lCm3MPaBBEr_2do1uCZ1iwyJs_rU';
    // const token = data;
    const ngRokUrl = 'https://5da8-103-184-94-6.in.ngrok.io';
    fetch(`${ngRokUrl}/patients/own`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setPatient(data));
        setFoundData(true);
        return data;
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
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[{ height: 400, width: 400 }]}
      />
      <Text style={{ color: globalStyles.colors.primary, fontSize: 20 }}>
        Scan QR Code
      </Text>
      {foundData && (
        <Button
          title={'Patient Dashboard'}
          onPress={() => {
            navigation.navigate('PatientDashBoardScreen');
          }}
        />
      )}
      {scanned && (
        <Button
          title={'Tap to Scan Again'}
          onPress={(e) => {
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
