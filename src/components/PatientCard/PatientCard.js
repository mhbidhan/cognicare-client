import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch } from 'react-redux';
import { setThisPatient } from './../../features/caretaker/caretakerSlice';
import globalStyles from './../../utils/globalStyle';

function PatientCard({ patient, navigation }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  // console.log('single Patient', patient);
  const getcodeHandeler = () => {
    setModalVisible(true);
  };

  const cardTouchHandeler = () => {
    dispatch(setThisPatient({ thisPatient: patient }));
    navigation.navigate('Patient Details');
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
      </View>
      <Text style={styles.name}>{patient.name}</Text>
      <View style={styles.modalParentView}>
        <Modal
          animationType="slide"
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
                icon="close-box-outline"
                mode="elevated"
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
        icon="qrcode"
        mode="contained"
        buttonColor={globalStyles.colors.primary}
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
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonView: {
    marginTop: 30,
  },
});

export default PatientCard;
