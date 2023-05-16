import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button, ToggleButton, TextInput, Text } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import ButtonFilled from '../common/buttons/ButtonFilled';
import globalStyles from '../../utils/globalStyle';
import { SERVER_URL } from '../../config';

const BloodInput = () => {
  const [glucoseDropdownOpen, setGlucoseDropdownOpen] = useState(false);
  const [glucoseDropdownValue, setGlucoseDropdownValue] = useState('');
  const [glucoseDropdownItems, setGlucoseDropdownItems] = useState([
    { label: 'Before Meal', value: 'Before Meal' },
    { label: 'After Meal', value: 'After Meal' },
  ]);
  const [glucoseMgdl, setGlucoseMgdl] = useState('');

  const [pressureDropdownOpen, setPressureDropdownOpen] = useState(false);
  const [pressureDropdownValue, setPressureDropdownValue] = useState('');
  const [pressureDropdownItems, setPressureDropdownItems] = useState([
    { label: 'Before Meal', value: 'Before Meal' },
    { label: 'After Meal', value: 'After Meal' },
  ]);
  const [pressureSys, setPressureSys] = useState('');
  const [pressureDias, setPressureDias] = useState('');

  const [saveDisabled, setSaveDisabled] = useState(false);
  const [error, setError] = useState('');

  const consoleBloodStates = () => {
    console.log(glucoseDropdownValue);
    console.log(glucoseMgdl);
    console.log(pressureDropdownValue);
    console.log(pressureSys);
    console.log(pressureDias);
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const clearBloodInputs = () => {
    setGlucoseDropdownValue('');
    setGlucoseMgdl('');
    setPressureDropdownValue('');
    setPressureSys('');
    setPressureDias('');
  };

  const submitBloodData = async () => {
    try {
      const currentDate = new Date().toISOString();

      const glucoseBody = {
        dataType: 'BloodGlucose',
        count: parseInt(glucoseMgdl, 10),
        unit: 'mg/dL',
        relationToMeal: glucoseDropdownValue,
        manuallyEntered: true,
        startDateTime: currentDate,
        endDateTime: currentDate,
        source: 'Measurement',
      };

      const bloodSysBody = {
        dataType: 'BloodPressureSystolic',
        count: parseInt(pressureSys, 10),
        unit: 'mmHg',
        relationToMeal: pressureDropdownValue,
        manuallyEntered: true,
        startDateTime: currentDate,
        endDateTime: currentDate,
        source: 'Measurement',
      };

      const bloodDiasBody = {
        dataType: 'BloodPressureDiastolic',
        count: parseInt(pressureDias, 10),
        unit: 'mmHg',
        relationToMeal: pressureDropdownValue,
        manuallyEntered: true,
        startDateTime: currentDate,
        endDateTime: currentDate,
        source: 'Measurement',
      };

      const bloodBody = JSON.stringify([
        glucoseBody,
        bloodSysBody,
        bloodDiasBody,
      ]);

      console.log(bloodBody);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bloodBody,
      };

      const patientId = `6460622f36f84ff9619a3d81`;
      const bloodUrl = `${SERVER_URL}/sahha/blood/log/${patientId}`;
      console.log(bloodUrl);

      const response = await fetch(bloodUrl, options);
      const responseStatus = response.status;
      if (responseStatus === 200) {
        showToast('success', 'Saved', 'Blood logs saved successfully');
        clearBloodInputs();
      } else {
        showToast('error', "Couldn't save", 'Error reaching server');
      }
      setSaveDisabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onBloodSubmit = async () => {
    try {
      consoleBloodStates();
      if (
        !glucoseDropdownValue.trim() ||
        !glucoseMgdl.trim() ||
        !pressureDropdownValue.trim() ||
        !pressureSys.trim() ||
        !pressureDias.trim()
      ) {
        setError('Fill all of the inputs');
      } else {
        setError('');
        setSaveDisabled(true);
        await submitBloodData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ rowGap: 20 }}>
      <View style={{ zIndex: 1000 }}>
        <Text variant='titleLarge' style={{ color: 'white' }}>
          Blood Glucose
        </Text>
        <TextInput
          label='Count (mg/dL)'
          value={glucoseMgdl}
          onChangeText={setGlucoseMgdl}
          keyboardType='numeric'
        />
        <View>
          <DropDownPicker
            open={glucoseDropdownOpen}
            value={glucoseDropdownValue}
            items={glucoseDropdownItems}
            setOpen={setGlucoseDropdownOpen}
            setValue={setGlucoseDropdownValue}
            setItems={setGlucoseDropdownItems}
            placeholder='Relation To Meal'
          />
        </View>
      </View>
      <View style={{ zIndex: 900 }}>
        <Text variant='titleLarge' style={{ color: 'white' }}>
          Blood Pressure
        </Text>
        <TextInput
          label='Count (Systolic)'
          value={pressureSys}
          onChangeText={setPressureSys}
          keyboardType='numeric'
        />
        <TextInput
          label='Count (Diastolic)'
          value={pressureDias}
          onChangeText={setPressureDias}
          keyboardType='numeric'
        />
        <View>
          <DropDownPicker
            open={pressureDropdownOpen}
            value={pressureDropdownValue}
            items={pressureDropdownItems}
            setOpen={setPressureDropdownOpen}
            setValue={setPressureDropdownValue}
            setItems={setPressureDropdownItems}
            placeholder='Relation To Meal'
          />
        </View>
      </View>
      {error && (
        <Text variant='labelSmall' style={{ color: 'red' }}>
          {error}
        </Text>
      )}
      <Button
        mode='contained'
        dark={true}
        icon='check'
        disabled={saveDisabled}
        onPress={onBloodSubmit}
      >
        Save
      </Button>
    </View>
  );
};

const HeartRateInput = () => {
  const [heartRate, setHeartRate] = useState('');
  const [error, setError] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(false);

  const consoleHeartStates = () => {
    console.log(heartRate);
  };

  const clearHeartInputs = () => {
    setHeartRate('');
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const submitHeartData = async () => {
    try {
      const currentDate = new Date().toISOString();

      const heartBody = JSON.stringify([
        {
          dataType: 'HeartRate',
          count: parseInt(heartRate, 10),
          manuallyEntered: true,
          startDateTime: currentDate,
          endDateTime: currentDate,
          source: 'Measurement',
        },
      ]);

      console.log(heartBody);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: heartBody,
      };

      const patientId = `6460622f36f84ff9619a3d81`;
      const heartUrl = `${SERVER_URL}/sahha/heart/log/${patientId}`;
      console.log(heartUrl);

      const response = await fetch(heartUrl, options);
      console.log(JSON.stringify(response));
      const responseStatus = response.status;
      if (responseStatus === 200) {
        showToast('success', 'Saved', 'Heart logs saved successfully');
        clearHeartInputs();
      } else {
        showToast('error', "Couldn't save", 'Error reaching server');
      }
      setSaveDisabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onHeartSubmit = async () => {
    try {
      consoleHeartStates();
      if (!heartRate.trim()) {
        setError('Fill all of the inputs');
      } else {
        setError('');
        setSaveDisabled(true);
        await submitHeartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ rowGap: 20 }}>
      <View>
        <Text variant='titleLarge' style={{ color: 'white' }}>
          Blood Pressure
        </Text>
        <TextInput
          label='Heart Rate'
          value={heartRate}
          onChangeText={setHeartRate}
          keyboardType='numeric'
        />
      </View>
      {error && (
        <Text variant='labelSmall' style={{ color: 'red' }}>
          {error}
        </Text>
      )}
      <Button mode='contained' dark={true} icon='check' onPress={onHeartSubmit}>
        Save
      </Button>
    </View>
  );
};

const SahhaLogForm = () => {
  const [selectedForm, setSelectedForm] = useState();

  const handleFormChange = (value) => {
    setSelectedForm(value);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'bloodInput':
        return <BloodInput />;
      case 'heartRateInput':
        return <HeartRateInput />;
      default:
        return null;
    }
  };

  return (
    <View
      style={{
        marginBottom: 30,
        zIndex: 100,
        width: globalStyles.adjustedWidthFromDevice,
      }}
    >
      <ToggleButton.Row onValueChange={handleFormChange} value={selectedForm}>
        <ToggleButton icon='water' value='bloodInput' iconColor='white' />
        <ToggleButton
          icon='heart-circle-outline'
          value='heartRateInput'
          iconColor='white'
        />
      </ToggleButton.Row>
      {renderForm()}
    </View>
  );
};

export default SahhaLogForm;
