import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import anim from './../../../assets/data.json';

export default function TestingFile({ navigation, route }) {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    animation.current?.play();
  }, []);
  return (
    <View
      style={{
        // backgroundColor: 'red',
        position: 'relative',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <LottieView
        ref={(animation) => {
          this.animation = animation;
        }}
        style={{
          // backgroundColor: 'yellow',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: -1,
          // justifyContent: 'flex-end',
        }}
        source={anim}
        imageAssetsFolder='lottie/welcomeScreen/images'
        resizeMode='cover'
      />
      <View style={{ position: 'absolute', zIndex: 3 }}>
        <Text>Hello world</Text>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   animationContainer: {
//     position: 'relative',
//     flex: 1,
//   },
//   animation: {
//     flex: 1,
//   },
//   textContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 50,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 20,
//   },
// });
