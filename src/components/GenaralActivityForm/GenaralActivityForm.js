import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import handleInputChange from '../../utils/handleInputChange';
import TimePicker from '../TimePicker/TimePicker';
import showToast from '../../utils/showToast';

const GenaralActivityForm = ({ currentActivity, setView, setFormData }) => {
  const [activityData, setActivityData] = useState({
    name: '',
    startTime: null,
    endTime: null,
  });

  const compareFn = (a, b) => {
    if (a.startTime.timeInNumber < b.startTime.timeInNumber) {
      return -1;
    }
    if (a.startTime.timeInNumber > b.startTime.timeInNumber) {
      return 1;
    }
    return 0;
  };

  const isConflicted = (prev, current) => {
    // const prev = [
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
    // ];

    // const current = {
    //   name: '',
    //   startTime: 900,
    //   endTime: 1000,
    // };

    prev.sort(compareFn);
    let l = 0;
    let r = prev.length - 1;
    let lessIdx = -1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (prev[mid].endTime.timeInNumber < current.startTime) {
        lessIdx = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    if (
      lessIdx + 1 < prev.length &&
      prev[lessIdx + 1].startTime.timeInNumber <= current.endTime
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    // console.log(activityData);
    setFormData((formData) => {
      const { routineElements } = formData;

      routineElements?.sort(compareFn);
      const comparedData = {
        startTime: activityData.startTime.timeInNumber,
        endTime: activityData.endTime.timeInNumber,
      };

      const conflicts = isConflicted(routineElements, comparedData);

      if (!conflicts) {
        // console.log('not conflict', conflicts);
        setView('');
        return {
          ...formData,
          routineElements: [
            ...routineElements,
            { ...currentActivity, ...activityData },
          ],
        };
      } else {
        // console.log('conflicts', conflicts);
        showToast(
          'error',
          'Time conflict',
          'Already added a task within this time'
        );
        return formData;
      }
    });
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
