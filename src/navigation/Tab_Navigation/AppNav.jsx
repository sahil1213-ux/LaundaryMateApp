import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrdersScreen from '../../screens/OrdersScreen';
import {
  HomeIcon as HomeIconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
  ShoppingBagIcon as ShoppingBagIconOutline,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
} from 'react-native-heroicons/solid'; // Assuming solid icons are used for focused state

import {BasketStack, HomeStack} from './ScreenNav/StackNav';
import {Provider} from 'react-redux';
import Store from '../../redux/Store';
import LoginScreen from '../../screens/Auth/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../../screens/Auth/SignUpScreen';

export const TabNav = () => {
  const Tab = createBottomTabNavigator();
  const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      if (route.name === 'Home1') {
        return focused ? (
          <HomeIconSolid size={size} color={color} />
        ) : (
          <HomeIconOutline size={size} color={color} />
        );
      } else if (route.name === 'Basket1') {
        return focused ? (
          <ShoppingBagIconSolid size={size} color={color} />
        ) : (
          <ShoppingBagIconOutline size={size} color={color} />
        );
      } else if (route.name === 'Orders') {
        return focused ? (
          <ShoppingCartIconSolid size={size} color={color} />
        ) : (
          <ShoppingCartIconOutline size={size} color={color} />
        );
      }
    },
    tabBarActiveTintColor: '#1DA1F2',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
  });

  return (
    <Tab.Navigator initialRouteName="Home1" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home1"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Basket1"
        component={BasketStack}
        options={{
          tabBarLabel: 'Basket',
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Orders',
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  const options = {
    headerShown: false,
  };

  return (
    <Provider store={Store}>
      <Stack.Navigator initialRouteName="Login" screenOptions={options}>
        <Stack.Screen name="TabNav" component={TabNav} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </Provider>
  );
}
