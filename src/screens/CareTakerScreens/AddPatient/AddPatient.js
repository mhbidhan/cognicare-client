import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useCreateNewPatientMutation } from './../../../features/patient/patientApi';
import ButtonFilled from './../../../components/common/buttons/ButtonFilled';
import { getData } from './../../../localStorage';
import { useEffect } from 'react';
import FileInput from '../../../components/common/FileInput/FileInput';
import uploadToCloudinary from './../../../services/cloudinary';
import globalStyles from './../../../utils/globalStyle';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [img, setImg] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');
  const [token, setToken] = useState('');

  const [createNewPatient, { data, isLoading, isError }] =
    useCreateNewPatientMutation() || {};
  console.log(data);

  useEffect(() => {
    if (!isLoading && !isError && data?._id) {
      Alert.alert('Confirmation', 'Patient file added successfully');
    }
  }, [isLoading, data]);

  const emptyForm = () => {
    setName('');
    setAge('');
    setImg('');
    setEmergencyName('');
    setEmergencyPhone('');
    setEmergencyRelation('');
  };

  const handleSubmit = async () => {
    const imgUrl = (await uploadToCloudinary(img)).secure_url;
    const data = {
      name,
      age,
      imgUrl,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relation: emergencyRelation,
      },
    };
    createNewPatient(data);
    emptyForm();
    // navigation.navigate('Patient_List');
  };
  //   launchCamera(
  //     {
  //       mediaType: 'photo',
  //       maxWidth: 800,
  //       maxHeight: 600,
  //       quality: 1,
  //     },
  //     (res) => console.log(res)
  //   );
  //   // ImagePicker.showImagePicker(
  //   //   {
  //   //     mediaType: 'photo',
  //   //     maxWidth: 800,
  //   //     maxHeight: 600,
  //   //     quality: 1,
  //   //   },
  //   //   (response) => {
  //   //     if (response.didCancel) {
  //   //       console.log('User cancelled image picker');
  //   //     } else if (response.error) {
  //   //       console.log('ImagePicker Error: ', response.error);
  //   //     } else if (response.customButton) {
  //   //       console.log('User tapped custom button: ', response.customButton);
  //   //     } else {
  //   //       setImageUri(response.uri);
  //   //     }
  //   //   }
  //   // );
  // };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder='Enter your name'
      />

      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder='Enter your age'
        keyboardType='numeric'
      />

      <TextInput
        style={styles.input}
        value={emergencyName}
        onChangeText={setEmergencyName}
        placeholder='Emergency contact name'
      />

      <TextInput
        style={styles.input}
        value={emergencyPhone}
        onChangeText={setEmergencyPhone}
        placeholder='Emergency contact phone'
        keyboardType='numeric'
      />

      <TextInput
        style={styles.input}
        value={emergencyRelation}
        onChangeText={setEmergencyRelation}
        placeholder='Emergency contact relation'
      />

      <FileInput handleChange={(file) => setImg(file)} />

      <View style={styles.submitButton}>
        <ButtonFilled
          text='Add Patient'
          onPressHandler={handleSubmit}
          width={200}
          style={{ marginTop: 30 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: globalStyles.colors.primary,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
    width: 200,
  },
  signInTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 10,
  },
  signInPreText: {
    color: '#000',
  },
  signInText: {
    color: '#79C0E8',
  },
});
