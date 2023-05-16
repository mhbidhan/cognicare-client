import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button, ToggleButton, TextInput, Text } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonFilled from '../common/buttons/ButtonFilled';
import globalStyles from '../../utils/globalStyle';

const BloodInput = () => {
  const [glucoseDropdownOpen, setGlucoseDropdownOpen] = useState(false);
  const [glucoseDropdownValue, setGlucoseDropdownValue] = useState(null);
  const [glucoseDropdownItems, setGlucoseDropdownItems] = useState([
    { label: 'Before Meal', value: 'Before Meal' },
    { label: 'After Meal', value: 'After Meal' },
  ]);
  const [glucoseMgdl, setGlucoseMgdl] = useState('');

  const [pressureDropdownOpen, setPressureDropdownOpen] = useState(false);
  const [pressureDropdownValue, setPressureDropdownValue] = useState(null);
  const [pressureDropdownItems, setPressureDropdownItems] = useState([
    { label: 'Before Meal', value: 'Before Meal' },
    { label: 'After Meal', value: 'After Meal' },
  ]);
  const [pressureSys, setPressureSys] = useState('');
  const [pressureDias, setPressureDias] = useState('');

  const consoleBloodStates = () => {
    console.log(glucoseDropdownValue);
    console.log(glucoseMgdl);
    console.log(pressureDropdownValue);
    console.log(pressureSys);
    console.log(pressureDias);
  };

  const onBloodSubmit = async () => {
    try {
      consoleBloodStates();
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
      {/* <Button
        onPress={onBloodSubmit}
        icon='check'
        mode='contained'
        dark={true}
        // style={{ marginLeft: -100 }}
      >
        Save
      </Button> */}
      {/* <ButtonFilled icon='check' text='Save' onPressHandler={onBloodSubmit} /> */}
      <Button mode='contained' dark={true} icon='check' onPress={onBloodSubmit}>
        Save
      </Button>
    </View>
  );
};

const HeartRateInput = () => {
  return (
    <View>
      <TextInput label='Heart Rate' />
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
