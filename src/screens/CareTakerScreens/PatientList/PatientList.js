import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottiePatientBackground from '../../../components/LottieBackgrounds/LottiePatientBackground';

function PatientList({ navigation, route }) {
  const dispatch = useDispatch();
  const [request, setRequest] = useState(true);
  const { caretakerToken } = useSelector((state) => state.caretaker);
  const { isPatientState, isNoUserState, isCareTakerState } = route.params;
  const { data, isLoading, isError } =
    useGetAllPatientsQuery(undefined, {
      skip: request,
    }) || {};

  // console.log('caretakerToken', caretakerToken);
  console.log('List', data);
  useEffect(() => {
    setRequest(false);
  }, [caretakerToken]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch(setPatientList({ patientList: data }));
    }
  }, [isLoading, data]);

  const logout = async () => {
    try {
      console.log('logout');
      await AsyncStorage.setItem('caretakerToken', '');
      isCareTakerState(false);
      isPatientState(false);
      isNoUserState(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <LottiePatientBackground />
      <View style={[globalStyles.container, { opacity: 1 }]}>
        <View style={styles.topbar}>
          <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
            Patients
          </Text>
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
          <Button
            icon='database-plus-outline'
            mode='elevated'
            buttonColor={globalStyles.colors.primary}
            textColor={globalStyles.colors.primaryLight}
            contentStyle={{ width: 100 }}
            style={{ borderRadius: 10 }}
            labelStyle={{ fontSize: 17 }}
            onPress={logout}
          >
            Out
          </Button>
        </View>
        {!isLoading && !isError && data && caretakerToken ? (
          <ScrollView style={styles.cardListView}>
            {data.map((patient, i) => (
              <PatientCard key={i} patient={patient} navigation={navigation} />
            ))}
          </ScrollView>
        ) : null}
      </View>
      {/* <View style={styles.container}>
      </View> */}
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
    // marginLeft: 20,
    // marginRight: 20,
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
