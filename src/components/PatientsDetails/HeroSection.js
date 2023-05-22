import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import globalStyles from './../../utils/globalStyle';

function HeroSection() {
  const { thisPatient } = useSelector((state) => state.caretaker);
  console.log('thisPatient', thisPatient);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        padding: 10,
      }}
    >
      <Image
        source={{
          uri: thisPatient.imgUrl,
        }}
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{thisPatient.name}</Text>
        <View style={styles.textView}>
          <Text style={styles.text}>{thisPatient.email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: globalStyles.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: globalStyles.colors.white,
  },
  textView: {
    flexDirection: 'row',
    gap: 6,
  },
  lable: {
    fontWeight: '900',
    color: globalStyles.colors.white,
  },
  text: {
    color: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  modalParentView: {
    position: 'relative',
  },
  modal: {
    flex: 1,
    padding: 10,
    backgroundColor: globalStyles.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonView: {
    marginTop: 30,
  },
  descView: {
    flex: 1,
  },
});

export default HeroSection;
