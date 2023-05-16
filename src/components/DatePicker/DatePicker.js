import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import moment from 'moment';

const DatePicker = ({ label, onTimeChange }) => {
  const [date, setDate] = useState(new Date());
  // const [dateValue, setDateValue] = useState('');
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   const formatedTime = moment(time).format('L');
  //   setDateValue(formatedTime);
  //   const splitedTime = formatedTime.split(/:| /);
  //   const convertedTime =
  //     splitedTime[2] === 'AM'
  //       ? splitedTime
  //       : splitedTime.map((val, idx) => (idx === 0 ? +val + 12 : val));

  //   onTimeChange({
  //     timeInNumber: +convertedTime.slice(0, 2).join(''),
  //     timeInString: formatedTime,
  //   });
  // }, [time]);

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
    // console.log(selectedDate);
    // const currentDate = selectedDate;
    setShow(false);
    setDate(new Date(event.nativeEvent.timestamp).toLocaleDateString());
    // setDateValue(new Date(event.nativeEvent.timestamp).toLocaleDateString());
    onTimeChange(event.nativeEvent.timestamp);
  };

  return (
    <TouchableOpacity style={{ flex: 1 }}>
      <TextInput
        style={
          {
            // flex: 1,
          }
        }
        onPressIn={() => setShow(true)}
        label={label}
        value={date}
        defaultValue={date}
      />
      {show && (
        <DateTimePicker
          value={date}
          mode={'date'}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
};

export default DatePicker;
