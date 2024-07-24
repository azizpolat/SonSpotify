import {View, Text, ScrollView, Image} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ProfileContext} from '../context/ProfileContext';
import round from 'lodash/round';

export default function ProfileScreen() {
  const {profileData, loading, error} = useContext(ProfileContext);
  const {name, image_url, followers_count, public_playlists} = profileData;
  console.log(image_url);

  // sayı formatı için
  const formatFollowers = count => {
    if (count >= 1000000) {
      return `${round(count / 1000000, 1)}M`;
    }
    if (count >= 1000) {
      return `${round(count / 1000, 1)}K`;
    }
  };

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={{marginTop: 20}}>
        <View style={{padding: 12}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Image
              source={{uri: image_url}}
              style={{
                width: 60,
                height: 60,
                borderRadius: 20,
                resizeMode: 'cover',
              }}
            />
            <View>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                {name}
              </Text>
              <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>
                {formatFollowers(followers_count)} Follwers
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            marginHorizontal: 12,
          }}>
          Your PlayLists
        </Text>
        <View style={{padding: 10, gap: 10}}>
          {public_playlists.map(playlist => (
            <View
              key={playlist.uri}
              style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={{uri: 'https://picsum.photos/200/300'}}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 4,
                  resizeMode: 'cover',
                }}
              />
              <View>
                <Text style={{color: 'white', marginTop: 8}}>
                  {playlist.name}
                </Text>
                <Text style={{color: 'white', marginTop: 5}}>
                  {formatFollowers(playlist.followers_count)} Followers
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
