import React, { useRef, useEffect } from 'react';


export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

import { Dimensions } from 'react-native';

export const SCREENWIDTH = Dimensions.get('window').width
export const SCREENHEIGHT = Dimensions.get('window').height
export const RATIO = SCREENHEIGHT/SCREENWIDTH
export const ITEMHEIGHT = SCREENHEIGHT*0.75-20
export const ITEMWIDTH = RATIO < 1.7 ? ITEMHEIGHT/RATIO : ITEMHEIGHT/1.7
export const LINEHEIGHT = ITEMHEIGHT*0.05

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

export const capitalize = (str) => str[0].toUpperCase() + str.slice(1)

export const darkColor = (colorName) => (colorName === 'white' || colorName === 'yellow')