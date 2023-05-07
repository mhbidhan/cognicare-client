import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  colors: {
    primary: "#94BF4A",
    primaryLight: "#9CCE97",
    primaryLighter: "#DEEFDC",
    secondary: "#5A78B1",
    secondaryLight: "#79C0E8",
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
