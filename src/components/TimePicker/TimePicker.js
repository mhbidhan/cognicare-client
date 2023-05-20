import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import moment from 'moment';

const TimePicker = ({ mode = 'time', label, onTimeChange }) => {
  const [time, setTime] = useState(new Date());
  const [timeValue, setTimeValue] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const formatedTime = moment(time).format('LT');
    setTimeValue(formatedTime);
    const splitedTime = formatedTime.split(/:| /);
    const convertedTime =
      splitedTime[2] === 'AM'
        ? splitedTime
        : splitedTime.map((val, idx) =>
            idx === 0 && val !== '12' ? +val + 12 : val
          );

    onTimeChange({
      timeInNumber: +convertedTime.slice(0, 2).join(''),
      timeInString: formatedTime,
    });
  }, [time]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setTime(currentDate);
  };

  return (
    <TouchableOpacity onPress={() => setShow(true)}>
      <TextInput
        style={{
          marginBottom: 30,
        }}
        onPressIn={() => setShow(true)}
        label={label}
        value={timeValue}
        defaultValue={timeValue}
        placeholder="Time"
      />
      {show && (
        <DateTimePicker
          value={time}
          mode={mode}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
};

export default TimePicker;
