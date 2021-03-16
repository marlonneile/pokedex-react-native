import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { SharedElement } from 'react-native-shared-element';
import { RectButton } from 'react-native-gesture-handler';
import { ITEMHEIGHT, ITEMWIDTH } from '../utils';

export const MoreInfoButton = ({ title, color, id, onPress, props }) => {

  return(
    <TouchableOpacity
      // background={TouchableNativeFeedback.Ripple('#ddd', false)}
      style={styles.btnContainer}
      onPress={onPress}>
      {/* <SharedElement id={`${id}.button`}> */}
        <Text style={[styles.btnLabel, { color }]}>
          {title}
        </Text>
      {/* </SharedElement> */}
    </TouchableOpacity>
  )
}

MoreInfoButton.defaultProps = {
  color: 'white'
}

const styles = StyleSheet.create({
  btnContainer: {
    height: ITEMHEIGHT*0.09,
    minHeight: 40,
    width: ITEMWIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    textAlign: 'justify',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export const MemoMoreInfoButton = React.memo(MoreInfoButton)