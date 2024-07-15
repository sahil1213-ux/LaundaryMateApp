import React from 'react';
import {TextInput, View, Text} from 'react-native';
import PropTypes from 'prop-types';
export const AddressTextField = ({
  value,
  setValue,
  placeholder,
  headingTxt,
}) => (
  <View className="px-2">
    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{headingTxt}</Text>
    <TextInput
      value={value}
      onChangeText={text => setValue(text)}
      placeholderTextColor="gray"
      className="border-2 border-gray-300 rounded-md"
      placeholder={placeholder}
      style={{color: 'gray'}}
    />
  </View>
);
AddressTextField.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  headingTxt: PropTypes.string,
};
