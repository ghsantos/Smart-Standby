/**
 * Monitor App
 * https://github.com/ghsantos/Monitor
 *
 * @format
 */

import React from 'react'
import { StatusBar } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SingletonHooksContainer } from 'react-singleton-hook'

import HomeScreen from './src/screens/Home'
import MusicPlayer from './src/screens/MusicPlayer'
import DigitalRain from './src/screens/DigitalRain'
import ClockScreen from './src/screens/ClockScreen'
import ClockConfiguration from './src/screens/ClockScreen/Configuration'
import AnimeClock from './src/screens/AnimeClock'
import WallpaperClock from './src/screens/ClockScreen/WallpaperClock'

// import { HelloWorld } from './src/screens/Test'

const Stack = createNativeStackNavigator()
const Tab = createMaterialTopTabNavigator()

function TabScreens() {
  return (
    <Tab.Navigator tabBar={() => null} offscreenPageLimit={1}>
      {/* <Tab.Screen name="test" component={HelloWorld} /> */}
      <Tab.Screen name="clock" component={ClockScreen} />
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="animeClock" component={AnimeClock} />
      <Tab.Screen name="player" component={MusicPlayer} />
      <Tab.Screen name="wallpaperClock" component={WallpaperClock} />
      <Tab.Screen name="matrix" component={DigitalRain} />
    </Tab.Navigator>
  )
}

function App(): JSX.Element {
  SystemNavigationBar.navigationHide()

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SingletonHooksContainer />
        <StatusBar translucent={true} hidden={true} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeTabs" component={TabScreens} />
          <Stack.Screen
            name="ClockConfiguration"
            component={ClockConfiguration}
          />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  )
}

export default App
