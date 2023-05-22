import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import globalStyles from './../../utils/globalStyle';

const fullWidth = Dimensions.get('window').width;

function Description({ patient }) {
  return (
    <ScrollView style={styles.container}>
      <View style={{ margin: 5 }}>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <PatientDescriptionView
              propName={'Gender'}
              value={patient.gender}
            />
            <PatientDescriptionView propName={'Age'} value={patient.age} />
            <PatientDescriptionView
              propName={'Birth place'}
              value={patient.birthCountry}
            />
            <PatientDescriptionView
              propName={'Living in'}
              value={patient.country}
            />
            <PatientDescriptionView
              propName={'Locale'}
              value={patient.locale}
            />
            <PatientDescriptionView
              propName={'Living Arrangement'}
              value={patient.livingArrangement}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          ></View>
        </View>
        <EmergencyContactCard emergencyContact={patient.emergencyContact} />
        <ContactList contacts={patient.contacts} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  backgroundContainer: {
    width: fullWidth - 40,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  textView: {
    width: fullWidth - 40,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 16,
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

const PatientDescriptionView = ({ propName, value }) => {
  return (
    <View style={styles.textView}>
      <Text style={{ fontWeight: '900', color: '#fff', fontSize: 16 }}>
        {propName} :
      </Text>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

const PatientContactView = ({ propName, value }) => {
  return (
    <View
      style={{
        alignSelf: 'stretch',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ fontWeight: '900', color: '#000', fontSize: 16 }}>
        {propName} :
      </Text>
      <Text style={{ fontSize: 16, color: '#000' }}>{value}</Text>
    </View>
  );
};

const EmergencyContactCard = ({ emergencyContact }) => {
  const { name, phone, relation } = emergencyContact;
  return (
    <View style={styles.backgroundContainer}>
      <Text
        style={{
          fontWeight: '900',
          color: '#000',
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        Emergency Contact
      </Text>
      <PatientContactView propName={'Name'} value={name} />
      <PatientContactView propName={'Phone'} value={`+${phone}`} />
      <PatientContactView propName={'Relation'} value={relation} />
    </View>
  );
};

const ContactList = ({ contacts = [] }) => {
  return (
    <View style={styles.backgroundContainer}>
      <Text
        style={{
          fontWeight: '900',
          color: '#000',
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        Other Contacts
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Relation</DataTable.Title>
          <DataTable.Title>Phone</DataTable.Title>
        </DataTable.Header>
        {contacts.map((contact, idx) => {
          const { name, relation, phone } = contact;
          return (
            <DataTable.Row key={idx}>
              <DataTable.Cell>{name}</DataTable.Cell>
              <DataTable.Cell>{relation}</DataTable.Cell>
              <DataTable.Cell>+{phone}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
};
