import Toast from 'react-native-toast-message';

const showToast = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};

export default showToast;
