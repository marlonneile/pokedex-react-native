import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { SharedElement } from 'react-navigation-shared-element';

import { BackgroundColors } from '../../../Assets/Colors';
import { darkColor } from '../../../utils';

var SCREENWIDTH = Dimensions.get('window').width

export const PhotoCard = ({ data, navigate }) => {
  const {
    pokemon_species: { name },
    color, img
  } = data

  const backgroundColor = BackgroundColors[color.name]
  const textColor = darkColor(color.name) ? 'black' : 'white'

  return (
    <TouchableNativeFeedback 
      background={TouchableNativeFeedback.Ripple('#ccc', false)}
      onPress={() => navigate()}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.imageContainer}>
          {/* <SharedElement id={`${name}.pic`} style={{ flex: 1 }}> */}
            <FastImage
              style={{ flex: 1, }}
              source={{uri: img.url}}
              resizeMode={FastImage.resizeMode.contain}
              />
          {/* </SharedElement> */}
        </View>
          <Text style={[styles.name, { color: textColor }]}>
            {name}
          </Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    width: (SCREENWIDTH/3 - 12),
    height: (SCREENWIDTH/3 - 12),
    borderRadius: 10,
    elevation: 5,
  },
  imageContainer: {
    flex: 3,
    padding: 4,
    elevation: 5,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize',
  }
})

export const MemoPhotoCard = React.memo(PhotoCard)