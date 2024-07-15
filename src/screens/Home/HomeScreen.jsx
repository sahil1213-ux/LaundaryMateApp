import {View, Text, ScrollView, SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import {BellIcon, TruckIcon} from 'react-native-heroicons/outline';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import SpecialCard from '../../components/HomeScreencomponents/SpecialCard';
import HeadingComp from '../../components/HomeScreencomponents/HeadingComp';
import FeaturesCard from '../../components/HomeScreencomponents/FeaturesCard';

export default function HomeScreen() {
  const navigation = useNavigation();
  console.log('nav', navigation);
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <HeadingComp />
        <View
          style={{width: hp(30)}}
          className="flex-row justify-between items-center mx-3 space-x-2 space-y-1">
          <SpecialCard
            info="Enjoy the benefits of Club Ultimate with a subscription of ₹99"
            headingTxt1="Club"
            headingTxt2="Ultimatie"
            btnTxt="Subscribe Now"
          />
          <SpecialCard
            info="Check out the latest offers and discounts on our platform"
            headingTxt1="Latest"
            headingTxt2="Offers"
            onPress={() => navigation.push('Offers')}
            btnTxt="View Offers"
          />
        </View>
        <FeaturesCard
          featureTxt="Affordable Prices"
          featureInfo="Get Our Price List"
        />
        <FeaturesCard
          featureTxt="Services"
          featureInfo="Choose from variety of services"
        />
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
    </SafeAreaView>
  );
}
