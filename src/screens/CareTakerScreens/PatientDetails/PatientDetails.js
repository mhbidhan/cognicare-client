import React from 'react';
import {
  StyleSheet,
  View,
  // Text,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Avatar, BottomNavigation, Text } from 'react-native-paper';
import globalStyles from './../../../utils/globalStyle';
import PatientCard from '../../../components/PatientCard/PatientCard';
import { getData } from './../../../localStorage';
import { useGetAllPatientsQuery } from './../../../features/patient/patientApi';
import pic from './../../../assets/pic.jpg';
import ButtonFilled from './../../../components/common/buttons/ButtonFilled';
import StatRoute from './../../../components/PatientsDetails/Stat';
import InfoRoute from './../../../components/PatientsDetails/Info';
import RoutineRoute from './../../../components/PatientsDetails/Routine';

function PatienDetails({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'info',
      title: 'Info',
      focusedIcon: 'application-brackets',
      unfocusedIcon: 'application-brackets-outline',
    },
    {
      key: 'stat',
      title: 'Stat',
      focusedIcon: 'graph',
      unfocusedIcon: 'graph-outline',
    },
    { key: 'routine', title: 'Routine', focusedIcon: 'history' },
  ]);
  // console.log('PDT', selectedPatientLoginToken);

  const renderScene = BottomNavigation.SceneMap({
    stat: StatRoute,
    routine: RoutineRoute,
    info: InfoRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default PatienDetails;
