import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import FileInput from '../../../components/common/FileInput/FileInput';
import uploadToCloudinary from '../../../services/cloudinary';
// import ButtonFilled from './../../../components/common/buttons/ButtonFilled';
import { useCaretakerRegistrationMutation } from './../../../features/caretaker/caretakerApi';
import { useEffect } from 'react';
import globalStyles from './../../../utils/globalStyle';
import Toast from 'react-native-toast-message';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [img, setImg] = useState('');

  const [caretakerRegistration, { data, isLoading, error, isError }] =
    useCaretakerRegistrationMutation() || {};

  const emptyForm = () => {
    setName('');
    setPassword('');
    setEmail('');
    setPhone('');
    setImg('');
  };
  // console.log(data);
  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };
  useEffect(() => {
    if (!isLoading && !isError && data?._id) {
      showToast('success', 'Completed', 'Your account created successfully');
    } else if (!isLoading && isError && error) {
      showToast('error', 'Failed', error);
    }
  }, []);

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
    emptyForm();
  };

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
        value={email}
        onChangeText={setEmail}
        placeholder='Enter your email'
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder='Enter password'
        keyboardType='numeric'
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder='Enter your phone number'
        keyboardType='numeric'
      />

      <FileInput handleChange={(file) => setImg(file)} />

      <View style={styles.submitButton}>
        <Button
          icon='login-variant'
          mode='elevated'
          buttonColor={globalStyles.colors.primary}
          textColor={globalStyles.colors.primaryLight}
          contentStyle={{
            width: 300,
            paddingVertical: 10,
          }}
          style={{ borderRadius: 10 }}
          labelStyle={{ fontSize: 17 }}
          onPress={handleSubmit}
        >
          Sign Up
        </Button>
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
    borderColor: globalStyles.colors.primary,
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
  },
  signInTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 10,
  },
  signInPreText: {
    color: globalStyles.colors.green,
  },
  signInText: {
    color: globalStyles.colors.primary,
  },
});
