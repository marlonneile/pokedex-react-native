import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Type } from '../../Components';
import { TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native-gesture-handler';

const allTypes = [
  'normal', 'water', 'electric', 'grass',
  'fighting', 'flying', 'poison', 'ground',
  'psychic', 'rock', 'ice', 'bug', 'ghost',
  'dragon', 'dark', 'steel', 'fire', 'fairy'
]



const TypeSelector = () => {
  const [showRow, setShowRow] = useState(false)
  const [row, setRow] = useState(null)

  function _onPress(value) {
    setRow(value)
  }

  function _renderItem({ item, index }) {
    return (
      <View style={styles.padding}>
        <Type name={'null'} type={item} onPress={_onPress} key={index}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.content}
        data={allTypes}
        renderItem={_renderItem}
        numColumns={3}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a00000'
  },
  content: {
    flex: 1,
    paddingTop: 10
  },
  padding: {
    flex: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TypeSelector;