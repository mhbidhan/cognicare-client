import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import call from '../../../assets/lotties/call.json';
import globalStyles from '../../../utils/globalStyle';

export default function ContactNotificationScreen({
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

  const { time, message, details } = notification;

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
            }}
          >
            <Text style={{ fontSize: 45, fontWeight: '600', color: '#fff' }}>
              {time}
            </Text>
            <Text style={{ fontSize: 30, fontWeight: '200', color: '#fff' }}>
              {message}
            </Text>
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
          <LottieView
            autoPlay
            style={{
              position: 'absolute',
              bottom: 130,
              width: Dimensions.get('window').width * 0.8,
              height: Dimensions.get('window').width * 0.8,
              zIndex: 1,
            }}
            source={call}
          />
          <Button
            icon="phone"
            mode="contained"
            style={{ borderRadius: 30, marginBottom: 20, zIndex: 2 }}
            labelStyle={{ fontSize: 13 }}
            onPress={() => setNotification(false)}
          >
            Call
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
  );
}
