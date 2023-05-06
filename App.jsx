import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Container from './src/components/container/Container.component';

export default function App() {
  return (
    <Container>
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({});
