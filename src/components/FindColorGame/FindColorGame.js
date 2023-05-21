import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import lottie from '../../assets/lotties/confetti1.json';
import lottie2 from '../../assets/lotties/confetti2.json';
import lottie3 from '../../assets/lotties/confetti3.json';
import crying from '../../assets/lotties/crying.json';
import medal from '../../assets/lotties/medal.json';
import searching from '../../assets/lotties/searching.json';
import { SERVER_URL } from '../../config';
import CameraView from '../Camera/Camrea';
import LottiePatientBackground from '../LottieBackgrounds/LottiePatientBackground';
import colors from './colors.json';

function getRandomColor() {
  return colors[Math.floor(Math.random() * 60)];
}

export default function FindColorGame() {
  const [photo, setPhoto] = useState('');
  const [view, setView] = useState('');
  const [result, setResult] = useState('');
  const randomColor = getRandomColor();
  const selectedColor = useRef(randomColor);
  const [round, setRound] = useState([]);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + '/game/findColors', {
        img: photo,
        assignedColor: selectedColor.current
          .slice(4, selectedColor.current.length - 1)
          .split(',')
          .map((val) => +val),
      });

      setRound((round) => [...round, data]);

      if (round.length >= 2) {
        const res = round.filter((status) => status === 'you won');

        if (res.length >= 2) {
          setResult('You Won');
        } else {
          setResult('Better luck next time');
        }

        setRound([]);
        setView('result');
      } else {
        selectedColor.current = getRandomColor();
        setView('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!view)
    return (
      <View style={styles.container}>
        <LottiePatientBackground />
        <Text
          style={{
            fontSize: 25,
            color: '#fff',
          }}
        >
          Round {round.length + 1} of 3
        </Text>
        <LottieView
          autoPlay
          ref={null}
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'transparent',
          }}
          source={searching}
        />
        <View
          style={{
            ...styles.colorContainer,
            backgroundColor: selectedColor.current,
          }}
        ></View>
        <Text style={styles.text}>Find this color and take a picture</Text>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => setView('camera')}
        >
          Take a picture
        </Button>
      </View>
    );

  if (view === 'camera')
    return (
      <CameraView
        handleCapture={(photo) => {
          setPhoto('data:image/jpg;base64,' + photo);
          setView('photo');
        }}
      />
    );

  if (view === 'photo')
    return (
      <View style={styles.container}>
        <LottiePatientBackground />
        <View
          style={{
            ...styles.colorContainer,
            backgroundColor: selectedColor.current,
          }}
        ></View>
        <Image style={styles.preview} source={{ uri: photo }} />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              setPhoto(undefined);
              setView('camera');
            }}
          >
            Discard
          </Button>
          <Button style={styles.button} mode="contained" onPress={handleSubmit}>
            Submit
          </Button>
        </View>
      </View>
    );

  if (view === 'result')
    return (
      <View style={styles.container}>
        <LottiePatientBackground />
        {result === 'You Won' ? <WinningScreen /> : <LoosingScreen />}
        <View style={styles.content}>
          <Text style={{ ...styles.text, fontSize: 25 }}>{result}</Text>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              selectedColor.current = getRandomColor();
              setView('');
              setPhoto('');
              setResult('');
            }}
          >
            Play again
          </Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: Dimensions.get('window').width - 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    minWidth: 120,
  },
  cameraButton: {
    bottom: -250,
  },
  preview: {
    width: 260,
    height: 300,
    marginBottom: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  colorContainer: {
    width: 200,
    height: 150,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 20,
  },
});

const WinningScreen = () => {
  return (
    <>
      <LottiePatientBackground />
      <LottieView
        autoPlay
        loop={false}
        ref={null}
        style={{
          position: 'absolute',
          top: 70,
          width: 200,
          height: 200,
          backgroundColor: 'transparent',
        }}
        source={medal}
      />
      <LottieView
        autoPlay
        ref={null}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'transparent',
        }}
        source={lottie}
      />
      <LottieView
        autoPlay
        ref={null}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'transparent',
        }}
        source={lottie2}
      />
      <LottieView
        autoPlay
        ref={null}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'transparent',
        }}
        source={lottie3}
      />
    </>
  );
};

const LoosingScreen = () => {
  return (
    <>
      <LottiePatientBackground />
      <LottieView
        autoPlay
        ref={null}
        style={{
          position: 'absolute',
          top: 60,
          width: 150,
          height: 150,
          backgroundColor: 'transparent',
        }}
        source={crying}
      />
    </>
  );
};
