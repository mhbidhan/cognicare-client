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
import Description from './Description';
import HeroSection from './HeroSection';

function Info({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { thisPatient } = useSelector((state) => state.caretaker);
  console.log('thisPatient', thisPatient);

  const getcodeHandeler = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <HeroSection thisPatient={thisPatient} />
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
            <QRCode value={thisPatient.loginCode} size={200} />
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
        </Modal>
      </View>
      {/* <View style={styles.descView}> */}
      <Description patient={thisPatient} />
      {/* </View> */}
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
    color: globalStyles.colors.primary,
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
    color: globalStyles.colors.primary,
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

export default Info;
