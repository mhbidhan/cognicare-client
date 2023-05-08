import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  Image,
  Modal,
  Button,
} from 'react-native';
import globalStyles from './../../utils/globalStyle';
import pic from './../../assests/pic.jpg';
import ButtonFilled from '../common/buttons/ButtonFilled';
import QRCode from 'react-native-qrcode-svg';

function PatientCard({ patient }) {
  const [modalVisible, setModalVisible] = useState(false);
  console.log(patient);
  const getcodeHandeler = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={pic} style={styles.image} />
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
            <View>
              <QRCode value={patient.loginCode} size={200} />
              <View style={styles.modalButtonView}>
                <ButtonFilled
                  text='Close'
                  onPressHandler={() => {
                    setModalVisible(!modalVisible);
                  }}
                  width={200}
                  height={40}
                  textSize={17}
                  btnColor={globalStyles.colors.green}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <ButtonFilled
        text='Get Code'
        onPressHandler={getcodeHandeler}
        width={200}
        height={40}
        textSize={17}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: globalStyles.colors.primary,
  },
  name: {
    fontSize: 30,
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
  },
  modal: {
    flex: 1,
    padding: 10,
    backgroundColor: globalStyles.colors.primaryLight,
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
