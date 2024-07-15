import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AppNavigation from './navigation/Tab_Navigation/AppNav';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content" // Options: 'dark-content', 'light-content', and 'default'
            backgroundColor="#FFBF00" // Background color of the status bar
            translucent={false}
          />
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
