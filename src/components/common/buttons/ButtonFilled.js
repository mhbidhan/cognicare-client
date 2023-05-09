import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
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
      underlayColor={btnColor ? btnColor : globalStyles.colors.primary}
    >
      <View
        style={{
          shadowColor: 'white',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: textSize ? textSize : 16,
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

export default ButtonFilled;
