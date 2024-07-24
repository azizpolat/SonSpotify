import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  VirtualizedList,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ModalContent} from 'react-native-modals';
import Entypo from 'react-native-vector-icons/Entypo';
import SongItem from '../components/SongItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feater from 'react-native-vector-icons/Feather';
import axios from 'axios';
import TrackPlayer from 'react-native-track-player';

export default function LikedSongScreens() {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('Türkiyede En Populer Müsikler');
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'tr-TR',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': '17bfa31bbbmsh1355592a7405f9bp1dd229jsnd7e87c1e1260',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.tracks.hits.length);
      setSearchedTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePlay = async track => {
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri, // ses dosyasının urli
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };
    console.log(trackData);

    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };
  useState(() => {
    handleSearch();
  }, {});

  return (
    <>
      <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginTop: 50}}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              marginHorizontal: 10,
            }}>
            <Ionicons name="arrow-back" size={25} color={'white'} />
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginTop: 9,
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 9,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 8,
                width: 400,
                height: 60,
              }}>
              <AntDesign name="search1" size={20} color="white" />
              <TextInput
                placeholderTextColor={'white'}
                placeholder="Find in Liked songs"
                style={{
                  size: 33,
                  color: 'white',
                  fontWeight: '400',
                  marginLeft: 10,
                }}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
              />
            </Pressable>
          </Pressable>
          <View style={{height: 50}} />
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Liked Songs
            </Text>
            <Text style={{color: 'white', fontSize: 13, marginTop: 5}}>
              {searchedTracks.length} songs
            </Text>
          </View>

          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Pressable
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#1DB954',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
              }}>
              <AntDesign name="arrowdown" size={20} color="white" />
            </Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <MaterialCommunityIcons
                name="cross-bolnisi"
                color="#1DB954"
                size={24}
              />
              <Pressable
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#1DB954',
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Entypo name="controller-play" color="white" size={24} />
              </Pressable>
            </View>
          </Pressable>

          {loading ? (
            <ActivityIndicator size={'large'} color={'gray'} />
          ) : (
            <FlatList
              data={searchedTracks}
              keyExtractor={item => item.track.key}
              renderItem={({item}) => (
                <Pressable onPress={() => handlePlay(item)}>
                  <View style={styles.trackContainer}>
                    <Image
                      source={{uri: item.track.images.coverart}}
                      style={styles.albumCover}
                    />
                    <View style={styles.trackInfo}>
                      <Text style={styles.trackName}>{item.track.title}</Text>
                      <Text style={styles.albumName}>
                        {item.track.subtitle}
                      </Text>
                    </View>
                    <Entypo name="controller-play" size={25} color={'white'} />
                  </View>
                </Pressable>
              )}
            />
          )}
        </ScrollView>
      </LinearGradient>
      <Pressable
        style={{
          backgroundColor: '#5072A7',
          padding: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'absolute',
          left: 20,
          bottom: 10,
          borderRadius: 6,
          marginBottom: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image
            source={{
              uri: 'https://www.google.com/imgres?q=horse%20wallpaper&imgurl=https%3A%2F%2Fimages.photowall.com%2Fproducts%2F48312%2Frunning-horses-interlitho-designs.jpg%3Fh%3D699%26q%3D85&imgrefurl=https%3A%2F%2Fwww.photowall.com%2Fus%2Frunning-horses-interlitho-designs-wallpaper&docid=TXMKttqQrfoxrM&tbnid=GhULKQE8833ifM&vet=12ahUKEwjStp2IgKaHAxU4R_EDHXH9Bo8QM3oECB0QAA..i&w=985&h=699&hcb=2&ved=2ahUKEwjStp2IgKaHAxU4R_EDHXH9Bo8QM3oECB0QAA',
            }}
            style={{width: 40, height: 40}}
          />
          <Text
            style={{
              width: 280,
              fontSize: 13,
              color: 'white',
              fontWeight: 'bold',
            }}>
            name
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center ', gap: 8}}>
          <AntDesign name="heart" size={20} color={'#1DB954'} />
          <Pressable>
            <AntDesign name="pausecircle" size={20} color={'white'} />
          </Pressable>
        </View>
      </Pressable>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down" // modalın hangi yöne kaydırılacağını belirler
        onSwipeComplete={() => setModalVisible(false)}
        style={{backgroundColor: '#5072A7', width: '100%', height: '100%'}}>
        <View
          style={{
            backgroundColor: '#5072A7',
            width: '100%',
            height: '100%',
            paddingTop: 60,
            paddingHorizontal: 10,
          }}>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <AntDesign name="down" size={24} color="white" />
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
              Song Name
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </Pressable>

          <View style={{padding: 10, marginTop: 20}}>
            <Image
              source={{
                uri: selectedTrack?.images.coverart,
              }}
              style={{
                width: '100%',
                height: 330,
                borderRadius: 4,
                marginTop: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  {selectedTrack?.title}
                </Text>
                <Text style={{color: '#D3D3D3'}}>
                  {selectedTrack?.subtitle}
                </Text>
              </View>
              <AntDesign name="heart" size={24} color="#1DB954" />
            </View>
            <View style={{marginTop: 30}}>
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 3,
                  backgroundColor: 'gray',
                  borderRadius: 10,
                }}>
                <View style={([styles.progressbar], {width: 1 * 100})} />
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    width: 10,
                    height: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    left: 100,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 15}}>00:00</Text>
                <Text style={{color: 'white', fontSize: 15}}>00:00</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 17,
                }}>
                <Pressable>
                  <Entypo
                    name="controller-fast-backward"
                    size={30}
                    color="white"
                  />
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color={'white'} />
                </Pressable>
                <Pressable>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color={'white'} />
                  ) : (
                    <Pressable
                      style={{
                        backgroundColor: 'white',
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderRadius: 30,
                      }}>
                      <Entypo name="controller-play" size={26} color={'back'} />
                    </Pressable>
                  )}
                </Pressable>
                <Pressable>
                  <Entypo
                    name="controller-fast-forward"
                    size={30}
                    color="white"
                  />
                </Pressable>
                <Pressable>
                  <Feater name="repeat" size={30} color="#03C03C" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
/*
ActivityIndicator yapısı sayfanın yukleme yapsıı veri gelmesz ise loader yukleniyor
*/
const styles = StyleSheet.create({
  progressbar: {
    height: '100%',
    backgroundColor: 'white',
  },
  trackContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 10,
  },
  trackName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  albumName: {
    fontSize: 14,
    color: '#758694',
  },
});
