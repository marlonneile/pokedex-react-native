import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { PokedexCards, PokedexGrid, Details, TypeSelector } from './src/Screens';

enableScreens();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

function isValidNavigationState(state) {
  return "index" in state && "routes" in state;
}

function getActiveRoute(state) {
  const route = state.routes[state.index];
  return route.state && isValidNavigationState(route.state)
  ? getActiveRoute(route.state) // Dive into nested navigators
  : route;
}

const PokedexStack = createSharedElementStackNavigator({name: 'Details', debug: false})

const StackPokedex = ({ navigation }) => {
  return (
    <PokedexStack.Navigator
      initialRouteName='Home'
      headerMode='none'
      mode='modal'
      screenOptions={{
        cardStyleInterpolator: ({ current: { progress: opacity } }) => {
          return({ opacity })
        }
      }}
    >
      <PokedexStack.Screen
        name='Home'
        component={TabNavigator}
        options={{
          cardShadowEnabled: false,
          cardOverlayEnabled: false,
          cardStyle: { backgroundColor: null },
        }}
      />
      <PokedexStack.Screen
        name='Details'
        component={Details}
        options={{
          cardShadowEnabled: false,
          cardOverlayEnabled: false,
          cardStyle: { backgroundColor: 'transparent'},
          transitionConfig: () => ({
            transitionSpec: {
              duration: 0,
            },
          })
        }}
        sharedElements={(route, otherRoute, showing) => {
          const tabRoute = otherRoute.route.state && isValidNavigationState(otherRoute.route.state)
            ? getActiveRoute(otherRoute.route.state)
            : { name: 'Pokedex' }

          if (otherRoute.name === 'Home' && tabRoute.name === 'Pokedex') {
            const { item } = route.params;
            const { pokemon_species: { name }, types } = item;
            return [
              { id: `${name}.colorBackground`, resize: 'stretch'},
              { id: `${name}.number`, animation: 'fade', resize: 'none'},
              { id: `${name}.name`, animation: 'move', resize: 'none'},
              { id: `${name}.whiteBackgroundTop`, animation: 'move', resize: 'stretch'},
              { id: `${name}.pic`, animation: 'move', resize: 'auto'},
              { id: `${name}.type.${types[0]}`, animation: 'move', resize: 'none'},
              { id: `${name}.type.${types[1]}`, animation: 'move', resize: 'none'},
              { id: `${name}.whiteBackgroundBottom`, animation: 'move', resize: 'stretch'},
              { id: `${name}.stats.0`, animation: 'move', resize: 'none'},
              { id: `${name}.statsBar.0`, animation: 'move', resize: 'stretch'},
              { id: `${name}.stats.1`, resize: 'none'},
              { id: `${name}.statsBar.1`, animation: 'move', resize: 'stretch'},
              { id: `${name}.stats.2`, resize: 'none'},
              { id: `${name}.statsBar.2`, animation: 'move', resize: 'stretch'},
              { id: `${name}.stats.3`, resize: 'none'},
              { id: `${name}.statsBar.3`, animation: 'move', resize: 'stretch'},
              { id: `${name}.stats.4`, resize: 'none'},
              { id: `${name}.statsBar.4`, animation: 'move', resize: 'stretch'},
              { id: `${name}.stats.5`, resize: 'none'},
              { id: `${name}.statsBar.5`, animation: 'move', resize: 'stretch'},
              // { id: `${name}.button`, animation: 'move', resize: 'none'},
            ];
          } else {
            return [
              // { id: `${name}.pic`},
            ]
          }
        }}
      />
    </PokedexStack.Navigator>
  );
}

const Tab = createBottomTabNavigator()

const TabNavigator = ({ navigation }) => {
  return (
      <Tab.Navigator initialRouteName={'Pokedex'}
        tabBarOptions={{
          // backgroundColor:'tomato',
          activeBackgroundColor: '#cc0000',
          activeTintColor: '#dde3e0',
          inactiveTintColor: '#cc0000',
          style: {backgroundColor: '#820011', borderTopWidth: 0, elevation: 10}
        }}
      >
        <Tab.Screen
          name='Pokedex'
          component={PokedexCards}
          options={() => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = focused ? 'pie-chart' : 'pie-chart-outlined';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            }
          })
        } 
        />
        <Tab.Screen
          name='Grid'
          component={PokedexGrid}
          options={() => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = focused ? 'view-grid' : 'grid-large';;
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />            }
          })
        }
        />
        <Tab.Screen
          name='Typos'
          component={TypeSelector}
          options={() => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = focused ? 'list' : 'grid-large';;
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />            }
          })
        }
        />
      </Tab.Navigator>
  )
}

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <NavigationContainer theme={MyTheme}>
      <StackPokedex />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
