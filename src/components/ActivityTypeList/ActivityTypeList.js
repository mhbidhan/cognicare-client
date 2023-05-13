import React from 'react';
import { Dimensions, View } from 'react-native';
import { Button } from 'react-native-paper';
import contactIcon from '../../assets/icons/contact.png';
import exerciseIcon from '../../assets/icons/exercise.png';
import gameIcon from '../../assets/icons/game.png';
import mealIcon from '../../assets/icons/meal.png';
import medicineIcon from '../../assets/icons/medicine.png';
import ActivityIconButton from '../ActivityIconButton/ActivityIconButton';

const ActivityTypeList = ({ setView }) => {
  return (
    <View
      style={{
        padding: 30,
      }}
    >
      <ActivityTypeRow
        setView={setView}
        list={[
          { label: 'Meal', icon: mealIcon },
          { label: 'Medicine', icon: medicineIcon },
        ]}
      />
      <ActivityTypeRow
        setView={setView}
        list={[
          { label: 'Exercise', icon: exerciseIcon },
          { label: 'Game', icon: gameIcon },
        ]}
      />
      <ActivityTypeRow
        list={[{ label: 'Contact', icon: contactIcon }]}
        setView={setView}
      />

      <Button
        style={{
          width: 300,
        }}
        mode='contained'
        onPress={() => setView('')}
      >
        Back
      </Button>
    </View>
  );
};

export default ActivityTypeList;

const ActivityTypeRow = ({ list, setView }) => {
  return (
    <View
      style={{
        width: Dimensions.get('window').width - 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
      }}
    >
      {list.map((item) => (
        <ActivityIconButton
          key={item.label}
          icon={item.icon}
          label={item.label}
          handlePress={() => setView(item.label)}
        />
      ))}
    </View>
  );
};
