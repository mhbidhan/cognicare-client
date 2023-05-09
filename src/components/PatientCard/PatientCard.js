import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
} from 'react-native';
import { Button } from 'react-native-paper';
import globalStyles from './../../utils/globalStyle';
import pic from './../../assets/pic.jpg';
import ButtonFilled from '../common/buttons/ButtonFilled';
import QRCode from 'react-native-qrcode-svg';
import { Avatar } from 'react-native-paper';
import { setThisPatient } from './../../features/caretaker/caretakerSlice';

function PatientCard({ patient, navigation }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(patient);
  const getcodeHandeler = () => {
    setModalVisible(true);
  };

  const cardTouchHandeler = () => {
    dispatch(setThisPatient({ thisPatient: patient }));
    navigation.navigate('Patient_Details');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={cardTouchHandeler}>
      <View>
        <Image
          source={{
            uri: patient.imgUrl,
          }}
          style={styles.image}
        />
        {/* <Avatar.Image size={90} source={patient.imgUrl} /> */}
      </View>
      <Text style={styles.name}>{patient.name}</Text>
      <View style={styles.modalParentView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modal}>
            <QRCode value={patient.loginCode} size={200} />
            <View style={styles.modalButtonView}>
              <Button
                icon='close-box-outline'
                mode='elevated'
                buttonColor={globalStyles.colors.primaryLight}
                textColor={globalStyles.colors.primary}
                style={{ borderRadius: 10 }}
                labelStyle={{ fontSize: 17 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                Close
              </Button>
            </View>
          </View>
        </Modal>
      </View>
      <Button
        icon='qrcode'
        mode='elevated'
        buttonColor={globalStyles.colors.primary}
        textColor={globalStyles.colors.primaryLight}
        // contentStyle={{
        //   width: 300,
        //   paddingVertical: 10,
        // }}
        style={{ borderRadius: 10 }}
        labelStyle={{ fontSize: 17 }}
        onPress={getcodeHandeler}
      >
        Get Code
      </Button>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  modalParentView: {
    position: 'relative',
    marginTop: 10,
  },
  modal: {
    flex: 1,
    padding: 10,
    backgroundColor: globalStyles.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // transform: [{ translateY: 200 }],
    // borderWidth: 3,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderColor: globalStyles.colors.primary,
  },
  modalButtonView: {
    marginTop: 30,
  },
});

export default PatientCard;
