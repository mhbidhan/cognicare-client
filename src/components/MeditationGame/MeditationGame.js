import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import maditation from '../../assets/lotties/meditation.json';

const MeditationGame = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = async () => {
    setIsPlaying(true);
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audios/meditation.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  };

  const stopSound = async () => {
    setIsPlaying(false);
    await sound.stopAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={null}
        style={{
          width: 240,
          height: 240,
          backgroundColor: 'transparent',
        }}
        source={maditation}
      />
      {!isPlaying ? (
        <Button style={styles.button} onPress={playSound} mode="contained">
          Start
        </Button>
      ) : (
        <Button style={styles.button} onPress={stopSound} mode="contained">
          Stop
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width - 30,
    maxWidth: 200,
  },
});

export default MeditationGame;
