import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  Alert,
  TouchableHighlight,
} from "react-native";
import SampleSvg from "../assests/sampleSvg";
import ButtonFilled from "../components/buttons/ButtonFilled";

export default function HomeScreen({ navigation }) {
  function onPressHandler(page) {
    navigation.navigate(page);
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <SampleSvg />
      <ButtonFilled
        text="Care-Taker"
        onPressHandler={() => onPressHandler("CareTakerLogIn")}
      />
      <ButtonFilled
        text="Patient"
        onPressHandler={() => onPressHandler("PatientSignIn")}
      />
    </View>
  );
}
