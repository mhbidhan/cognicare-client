import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import globalStyles from '../../utils/globalStyle';
import ButtonFilled from '../../components/common/buttons/ButtonFilled';
import nightWallpaper from '../../assets/nightWallpaper.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_URL } from '../../config';

const SignInScreen = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { isPatientState, isNoUserState, isCareTakerState } = route.params;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const token = data;
    fetch(`${SERVER_URL}/patients/own`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const sendToMain = async () => {
          try {
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
    return (
      <Text style={{ color: 'white' }}>Requesting for camera permission</Text>
    );
  }
  if (hasPermission === false) {
    return <Text style={{ color: 'white' }}>No access to camera</Text>;
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
