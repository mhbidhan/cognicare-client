import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  Image,
} from 'react-native';
import globalStyles from './../../utils/globalStyle';
import pic from './../../assests/pic.jpg';

function PatientCard() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: { pic },
          }}
          style={{ width: 80, height: 80, borderRadius: 80 }}
        />
      </View>
      <Text style={styles.name}>Touhid</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    border: 20,
    borderColor: globalStyles.colors.primary,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default PatientCard;
