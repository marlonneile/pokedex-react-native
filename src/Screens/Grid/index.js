import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import { MemoPhotoCard } from './PhotoCard';
import pokemon from '../../pokedex.json'

const SCREENWIDTH = Dimensions.get('window').width

const getItemLayout = (data, index) => {
  return ({
  length: (SCREENWIDTH/3 - 4),
  offset: (SCREENWIDTH/3 - 4)*Math.floor(index/3),
  index: index
})
}

const PokedexGrid = ({ navigation }) => {
  const gridPokedexRef = useRef();

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#820000" />
      <FlatList
        ref={gridPokedexRef}
        style={{ padding: 6 }}
        data={pokemon}
        horizontal={false}
        numColumns={3}
        renderItem={({ item, index }) =>
          <MemoPhotoCard
            data={item}
            navigate={() => navigation.navigate('Details', { item, index })}
          />}
        // getItemLayout={getItemLayout}
        keyExtractor={(item) => `${item.entry_number}.grid`}
        scrollEventThrottle={16}
        initialNumToRender={24}
        maxToRenderPerBatch={30}
        updateCellsBatchingPeriod={50}
      />
    </SafeAreaView>
  );
}

export default PokedexGrid;