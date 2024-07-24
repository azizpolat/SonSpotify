import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';

export default function SongItem() {
  return (
    <Pressable>
      <Image
        source={{
          uri: 'https://www.google.com/imgres?q=horse%20wallpaper&imgurl=https%3A%2F%2Fimages.photowall.com%2Fproducts%2F48312%2Frunning-horses-interlitho-designs.jpg%3Fh%3D699%26q%3D85&imgrefurl=https%3A%2F%2Fwww.photowall.com%2Fus%2Frunning-horses-interlitho-designs-wallpaper&docid=TXMKttqQrfoxrM&tbnid=GhULKQE8833ifM&vet=12ahUKEwjStp2IgKaHAxU4R_EDHXH9Bo8QM3oECB0QAA..i&w=985&h=699&hcb=2&ved=2ahUKEwjStp2IgKaHAxU4R_EDHXH9Bo8QM3oECB0QAA',
        }}
        style={{width:50,height:50}}
      />
    </Pressable>
  );
}
