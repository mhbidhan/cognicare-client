import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  Button,
} from 'react-native';
import globalStyles from './../../utils/globalStyle';
import pic from './../../assets/pic.jpg';
import ButtonFilled from '../common/buttons/ButtonFilled';
import QRCode from 'react-native-qrcode-svg';
import { Avatar, BottomNavigation, Text } from 'react-native-paper';

function HeroSection() {
  const { thisPatient } = useSelector((state) => state.caretaker);
  console.log('thisPatient', thisPatient);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
      }}
    >
      <Image
        // source={{
        //   uri: thisPatient.imgUrl,
        // }}
        source={pic}
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        {/* <Text style={styles.name}>{thisPatient.name}</Text> */}
        <Text style={styles.name}>Maria</Text>
        <View style={styles.textView}>
          <Text style={styles.lable}>Age:</Text>
          {/* <Text style={styles.text}>{thisPatient.age}</Text> */}
          <Text style={styles.text}>27</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: globalStyles.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: globalStyles.colors.primaryLight,
  },
  textView: {
    flexDirection: 'row',
    gap: 6,
  },
  lable: {
    fontWeight: '900',
    color: globalStyles.colors.primary,
  },
  text: {
    color: globalStyles.colors.primaryLight,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  modalParentView: {
    position: 'relative',
  },
  modal: {
    flex: 1,
    padding: 10,
    backgroundColor: globalStyles.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonView: {
    marginTop: 30,
  },
  descView: {
    flex: 1,
  },
});

export default HeroSection;
