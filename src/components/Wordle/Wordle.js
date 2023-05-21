import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../utils/constants';
import Keyboard from '../Keyboard/Keyboard';
import LottiePatientBackground from '../LottieBackgrounds/LottiePatientBackground';

const NUMBER_OF_TRIES = 6;

function Wordle() {
  const [word, setWord] = useState('hello');
  const [letters, setLetters] = useState('');

  const [rows, setRows] = useState([[]]);
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);
  const [gameState, setGameState] = useState('playing');

  const getRandomWord = useCallback(async () => {
    const { data } = await axios.get(
      'https://random-word-api.herokuapp.com/word?length=5'
    );

    setWord(data[0]);
  }, []);

  useEffect(() => {
    getRandomWord();
  }, [getRandomWord]);

  useEffect(() => {
    if (word) {
      const letters = word.split('');

      setLetters(letters);
    }
  }, [word]);
  useEffect(() => {
    if (letters) {
      const rows = new Array(NUMBER_OF_TRIES).fill(
        new Array(letters.length).fill('')
      );

      setRows(rows);
    }
  }, [letters]);

  useEffect(() => {
    checkGameState();
  }, [currRow]);

  const cloneRows = () => {
    const newRows = rows.map((row) => [...row]);
    return newRows;
  };

  const onKeyPressed = (key) => {
    if (gameState === 'won') return;

    const newRows = cloneRows();

    if (key === 'CLEAR') {
      const prevCol = currCol - 1;

      if (prevCol >= 0) {
        newRows[currRow][prevCol] = '';
        setRows(newRows);
        setCurrCol(prevCol);
      }
      return;
    }

    if (key === 'ENTER') {
      if (currCol === rows[currRow].length) {
        setCurrRow(currRow + 1);
        setCurrCol(0);
      }
      return;
    }

    if (currCol < rows[0].length) {
      newRows[currRow][currCol] = key;
      setRows(newRows);
      setCurrCol(currCol + 1);
    }
  };

  const isActive = (row, col) => {
    return row === currRow && col === currCol;
  };

  const getCellColor = (row, col) => {
    const letter = rows[row][col];
    if (row < currRow) {
      const letterIndex = letters.indexOf(letter);
      if (letterIndex === -1) return colors.darkgrey;
      if (letters[col] === letter) return colors.primary;
      return colors.secondary;
    }
  };

  const getCellBorderColor = (row, col) => {
    if (isActive(row, col)) return colors.lightgrey;
    if (getCellColor(row, col) === colors.black) return colors.darkgrey;
    return getCellColor(row, col);
  };

  const getCapColor = (colorName) => {
    const selectedColor =
      colorName === 'green'
        ? colors.primary
        : colorName === 'yellow'
        ? colors.secondary
        : colors.darkgrey;
    return rows.flatMap((row, rowIndex) =>
      row.filter(
        (cell, colIndex) => getCellColor(rowIndex, colIndex) === selectedColor
      )
    );
  };

  const checkGameState = () => {
    if (checkGameWon()) {
      setGameState('won');
      Alert.alert(
        'Woohoo!',
        `You got the word in ${currRow} out of ${NUMBER_OF_TRIES} tries!`
      );
    } else if (checkGameLost()) {
      setGameState('lost');
      Alert.alert(
        'Better luck next time!',
        `The word was "${word.toUpperCase()}"`
      );
    }
  };

  const checkGameWon = () => {
    if (currRow > 0) {
      const row = rows[currRow - 1];
      return row.every((letter, i) => letter === letters[i]);
    }
  };

  const checkGameLost = () => {
    return currRow >= NUMBER_OF_TRIES;
  };

  return (
    <>
      <LottiePatientBackground />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>WORDLE</Text>
        <ScrollView style={styles.map}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <View
                  key={colIndex}
                  style={[
                    styles.cell,
                    {
                      borderColor: getCellBorderColor(rowIndex, colIndex),
                      backgroundColor: getCellColor(rowIndex, colIndex),
                    },
                  ]}
                >
                  <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <Keyboard
          onKeyPressed={onKeyPressed}
          greenCaps={getCapColor('green')}
          yellowCaps={getCapColor('yellow')}
          greyCaps={getCapColor('darkgrey')}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: Platform.OS === 'android' ? 50 : 0,
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 7,
  },
  map: {
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    height: 30,
    borderColor: colors.darkgrey,
    borderWidth: 2,
    aspectRatio: 1,
    margin: 3,
    maxWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 28,
  },
});

export default Wordle;
