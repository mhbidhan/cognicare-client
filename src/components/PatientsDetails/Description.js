import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import globalStyles from './../../utils/globalStyle';
import pic from './../../assets/pic.jpg';
import ButtonFilled from '../common/buttons/ButtonFilled';
import QRCode from 'react-native-qrcode-svg';
import { Avatar, BottomNavigation, Text } from 'react-native-paper';

function Description({ patient, navigation }) {
  console.log('contacts', patient.contacts);
  return (
    <ScrollView style={styles.container}>
      <View style={{ margin: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View
            style={{ flexDirection: 'column', justifyContent: 'space-between' }}
          >
            {/* <View style={styles.textView}>
              <Text style={{ fontWeight: '900' }}>Name: </Text>
              <Text style={styles.text}>{patient.name}</Text>
            </View> */}
            <View style={styles.textView}>
              <Text style={{ fontWeight: '900' }}>Gender: </Text>
              <Text style={styles.text}>{patient.gender}</Text>
            </View>
            <View style={styles.textView}>
              <Text style={{ fontWeight: '900' }}>Age: </Text>
              <Text style={styles.text}>{patient.age}</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '900' }}>Birth place: </Text>
              <Text style={styles.text}>{patient.birthCountry}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '900' }}>Living in: </Text>
              <Text style={styles.text}>{patient.country}</Text>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '900' }}>Locale: </Text>
              <Text style={styles.text}>{patient.locale}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '900' }}>Living Arrangement: </Text>
              <Text style={styles.text}>{patient.livingArrangement}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#2b326e',
            marginTop: 20,
            paddingBottom: 10,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            opacity: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
            Emergency Contact
          </Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={styles.textView}>
              <Text style={styles.lable}>Name: </Text>
              <Text style={styles.emergencytext}>
                {patient.emergencyContact.name}
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.lable}>Phone: </Text>
              <Text style={styles.emergencytext}>
                {patient.emergencyContact.phone}
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.lable}>Relation: </Text>
              <Text style={styles.emergencytext}>
                {patient.emergencyContact.relation}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: '#2b326e', marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            Contact
          </Text>
          {patient.contacts.map((c, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#2b326e',
                padding: 5,
                borderBottomWidth: 1,
                borderBottomColor: '#fff',
              }}
            >
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.lable}>Name</Text>
                <Text style={styles.emergencytext}>{c.name}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.lable}>Phone</Text>
                <Text style={styles.emergencytext}>{c.phone}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.lable}>Relation</Text>
                <Text style={styles.emergencytext}>{c.relation}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
    backgroundColor: globalStyles.colors.white,
    opacity: 0.5,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 10,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: globalStyles.colors.primary,
    // shadowColor: globalStyles.colors.primary,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 3,
  },
  textView: {
    flexDirection: 'row',
  },
  text: {
    color: globalStyles.colors.primary,
  },
  emergencytext: {
    color: globalStyles.colors.white,
  },
  lable: {
    fontWeight: '900',
    color: globalStyles.colors.green,
  },
});

export default Description;
