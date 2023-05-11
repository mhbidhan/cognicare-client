import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const EditMeal = ({ setView, onFromSubmit, setCurrentActivity }) => {
  const [formData, setFormData] = useState({
    name: '',
    activityType: '',
    startTime: null,
    endTime: null,
  });

  const handleSubmit = () => {
    setCurrentActivity(formData);
    setView('time');
  };

  return (
    <View style={styles.form}>
      <View style={styles.formContainer}>
        <TextInput
          onChange={(e) => console.log()}
          style={styles.input}
          label='Meal Type'
          placeholder='Breakfast, Lunch, Dinner...'
        />
        <TextInput
          style={styles.input}
          label='Description'
          placeholder='Description'
        />

        <View style={styles.btnContainer}>
          <Button
            style={styles.btn}
            mode='contained'
            onPress={() => setView('activityType')}
          >
            Back
          </Button>
          <Button style={styles.btn} mode='contained' onPress={handleSubmit}>
            Save Changes
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

export default EditMeal;
