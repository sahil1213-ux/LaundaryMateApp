import {View} from 'react-native';
import React from 'react';
import {
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from 'react-native-heroicons/solid';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function HeaderComp() {
  const p2 = hp(1);
  const p1 = hp(0.5);
  return (
    <View
      style={{padding: p2}}
      className="flex-row justify-center items-center bg-white space-x-2">
      <View style={{padding: p1}} className="bg-green-600 rounded-full ">
        <ArrowLeftIcon size={28} color="white" />
      </View>

      <View style={{padding: p2}} className="bg-gray-300 p-2 rounded-full">
        <MapPinIcon size={28} color="blue" />
      </View>
      <View style={{padding: p2}} className="bg-gray-300 p-2 rounded-full">
        <ClockIcon size={28} color="blue" />
      </View>

      <View className="bg-green-600 rounded-full p-1">
        <QuestionMarkCircleIcon size={28} color="white" />
      </View>
    </View>
  );
}
