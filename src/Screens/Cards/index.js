import React, { useRef, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  StatusBar
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Input } from '../../Components/index';
import { MemoCard } from './Card';
import pokemon from '../../pokedex.json';
import { SCREENHEIGHT, SCREENWIDTH, ITEMWIDTH, RATIO } from '../../utils';

function _keyExtractor(item) {
  return `${item.entry_number}.pokedex`
}

const PokedexCards = ({ route, navigation }) => {
  const scrollPokedexRef = useRef()

  function handleInput(index) {
    (index !== undefined) && scrollPokedexRef.current.snapToItem( index )
  }
  
  function navigate(item) {
    navigation.navigate('Details', { item })
  }

  const _renderItem = 
    useCallback(({ item }) => 
      <MemoCard 
        data={item}
        navigate={navigate}
      />
    , [])

  return (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#820000" animated={true}/>
    <View style={styles.container}>
      <Input data={pokemon} action={handleInput} />
      <View style={styles.body}>
        <Carousel
          ref={scrollPokedexRef}
          data={pokemon}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          itemWidth={ITEMWIDTH}
          sliderWidth={SCREENWIDTH}
          inactiveSlideOpacity={0.95}
          inactiveSlideScale={0.8}
          loop={true}
          loopClonesPerSide={3}
          decelerationRate={0.9}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREENHEIGHT,
    width: SCREENWIDTH,
    padding: 0,
    margin: 0,
    // backgroundColor: '#a00000',
  },
  body: {
    flex: 1,
    // backgroundColor: '#fff',
  },
})
export default PokedexCards;