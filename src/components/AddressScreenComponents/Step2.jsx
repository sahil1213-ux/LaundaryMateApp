import {View, Text} from 'react-native';
import React from 'react';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {renderDateButtons, renderPickUpTimeOption} from './StepsComp/Step2Comp';

export default function Step2({
  currentDate,
  setSelectedDate,
  selectedDate,
  selectedTime,
  setSelectedTime,
  PickUpTimeOption,
}) {
  return (
    <View className="bg-white p-3 rounded-md space-y-1">
      <View className=" items-center space-x-2 flex-row ">
        <MapPinIcon size={hp(5)} color="black" className="mt-2" />
        <View className=" space-y-1">
          <Text className="font-bold  text-gray-700">Pick up slot</Text>
          <Text className=" font-semibold text-[15] text-black">
            {currentDate.format('MMM YYYY')}
          </Text>
        </View>
      </View>

      <View className="flex-row space-x-3 flex-wrap mt-2 ">
        {renderDateButtons(currentDate, setSelectedDate, selectedDate)}
      </View>
      <Text className="font-semibold text-black">Pickup Time Options</Text>
      <View className="flex-row flex-wrap">
        {renderPickUpTimeOption(
          selectedDate,
          currentDate,
          selectedTime,
          setSelectedTime,
          PickUpTimeOption,
        )}
      </View>
    </View>
  );
}

Step2.propTypes = {
  currentDate: PropTypes.object,
  setSelectedDate: PropTypes.func,
  selectedDate: PropTypes.object,
  selectedTime: PropTypes.object,
  setSelectedTime: PropTypes.func,
  PickUpTimeOption: PropTypes.array,
};
