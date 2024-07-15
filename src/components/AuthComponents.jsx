import {View, TextInput} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from 'react-native-heroicons/solid';
export default function AuthInputs({value, setValue, tag, placeholder}) {
  return (
    <View className="flex-row bg-amber-400  rounded-md items-center my-1 mx-3 pl-1">
      {tag === 'email' ? (
        <EnvelopeIcon size={hp(2.8)} className="ml-3" color="white" />
      ) : tag === 'password' ? (
        <LockClosedIcon className=" ml-1" size={hp(2.8)} color="white" />
      ) : (
        <UserIcon className="ml-1" size={hp(2.8)} color="white" />
      )}
      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        placeholder={placeholder}
        placeholderTextColor="white"
        className="text-white"
        cursorColor={'white'}
        secureTextEntry={tag === 'password'}
      />
    </View>
  );
}
AuthInputs.propTypes = {
  value: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
