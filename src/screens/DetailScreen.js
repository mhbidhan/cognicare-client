import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector } from "react-redux";

export default function DetailScreen({ navigation }) {
  const count = useSelector((state) => state.counter.count);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detail Screen</Text>
      <Button
        title="Go to home screen"
        onPress={() => navigation.navigate("Home")}
      />
      <Text>Count: {count}</Text>
    </View>
  );
}
