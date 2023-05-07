import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import Button from './../../../components/common/Button/Button';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleSubmit = () => {
    console.log(
      `Name: ${name}, Age: ${age}, Email: ${email}, Phone: ${phone}, Image: ${imageUri}`
    );
  };

  // const handleChooseImage = () => {
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
        value={email}
        onChangeText={setEmail}
        placeholder='Enter your email'
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder='Enter your phone number'
        keyboardType='numeric'
      />

      <TextInput
        style={styles.input}
        value={imageUri}
        onChangeText={setImageUri}
        placeholder='Enter your image url'
      />

      {/* <View>
        {imageUri && <Image style={styles.image} source={{ uri: imageUri }} />}
        <Button title='Choose Image' onPress={handleChooseImage} />
      </View> */}

      <View style={styles.submitButton}>
        <Button
          color='#61B15A'
          title='Signup'
          onPress={handleSubmit}
          // width={200}
        />
      </View>

      <View style={styles.signInTextView}>
        <Text style={styles.signInPreText}>Don't have an account?</Text>
        <Text
          style={styles.signInText}
          onPress={() => navigation.navigate('Login')}
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
