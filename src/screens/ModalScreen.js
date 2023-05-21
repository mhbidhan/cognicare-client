import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
// import SampleSvg from '../assets/sampleSvg';
// import Koala from '../assets/Koala';
// import ButtonFilled from './../components/common/buttons/ButtonFilled';
// import nightWallpaper from '../assets/nightWallpaper.png';
// import Toast from 'react-native-toast-message';
import globalStyles from '../utils/globalStyle';
import bg from './../assets/bg.png';

export default function ModalScreen({ navigation }) {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    flex: 1,
    backgroundColor: globalStyles.colors.lightGray,
    width: screenWidth,
    height: screenHeight,
  };

  function onPressHandler(page) {
    navigation.navigate(page);
  }

  return (
    <View style={{ flex: 1 }}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View
              style={{
                flex: 1,
              }}
            >
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
                  }}
                >
                  <Text
                    style={{ fontSize: 35, fontWeight: '400', color: '#fff' }}
                  >
                    13:30
                  </Text>
                  <Text
                    style={{ fontSize: 30, fontWeight: '400', color: '#fff' }}
                  >
                    Lunch with Alfred
                  </Text>
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
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/dgsx9bvvf/image/upload/v1683696605/Lunch_break_Flatline_ux3rbz.png',
                  }}
                  style={{
                    position: 'absolute',
                    bottom: 190,
                    left: 30,
                    width: 300,
                    height: 300,
                    zIndex: 1,
                  }}
                />
                <Text style={{ fontSize: 15, color: '#fff', marginBottom: 20 }}>
                  Pasta house
                </Text>
                <Button
                  icon='check'
                  mode='elevated'
                  buttonColor='#fff'
                  textColor={globalStyles.colors.gray}
                  style={{ borderRadius: 30, marginBottom: 20 }}
                  labelStyle={{ fontSize: 13 }}
                  onPress={hideModal}
                >
                  DONE
                </Button>
                <Button
                  icon='alarm-snooze'
                  mode='text'
                  // buttonColor={globalStyles.colors.gray}
                  textColor='#fff'
                  // contentStyle={{
                  //   width: 300,
                  //   paddingVertical: 10,
                  // }}
                  // style={{ borderRadius: 3 }}
                  labelStyle={{ fontSize: 13 }}
                  onPress={() => console.log('Pressed')}
                >
                  SHOOZE
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
        <Button style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalParentView: {
    flex: 1,
    position: 'relative',
    marginTop: 10,
  },
  modal: {
    flex: 1,
    padding: 10,
    backgroundColor: globalStyles.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonView: {
    marginTop: 30,
  },
});
