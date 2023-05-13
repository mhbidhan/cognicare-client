import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { BarChart, ProgressChart, PieChart } from 'react-native-chart-kit';
import globalStyles from './../../utils/globalStyle';
import HeroSection from './HeroSection';
import PatientModeChart from '../PatientDetails/PatientModeChart';

function Stat({ patient, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { thisPatient } = useSelector((state) => state.caretaker);

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
      <HeroSection thisPatient={thisPatient} />
      <ScrollView style={{ marginHorizontal: 5, marginVertical: 10 }}>
        <PatientModeChart />
        <View>
          <BarChart
            // style={graphStyle}
            data={data}
            width={screenWidth}
            height={220}
            yAxisLabel='$'
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            fromZero={true}
          />
        </View>
        <View>
          <ProgressChart
            data={[0.4, 0.6, 0.8]}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View>
          <PieChart
            data={[
              {
                name: 'Seoul',
                population: 21500000,
                color: 'rgba(131, 167, 234, 1)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Toronto',
                population: 2800000,
                color: '#F00',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'New York',
                population: 8538000,
                color: '#ffffff',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Moscow',
                population: 11920000,
                color: 'rgb(0, 0, 255)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get('window').width - 16}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            accessor='population'
            backgroundColor='transparent'
            paddingLeft='15'
            absolute //for the absolute number remove if you want percentage
          />
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
