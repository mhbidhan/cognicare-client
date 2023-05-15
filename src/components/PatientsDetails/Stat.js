import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import globalStyles from './../../utils/globalStyle';
import PatientModeChart from '../PatientCharts/PatientModeChart';
import SahhaLogForm from '../SahhaLogForm/SahhaLogForm';

function Stat({ patient, navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
      // style={styles.scrollView}
      // contentContainerStyle={styles.contentContainer}
      // contentContainerStyle={{
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }}
      >
        <SahhaLogForm />
        <PatientModeChart />
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel='$'
            yAxisSuffix='k'
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: globalStyles.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  scrollView: {
    height: '70%',
    width: '100%',
    // margin: 20,
    alignSelf: 'center',
    // padding: 20,
    // borderWidth: 5,
    // borderRadius: 5,
    // borderColor: 'black',
    backgroundColor: 'red',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingBottom: 50,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  modalParentView: {
    position: 'relative',
  },
  modal: {
    flex: 1,
    padding: 10,
    backgroundColor: globalStyles.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonView: {
    marginTop: 30,
  },
});

export default Stat;
