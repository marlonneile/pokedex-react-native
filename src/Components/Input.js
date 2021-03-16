import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';

var SCREENWIDTH = Dimensions.get('window').width
var SCREENHEIGHT = Dimensions.get('window').height

function Input({ data, action }) {
  const [value, setValue] = useState('')

  function _onChangeText(value) {
    setValue(value)
    const firstItem = data.find((item, index) => {
      return (item.pokemon_species.name.indexOf(value.toLowerCase()) === 0 )
    })
    action(firstItem ? firstItem.entry_number -1 : firstItem)
  }
  

  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={_onChangeText}
      autoCapitalize="none"
    />
  )
}
const styles = StyleSheet.create({
  textInput: {
    padding: 7,
    paddingLeft: 15,
    fontSize: 16,
    margin: SCREENWIDTH*0.04,
    marginTop: SCREENHEIGHT*0.02,
    marginBottom: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: 'white',
    borderRadius: 8
  }
})

export default Input;