import LottieView from 'lottie-react-native';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../assets/lotties/color.json';
import meditaion from '../../assets/lotties/meditation2.json';
import wordle from '../../assets/lotties/wordle.json';
import FindColorGame from '../../components/FindColorGame/FindColorGame';
import LottiePatientBackground from '../../components/LottieBackgrounds/LottiePatientBackground';
import MeditationGame from '../../components/MeditationGame/MeditationGame';
import Wordle from '../../components/Wordle/Wordle';

const PatientGameScreen = ({ currentGame, setCurrentGame }) => {
  const handleNavigation = (screen) => {
    setCurrentGame(screen);
  };

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
      <LottiePatientBackground />
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
