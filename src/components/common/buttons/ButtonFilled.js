import React from 'react';
import { Button } from 'react-native-paper';
import globalStyles from '../../../utils/globalStyle';

function ButtonFilled({ text, onPressHandler, icon }) {
  return (
    <Button
      icon={icon ? icon : null}
      mode='elevated'
      buttonColor={globalStyles.colors.primary}
      textColor={globalStyles.colors.primaryLight}
      contentStyle={{
        width: 300,
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
