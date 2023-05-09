import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import globalStyles from './../../../utils/globalStyle';
import PatientCard from '../../../components/PatientCard/PatientCard';
import { getData } from './../../../localStorage';
import { useGetAllPatientsQuery } from './../../../features/patient/patientApi';
import { setPatientList } from './../../../features/caretaker/caretakerSlice';

function PatientList({ navigation }) {
  const dispatch = useDispatch();
  const { caretakerToken } = useSelector((state) => state.caretaker);
  const { data, isLoading, isError } = useGetAllPatientsQuery() || {};

  // console.log('caretakerToken', caretakerToken);
  // console.log('patients', data);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch(setPatientList({ patientList: data }));
    }
  }, [isLoading, data]);

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.text}>Patients</Text>
        <Button
          icon='database-plus-outline'
          mode='elevated'
          buttonColor={globalStyles.colors.primary}
          textColor={globalStyles.colors.primaryLight}
          contentStyle={{ width: 100 }}
          style={{ borderRadius: 10 }}
          labelStyle={{ fontSize: 17 }}
          onPress={() => navigation.navigate('Add_Patient')}
        >
          Add
        </Button>
        {/* <TouchableOpacity
          style={styles.plusSignView}
          onPress={() => navigation.navigate('Add_Patient')}
        >
          <Text style={styles.plusSign}>Add</Text>
        </TouchableOpacity> */}
      </View>
      {!isLoading && !isError && data && caretakerToken ? (
        <ScrollView style={styles.cardListView}>
          {data.map((patient, i) => (
            <PatientCard key={i} patient={patient} navigation={navigation} />
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
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
    color: globalStyles.colors.primary,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardListView: {
    marginHorizontal: 20,
  },
});

export default PatientList;
