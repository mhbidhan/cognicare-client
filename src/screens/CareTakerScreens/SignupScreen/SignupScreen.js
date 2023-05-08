import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import FileInput from '../../../components/common/FileInput/FileInput';
import uploadToCloudinary from '../../../services/cloudinary';
import ButtonFilled from './../../../components/buttons/ButtonFilled';
import { useCaretakerRegistrationMutation } from './../../../features/caretaker/caretakerApi';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [img, setImg] = useState('');

  const [caretakerRegistration, { data, isLoading, error, isError }] =
    useCaretakerRegistrationMutation() || {};

  const handleSubmit = async () => {
    const imgUrl = (await uploadToCloudinary(img)).secure_url;
    const data = {
      name,
      password,
      email,
      phone,
      imgUrl,
    };

    caretakerRegistration(data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        keyboardType="numeric"
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        keyboardType="numeric"
      />

      {/* <TextInput
        style={styles.input}
        value={imgUrl}
        onChangeText={setImgUrl}
        placeholder='Enter your image url'
      /> */}

      <FileInput handleChange={(file) => setImg(file)} />

      <View style={styles.submitButton}>
        <ButtonFilled
          text="Signup"
          onPressHandler={handleSubmit}
          width={200}
          style={{ marginTop: 30 }}
        />
      </View>
      <View style={styles.signInTextView}>
        <Text style={styles.signInPreText}>Already have an account?</Text>
        <Text
          style={styles.signInText}
          onPress={() => navigation.navigate('CareTakerLogIn')}
        >
          Login
        </Text>
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
    borderColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
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
    marginTop: 30,
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
