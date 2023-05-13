import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import globalStyles from '../../utils/globalStyle';

const MedicineList = ({ items = [] }) => {
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          marginRight: 5,
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Image
          source={{
            uri: item.packageImgUrl,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.textView}>
            <Text style={styles.text}>{item.quantity} X </Text>
            <Text style={styles.text}>{item.unit}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (!items.length) return;

  return (
    <View
      style={{
        maxHeight: 80,
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      <Carousel
        data={items}
        renderItem={renderItem}
        sliderWidth={Math.round(Dimensions.get('window').width * 0.88)}
        sliderHeight={200}
        itemWidth={270}
        itemHeight={300}
        loop={false}
        activeSlideAlignment="start"
        inactiveSlideScale={1}
      />
    </View>
  );
};

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
  lable: {
    fontWeight: '900',
    color: globalStyles.colors.primary,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 30,
    borderRadius: 10,
  },
});

export default MedicineList;
