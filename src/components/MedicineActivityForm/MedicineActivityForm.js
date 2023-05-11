import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import FileInput from '../common/FileInput/FileInput';

const MedicineActivityForm = ({ setView }) => {
  return (
    <View style={styles.form}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          label="Medicine Name"
          placeholder="Medicine Name"
        />
        <TextInput
          style={styles.input}
          label="Description"
          placeholder="Description"
        />
        <TextInput
          style={styles.input}
          label="Quantity"
          placeholder="Quantity"
        />
        <TextInput style={styles.input} label="Unit" placeholder="Unit" />
        <FileInput defaultPlaceholder="Medicine Package Image" />
        <FileInput placeholder="Medicine Image" />
        <View style={styles.btnContainer}>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={() => setView('activityType')}
          >
            Back
          </Button>
          <Button style={styles.btn} mode="contained">
            Next
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 30,
    minWidth: Dimensions.get('window').width,
  },
  input: {
    marginBottom: 30,
  },
  btn: {
    minWidth: 140,
    marginBottom: 30,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default MedicineActivityForm;
