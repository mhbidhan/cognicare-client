import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { SERVER_URL } from '../../config';
import globalStyles from '../../utils/globalStyle';

const PatientModeChart = ({ okayaDataHandeler }) => {
  const [patientModeData, setPatientModeData] = useState();
  const [areaData, setAreaData] = useState([
    1, -1, 0, 1, 1, -1, 0, 0, -1, 1, 1,
  ]);

  const [mentalState, setMentalState] = useState({
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
    datasets: [
      {
        data: [3, 0, 2, 1, 4, 5],
        // color: (opacity = 1) => `rgba(247, 116, 106, ${opacity})`,
      },
      {
        data: [0, 4, 2, 0, 2, 3],
        color: (opacity = 1) => `rgba(122, 97, 95, ${opacity})`,
      },
    ],
    legend: ['Mental state'],
  });

  const chartConfig = {
    backgroundGradientFrom: '#323861',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#151928',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(220, 221, 223, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    barRadius: 7,
    useShadowColorFromDataset: false, // optional
    fillShadowGradientFrom: '#dcdddf',
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientTo: '#dcdddf',
    fillShadowGradientToOpacity: 0.7,
  };

  // useEffect(() => {
  //   const fetchPatientModeData = async () => {
  //     try {
  //       const url = `${SERVER_URL}/okaya/checkin`;
  //       // const url = 'https://cognicare-projectcode.koyeb.app/okaya/checkin';
  //       const options = {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           patientID: '6458cd9dd85f732e6fb9bf9b',
  //           startDate: '2023-05-09T00:00:00.000Z',
  //           endDate: '2023-05-12T23:59:59.000Z',
  //         }),
  //       };
  //       const response = await fetch(url, options).then((res) => res.json());
  //       console.log('response', response);
  //       okayaDataHandeler(response);
  //       const pieData = [];
  //       const colors = ['#7F7F7F', '#F00', 'red', '#fff', '#000'];
  //       const data = [];
  //       data.labels = [];
  //       data.datasets = [];
  //       data.datasets.push({});
  //       data.datasets[0].data = [];
  //       response.forEach((item) => {
  //         const moodsOfThisItem = item.mood.split(', ').map((mood) => {
  //           return mood.charAt(0).toUpperCase() + mood.slice(1);
  //         });
  //         moodsOfThisItem.forEach((item) => {
  //           if (!data.labels.includes(item)) {
  //             data.labels.push(item);
  //             data.datasets[0].data.push(0);
  //           }
  //           const itemIdx = data.labels.indexOf(item);
  //           data.datasets[0].data[itemIdx]++;
  //         });
  //       });
  //       data?.lables?.map((item, i) => {
  //         const d = {
  //           name: item,
  //           population: data.dataSets[0].data[i],
  //           color: colors[i],
  //           legendFontColor: colors[i],
  //           legendFontSize: 15,
  //         };
  //         pieData.push(d);
  //       });
  //       console.log('pieData', pieData);
  //       setPatientModeData(data);
  //     } catch (error) {
  //       console.log('patientFetchError', error);
  //     }
  //   };
  //   fetchPatientModeData();
  // }, []);

  useEffect(() => {
    const fetchPatientModeData = async () => {
      try {
        const url = `${SERVER_URL}/okaya/checkin`;
        // const url = 'https://cognicare-projectcode.koyeb.app/okaya/checkin';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patientID: '6458cd9dd85f732e6fb9bf9b',
            startDate: '2023-05-09T00:00:00.000Z',
            endDate: '2023-05-12T23:59:59.000Z',
          }),
        };
        const response = await fetch(url, options).then((res) => res.json());
        console.log('response', response);
        okayaDataHandeler(response);
        const tempAreaData = [];
        const pieData = [];
        const colors = [
          '#5AC8A7',
          '#5DD9C1',
          '#EAE6E5',
          '#7F7F7F',
          '#fff',
          '#94BF4A',
          '#5A78B1',
          '#000',
        ];
        response.map((item) => {
          item.mood.split(', ').map((m) => {
            if (m.toLowerCase() === 'happy') {
              tempAreaData.push(1);
            } else if (m.toLowerCase() === 'neutral') {
              tempAreaData.push(0);
            } else {
              tempAreaData.push(-1);
            }
            console.log('single', m);
            const isExiest = pieData.find(
              (d) => d.name.toLowerCase() === m.toLowerCase()
            );
            console.log('isExiest', isExiest);
            if (!isExiest) {
              const pie = {
                // name: m,
                name: m.charAt(0).toUpperCase() + m.slice(1),
                population: 1,
                color: colors[pieData.length],
                legendFontColor: colors[pieData.length],
                legendFontSize: 15,
              };
              console.log('pie', pie);
              pieData.push(pie);
            } else {
              const index = pieData.findIndex(
                (t) => t.name.toLowerCase() === m.toLowerCase()
              );
              console.log('index', index);
              pieData[index].population += 1;
            }
          });
        });
        console.log(pieData);
        setAreaData(tempAreaData);
        setPatientModeData(pieData);
      } catch (error) {
        console.log('patientFetchError', error);
      }
    };
    console.log('patientModeData', patientModeData);
    fetchPatientModeData();
  }, []);

  return (
    <View>
      {/* <View
        style={{
          flex: 1,
          marginTop: 8,
        }}
      >
        <Text
          style={{
            color: '#fff',
            marginTop: 8,
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >
          Mental state
        </Text>
        <AreaChart
          style={{ height: 200 }}
          data={areaData}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: `rgba(255, 255, 255, 0.6)` }}
        >
          <Grid />
        </AreaChart>
      </View> */}
      <View
        style={{
          flex: 1,
          marginTop: 8,
        }}
      >
        <LineChart
          data={mentalState}
          width={globalStyles.adjustedWidthFromDevice} // from react-native
          height={250}
          horizontalLabelRotation={45}
          verticalLabelRotation={30}
          // yAxisLabel='$'
          // yAxisSuffix='mg/dL'
          // yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#ffa726',
            backgroundGradientToOpacity: 0,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              // borderRadius: 16,
              paddingHorizontal: 10,
            },
          }}
          bezier
          style={{
            // marginVertical: 8,
            borderRadius: 16,
            // paddingHorizontal: 10,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 8,
          width: globalStyles.adjustedWidthFromDevice,
        }}
      >
        <Text
          style={{
            color: '#fff',
            marginTop: 8,
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >
          Patient's mood chart
        </Text>
        {patientModeData && (
          <PieChart
            data={patientModeData}
            width={globalStyles.adjustedWidthFromDevice}
            height={200}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            // center={[20, 20]}
            absolute
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default PatientModeChart;
