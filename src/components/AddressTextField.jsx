import React from 'react';
import {TextInput, View, Text} from 'react-native';

export const AddressTextField = (value, setValue, placeholder, headingTxt) => (
  <View style={{marginVertical: 10}}>
    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{headingTxt}</Text>
    <TextInput
      value={value}
      onChangeText={text => setValue(text)}
      placeholderTextColor={'black'}
      className="border-2 border-gray-300 p-2 rounded-md mt-2"
      placeholder={placeholder}
    />
  </View>
);
