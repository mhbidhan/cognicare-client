import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import globalStyles from '../../../utils/globalStyle';

export default function ModalScreen({ notification, setNotification }) {
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
            <Text style={{ fontSize: 35, fontWeight: '400', color: '#fff' }}>
              13:30
            </Text>
            <Text style={{ fontSize: 30, fontWeight: '400', color: '#fff' }}>
              Lunch with Alfred
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            // gap: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: globalStyles.colors.gray,
            borderTopLeftRadius: 120,
            borderTopRightRadius: 120,
            position: 'relative',
          }}
        >
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dgsx9bvvf/image/upload/v1683696605/Lunch_break_Flatline_ux3rbz.png',
            }}
            style={{
              position: 'absolute',
              bottom: 190,
              left: 30,
              width: 300,
              height: 300,
              zIndex: 1,
            }}
          />
          {/* <Text style={{ fontSize: 15, color: '#fff', marginBottom: 20 }}>
            Pasta house
          </Text> */}
          <Button
            icon='check'
            mode='contained'
            style={{ borderRadius: 30, marginBottom: 20, zIndex: 2 }}
            labelStyle={{ fontSize: 13 }}
            onPress={() => setNotification(false)}
          >
            DONE
          </Button>
          <Button
            icon='alarm-snooze'
            mode='text'
            textColor='#fff'
            labelStyle={{ fontSize: 13 }}
            onPress={() => console.log('Pressed')}
          >
            SHOOZE
          </Button>
        </View>
      </View>
    </View>
  );
}
