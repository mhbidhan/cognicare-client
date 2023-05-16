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
    setFormData((formData) => {
      const { routineElements } = formData;

      for (routineElement of routineElements) {
        // sample data
        // Check conflict
        // [
        //   {
        //     meal: {
        //       name: 'BreakFast 🥞 ',
        //       description: 'Nejduhf',
        //     },
        //     activityType: 'meal',
        //     name: 'Breakfast',
        //     startTime: {
        //       timeInNumber: 1530,
        //       timeInString: '3:30 PM',
        //     },
        //     endTime: {
        //       timeInNumber: 1535,
        //       timeInString: '3:35 PM',
        //     },
        //   },
        //   {
        //     medicine: [
        //       {
        //         name: 'Napa',
        //         description: 'afasfas',
        //         quantity: '1',
        //         unit: 'capsule',
        //         packageImgUrl:
        //           'https://supplementfactoryuk.com/wp-content/uploads/2019/06/Capsugel-Products-ConiSnap-Hard-A-1-1024x717.jpg',
        //         medicineImgUrl:
        //           'https://cdn.dribbble.com/users/4261255/screenshots/15389837/medicine_box_packaging_design.png',
        //       },
        //     ],
        //     activityType: 'medicine',
        //     name: 'Take Medicine',
        //     startTime: {
        //       timeInNumber: 1525,
        //       timeInString: '3:25 PM',
        //     },
        //     endTime: {
        //       timeInNumber: 1530,
        //       timeInString: '3:30 PM',
        //     },
        //   },
        // ],
      }

      return {
        ...formData,
        routineElements: [
          ...routineElements,
          { ...currentActivity, ...activityData },
        ],
      };
    });
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
        label='Activity Name'
        placeholder='Activity Name'
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
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default GenaralActivityForm;
