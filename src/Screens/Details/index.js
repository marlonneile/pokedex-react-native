import React, { useEffect } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { SharedElement } from 'react-navigation-shared-element';

import { Header, InfoMenu1, Type } from '../../Components';
import { darkColor, SCREENWIDTH, SCREENHEIGHT, ITEMWIDTH, ITEMHEIGHT } from '../../utils';
import { BackgroundColors } from '../../Assets/Colors';

const Details = ({ route, navigation }) => {
  const { item } = route.params
  const { 
    pokemon_species: { name },
    entry_number: entry,
    color, img,
    stats, types
  } = item;

  const backgroundColor = BackgroundColors[color.name]
  const textColor = darkColor(color.name) ? 'black' : 'white'
  const source = { uri: img.url }

  return (
    <>
    <StatusBar barStyle={darkColor(color.name) ? 'dark-content' : 'light-content'} animated={true} backgroundColor={backgroundColor} />
      <SharedElement id={`${name}.colorBackground`} style={styles.cardBackground} >
        <View style={[styles.cardBackground, { backgroundColor }]} />
      </SharedElement>
      <Header
        name={name}
        entry={entry}
        textColor={textColor}
        showIcon={true}
        navigation={navigation}/>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <SharedElement id={`${name}.whiteBackgroundTop`} style={styles.emptyTopBackground} >
            <View style={styles.whiteBackground} />
          </SharedElement>
          <SharedElement id={`${name}.pic`} style={styles.picContainer}>
            <FastImage
              style={styles.imageStyle}
              source={source}
              resizeMode={FastImage.resizeMode.contain} />
          </SharedElement>
            <View style={styles.typeContainer}>
              <Type type={types[0]} name={name}/>
              {types[1] ? <Type type={types[1]} name={name} /> : null }
            </View>
        </View>
        <InfoMenu1 stats={stats} name={name} detail />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
  },
  cardBackground: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    position: 'absolute',
  },
  emptyTopBackground: {
    width: SCREENWIDTH-20,
    height: SCREENHEIGHT*0.3,
    position: 'absolute',
  },
  whiteBackground: {
    width: SCREENWIDTH-20,
    height: SCREENHEIGHT*0.3,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8
  },
  picContainer: {
    width: SCREENWIDTH*0.5-10,
  },
  imageContainer: {
    flexDirection: 'row',
    height: SCREENHEIGHT*0.3,
    marginHorizontal: 5,
  },
  imageStyle: {
    width: SCREENWIDTH*0.5-10,
    height: SCREENWIDTH*0.5-10,
    padding: 5
  },
  typeContainer: {
    width: SCREENWIDTH*0.5-10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    height: SCREENHEIGHT*0.6,
    marginVertical: 5,
    marginHorizontal: 10
  }
})

export default Details;