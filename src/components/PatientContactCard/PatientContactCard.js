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
  return (
    <View>
      {/* <Card>
        <Card.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <View>
            <Text variant='displayMedium'>{contact.name}</Text>
            <Text variant='headlineMedium'>{contact.relation}</Text>
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
      </Card> */}
      <View
        style={{
          height: 115,
          backgroundColor: 'white',
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <View>
          <Text variant='headlineMedium'>{contact.name}</Text>
          <Text variant='titleMedium'>{contact.relation}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <VideoMeetingIcon phoneNumber={contact.phone} size={30} />
          <PhoneCallButton phoneNumber={contact.phone} size={30} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default PatientContactCard;
