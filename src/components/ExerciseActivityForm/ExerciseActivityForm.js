import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import handleInputChange from '../../utils/handleInputChange';
import globalStyles from '../../utils/globalStyle';

const ExerciseActivityForm = ({
  setView,
  onFromSubmit,
  setCurrentActivity,
}) => {
  const activityType = 'exercise';
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url1, seturl1] = useState('');
  const [url2, seturl2] = useState('');
  const [url3, seturl3] = useState('');

  const handleSubmit = () => {
    const formData = {
      name,
      description,
      urls: [url1, url2, url3],
    };
    setCurrentActivity({ [activityType]: formData, activityType });
    setView('genaral');
  };

  // const handleUrlInput = () => {
  //   const newUrlsArr = [...urls];
  //   newUrlsArr.push(url);
  //   seturls(newUrlsArr);
  // };
  // const handleEditUrlInput = (url, i) => {
  //   const newUrlsArr = [...urls];
  //   newUrlsArr[i] = url;
  //   seturls(newUrlsArr);
  // };

  return (
    <View style={styles.form}>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={(text) => setName(text)}
          style={styles.input}
          label='Exercise Type'
          placeholder='Walk, jumping...'
        />
        <TextInput
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
          label='Description'
          placeholder='Description'
        />

        <TextInput
          value={url1}
          onChangeText={(url) => seturl1(url)}
          style={styles.input}
          label='url-1'
          placeholder='Task video url'
        />
        <TextInput
          value={url2}
          onChangeText={(url) => seturl2(url)}
          style={styles.input}
          label='url-2'
          placeholder='Task video url'
        />
        <TextInput
          value={url3}
          onChangeText={(url) => seturl3(url)}
          style={styles.input}
          label='url-3'
          placeholder='Task video url'
        />
        <View style={styles.btnContainer}>
          <Button
            style={styles.btn}
            mode='contained'
            onPress={() => setView('activityType')}
          >
            Back
          </Button>
          <Button style={styles.btn} mode='contained' onPress={handleSubmit}>
            Next
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 30,
    minWidth: Dimensions.get('window').width,
  },
  input: {
    marginBottom: 30,
  },
  urlInput: {
    flex: 1,
    marginBottom: 30,
    height: 90,
  },
  btn: {
    minWidth: 140,
    marginBottom: 30,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 5,
  },
});

export default ExerciseActivityForm;
