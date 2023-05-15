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
import FileInput from '../common/FileInput/FileInput';
import uploadToCloudinary from '../../services/cloudinary';

const ContactActivityForm = ({ setView, onFromSubmit, setCurrentActivity }) => {
  const activityType = 'contact';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = async () => {
    const imgUrl = (await uploadToCloudinary(img)).secure_url;
    const formData = {
      name,
      email,
      phone,
      relationship,
      imgUrl,
    };
    setCurrentActivity({ [activityType]: formData, activityType });
    setView('genaral');
  };

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
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          label='Email'
          placeholder='x@mail.com'
        />

        <TextInput
          value={phone}
          onChangeText={(url) => setPhone(url)}
          style={styles.input}
          label='Phone'
          placeholder='017xxxxxxxx'
        />

        <TextInput
          value={relationship}
          onChangeText={(url) => setRelationship(url)}
          style={styles.input}
          label='Relationship'
          placeholder='relationship'
        />

        <FileInput handleChange={(file) => setImg(file)} />

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

export default ContactActivityForm;
