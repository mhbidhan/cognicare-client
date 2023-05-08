import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import globalStyles from '../../../utils/globalStyle';

function ButtonFilled({
  text,
  onPressHandler,
  width,
  height,
  textSize,
  btnColor,
}) {
  return (
    <TouchableHighlight
      style={{
        width: width ? width : 328,
        height: height ? height : 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: btnColor ? btnColor : globalStyles.colors.primary,
      }}
      onPress={onPressHandler}
      underlayColor='#fff'
    >
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: textSize ? textSize : null,
        }}
      >
        {text}
      </Text>
    </TouchableHighlight>
  );
}

export default ButtonFilled;
