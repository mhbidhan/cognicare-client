import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import handleInputChange from '../../utils/handleInputChange';
import TimePicker from '../TimePicker/TimePicker';

const GenaralActivityForm = ({ currentActivity, setView, setFormData }) => {
  const [activityData, setActivityData] = useState({
    name: '',
    startTime: null,
    endTime: null,
  });
  const handleSubmit = () => {
    setFormData((formData) => ({
      ...formData,
      routineElements: [
        ...formData.routineElements,
        { ...currentActivity, ...activityData },
      ],
    }));
    setView('');
  };
  useEffect(() => {
    const { startTime, endTime } = activityData;

    if (!startTime || !endTime) return;

    if (startTime.timeInNumber > endTime.timeInNumber)
      return Toast.show({
        type: 'error',
        text1: 'Invalid Time',
        text2: 'Please select a valid time',
      });

    Toast.hide();
  }, [activityData]);
  return (
    <View style={styles.form}>
      <TextInput
        onChangeText={(text) =>
          handleInputChange('name', text, setActivityData)
        }
        style={styles.input}
        label="Activity Name"
        placeholder="Activity Name"
      />
      <TimePicker
        label={'Start Time'}
        onTimeChange={(time) =>
          setActivityData({ ...activityData, startTime: time })
        }
      />
      <TimePicker
        label={'End Time'}
        onTimeChange={(time) =>
          setActivityData({ ...activityData, endTime: time })
        }
      />
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => setView('activityType')}
        >
          Back
        </Button>
        <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
          Next
        </Button>
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

export default GenaralActivityForm;
