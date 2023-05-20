import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { SERVER_URL } from '../../config';
import globalStyles from '../../utils/globalStyle';

const PatientModeChart = ({ okayaDataHandeler }) => {
  const [patientModeData, setPatientModeData] = useState();

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
        const pieData = [];
        const colors = ['#7F7F7F', '#ffa726', '#F00', '#fff', '#000'];
        response.map((item) => {
          item.mood.split(', ').map((m) => {
            console.log('single', m);
            const isExiest = pieData.find((d) => d.name === m);
            console.log('isExiest', isExiest);
            if (!isExiest) {
              const pie = {
                name: m,
                population: 1,
                color: colors[pieData.length],
                legendFontColor: colors[pieData.length],
                legendFontSize: 15,
              };
              console.log('pie', pie);
              pieData.push(pie);
            } else {
              const index = pieData.findIndex((t) => t.name === m);
              console.log('index', index);
              pieData[index].population += 1;
            }
          });
        });
        console.log(pieData);
        setPatientModeData(pieData);
      } catch (error) {
        console.log('patientFetchError', error);
      }
    };
    console.log('patientModeData', patientModeData);
    fetchPatientModeData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 8,
        width: globalStyles.adjustedWidthFromDevice,
      }}
    >
      {patientModeData && (
        // <BarChart
        //   data={patientModeData}
        //   height={220}
        //   chartConfig={chartConfig}
        //   verticalLabelRotation={0}
        //   fromZero={true}
        //   showBarTops={false}
        //   width={globalStyles.adjustedWidthFromDevice}
        //   style={{
        //     borderRadius: 7,
        //     // width: Dimensions.get('window').width - 5,
        //   }}
        // />
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
  );
};

const styles = StyleSheet.create({});
export default PatientModeChart;
