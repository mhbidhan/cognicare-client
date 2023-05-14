import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useCreateNewPatientMutation } from './../../../features/patient/patientApi';
import ButtonFilled from './../../../components/common/buttons/ButtonFilled';
import { getData } from './../../../localStorage';
import { useEffect } from 'react';
import FileInput from '../../../components/common/FileInput/FileInput';
import uploadToCloudinary from './../../../services/cloudinary';
import globalStyles from './../../../utils/globalStyle';
import Toast from 'react-native-toast-message';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [img, setImg] = useState('');
  const [country, setCountry] = useState('');
  const [birthCountry, setBirthCountry] = useState('');
  const [locale, setLocale] = useState('');
  const [livingArrangement, setLivingArrangement] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');
  const [token, setToken] = useState('');
  const [openGender, setOpenGender] = useState(false);
  const [openRelationship, setOpenRelationship] = useState(false);
  const [openLocale, setOpenLocale] = useState(false);
  const [openLivingArrangement, setOpenLivingArrangement] = useState(false);
  const genderItems = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];
  const relationshipItems = [
    { label: 'Single', value: 'Single' },
    { label: 'Partner', value: 'Partner' },
    { label: 'Marital', value: 'Marital' },
  ];
  const localeItems = [
    { label: 'Rural', value: 'Rural' },
    { label: 'Urban', value: 'Urban' },
  ];
  const livingArrangementItems = [
    { label: 'Renting', value: 'Renting' },
    { label: 'House Owner', value: 'House Owner' },
    { label: 'Homeless', value: 'Homeless' },
  ];

  const [createNewPatient, { data, isLoading, isError, error }] =
    useCreateNewPatientMutation() || {};
  console.log(data);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };
  useEffect(() => {
    if (!isLoading && !isError && data?._id) {
      showToast('success', 'Confirmation', 'Patient file added successfully');
    } else if (!isLoading && isError && error) {
      showToast('error', 'Failed', error);
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
      gender,
      relationship,
      country,
      birthCountry,
      locale,
      livingArrangement,
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
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder='Enter patient name'
        />

        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder='Enter patient age'
          keyboardType='numeric'
        />

        <View style={{ zIndex: 3 }}>
          <DropDownPicker
            open={openGender}
            value={gender}
            items={genderItems}
            setOpen={setOpenGender}
            setValue={setGender}
            placeholder='Select gender'
            // zIndex={1000}
            style={{
              marginBottom: 10,
              width: 300,
              borderRadius: 5,
              // backgroundColor: globalStyles.colors.primary,
            }}
            containerStyle={{
              width: 300,
            }}
            textStyle={{
              color: '#000',
              opacity: 0.4,
            }}
          />
        </View>

        <View style={{ zIndex: 2 }}>
          <DropDownPicker
            open={openRelationship}
            value={relationship}
            items={relationshipItems}
            setOpen={setOpenRelationship}
            setValue={setRelationship}
            placeholder='Select relationship status'
            zIndex={1000}
            style={{
              marginBottom: 10,
              width: 300,
              borderRadius: 5,
              // backgroundColor: globalStyles.colors.primary,
            }}
            containerStyle={{
              width: 300,
            }}
            textStyle={{
              color: '#000',
              opacity: 0.4,
            }}
          />
        </View>

        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder='Where the patient live'
        />

        <TextInput
          style={styles.input}
          value={birthCountry}
          onChangeText={setBirthCountry}
          placeholder='Where the patient born'
        />

        <View style={{ zIndex: 3 }}>
          <DropDownPicker
            open={openLocale}
            value={locale}
            items={localeItems}
            setOpen={setOpenLocale}
            setValue={setLocale}
            placeholder='Select locale'
            // zIndex={1000}
            style={{
              marginBottom: 10,
              width: 300,
              borderRadius: 5,
              // backgroundColor: globalStyles.colors.primary,
            }}
            containerStyle={{
              width: 300,
            }}
            textStyle={{
              color: '#000',
              opacity: 0.4,
            }}
          />
        </View>

        <View style={{ zIndex: 2 }}>
          <DropDownPicker
            open={openLivingArrangement}
            value={livingArrangement}
            items={livingArrangementItems}
            setOpen={setOpenLivingArrangement}
            setValue={setLivingArrangement}
            placeholder='Select living arrangement'
            // zIndex={1000}
            style={{
              marginBottom: 10,
              width: 300,
              borderRadius: 5,
              // backgroundColor: globalStyles.colors.primary,
            }}
            containerStyle={{
              width: 300,
            }}
            textStyle={{
              color: '#000',
              opacity: 0.4,
            }}
          />
        </View>
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
          <Button
            icon='database-plus-outline'
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
            Add Patient
          </Button>
          {/* <ButtonFilled
          text='Add Patient'
          onPressHandler={handleSubmit}
          width={200}
          style={{ marginTop: 30 }}
        /> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    // marginTop: 20,
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
