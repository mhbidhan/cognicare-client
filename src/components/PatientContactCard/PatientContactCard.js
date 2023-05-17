import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Text,
  IconButton,
  MD3Colors,
} from 'react-native-paper';
import VideoMeetingIcon from '../VideoMeeting/VideoMeetingIcon';
import PhoneCallButton from '../PhoneCall/PhoneCallButton';

const PatientContactCard = ({ name, imgUrl, phone }) => {
  return (
    <Card>
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <View>
          <Text variant='titleLarge'>Mubtasim</Text>
          <Text variant='titleSmall'>Son</Text>
        </View>
        <Avatar.Image
          size={24}
          source={{ uri: 'https://picsum.photos/700' }}
          style={{ borderRadius: 24 }}
        />
      </Card.Content>
      {/* <Card.Cover
        source={{ uri: 'https://picsum.photos/700' }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      /> */}
      <Card.Actions>
        {/* <IconButton
          icon='video-check'
          iconColor={MD3Colors.primary}
          size={20}
          onPress={() => console.log('Pressed')}
          mode='contained'
        /> */}
        <VideoMeetingIcon />
        <PhoneCallButton phoneNumber='8801827600970' />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({});
export default PatientContactCard;
