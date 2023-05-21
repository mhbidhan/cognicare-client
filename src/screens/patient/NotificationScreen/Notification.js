import axios from 'axios';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SERVER_URL } from '../../../config';
import ContactNotificationScreen from './ContactNotifiactionScreen';
import ExerciseNotificationScreen from './ExerciseNotificationScreen';
import GameNotificationScreen from './GameNotifcationScreen';
import MealNotifiactionScreen from './MealNotificationScreen';
import MedicineNotificationScreen from './MedicineNotificationScreen';

const NotificationScreen = ({ notification, setNotification }) => {
  const [sound, setSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/audios/notification.wav')
    );
    setSound(sound);

    await sound.playAsync();
  };

  const handleLog = async (status = 'complete') => {
    const { routineId, details } = notification;
    try {
      const log = await axios.post(SERVER_URL + '/routineLogs', {
        routineId,
        routineElementId: details._id,
        status,
      });

      console.log(log);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    playSound();
  }, []);

  useEffect(() => {
    console.log(notification);
  }, [notification]);

  if (notification.type === 'meal')
    return (
      <MealNotifiactionScreen
        notification={notification}
        setNotification={setNotification}
        handleLog={handleLog}
      />
    );
  if (notification.type === 'medicine')
    return (
      <MedicineNotificationScreen
        notification={notification}
        setNotification={setNotification}
        handleLog={handleLog}
      />
    );

  if (notification.type === 'exercise')
    return (
      <ExerciseNotificationScreen
        notification={notification}
        setNotification={setNotification}
        handleLog={handleLog}
      />
    );
  if (notification.type === 'contact')
    return (
      <ContactNotificationScreen
        notification={notification}
        setNotification={setNotification}
        handleLog={handleLog}
      />
    );
  if (notification.type === 'game')
    return (
      <GameNotificationScreen
        notification={notification}
        setNotification={setNotification}
        handleLog={handleLog}
      />
    );
};

const styles = StyleSheet.create({});

export default NotificationScreen;
