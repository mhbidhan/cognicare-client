import React from 'react';
import { Text, View } from 'react-native';
import { ImageBackground } from 'react-native';
import nightWallpaper from '../../assets/nightWallpaper.png';
import globalStyles from '../../utils/globalStyle';

const PatientDashBoard = () => {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ImageBackground
        source={nightWallpaper}
        resizeMode='cover'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          opacity: 0.3,
        }}
      ></ImageBackground>
      <View>
        <Text style={[{ color: 'white' }, globalStyles.titleText]}>
          Good morning, Touhid
        </Text>
      </View>
      <View>
        <Text>Next task</Text>
      </View>
      <View>
        <Text>Today's Progress</Text>
      </View>
      <View>
        <Text>Planning</Text>
      </View>
      <Text />
    </View>
  );
};

export default PatientDashBoard;
