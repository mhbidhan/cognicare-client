import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

const Container = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default Container;
