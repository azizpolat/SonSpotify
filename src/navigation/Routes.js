import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import LikedSongScreens from '../screens/LikedSongScreens';
import SongInfoScreens from '../screens/SongInfoScreens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// sayfanın alt kısmanda cıkan menu yapısı
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#131624',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: {
            width: 0,
            height: -10,
          },
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 85,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: 'white',
            fontSize: 13,
            marginBottom: 10,
            fontWeight: '500',
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <Entypo name="home" color="white" size={25} />
            ) : (
              <AntDesign name="home" color="white" size={25} />
            ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            color: 'white',
            fontSize: 13,
            marginBottom: 10,
            fontWeight: '500',
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="person" color="white" size={25} />
            ) : (
              <Ionicons name="person-outline" color="white" size={25} />
            ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Liked" component={LikedSongScreens} />
        <Stack.Screen name="Info" component={SongInfoScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
sayfanın altındakı bottontabs için stack sceen bir main olsutup componen de olusutuan bottomtabs verince hem yonlenditme hemnde tabs yapısı olsuuyor. 
Nenb bole yaptık cunku tum sayfalrda home ve prıfile gormek için boyle bir yapı olusutruduk

*/
