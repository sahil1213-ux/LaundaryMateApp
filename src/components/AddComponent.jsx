import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {decrementQuantity, incrementQuantity} from '../redux/CartReducer';
import {theme} from '../utils/theme';
import {PlusIcon, MinusIcon} from 'react-native-heroicons/solid';

export default function AddComponent({item, cart}) {
  const dispatch = useDispatch();

  return (
    <View>
      <Pressable
        className="flex-row items-center border-blue-500 rounded-full border"
        style={{
          paddingHorizontal: hp(1),
          borderRadius: 5,
        }}>
        <Pressable
          onPress={() => {
            console.log('Pressable pressed');
            dispatch(decrementQuantity(item));
          }}>
          <MinusIcon size={hp(3)} color="blue" />
        </Pressable>

        <Pressable>
          <Text
            style={{
              color: theme.blackColor,
              paddingHorizontal: hp(1),
              fontSize: hp(2.5),
            }}>
            {cart.find(c => c.item.id === item.id)?.item.quantity}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            dispatch(incrementQuantity(item));
          }}>
          <PlusIcon size={hp(3)} color="blue" />
        </Pressable>
      </Pressable>
    </View>
  );
}

AddComponent.propTypes = {
  item: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
};
