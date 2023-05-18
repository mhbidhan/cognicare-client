import React from 'react';
import { Dimensions, Image, View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import globalStyles from '../../../utils/globalStyle';
import LottieView from 'lottie-react-native';
import logo from './../../../assets/medicine.json';
import pic from './../../../assets/pic.jpg';

export default function MedicineModal({ notification, setNotification }) {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  const containerStyle = {
    flex: 1,
    backgroundColor: globalStyles.colors.lightGray,
    width: screenWidth,
    height: screenHeight,
  };

  const item = {
    name: 'Napa',
    quantity: 10,
    unit: 'tab',
  };

  const RenderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: globalStyles.colors.white,
          marginRight: 5,
          paddingHorizontal: 10,
          borderRadius: 5,
          opacity: 0.7,
          marginBottom: 3,
        }}
      >
        <Image
          // source={{
          //   uri: item.packageImgUrl,
          // }}
          source={pic}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          {/* <Text style={styles.name}>Napa</Text> */}
          <View style={styles.textView}>
            <Text style={styles.text}>{item.quantity} X </Text>
            {/* <Text style={styles.text}>10 X </Text> */}
            {/* <Text style={styles.text}>ml</Text> */}
            <Text style={styles.text}>{item.unit}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={containerStyle}>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 30,
              borderRadius: 10,
            }}
          >
            <LottieView
              autoPlay
              // ref={animation}
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#eee',
              }}
              source={logo}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            // gap: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: globalStyles.colors.gray,
            borderTopLeftRadius: 120,
            borderTopRightRadius: 120,
            position: 'relative',
          }}
        >
          <ScrollView
            style={{
              position: 'absolute',
              bottom: 100,
              left: 30,
              width: 300,
              height: 300,
              zIndex: 1,
              height: 350,
            }}
          >
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
            <RenderItem item={item} />
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
            }}
          >
            <Button
              icon='check'
              mode='contained'
              // buttonColor="#fff"
              // textColor={globalStyles.colors.gray}
              style={{ borderRadius: 30, marginBottom: 20, zIndex: 2 }}
              labelStyle={{ fontSize: 13 }}
              onPress={() => setNotification(false)}
            >
              DONE
            </Button>
            <Button
              icon='alarm-snooze'
              mode='text'
              textColor='#fff'
              labelStyle={{ fontSize: 13 }}
              onPress={() => console.log('Pressed')}
              style={{ zIndex: 2 }}
            >
              SHOOZE
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    textTransform: 'capitalize',
    fontSize: 15,
    fontWeight: 'bold',
    color: globalStyles.colors.primary,
  },
  textView: {
    flexDirection: 'row',
  },
  text: {
    color: globalStyles.colors.primary,
  },
  lable: {
    fontWeight: '900',
    color: globalStyles.colors.primary,
  },
  image: {
    width: 80,
    height: 60,
    marginRight: 30,
    borderRadius: 10,
    margin: 2,
  },
});
