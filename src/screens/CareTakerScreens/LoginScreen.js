import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { useSelector } from "react-redux";
// import Button from './../../components/common/Button/Button';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(`email: ${email}, password: ${password}`);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Name:</Text> */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        keyboardType="numeric"
        secureTextEntry={true}
      />

      <View style={styles.submitButton}>
        <Button color="#61B15A" title="Login" onPress={handleSubmit} />
      </View>

      <View style={styles.signupTextView}>
        <Text style={styles.signupPreText}>Don't have an account?</Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 30,
    width: 200,
    // height: 100,
  },
  signupTextView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 10,
  },
  signupPreText: {
    color: "#000",
  },
  signupText: {
    color: "#79C0E8",
  },
});
