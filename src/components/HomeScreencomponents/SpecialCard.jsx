import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {PropTypes} from 'prop-types';
export default function SpecialCard({
  info,
  headingTxt1,
  headingTxt2,
  onPress,
  btnTxt,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        onTouchMove={onPress}
        style={{marginTop: hp(14)}}
        className="bg-white py-3 px-3 rounded-md mr-1">
        <View className="flex-row items-center space-x-1 mx-2">
          <Text className="text-amber text-lg font-bold">{headingTxt1}</Text>
          <Text className="text-blue-600 text-lg font-bold">{headingTxt2}</Text>
        </View>
        <Text>{info}</Text>
        <Text className="text-yellow-400 text-xl">{btnTxt}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
//  Enjoy the benefits of Club Ultimate with a subscription of ₹99
SpecialCard.propTypes = {
  info: PropTypes.string.isRequired,
  headingTxt1: PropTypes.string.isRequired,
  headingTxt2: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  btnTxt: PropTypes.string,
};
