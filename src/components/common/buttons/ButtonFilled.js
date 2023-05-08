import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import globalStyles from '../../../utils/globalStyle';

function ButtonFilled({ text, onPressHandler }) {
  return (
    <TouchableHighlight
      style={{
        width: 328,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: globalStyles.colors.primary,
      }}
      onPress={onPressHandler}
      underlayColor="#fff"
    >
      <Text style={{ color: '#fff', textAlign: 'center' }}>{text}</Text>
    </TouchableHighlight>
  );
}

export default ButtonFilled;
