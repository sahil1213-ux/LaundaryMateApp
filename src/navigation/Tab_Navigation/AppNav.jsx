import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrdersScreen from '../../screens/OrdersScreen';
import {
  HomeIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/outline';
import {BasketStack, HomeStack} from './ScreenNav/StackNav';
import {Provider} from 'react-redux';
import Store from '../../redux/Store';
import LoginScreen from '../../screens/Auth/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../../screens/Auth/SignUpScreen';

export const TabNav = () => {
  const Tab = createBottomTabNavigator();
  const options = {
    headerShown: false,
    tabBarIcon: tabInfo => {
      if (tabInfo.route.name === 'Home') {
        return <HomeIcon size={24} color={tabInfo.color} />;
      } else if (tabInfo.route.name === 'Basket') {
        return <ShoppingCartIcon size={24} color={tabInfo.color} />;
      }
      return <ShoppingBagIcon size={24} color={tabInfo.color} />;
    },
    tabBarLabelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
  };
  return (
    // Step 3 wrap the app with Provider

    <Tab.Navigator initialRouteName="Home" screenOptions={options}>
      {/* step 3 */}
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Basket" component={BasketStack} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={Store}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="TabNav" component={TabNav} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </Provider>
  );
}
