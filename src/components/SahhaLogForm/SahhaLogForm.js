import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button, ToggleButton, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonFilled from '../common/buttons/ButtonFilled';
import globalStyles from '../../utils/globalStyle';

const BloodInput = () => {
  const [glucoseOpen, setGlucoseOpen] = useState(false);
  const [glucoseValue, setGlucoseValue] = useState(null);
  const [glucoseItems, setGlucoseItems] = useState([
    { label: 'Before Meal', value: 'Before Meal' },
    { label: 'After Meal', value: 'After Meal' },
  ]);

  const [pressureOpen, setPressureOpen] = useState(false);
  const [pressureValue, setPressureValue] = useState(null);
  const [pressureItems, setPressureItems] = useState([
    { label: 'Before Meal', value: 'Before Meal' },
    { label: 'After Meal', value: 'After Meal' },
  ]);

  const onBloodSubmit = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ zIndex: 1000 }}>
        <TextInput label='Blood Glucose (mg/dL)' />
        <View>
          <DropDownPicker
            open={glucoseOpen}
            value={glucoseValue}
            items={glucoseItems}
            setOpen={setGlucoseOpen}
            setValue={setGlucoseValue}
            setItems={setGlucoseItems}
            placeholder='Relation To Meal'
          />
        </View>
      </View>
      <View style={{ zIndex: 900 }}>
        <TextInput label='Blood Pressure (Systolic)' />
        <TextInput label='Blood Pressure (Diastolic)' />
        <View>
          <DropDownPicker
            open={pressureOpen}
            value={pressureValue}
            items={pressureItems}
            setOpen={setPressureOpen}
            setValue={setPressureValue}
            setItems={setPressureItems}
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
      <ButtonFilled icon='check' text='Save' onPressHandler={onBloodSubmit} />
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
        // zIndex: 100,
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
