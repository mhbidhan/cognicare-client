import React from 'react';
import { View } from 'react-native';

const container = {
  padding: 15,
  paddingTop: 0,
};

const Container = ({ children, styles }) => {
  return <View style={{ ...container, ...styles }}>{children}</View>;
};

export default Container;
