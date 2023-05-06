import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/counterSlice";

export default function HomeScreen({ navigation }) {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate("Detail")}
      />
      <Text>Count: {count}</Text>
      <Button title="+" onPress={() => dispatch(increment())} />
      <Button title="-" onPress={() => dispatch(decrement())} />
    </View>
  );
}
