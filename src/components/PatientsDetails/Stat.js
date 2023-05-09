import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import globalStyles from './../../utils/globalStyle';
import HeroSection from './HeroSection';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

function Stat({ patient, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { thisPatient } = useSelector((state) => state.caretaker);
  console.log('thisPatient', thisPatient);
  const screenWidth = Dimensions.get('window').width;
  // console.log(patient);
  const getcodeHandeler = () => {
    setModalVisible(true);
  };

  // const chartConfig = {
  //   backgroundGradientFrom: globalStyles.colors.primary,
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: '#08130D',
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  // };

  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //     },
  //   ],
  // };

  return (
    <View style={styles.container}>
      <HeroSection thisPatient={thisPatient} />
      <View>
        {/* <BarChart
          // style={graphStyle}
          data={data}
          width={screenWidth}
          height={220}
          yAxisLabel='$'
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        /> */}
      </View>
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
