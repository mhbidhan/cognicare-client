import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import logo from '../../../assets/lotties/gamei.json';
import globalStyles from '../../../utils/globalStyle';

export default function GameNotificationScreen({
  notification,
  setNotification,
  handleLog,
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
              left: 40,
              width: 200,
              height: 200,
              zIndex: 1,
            }}
            source={logo}
          />

          <Button
            icon="check"
            mode="contained"
            style={{ borderRadius: 30, marginBottom: 20, zIndex: 2 }}
            labelStyle={{ fontSize: 13 }}
            onPress={() => {
              handleLog();
              setNotification(null);
            }}
          >
            PLAY NOW
          </Button>
          <Button
            icon="alarm-snooze"
            mode="text"
            textColor="#fff"
            labelStyle={{ fontSize: 13 }}
            onPress={() => {
              setNotification(null);
            }}
            style={{ zIndex: 2 }}
          >
            SHOOZE
          </Button>
        </View>
      </View>
    </View>
  );
}
