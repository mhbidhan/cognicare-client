import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const ActivityIconButton = ({ icon, handlePress, label }) => {
  return (
    <TouchableOpacity style={styles.iconBtn} onPress={handlePress}>
      {/* <Image style={styles.icon} source={icon} /> */}
      <LottieView
        autoPlay
        ref={null}
        style={{
          width: 80,
          height: 80,
          backgroundColor: 'transparent',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={icon}
      />
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconBtn: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343C87',
  },
});

export default ActivityIconButton;
