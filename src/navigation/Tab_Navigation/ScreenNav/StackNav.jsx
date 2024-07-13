import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../../screens/Home/HomeScreen';
import AddressScreen from '../../../screens/Home/AddressScreen';
import BasketScreen from '../../../screens/Basket/BasketScreen';
import SelectScreen from '../../../screens/Basket/SelectScreen';
import AddAddressScreen from '../../../screens/Home/AddAddressScreen';
import OrdersScreen from '../../../screens/OrdersScreen';
import CartScreen from '../../../screens/CartScreen';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  const options = {
    headerShown: false,
  };
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={options}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

const Stack2 = createNativeStackNavigator();
export const BasketStack = () => {
  const options = {
    headerShown: false,
  };
  return (
    <Stack2.Navigator initialRouteName="Basket" screenOptions={options}>
      <Stack2.Screen name="Basket" component={BasketScreen} />
      <Stack2.Screen name="Select" component={SelectScreen} />
      <Stack2.Screen name="Cart" component={CartScreen} />
    </Stack2.Navigator>
  );
};
