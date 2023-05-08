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
import PatientCard from '../../../components/buttons/PatientCard/PatientCard';

function PatientList({ navigation }) {
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
      <PatientCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    // alignItems: 'center',
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
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
