import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  colors: {
    //gray: '#665A6F', //'#5AC8A7',
    // primary: 'white',
    primary: '#0f1557',
    primaryDarker: '#2b326e',
    green: '#94BF4A',
    primaryLight: '#9CCE97',
    primaryLighter: '#DEEFDC',
    white: 'white',
    secondary: '#5A78B1',
    secondaryLight: '#79C0E8',
    gray: '#8B8ED6',
    lightGray: '#A9ADF6',
  },
  fontSizes: {
    regular: 24,
    large: 30,
    small: 18,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
    // alignItems: 'center',
  },
  flatListcontainer: {
    // flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#fff',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  textInput: {
    width: 300,
    borderWidth: 1,
    borderColor: '#0f1557',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    color: 'white',
  },
});

export default globalStyles;
