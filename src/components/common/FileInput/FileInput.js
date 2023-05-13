import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const FileInput = ({ handleChange, defaultPlaceholder }) => {
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);

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
    borderRadius: 4,
    padding: 13,
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  label: {
    // color: globalStyles.colors.primary,
    fontSize: 16,
    marginBottom: 5,
  },
});
export default FileInput;
