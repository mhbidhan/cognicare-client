import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import globalStyles from './../../../utils/globalStyle';
import PatientCard from '../../../components/PatientCard/PatientCard';
import { getData } from './../../../localStorage';
import { useGetAllPatientsQuery } from './../../../features/patient/patientApi';
import { useSelector } from 'react-redux';

function PatientList({ navigation }) {
  // const { caretakerToken } = useSelector((state) => state.caretaker);
  const { data, isLoading, isError } = useGetAllPatientsQuery() || {};

  // console.log('caretakerToken', caretakerToken);
  console.log('patients', data);

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.text}>Patients</Text>
        <TouchableOpacity
          style={styles.plusSignView}
          onPress={() => navigation.navigate('Add_Patient')}
        >
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
      </View>
      {!isLoading && !isError && data ? (
        <View style={{ margin: 20 }}>
          {data.map((patient, i) => (
            <PatientCard key={i} patient={patient} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // alignItems: 'center',
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  plusSignView: {
    backgroundColor: globalStyles.colors.primary,
    // padding: 5,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusSign: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PatientList;
