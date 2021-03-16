import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { ITEMHEIGHT, ITEMWIDTH } from '../utils';


export const Header = ({ name, entry, textColor, showIcon }) => {
  const { goBack } = useNavigation()
  const isFocused = useIsFocused()

  return (
    <View style={styles.header}>
      { showIcon?
        <SharedElement id={`${name}.number`} style={styles.iconContainer}>
          <TouchableOpacity onPress={goBack} style={styles.button}>
            <Icon name={'arrowleft'} size={24} color={textColor} />
          </TouchableOpacity>
        </SharedElement>
        : 
          <SharedElement id={`${name}.number`} style={styles.numberContainer}>
            <Text style={[styles.number, { color: textColor }]}>{entry}</Text>
          </SharedElement>
      }
      
      <SharedElement id={`${name}.name`} >
        <Text style={[styles.name, { color: textColor }]}>{name}</Text>
      </SharedElement>
    </View>
  );
}

Header.defaultProps = {
  showIcon: false
}

const styles = StyleSheet.create({
  header: {
    height: ITEMHEIGHT*0.09,
    minHeight: 40,
    maxHeight: 50,
    width: ITEMWIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    lineHeight: 28,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  button:{
    height: ITEMHEIGHT*0.09,
    width: ITEMHEIGHT*0.09,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  numberContainer: {
    position: 'absolute',
    left: 0,
    padding: 20,
  },
  number: {
    lineHeight: 28,
    fontSize: 22,
    fontWeight: 'bold',
  },
})

export const MemoHeader = React.memo(Header)