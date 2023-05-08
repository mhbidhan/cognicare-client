import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  colors: {
    primary: "#5AC817",
    // primary: "#94BF4A",
    primaryLight: "#9CCE97",
    primaryLighter: "#DEEFDC",
    secondary: "#5A78B1",
    secondaryLight: "#79C0E8",
  },
  fontSizes: {
    regular: 24,
    large: 30,
    small: 18,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
});

export default globalStyles;
