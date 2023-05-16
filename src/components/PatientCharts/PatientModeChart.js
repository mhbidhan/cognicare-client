import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-native-chart-kit';

const PatientModeChart = () => {
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

  useEffect(() => {
    const fetchPatientModeData = async () => {
      try {
        const url = 'https://cognicare-projectcode.koyeb.app/okaya/checkin';
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
        const data = {};
        data.labels = [];
        data.datasets = [];
        data.datasets.push({});
        data.datasets[0].data = [];
        response.forEach((item) => {
          const moodsOfThisItem = item.mood.split(', ').map((mood) => {
            return mood.charAt(0).toUpperCase() + mood.slice(1);
          });
          moodsOfThisItem.forEach((item) => {
            if (!data.labels.includes(item)) {
              data.labels.push(item);
              data.datasets[0].data.push(0);
            }
            const itemIdx = data.labels.indexOf(item);
            data.datasets[0].data[itemIdx]++;
          });
        });
        setPatientModeData(data);
      } catch (error) {
        console.log('patientFetchError', error);
      }
    };
    fetchPatientModeData();
  }, []);

  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <Text>Mode chart</Text>
      {patientModeData && (
        <BarChart
          data={patientModeData}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero={true}
          showBarTops={false}
          style={{
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
export default PatientModeChart;
