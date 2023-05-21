import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { SERVER_URL } from '../../config';
import globalStyles from '../../utils/globalStyle';

const PatientModeChart = ({ okayaDataHandeler }) => {
  const [patientModeData, setPatientModeData] = useState();
  const [areaData, setAreaData] = useState([
    1, -1, 0, 1, 1, -1, 0, 0, -1, 1, 1,
  ]);

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
          '#7F7F7F',
          '#ffa726',
          '#F00',
          '#fff',
          '#94BF4A',
          '#5A78B1',
          '#5AC8A7',
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
      <View
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
          Mood area
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
