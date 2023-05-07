import React, { useState } from "react";
import { View, Text, Button, TextInput, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CongiCareLogo from "../assets/CogniCare - Koala.svg";

export default function HomeScreen({ navigation }) {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      {/* <Image source={CongiCareLogo} /> */}
      <Button title="Care-Taker" />
      <Button
        title="Patient"
        onPress={() => navigation.navigate("PatientSignIn")}
      />
    </View>
  );
}
