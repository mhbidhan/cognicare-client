import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';
import { SERVER_URL } from './../../../config';
import globalStyles from './../../../utils/globalStyle';
import FileInput from '../../../components/common/FileInput/FileInput';
import uploadToCloudinary from '../../../services/cloudinary';
import LottiePatientBackground from './../../../components/LottieBackgrounds/LottiePatientBackground';
import showToast from './../../../utils/showToast';
import { getData } from '../../../localStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});

const AddContact = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('');
  const [img, setImg] = useState('');
  const { caretakerToken, thisPatient } = useSelector(
    (state) => state.caretaker
  );

  const emptyString = () => {
    setName('');
    setPhone('');
    setRelation('');
    setImg('');
  };
  const handleSubmit = async () => {
    const token = await getData('caretakerToken');
    const imgUrl = (await uploadToCloudinary(img)).secure_url;
    const data = {
      name,
      phone,
      relation,
      imgUrl,
    };
    console.log(data);
    fetch(`${SERVER_URL}/patients/${thisPatient._id}/addcontact`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('result', res);
        emptyString();
        showToast('success', 'Saved', 'Contact is saved successfully');
      })
      .catch((error) => {
        console.log('Error fetching', error);
      });
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <LottiePatientBackground />
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 30,
            fontWeight: '600',
          }}
        >
          Add Contact
        </Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Contact's name"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Contact's phone number"
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          value={relation}
          onChangeText={setRelation}
          placeholder='Relation with patient'
        />

        <FileInput handleChange={(file) => setImg(file)} />

        <Button
          icon='check-circle'
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
          Save contact
        </Button>
      </View>
    </View>
  );
};

export default AddContact;
