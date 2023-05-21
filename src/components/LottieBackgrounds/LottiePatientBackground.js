import React from 'react';
import LottieView from 'lottie-react-native';
import lottieNightPatient from '../../assets/lottieNightPatient.json';

const LottiePatientBackground = () => {
  return (
    <LottieView
      autoPlay
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: -1,
      }}
      // Find more Lottie files at https://lottiefiles.com/featured
      source={lottieNightPatient}
      resizeMode='cover'
    />
  );
};

export default LottiePatientBackground;
