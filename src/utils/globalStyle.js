import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  colors: {
    // primary: '#665A6F', //'#5AC8A7',
    // primary: 'white',
    primary: '#0f1557',
    green: '#94BF4A',
    primaryLight: '#9CCE97',
    primaryLighter: '#DEEFDC',
    secondary: '#5A78B1',
    secondaryLight: '#79C0E8',
  },
  fontSizes: {
    regular: 24,
    large: 30,
    small: 18,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  textInput: {
    width: 300,
    borderWidth: 1,
    borderColor: '#b4abba',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
  },
});

export default globalStyles;
