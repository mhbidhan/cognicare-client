import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import {
  BarChart,
  ProgressChart,
  PieChart,
  LineChart,
} from 'react-native-chart-kit';
import globalStyles from './../../utils/globalStyle';
import HeroSection from './HeroSection';
import PatientModeChart from '../PatientDetails/PatientModeChart';

function Stat({ patient, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { thisPatient } = useSelector((state) => state.caretaker);
  // const { width: SIZE } = Dimensions.get('window');
  // const data1 = [
  //   { x: 1453075200, y: 1.47 },
  //   { x: 1453161600, y: 1.37 },
  //   { x: 1453248000, y: 1.53 },
  //   { x: 1453334400, y: 1.54 },
  //   { x: 1453420800, y: 1.52 },
  //   { x: 1453507200, y: 2.03 },
  //   { x: 1453593600, y: 2.1 },
  //   { x: 1453680000, y: 2.5 },
  //   { x: 1453766400, y: 2.3 },
  //   { x: 1453852800, y: 2.42 },
  //   { x: 1453939200, y: 2.55 },
  //   { x: 1454025600, y: 2.41 },
  //   { x: 1454112000, y: 2.43 },
  //   { x: 1454198400, y: 2.2 },
  // ];
  // const points = monotoneCubicInterpolation(data1)(40);

  const screenWidth = Dimensions.get('window').width;
  const getcodeHandeler = () => {
    setModalVisible(true);
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#f2f2f2',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#e6e6e6',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 77, 40, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      {/* <HeroSection thisPatient={thisPatient} /> */}
      <ScrollView style={{ marginHorizontal: 5, marginVertical: 10 }}>
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
        <View>
          {/* <View style={{ backgroundColor: 'black' }}>
            <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
              <ChartPath height={SIZE / 2} stroke='yellow' width={SIZE} />
              <ChartDot style={{ backgroundColor: 'blue' }} />
            </ChartPathProvider>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: globalStyles.colors.primary,
    shadowColor: globalStyles.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    // marginBottom: 5,
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
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // transform: [{ translateY: 200 }],
    // borderWidth: 3,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderColor: globalStyles.colors.primary,
  },
  modalButtonView: {
    marginTop: 30,
  },
});

export default Stat;
