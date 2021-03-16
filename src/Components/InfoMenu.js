import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { StatsBar } from './StatsBar';
import { ITEMHEIGHT, LINEHEIGHT, ITEMWIDTH } from '../utils';



export const InfoMenu1 = ({ stats, name, detail }) => {
  const containerStyle = detail ? styles.largeContainer : styles.smallContainer
  const lineStyle = detail ? styles.infoLineLarge : styles.infoLine

  const infoArray = [
    {topic: 'HP', value: stats.hp, max: 255},
    {topic: 'Ataque', value: stats.attack, max: 165},
    {topic: 'Defesa', value: stats.defense, max: 230},
    {topic: 'Ataque Sp.', value: stats["special-attack"], max: 154},
    {topic: 'Defesa Sp.', value: stats["special-defense"], max: 230},
    {topic: 'Velocidade', value: stats.speed, max: 160},
  ]

  return (
    <View style={containerStyle}>
      <SharedElement id={`${name}.whiteBackgroundBottom`} style={styles.cardBackground} >
        <View style={styles.whiteBackground} />
      </SharedElement>
      {infoArray.map((item, key) =>
        <View style={lineStyle} key={key}>
          <SharedElement id={`${name}.stats.${key}`} style={styles.textContainer}>
            <Text style={styles.infoTopic}>{item.topic}</Text>
          </SharedElement>
          <StatsBar item={item} name={name} id={key}/>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    width: ITEMWIDTH*0.35
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  whiteBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 6
  },
  largeContainer: {
    height: ITEMHEIGHT*0.56,
    justifyContent: 'center',
    marginTop: 5,
    marginHorizontal: 5,
  },
  smallContainer: {
    height: ITEMHEIGHT*0.47,
    justifyContent: 'center',
    marginTop: 5,
    marginHorizontal: 5,
  },
  infoLine: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 3,
    height: LINEHEIGHT
  },
  infoLineLarge: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginVertical: 3.5,
    height: LINEHEIGHT*1.2
  },
  infoTopic: {
    fontSize: 14,
    lineHeight: LINEHEIGHT
  },
})

export const MemoInfoMenu1 = React.memo(InfoMenu1)