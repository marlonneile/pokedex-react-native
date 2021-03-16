import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { TypeColors } from '../Assets/Colors';
import { ITEMHEIGHT, ITEMWIDTH, SCREENWIDTH } from '../utils';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export const Type = ({ name, type, onPress }) => {
  const { color, text } = TypeColors[type]
  const disabled = !!onPress

  return (
    <SharedElement id={`${name}.type.${type}`} style={styles.padding}>
      <TouchableNativeFeedback onPress={onPress}>
        <Text style={[styles.typeText, { backgroundColor: color }]}>{text}</Text>
      </TouchableNativeFeedback>
    </SharedElement>
  )
}

const styles = StyleSheet.create({
  padding: {
    padding: 5,
    paddingBottom: 0
  },
  containerStyle: {
    borderRadius: 10
  },
  typeText: {
    borderRadius: 10,
    fontSize: 12,
    lineHeight: 22,
    textAlign: 'center',
    width: SCREENWIDTH/3-10,
    color: 'white'
  },
})

export const MemoType = React.memo(Type);