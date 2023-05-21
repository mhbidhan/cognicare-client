import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import color from '../../assets/lotties/color.json';
import meditaion from '../../assets/lotties/meditation2.json';
import wordle from '../../assets/lotties/wordle.json';
import FindColorGame from '../../components/FindColorGame/FindColorGame';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import MeditationGame from '../../components/MeditationGame/MeditationGame';
import Wordle from '../../components/Wordle/Wordle';
import day from '../../assets/lotties/9878-background-full-screen.json';
import night from '../../assets/lotties/night.json';
import dayPng from '../../assets/dayPng.png';
import nightPng from '../../assets/nightPng.png';

const PatientGameScreen = ({ currentGame, setCurrentGame }) => {
  const [timeOfDay, setTimeOfDay] = useState('night');

  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) setTimeOfDay('day');
    else setTimeOfDay('night');
  };

  const handleNavigation = (screen) => {
    setCurrentGame(screen);
  };

  useEffect(() => {
    getTimeOfDay();
  }, []);

  if (currentGame === 'wordle') return <Wordle />;
  if (currentGame === 'findColor') return <FindColorGame />;
  if (currentGame === 'meditation') return <MeditationGame />;

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ImageBackground
        source={timeOfDay === 'day' ? dayPng : nightPng}
        resizeMode='cover'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          opacity: 1,
        }}
      ></ImageBackground>
      {/* <LottiePatientBackground /> */}
      {/* <LottieView
        autoPlay
        source={timeOfDay === 'day' ? day : night}
        style={{
          position: 'absolute',
          height: Dimensions.get('screen').height,
        }}
      /> */}
      <View style={styles.cardContainer}>
        <GameCard
          title={'Wordle'}
          lottie={wordle}
          handlePress={() => handleNavigation('wordle')}
        />
        <GameCard
          title={'Find Color'}
          lottie={color}
          handlePress={() => handleNavigation('findColor')}
        />
      </View>
      <View style={styles.cardContainer}>
        <GameCard
          title={'Meditaion'}
          lottie={meditaion}
          handlePress={() => handleNavigation('meditation')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width - 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  gameCard: {
    width: 140,
    height: 140,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameCardText: {
    fontSize: 16,
    fontWeight: 700,
  },
});

export default PatientGameScreen;

const GameCard = ({ lottie, title, handlePress }) => {
  return (
    <TouchableOpacity style={styles.gameCard} onPress={handlePress}>
      <LottieView
        autoPlay
        ref={null}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'transparent',
        }}
        source={lottie}
      />
      <Text style={styles.gameCardText}>{title}</Text>
    </TouchableOpacity>
  );
};
