import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import VideoMeetingIcon from '../VideoMeeting/VideoMeetingIcon';
import PhoneCallButton from '../PhoneCall/PhoneCallButton';
import MyTheme from '../../assets/Theme/myTheme';
import UserAvatar from '../../assets/user.png';

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
          backgroundColor: 'white',
          borderRadius: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <View>
            {contact.imgUrl ? (
              <Avatar.Image
                size={50}
                source={{
                  uri: contact.imgUrl,
                }}
              />
            ) : (
              <Avatar.Image size={50} source={UserAvatar} />
            )}
          </View>
          <View>
            <Text
              variant='titleMedium'
              style={{ fontWeight: 'bold', color: MyTheme.colors.primary }}
            >
              {contact.name}
            </Text>
            <Text variant='titleSmall' style={{ opacity: 0.7 }}>
              {contact.relation}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <VideoMeetingIcon phoneNumber={contact.phone} size={27} />
          <PhoneCallButton phoneNumber={contact.phone} size={27} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default PatientContactCard;
