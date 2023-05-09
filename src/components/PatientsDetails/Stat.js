import React, { useState } from 'react';
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

function PatientCard({ patient, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(patient);
  const getcodeHandeler = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View>
        <Avatar.Image source={pic} size={90} />
      </View>
      <Text style={styles.name}>Touhid</Text>
      {/* <View style={styles.modalParentView}>
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
      </View> */}
      <ButtonFilled
        text='Get Code'
        onPressHandler={getcodeHandeler}
        width={200}
        height={35}
        textSize={12}
      />
    </View>
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
