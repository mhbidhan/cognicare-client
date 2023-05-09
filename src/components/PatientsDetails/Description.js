import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import globalStyles from './../../utils/globalStyle';
import pic from './../../assets/pic.jpg';
import ButtonFilled from '../common/buttons/ButtonFilled';
import QRCode from 'react-native-qrcode-svg';
import { Avatar, BottomNavigation, Text } from 'react-native-paper';

function Description({ patient, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.descriptionCard}>
        {/* <Text>Description</Text> */}
        <View style={styles.textView}>
          <Text style={{ fontWeight: '900' }}>Name:</Text>
          <Text>{patient.name}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={{ fontWeight: '900' }}>Age:</Text>
          <Text>{patient.age}</Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontWeight: '900' }}>Details:</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Natoque
            penatibus et magnis dis parturient. Posuere ac ut consequat semper
            viverra nam libero justo laoreet. Lectus arcu bibendum at varius vel
            pharetra vel. Elit sed vulputate mi sit.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    marginTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 10,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: globalStyles.colors.primary,
    shadowColor: globalStyles.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  descriptionCard: {
    // flex: 1,
    // padding: 10,
    // marginTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: globalStyles.colors.primary,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 3,
  },
  textView: {
    flexDirection: 'row',
  },
});

export default Description;
