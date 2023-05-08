import axios from 'axios';

const uploadToCloudinary = async (file) => {
  const api = 'https://api.cloudinary.com/v1_1/dimsduru1/image/upload';

  if (!file) throw new Error('Please select a file');
  try {
    const { data } = await axios.post(api, {
      file: 'data:image/png;base64,' + file,
      upload_preset: 'cognicare',
    });

    return data;
  } catch (error) {
    return error;
  }
};

export default uploadToCloudinary;
