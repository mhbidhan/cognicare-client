import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { captureRef } from 'react-native-view-shot';

const CameraView = ({ handleCapture }) => {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();

  const takePic = async () => {
    try {
      const result = await captureRef(cameraRef, {
        result: 'base64',
        width: 260,
        height: 300,
        quality: 1,
        format: 'jpg',
      });
      handleCapture(result);
    } catch (error) {
      console.log(error);
      handleCapture(newPhoto);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  return (
    <Camera style={styles.container} ratio="16:9" ref={cameraRef}>
      <Button mode="contained" style={styles.button} onPress={takePic}>
        Take Picture
      </Button>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    bottom: -250,
  },
  preview: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').height - 300,
    marginBottom: 30,
  },
});

export default CameraView;
