import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";

const PatientDashBoard = () => {
  const patientData = useSelector((state) => state.patient);

  return (
    <View>
      <Text>{patientData.name}</Text>
    </View>
  );
};

export default PatientDashBoard;
