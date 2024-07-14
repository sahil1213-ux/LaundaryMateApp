import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {SmallText} from '../../utils/AppText';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {PlusCircleIcon} from 'react-native-heroicons/solid';

export default function Step4(total, cart) {
  const containerStyle = 'flex-row justify-between items-center space-x-1';
  return (
    <View>
      <View className="bg-white p-2 rounded-md">
        <View style={{padding: 10}}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>Your Cart</Text>
        </View>

        <View style={{marginHorizontal: 12}}>
          {cart?.map((item, index) => (
            <Pressable
              className="bg-white p-2 rounded-md flex-row justify-between items-center space-x-1"
              key={index}>
              <View>
                <FastImage
                  style={{width: 40, height: 40}}
                  source={{uri: item?.item?.image}}
                />
              </View>

              <View style={{flex: 1}}>
                <Text>{item?.item.name}</Text>
                <Text>{item?.item.price * item?.item.quantity}</Text>
              </View>

              <Pressable>
                <PlusCircleIcon size={24} color="#89CFF0" />
              </Pressable>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="bg-white mt-2 p-2 rounded-br-sm rounded-bl-sm">
        <View className={containerStyle}>
          <SmallText text="Total Amount" />
          <SmallText text="Rs" total />
        </View>

        <View className={containerStyle}>
          <SmallText text="Taxes and Charges" />
          <SmallText text="Promo Code" />
        </View>

        <View className={containerStyle}>
          <SmallText text="Delivery Charges" />
          <SmallText text="Rs 25" />
        </View>

        <View className={containerStyle}>
          <SmallText text="Total Payable" />
          <SmallText text={`Rs ${total + 25}`} />
        </View>
      </View>

      <View className="bg-white mt-2 p-2 rounded-br-sm rounded-bl-sm">
        <View className={containerStyle}>
          <SmallText text="Total Amount" />
          <SmallText text="Rs" total />
        </View>
        <View className={containerStyle}>
          <SmallText text="Taxes and Charges" />
          <SmallText text="Rs 150" />
        </View>

        <View className={containerStyle}>
          <SmallText text="TOTAL PAYABLE" />
          <SmallText text={'Rs ' + total + '25 ' + '150'} />
        </View>
      </View>
    </View>
  );
}
Step4.propTypes = {
  total: PropTypes.number,
  cart: PropTypes.array,
};
