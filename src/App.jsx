import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AppNavigation from './navigation/Tab_Navigation/AppNav';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <StatusBar
        barStyle="dark-content" // Options: 'dark-content', 'light-content', and 'default'
        backgroundColor="#ecf0f1" // Background color of the status bar
        translucent={false} // Set to true to make the status bar translucent (Android)
      /> */}
      <NavigationContainer>
        {/* //step 2 Add Home to NC*/}
        <AppNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
