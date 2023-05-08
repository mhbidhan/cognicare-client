import axios from 'axios';

const uploadToCloudinary = async (file) => {
  const api = 'https://api.cloudinary.com/v1_1/dimsduru1/image/upload';
  console.log(api);
  if (!file) throw new Error('Please select a file');
  try {
    const res = await axios.post(api, {
      file: 'data:image/png;base64,' + file,
      upload_preset: 'cognicare',
    });

    return res;
  } catch (error) {
    return error;
  }
};

export default uploadToCloudinary;
