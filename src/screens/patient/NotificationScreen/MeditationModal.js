import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import logo from '../../../assets/lotties/yoga-meditation.json';
import globalStyles from '../../../utils/globalStyle';

export default function MeditationModal({ notification, setNotification }) {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  const containerStyle = {
    flex: 1,
    backgroundColor: globalStyles.colors.lightGray,
    width: screenWidth,
    height: screenHeight,
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
            }}
          >
            <Text style={{ fontSize: 45, fontWeight: '600', color: '#fff' }}>
              04:00 AM
            </Text>
            <Text style={{ fontSize: 30, fontWeight: '200', color: '#fff' }}>
              Meditation
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
              bottom: 120,
              left: 40,
              width: 200,
              height: 200,
              zIndex: 1,
              // backgroundColor: '#eee',
            }}
            source={logo}
          />
          {/* <Text style={{ fontSize: 15, color: '#fff', marginBottom: 20 }}>
            Pasta house
          </Text> */}
          <Button
            icon="check"
            mode="contained"
            // buttonColor="#fff"
            // textColor={globalStyles.colors.gray}
            style={{ borderRadius: 30, marginBottom: 20, zIndex: 2 }}
            labelStyle={{ fontSize: 13 }}
            onPress={() => setNotification(null)}
          >
            DONE
          </Button>
          <Button
            icon="alarm-snooze"
            mode="text"
            textColor="#fff"
            labelStyle={{ fontSize: 13 }}
            onPress={() => {
              setNotification(null);
              setTimeout(() => setNotification(notification), 1000 * 60 * 10);
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
