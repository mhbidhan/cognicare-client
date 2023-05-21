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

const PatientContactCard = ({ contact }) => {
  console.log(contact);
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
          <Text variant='titleLarge'>{contact.name}</Text>
          <Text variant='titleSmall'>{contact.relation}</Text>
        </View>
        <Avatar.Image
          size={24}
          source={{ uri: 'https://picsum.photos/700' }}
          style={{ borderRadius: 24 }}
        />
      </Card.Content>
      <Card.Actions>
        <VideoMeetingIcon phoneNumber={contact.phone} />
        <PhoneCallButton phoneNumber={contact.phone} />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({});
export default PatientContactCard;
