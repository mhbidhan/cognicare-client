import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, ToggleButton, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

const BloodGlucoseInput = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Before Meal', value: 'Before Meal' },
    { label: 'After Meal', value: 'After Meal' },
  ]);
  return (
    <View>
      <TextInput label='Blood Glucose (mg/dL)' />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='Relation To Meal'
      />
    </View>
  );
};

const BloodPressureInput = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Before Meal', value: 'Before Meal' },
    { label: 'After Meal', value: 'After Meal' },
  ]);
  return (
    <View>
      <TextInput label='Blood Pressure (Systolic)' />
      <TextInput label='Blood Pressure (Diastolic)' />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='Relation To Meal'
      />
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
  const [selectedForm, setSelectedForm] = useState('bloodGlucoseInput');

  const handleFormChange = (value) => {
    setSelectedForm(value);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'bloodGlucoseInput':
        return <BloodGlucoseInput />;
      case 'bloodPressureInput':
        return <BloodPressureInput />;
      case 'heartRateInput':
        return <HeartRateInput />;
      default:
        return null;
    }
  };

  return (
    <View style={{ marginBottom: 30, zIndex: 100 }}>
      <ToggleButton.Row onValueChange={handleFormChange} value={selectedForm}>
        <ToggleButton
          icon='water'
          value='bloodGlucoseInput'
          iconColor='white'
        />
        <ToggleButton
          icon='car-brake-low-pressure'
          value='bloodPressureInput'
          iconColor='white'
        />
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
