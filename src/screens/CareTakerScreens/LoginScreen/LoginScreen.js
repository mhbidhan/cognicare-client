import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { useLoginMutation } from './../../../features/caretaker/caretakerApi';
import ButtonFilled from './../../../components/common/buttons/ButtonFilled';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, getData } from './../../../localStorage';
import globalStyles from './../../../utils/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import animationImg from './../../../assets/night.json';

export default function LoginScreen({ navigation, route }) {
  const animation = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isPatientState, isNoUserState, isCareTakerState } = route.params;
  // const { caretakerToken } = useSelector((state) => state.caretaker);
  // console.log('caretakerToken', caretakerToken);

  const [login, { data, isLoading, isError }] = useLoginMutation() || {};
  console.log(data);
  // const storeData = async (key, value) =>
  //   await AsyncStorage.setItem(key, value);

  const handleSubmit = async () => {
    try {
      console.log('login pressed');
      const data = {
        email,
        password,
      };
      login(data);
      // console.log(rtkdata);
      // await AsyncStorage.setItem('caretakerToken', 'Hello');
      // isPatientState(false);
      // isNoUserState(false);
      // isCareTakerState(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      console.log('Hello from caretaker login');
      isPatientState(false);
      isNoUserState(false);
      isCareTakerState(true);
      storeData('caretakerToken', data);
      console.log(data);
      // navigation.navigate('Patient_List');
    }
  }, [data, isLoading]);

  // const getData = async (key) => {
  //   const value = await AsyncStorage.getItem(key);
  //   return value;
  // };
  // getData('token').then((val) => {
  //   console.log('storage', val);
  // });

  return (
    <View
      style={{ flex: 1, position: 'relative', height: '100%', width: '100%' }}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: -1,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={animationImg}
        imageAssetsFolder='lottie/welcomeScreen/images'
        resizeMode='cover'
      />
      <View style={styles.container}>
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
            style={{ borderWidth: 1, borderColor: '#fff', borderRadius: 10 }}
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
    backgroundColor: globalStyles.colors.white,
    color: '#999999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
    // marginTop: 50,
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
    color: globalStyles.colors.white,
  },
});
