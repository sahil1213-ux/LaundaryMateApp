import {
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  Bars3BottomLeftIcon,
  BellIcon,
  InformationCircleIcon,
  MagnifyingGlassCircleIcon,
  TruckIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {PlayIcon} from 'react-native-heroicons/solid';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  console.log('nav', navigation);
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
        <View className="h-48 bg-amber-400">
          <View className="flex-row justify-between items-center mx-2 mt-5">
            <Bars3BottomLeftIcon size={28} color="black" />
            <Text className="text-2xl font-serif text-black">
              Laundary Mate
            </Text>
            <UserIcon size={28} color="black" />
          </View>
          <View>
            <View className=" mx-1 ">
              <Text
                style={{fontFamily: 'kohinoorTelugu-Medium'}}
                className="text-xl  tracking-tight font-mono">
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
                <View className="flex-row items-center">
                  <InformationCircleIcon size={24} color="black" />
                  <Text>QUICK HELP</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{width: hp(30)}}
          className="flex-row justify-between items-center mx-3 space-x-2">
          <View
            style={{marginTop: hp(14)}}
            className="bg-white py-3 px-3 rounded-md">
            <View className="flex-row items-center space-x-1 mx-2">
              <Text className="text-amber-300 text-lg font-bold">Club</Text>
              <Text className="text-blue-600 text-lg font-bold">Ultimate</Text>
            </View>
            <Text>
              Enjoy the benefits of Club Ultimate with a subscription of ₹99
            </Text>
            <Text className="text-yellow-400 text-xl">Subscribe Now</Text>
          </View>
          <View
            style={{marginTop: hp(14)}}
            className="bg-white py-3 px-3 rounded-md">
            <View className="flex-row items-center space-x-1 mx-2">
              <Text className="text-amber-300 text-lg font-bold">Latest</Text>
              <Text className="text-blue-600 text-lg font-bold">Offers</Text>
            </View>
            <Text>
              Check out the latest offers and discounts on our services
            </Text>
            <Text className="text-yellow-400 text-xl">Check Out</Text>
          </View>
        </View>
        <View className="flex-row items-center  mx-2 my-2">
          <View className="px-4 py-3 rounded-md bg-white">
            <View className="flex-row items-center space-x-1">
              <View>
                <Text className="text-2xl font-bold text-blue-600">
                  Services
                </Text>
                <Text>Choose from a variety of services</Text>
              </View>
              <PlayIcon size={24} color="black" />
            </View>
          </View>
        </View>
        <View className="flex-row items-center  mx-2 my-2">
          <View className="px-4 py-3 rounded-md bg-white">
            <View className="flex-row items-center space-x-1">
              <View>
                <Text className="text-2xl font-bold text-blue-600">
                  Affordable Prices
                </Text>
                <Text>Get Our Price List</Text>
              </View>
              <PlayIcon size={24} color="black" />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        className="flex-row space-x-1"
        style={{
          padding: 15,
          backgroundColor: 'white',
          marginHorizontal: 20, // Adjusted for better positioning
          borderRadius: 10,
          position: 'absolute',
          top: 130, // You might need to adjust this based on your layout
          left: '5%',
          // transform: [{translateX: -170}], // Adjust if necessary
          width: hp(45), // Ensure there's enough width
          // zIndex: 1000, // Ensure it's on top of other elements
        }}>
        <BellIcon size={24} color="black" />
        <View>
          <Text
            className="font-medium text-blue-400"
            style={{fontFamily: 'Kailasa-Bold'}}>
            QUICK ORDER
          </Text>
          <Text>Book a pickup and a delivery option</Text>
          <Text>We Will be at your doorstep on time.</Text>
          <View className="flex-row justify-between mt-2">
            <Pressable
              className="px-3 py-2 rounded-md my-1 bg-amber-400"
              onPress={() => navigation.push('Address')}>
              <Text>Book Now</Text>
            </Pressable>
            <TruckIcon size={28} color="black" />
          </View>
        </View>
      </View>

      <MagnifyingGlassCircleIcon
        size={60}
        color="black"
        style={{
          position: 'absolute',
          bottom: hp('2%'), // Using hp for responsive design
          right: 6, // Adjust as needed
        }}
      />
    </SafeAreaView>
  );
}
