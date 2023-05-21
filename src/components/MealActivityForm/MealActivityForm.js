import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import handleInputChange from '../../utils/handleInputChange';

const MealActivityForm = ({ setView, onFromSubmit, setCurrentActivity }) => {
  const activityType = 'meal';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = () => {
    setCurrentActivity({ [activityType]: formData, activityType });
    setView('genaral');
  };

  return (
    <View style={styles.form}>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={(text) => handleInputChange('name', text, setFormData)}
          style={styles.input}
          label='Meal Type'
          placeholder='Breakfast, Lunch, Dinner...'
        />
        <TextInput
          onChangeText={(text) =>
            handleInputChange('description', text, setFormData)
          }
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
    gap: 5,
  },
});

export default MealActivityForm;
