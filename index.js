/**
 * @format
 * // nav
 * npm install @react-navigation/native
 * npm install react-native-screens react-native-safe-area-context
 * npm install @react-navigation/native-stack
 * npm install @react-navigation/bottom-tabs
 * // ui library
 * npm install nativewind
 * npm install --save-dev tailwindcss@3.3.2
 * // animation
 * npm install react-native-reanimated
 * npm install react-native-gesture-handler
 * // icons
 * npm i react-native-heroicons react-native-svg
 * //responsive
 * npm install --save react-native-responsive-screen
 * //time
 * moment
 * //image
 * react-native-fast-image
 * // redux
 * npm install @reduxjs/toolkit
 * npm install react-redux
 * // firebase
 * npm install firebase
 * // local storage
 * npm i react-native-mmkv-storage
 * // eslint is best for error chacking and maintains standards
 * npm init @eslint/config@latest
 * npm install eslint eslint-plugin-react --save-dev
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// import AddressScreen from './src/screens/AddressScreen';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
