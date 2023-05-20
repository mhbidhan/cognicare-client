import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import logo from '../../../assets/medicine.json';
import globalStyles from '../../../utils/globalStyle';

export default function MedicineNotificationScreen({
  notification,
  setNotification,
}) {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  const containerStyle = {
    flex: 1,
    backgroundColor: globalStyles.colors.lightGray,
    width: screenWidth,
    height: screenHeight,
  };

  const { message, time, details } = notification;

  const RenderItem = ({ item, index }) => {
    console.log(item.packageImgUrlj);
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: globalStyles.colors.white,
          marginRight: 5,
          padding: 5,
          borderRadius: 5,
          opacity: 0.7,
          marginBottom: 8,
        }}
      >
        <Image source={{ uri: item.packageImgUrl }} style={styles.image} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.textView}>
            <Text style={styles.text}>{item.quantity} X </Text>
            <Text style={styles.text}>{item.unit}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={containerStyle}>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 30,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 35, fontWeight: '400', color: '#fff' }}>
              {time}
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '400',
                color: '#fff',
                marginBottom: 20,
              }}
            >
              {message}
            </Text>
            <LottieView
              autoPlay
              ref={null}
              style={{
                width: 150,
                height: 150,
                backgroundColor: 'transparent',
              }}
              source={logo}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: globalStyles.colors.gray,
            borderTopLeftRadius: 120,
            borderTopRightRadius: 120,
            position: 'relative',
          }}
        >
          <ScrollView
            style={{
              position: 'absolute',
              bottom: 160,
              left: 30,
              width: 300,
              height: 300,
              zIndex: 1,
            }}
          >
            {details.medicine.map((item) => (
              <RenderItem item={item} />
            ))}
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 30,
              zIndex: 2,
            }}
          >
            <Button
              icon="check"
              mode="contained"
              // buttonColor="#fff"
              // textColor={globalStyles.colors.gray}
              style={{ borderRadius: 30, marginBottom: 20, zIndex: 2 }}
              labelStyle={{ fontSize: 13 }}
              onPress={() => setNotification(false)}
            >
              DONE
            </Button>
            <Button
              icon="alarm-snooze"
              mode="text"
              textColor="#fff"
              labelStyle={{ fontSize: 13 }}
              onPress={() => console.log('Pressed')}
              style={{ zIndex: 2 }}
            >
              SHOOZE
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    textTransform: 'capitalize',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: globalStyles.colors.primary,
  },
  textView: {
    flexDirection: 'row',
    fontSize: 18,
  },
  text: {
    textTransform: 'capitalize',
    color: globalStyles.colors.primary,
  },
  lable: {
    fontWeight: '900',
    color: globalStyles.colors.primary,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 30,
    borderRadius: 10,
    margin: 2,
  },
});
