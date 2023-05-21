import React from 'react';
import { Platform, StatusBar, View } from 'react-native';

const container = {
  padding: 15,
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

const Container = ({ children, styles }) => {
  return <View style={{ ...container, ...styles }}>{children}</View>;
};

export default Container;
