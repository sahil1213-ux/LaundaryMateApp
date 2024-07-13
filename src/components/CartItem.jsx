import {View, Text, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {PlusCircleIcon} from 'react-native-heroicons/outline';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types'; // Add this line

export default function CartItem({item}) {
  const itemm = item.item;
  const {image, name, price, quantity, id} = itemm;
  return (
    <Pressable
      style={{
        padding: hp(1),
        backgroundColor: 'white',
        marginVertical: hp(1.5),
        flexDirection: 'row',
        gap: hp(1.5),
        borderRadius: hp(0.5),
      }}
      key={id}>
      <View>
        <FastImage
          style={{width: hp(12), height: hp(12)}}
          source={{uri: image}}
        />
      </View>

      <View style={{flex: 1}}>
        <Text>{name}</Text>
        <Text>{price * quantity}</Text>
      </View>

      <Pressable>
        <PlusCircleIcon size={hp(10)} color="black" />
      </Pressable>
    </Pressable>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};
