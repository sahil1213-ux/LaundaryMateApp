import {View, Text} from 'react-native';
import React from 'react';
import {MyText} from '../../utils/sizes_padding_margin';
import {MapPinIcon, PencilSquareIcon} from 'react-native-heroicons/solid';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {renderButtons, renderTimeOptions} from './StepsComp/Step3Comp';

export default function Step3({
  selectedDate,
  selectedTime,
  deliveryDate,
  setDeliveryDate,
  PickUpTimeOption,
  selectedDeliveryTime,
  setSelectedDeliveryTime,
}) {
  return (
    <>
      <View className="bg-white mt-2 p-2 rounded-md">
        <View className="flex-row justify-between items-center space-x-1">
          <View className="flex-row items-center space-x-1">
            <MapPinIcon size={24} color="black" />
            <Text className="font-semibold text-black">Pick up slot</Text>
          </View>
          <View>
            <PencilSquareIcon size={24} color="black" />
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View
            style={{
              padding: hp(1),
              margin: hp(1),
              backgroundColor: '#0066b2',
              width: hp(8),
            }}
            className="rounded-sm items-center ">
            <MyText
              text={selectedDate.format('DD')}
              isHeading={false}
              isSmallMedLg="med"
              txtColor="white"
            />
            <MyText
              text={selectedDate.format('ddd')}
              isHeading={false}
              isSmallMedLg="med"
              txtColor="white"
            />
          </View>

          <View
            style={{padding: hp(1), backgroundColor: '#0066b2'}}
            className="bg-blue-600 flex-row justify-center rounded-md">
            <MyText
              text={`${selectedTime.startTime} - ${selectedTime.endTime}`}
              isSmallMedLg="small"
              txtColor="white"
            />
          </View>
        </View>
      </View>
      <View className="mt-2 bg-white rounded-md p-2 mx-1">
        <View className="flex-row">
          <View className="flex-row space-x-2 flex-wrap">
            {renderButtons(deliveryDate, setDeliveryDate, selectedDate)}
          </View>
        </View>
        <View className="space-y-1">
          <MyText
            text={'Pickup Time Options'}
            isSmallMedLg="small"
            txtColor="black"
            // className=""
          />
          <View className="flex-row flex-wrap space-y-1">
            {renderTimeOptions(
              PickUpTimeOption,
              selectedDeliveryTime,
              setSelectedDeliveryTime,
            )}
          </View>
        </View>
      </View>
    </>
  );
}

Step3.propTypes = {
  selectedDate: PropTypes.object,
  selectedTime: PropTypes.object,
  deliveryDate: PropTypes.object,
  setDeliveryDate: PropTypes.func,
  PickUpTimeOption: PropTypes.array,
  selectedDeliveryTime: PropTypes.object,
  setSelectedDeliveryTime: PropTypes.func,
};
