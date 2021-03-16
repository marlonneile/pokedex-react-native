import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { SharedElement } from 'react-navigation-shared-element';

import { Type, InfoMenu1, MoreInfoButton, Header, } from '../../../Components';
import { BackgroundColors } from '../../../Assets/Colors';
import { darkColor, SCREENHEIGHT, SCREENWIDTH, ITEMHEIGHT, ITEMWIDTH } from '../../../utils';

export const Card = ({ data, navigate }) => {
  const { 
    pokemon_species: { name },
    entry_number: entry, img,
    stats, types, color, 
    height, weight
  } = data

  const _onPress = useCallback(() => navigate(data), [])

  const backgroundColor = BackgroundColors[color.name]
  const textColor = darkColor(color.name) ? 'black' : 'white'
  const source = {uri: img.url}

  return (
    <View style={styles.itemContainer}>
      <SharedElement id={`${name}.colorBackground`} style={styles.cardBackground} >
        <View style={[styles.cardBackground, { backgroundColor }]} />
      </SharedElement>
      <Header
        name={name}
        entry={entry}
        textColor={textColor}
        showIcon={false}
      />
      <View style={styles.imageContainer}>
        <SharedElement id={`${name}.whiteBackgroundTop`} style={styles.emptyTopBackground} >
          <View style={styles.whiteBackground} />
        </SharedElement>
        <SharedElement id={`${name}.pic`} style={styles.container}>
          <FastImage
            style={styles.imageStyle}
            source={source}
            resizeMode={FastImage.resizeMode.contain}
          />
        </SharedElement>
        <SharedElement id={`${name}.type`} style={styles.typeContainer}>
            <Type type={types[0]} name={name}/>
            {types[1] ? <Type type={types[1]} name={name} /> : null }
        </SharedElement>
      </View>
      <InfoMenu1 stats={stats} name={name} />
      <MoreInfoButton
        title='Mais Informações'
        id={name}
        props={styles.container}
        backgroundColor={backgroundColor}
        color={textColor}
        onPress={_onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardBackground: {
    width: ITEMWIDTH,
    height: ITEMHEIGHT,
    position: 'absolute',
    borderRadius: 8
  },
  emptyTopBackground: {
    width: ITEMWIDTH-10,
    height: ITEMHEIGHT*0.29,
    position: 'absolute',
  },
  whiteBackground: {
    width: ITEMWIDTH-10,
    height: ITEMHEIGHT*0.29,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: ITEMWIDTH,
    height: ITEMHEIGHT,
    marginVertical: SCREENHEIGHT*0.03,
    elevation: 20,
  },
  imageContainer: {
    height: ITEMHEIGHT*0.29,
    flexDirection: 'row',
    padding: 3,
    marginHorizontal: 5
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  typeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export const MemoCard = React.memo(Card);