import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { SCREENHEIGHT, LINEHEIGHT } from '../utils';

const BORDER_RADIUS = 20;

const getPropsFromStats = (number, max) => {
  const ratio = (number/max)
  const width = (ratio*100).toString() + '%'
  // let color = ratio > 0.08 ? 'white' : 'black' 
  const color = 'white'
  return ({ 
    width,
    color
  });
}


export const StatsBar = ({ item, name, id }) => {
  const {width, color} = useMemo(() => getPropsFromStats(item.value, item.max), [])
  const [isVisible, toggle] = useState(false)
  const _onPress = () => toggle(!isVisible)
  const opacity = isVisible? 0.8 : 0

  return (
    <TouchableWithoutFeedback
      onPressIn={_onPress} onPressOut={_onPress} >
        <SharedElement id={`${name}.statsBar.${id}`} style={styles.bar}>
          <>
            <Text style={[styles.infoText, { opacity, color }]}>{item.value}</Text>
              <View style={[styles.filledBar, { width }]}/>
          </>
        </SharedElement>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bar: {
    flex: 1,
    backgroundColor: '#ccc',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden'
  },
  filledBar: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: BORDER_RADIUS
  },
  infoText: {
    position: 'absolute',
    color: 'white',
    lineHeight: LINEHEIGHT,
    textAlignVertical: 'center',
    paddingLeft: 10,
    zIndex: 5
  },
})

export const MemoStatsBar = React.memo(StatsBar)