import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import { useLoginMutation } from './../../../features/caretaker/caretakerApi';
import ButtonFilled from './../../../components/common/buttons/ButtonFilled';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, getData } from './../../../localStorage';
import globalStyles from './../../../utils/globalStyle';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { caretakerToken } = useSelector((state) => state.caretaker);
  // console.log('caretakerToken', caretakerToken);

  const [login, { data, isLoading, isError }] = useLoginMutation() || {};
  // console.log(data);
  // const storeData = async (key, value) =>
  //   await AsyncStorage.setItem(key, value);

  const handleSubmit = () => {
    const data = {
      email,
      password,
    };
    login(data);
  };

  // const getData = async (key) => {
  //   const value = await AsyncStorage.getItem(key);
  //   return value;
  // };
  useEffect(() => {
    if (!isLoading && !isError && data) {
      storeData('caretakerToken', data);
      navigation.navigate('Patient_List');
    }
  }, [data, isLoading]);

  // getData('token').then((val) => {
  //   console.log('storage', val);
  // });

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Name:</Text> */}
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
        placeholder='Enter your password'
        secureTextEntry={true}
      />

      <View style={styles.submitButton}>
        <Button
          icon='login'
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
          Login
        </Button>
      </View>

      <View style={styles.signupTextView}>
        <Text style={styles.signupPreText}>Don't have an account?</Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('Signup')}
        >
          Sign Up
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
    // width: 200,
    // height: 100,
  },
  signupTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 10,
  },
  signupPreText: {
    color: globalStyles.colors.green,
  },
  signupText: {
    color: globalStyles.colors.primary,
  },
});
