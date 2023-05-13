import React from 'react';
import { Button } from 'react-native-paper';
import globalStyles from '../../../utils/globalStyle';

function ButtonFilled({ text, onPressHandler, icon, width, color }) {
  return (
    <Button
      icon={icon ? icon : null}
      mode='elevated'
      buttonColor={globalStyles.colors.primary}
      textColor='white'
      contentStyle={{
        // width: width ? width : 100,
        paddingVertical: 10,
      }}
      style={{ borderRadius: 10 }}
      labelStyle={{ fontSize: 17 }}
      onPress={onPressHandler}
    >
      {text}
    </Button>
  );
}

export default ButtonFilled;
