import {View, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {MyText} from '../../utils/sizes_padding_margin';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from '../../components/CartItem';
import {cleanCart} from '../../redux/CartReducer';
import {SmallText} from '../../utils/AppText';

export default function BasketScreen() {
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart.cart);
  const total =
    cart.length === 0
      ? 0
      : cart
          .map(item => item.item.price * item.item.quantity)
          .reduce((prev, current) => prev + current, 0);
  const dispatch = useDispatch();

  return cart.length === 0 ? (
    <View className="flex-1 justify-center items-center">
      <View className="p-1 rounded-sm sm:mx-0.5 md:m- mx-1 h-48">
        <MyText isSmallMedLg="small" text="YOUR BASKET IS EMPTY" />
        <Pressable
          onPress={() => navigation.push('Select')}
          className="p-2 bg-blue-500 my-1 rounded-md items-center">
          <MyText text="Add items" txtColor="white" />
        </Pressable>
      </View>
    </View>
  ) : (
    <>
      <ScrollView>
        <View className="bg-amber-400 p-3"></View>
        <SmallText text="Cart Items" color="text-black" styles={{padding: 4}} />

        <View style={{marginHorizontal: 12}}>
          {cart?.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </View>
        <View className="bg-blue-500 p-3 flex-row items-center justify-between mx-2 rounded-md mt-2">
          <SmallText text={`Basket Total (${cart.length})`} />
          <SmallText text={`Rs ${total}`} />
        </View>
      </ScrollView>
      <View className="flex-row p-1 items-center space-x-1 mt-1">
        <Pressable
          onPress={() => {
            dispatch(cleanCart());
          }}
          className="bg-gray-300 p-2 rounded-md flex-1 items-center">
          <SmallText text="Empty Basket" color="black" />
        </Pressable>
        <Pressable
          onPress={() => navigation.push('Address')}
          className="bg-blue-500 p-2 rounded-md flex-1 items-center">
          <SmallText text="Next" />
        </Pressable>
      </View>
    </>
  );
}
