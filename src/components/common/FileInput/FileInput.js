import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FileInput = ({ handleChange }) => {
  const [placeholder, setPlaceholder] = useState('Select an image');

  async function selectFile() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        quality: 1,
      });

      if (!result.cancelled) {
        const fileData = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setPlaceholder('Image selected');
        handleChange(fileData);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <TouchableOpacity style={styles.input} onPress={selectFile}>
      <Text style={styles.label}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
export default FileInput;
