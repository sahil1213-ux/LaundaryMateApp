import {View, Text} from 'react-native';
import React from 'react';
import {Bars3BottomLeftIcon} from 'react-native-heroicons/solid';
import {
  UserCircleIcon,
  InformationCircleIcon,
} from 'react-native-heroicons/outline';

export default function HeadingComp() {
  return (
    <View className="h-48 bg-amber-400">
      <View className="flex-row justify-between items-center mx-2">
        <Bars3BottomLeftIcon size={28} color="black" />
        <Text className="text-2xl font-serif text-black">Laundary Mate</Text>
        <UserCircleIcon size={28} color="black" />
      </View>
      <View>
        <View className=" mx-1 ">
          <Text
            style={{fontFamily: 'kohinoorTelugu-Medium'}}
            className="  tracking-tight font-mono text-black text-base">
            Hi Sahil
          </Text>
          <View className="flex-row justify-between items-center mr-2">
            <Text
              style={{
                fontFamily: 'kohinoorTelugu-Medium',
                color: '#ffffff',
              }}
              className="font-semibold text-lg">
              Home | New Delhi - 110018
            </Text>
            <View className="flex-row items-center space-x-1">
              <InformationCircleIcon size={24} color="black" />
              <View className="items-center">
                <Text className="tracking-tight font-mono text-black text-base opacity-80">
                  QUICK
                </Text>
                <Text className="tracking-tight font-mono text-black text-base opacity-80">
                  HELP
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
