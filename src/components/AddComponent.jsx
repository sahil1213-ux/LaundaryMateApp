import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import MinusIcon from './MinusIcon';
import PlusIcon from './PlusIcon';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {decrementQuantity, incrementQuantity} from '../redux/CartReducer';
import {theme} from '../utils/theme';

export default function AddComponent({item, cart}) {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>AddComponent</Text>
      <Pressable
        className="flex-row items-center"
        style={{
          paddingHorizontal: hp(1),
          borderRadius: 5,
        }}>
        <Pressable
          onPress={() => {
            console.log('Pressable pressed');
            dispatch(decrementQuantity(item));
          }}>
          <MinusIcon size={hp(5)} color={theme.lightBlue} />
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
          <PlusIcon size={hp(5)} color="#89CFF0" />
        </Pressable>
      </Pressable>
    </View>
  );
}

AddComponent.propTypes = {
  item: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
};
