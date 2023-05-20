import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import {
  BarChart,
  ProgressChart,
  PieChart,
  LineChart,
} from 'react-native-chart-kit';
import globalStyles from './../../utils/globalStyle';
import SahhaLogForm from '../SahhaLogForm/SahhaLogForm';
import LottiePatientBackground from '../LottieBackgrounds/LottiePatientBackground';
import { Button } from 'react-native-paper';
import PatientModeChart from '../PatientCharts/PatientModeChart';
import DatePicker from '../DatePicker/DatePicker';
import moment from 'moment';

function Stat({ patient, navigation }) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [okayaData, setOkayaData] = useState({
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
    legend: ['Fatigue'],
  });
  const [bloodPressure, setBloodPressure] = useState({
    // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
      {
        data: [47, 40, 88, 70, 79, 90],
      },
    ],
    legend: ['Blood Pressure(mmHg)'],
  });
  const [bloodGlucose, setBloodGlucose] = useState({
    labels: ['3rd', '8th', '13th', '17th', '22th', '27th'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
    legend: ['Blood Glucose(mg/dL)'],
  });

  const [sleepLogs, setSleepLogs] = useState({
    labels: ['1st', '2nd', '3rd', '4th', '5th', '6th'],
    datasets: [
      {
        data: [250, 450, 280, 380, 299, 443],
      },
    ],
    legend: ['Sleep Logs(min)'],
  });

  const chartConfig = {
    backgroundGradientFrom: '#f2f2f2',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#e6e6e6',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 77, 40, ${opacity})`,
    decimalPlaces: 0,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    style: {
      borderRadius: 16,
    },
    // propsForDots: {
    //   r: '6',
    //   strokeWidth: '2',
    //   stroke: '#ffa726',
    // },
  };

  const handleChange = () => {
    const firstDate = moment('2023-05-12T07:00:00+06:00').format('MMM D'); //new Date(startTime).toLocaleDateString();
    const endDate = new Date(endTime).toLocaleDateString();
    console.log('firstDate', typeof firstDate, firstDate);
    console.log('endDate', endDate);
    fetch(
      `https://cognicare-projectcode.koyeb.app/sahha/blood/log/64577a4cb7a4f333e3dd6985?startDate=2023/05/01&endDate=2023/05/15`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const glucoseLabels = [];
        const systolicLabels = [];
        const diastolicLabels = [];
        const GlucoseData = [];
        const bloodPressureSystolic = [];
        const bloodPressureDiastolic = [];
        res.bloodLogs.map((item) => {
          if (item.dataType === 'BloodPressureSystolic') {
            systolicLabels.push(item.dataType);
            bloodPressureSystolic.push(item.count);
          } else if (item.dataType === 'BloodPressureDiastolic') {
            diastolicLabels.push(item.dataType);
            bloodPressureDiastolic.push(item.count);
          } else if (item.dataType === 'BloodGlucose') {
            glucoseLabels.push(moment(item.startDateTime).format('Do'));
            GlucoseData.push(item.count);
          }
        });
        const tempBloodPressure = {
          // labels,
          datasets: [
            { data: bloodPressureSystolic },
            {
              data: bloodPressureDiastolic,
            },
          ],
          legend: ['Blood Pressure(mmHg)'],
        };

        const tempBloodGlucose = {
          labels: glucoseLabels,
          datasets: [{ data: GlucoseData }],
          legend: ['Blood Glucose(mg/dL)'],
        };
        setBloodPressure(tempBloodPressure);
        setBloodGlucose(tempBloodGlucose);
      })
      .catch((error) => {
        console.log('Error fetching', error);
      });
    fetch(
      `https://cognicare-projectcode.koyeb.app/sahha/sleep/log/64577a4cb7a4f333e3dd6985?startDate=2023/05/01&endDate=2023/05/15`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const labels = [];
        const data = [];
        res.sleepLogs.map((item) => {
          labels.push(moment(item.startDateTime).format('Do'));
          data.push(item.durationInMinutes);
        });
        const tempData = {
          labels,
          datasets: [{ data: data }],
          legend: ['Sleep Logs'],
        };
        setSleepLogs(tempData);
      })
      .catch((error) => {
        console.log('Error fetching', error);
      });
  };

  const okayaDataHandeler = (data) => {
    const fatigueData = [];
    // console.log('okaya log', data);
    data.map((item) => fatigueData.push(item.fatigue));
    const finalFatigueChartData = {
      datasets: [
        {
          data: fatigueData,
        },
      ],
      legend: ['Fatigue'],
    };
    setOkayaData(finalFatigueChartData);
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <LottiePatientBackground />
      <View
        style={[globalStyles.container, { justifyContent: 'space-between' }]}
      >
        <View
          style={{
            marginBottom: 5,
          }}
        >
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              gap: 3,
              justifyContent: 'space-around',
              marginBottom: 5,
              // padding: 10,
            }}
          >
            <DatePicker
              label={'Start Time'}
              onTimeChange={(time) => setStartTime(time)}
            />
            <DatePicker
              label={'End Time'}
              onTimeChange={(time) => setEndTime(time)}
            />
          </View>
          <Button
            icon='chart-bell-curve'
            mode='contained'
            onPress={handleChange}
            style={{
              // flex: 1,
              borderRadius: 5,
            }}
          >
            Set
          </Button>
        </View>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
          }}
        >
          {/* <SahhaLogForm /> */}
          <PatientModeChart okayaDataHandeler={okayaDataHandeler} />
          <View
            style={{
              flex: 1,
              marginTop: 8,
            }}
          >
            <LineChart
              data={bloodPressure}
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
                backgroundGradientTo: '#ffa726',
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
            }}
          >
            <LineChart
              data={bloodGlucose}
              width={globalStyles.adjustedWidthFromDevice}
              height={250}
              horizontalLabelRotation={45}
              verticalLabelRotation={30}
              // yAxisLabel='$'
              // yAxisSuffix='mmHg'
              withVerticalLabels={true}
              chartConfig={chartConfig}
              style={{
                borderRadius: 16,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 8,
            }}
          >
            <LineChart
              data={sleepLogs}
              width={globalStyles.adjustedWidthFromDevice}
              height={250}
              horizontalLabelRotation={45}
              verticalLabelRotation={30}
              // yAxisLabel='$'
              // yAxisSuffix='mmHg'
              withVerticalLabels={true}
              fromZero={true}
              bezier
              chartConfig={chartConfig}
              style={{
                borderRadius: 16,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 8,
            }}
          >
            <LineChart
              data={okayaData}
              width={globalStyles.adjustedWidthFromDevice}
              height={250}
              horizontalLabelRotation={45}
              verticalLabelRotation={30}
              withVerticalLabels={true}
              fromZero={true}
              bezier
              chartConfig={chartConfig}
              style={{
                borderRadius: 16,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Stat;
