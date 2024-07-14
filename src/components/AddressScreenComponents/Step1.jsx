import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {PlusIcon, MapPinIcon} from 'react-native-heroicons/solid';
import PropTypes from 'prop-types';
export default function Step1({
  addresses,
  setSelectedAdress,
  selectedAdress,
  navigation,
}) {
  const textStyle = 'font-semibold text-base w-[95%] mt-2';
  return (
    <View>
      <View>
        {/* Map Over All Addresses */}
        <Pressable
          onPress={() => navigation.navigate('AddAddress')}
          className="flex-row items-center space-x-1">
          <PlusIcon size={28} color="black" />
          <Text className="font-bold">Add New Address</Text>
        </Pressable>
      </View>
      <View>
        {addresses?.map((item, index) => {
          const borderColor = selectedAdress === item ? '#0066b2 ' : '#d1d1d1 ';
          const borderStyle =
            selectedAdress === item ? 'border-2 ' : 'border-1 ';
          return (
            <Pressable
              onPress={() => setSelectedAdress(item)}
              key={index}
              className={`${borderStyle} ${borderColor} bg-white p-2 rounded-lg mt-2`}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-2">
                  <MapPinIcon size={24} color="#0066b2" />
                  <Text style={{fontSize: 17, fontWeight: '500'}}>Home</Text>
                </View>
              </View>

              <Text className={textStyle}>
                {item?.houseNo} {item?.landmark}
              </Text>
              <Text className={textStyle}>Bangalore {item?.postalCode}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
Step1.propTypes = {
  addresses: PropTypes.array,
  setSelectedAdress: PropTypes.func,
  selectedAdress: PropTypes.object,
  navigation: PropTypes.object,
};
