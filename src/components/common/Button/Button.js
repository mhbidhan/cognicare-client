import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

function Button({ title, color, handeler, width }) {
  return (
    <View style={{ marginTop: 30, width: width }}>
      <Button color={color} title={title} onPress={handeler} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//   },
//   submitButton: {
//     marginTop: 30,
//     width: { width },
//   },
// });
export default Button;
