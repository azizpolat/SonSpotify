import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SongInfoScreens() {
  const navigation = useNavigation();
  const route = useRoute();
  const { album } = route.params || {};
  const { coverArt, name, artist, year } = album;

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons color="white" size={25} name="arrow-back" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
            <Image
              source={{ uri: coverArt }}
              style={{ width: 200, height: 200, borderRadius: 5 }}
            />
          </View>
        </View>

        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            marginHorizontal: 12,
            marginTop: 10,
          }}>
          {name}
        </Text>

        <View
          style={{
            marginHorizontal: 12,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 7,
            marginTop: 10,
          }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>
            {name}
          </Text>
        </View>

        <Pressable
          style={{
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Pressable
            style={{
              backgroundColor: '#1DB954',
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="arrowdown" color="white" size={20} />
          </Pressable>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="#1DB954"
            />
            <Pressable
              style={{
                backgroundColor: '#1DB954',
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>

        <View style={{ marginVertical: 10, marginTop: 10 }}>
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
              Album: {name}
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </Pressable>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginLeft: 12,
            }}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
              Artist: {artist}
            </Text>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
              Year: {year}
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
