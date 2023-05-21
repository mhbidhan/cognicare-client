import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import uploadToCloudinary from '../../services/cloudinary';
import handleInputChange from '../../utils/handleInputChange';
import MedicineList from '../MeedicineList/MeedicineList';
import FileInput from '../common/FileInput/FileInput';

const MedicineActivityForm = ({ setView, setCurrentActivity }) => {
  const activityType = 'medicine';

  const [medicines, setMedicines] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    unit: '',
    packageImgUrl: '',
    medicineImgUrl: '',
  });

  const handleAddMedicine = async () => {
    const { packageImgUrl: packageImgData, medicineImgUrl: medicineImgData } =
      formData;

    if (!packageImgData || !medicineImgData) return;

    const { secure_url: packageImgUrl } = await uploadToCloudinary(
      packageImgData
    );
    const { secure_url: medicineImgUrl } = await uploadToCloudinary(
      medicineImgData
    );

    setMedicines((medicines) => [
      ...medicines,
      {
        ...formData,
        packageImgUrl,
        medicineImgUrl,
      },
    ]);

    setFormData({
      name: '',
      description: '',
      quantity: '',
      unit: '',
      packageImgUrl: '',
      medicineImgUrl: '',
    });
  };

  const handleSubmit = () => {
    setCurrentActivity({ [activityType]: medicines, activityType });
    setView('genaral');
  };

  useEffect(() => {
    console.log(medicines);
  }, [medicines]);

  return (
    <ScrollView style={styles.form}>
      <View style={styles.formContainer}>
        <MedicineList items={medicines} />
        <TextInput
          onChangeText={(text) => handleInputChange('name', text, setFormData)}
          value={formData.name}
          style={styles.input}
          label="Medicine Name"
          placeholder="Medicine Name"
        />
        <TextInput
          onChangeText={(text) =>
            handleInputChange('description', text, setFormData)
          }
          value={formData.description}
          style={styles.input}
          label="Description"
          placeholder="Description"
        />
        <TextInput
          onChangeText={(text) =>
            handleInputChange('quantity', text, setFormData)
          }
          value={formData.quantity}
          style={styles.input}
          label="Quantity"
          placeholder="Quantity"
        />
        <TextInput
          onChangeText={(text) => handleInputChange('unit', text, setFormData)}
          value={formData.unit}
          style={styles.input}
          label="Unit"
          placeholder="Unit"
        />
        <FileInput
          handleChange={async (dataStr) => {
            setFormData((formData) => ({
              ...formData,
              packageImgUrl: dataStr,
            }));
          }}
          defaultPlaceholder="Medicine Package Image"
        />
        <FileInput
          handleChange={async (dataStr) => {
            setFormData((formData) => ({
              ...formData,
              medicineImgUrl: dataStr,
            }));
          }}
          defaultPlaceholder="Medicine Image"
        />
        <Button style={styles.btn} mode="contained" onPress={handleAddMedicine}>
          Add Medicine
        </Button>
        <View style={styles.btnContainer}>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={() => setView('activityType')}
          >
            Back
          </Button>
          <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
            Next
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    minHeight: Dimensions.get('window').height,
  },
  formContainer: {
    padding: 30,
    minWidth: Dimensions.get('window').width,
  },
  input: {
    marginBottom: 30,
  },
  btn: {
    minWidth: 140,
    marginBottom: 30,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default MedicineActivityForm;
