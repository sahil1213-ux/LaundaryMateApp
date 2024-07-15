import {View, Text, Pressable, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ArrowLeftIcon, XCircleIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Step1 from '../../components/AddressScreenComponents/Step1';
import Step2 from '../../components/AddressScreenComponents/Step2';
import {fetchAddress} from '../../firebase/AddressServices';
import {PlaceOrder} from '../../firebase/OrderServices';
import Step3 from '../../components/AddressScreenComponents/Step3';
import HeaderComp from '../../components/AddressScreenComponents/HeaderComp';
import Step4 from '../../components/AddressScreenComponents/Step4';
import {theme} from '../../utils/theme';

export default function AddressScreen() {
  const [step, setStep] = useState(1);
  const [currentDate] = useState(moment());
  const [deliveryDate, setDeliveryDate] = useState(moment());
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment());
  const [addresses, setAddresses] = useState([]);
  const [selectedAdress, setSelectedAdress] = useState(null);
  const navigation = useNavigation();

  const cart = useSelector(state => state.cart.cart);
  const total = cart
    .map(item => item.item.price * item.item.quantity)
    .reduce((prev, current) => prev + current, 0);

  useEffect(() => {
    fetchAddress(setAddresses);
  }, []);

  const HandleBack = () => {
    setStep(prevStep => (prevStep > 1 ? prevStep - 1 : prevStep));
    console.log('Back Step', step);
  };
  const HandleNext = () => {
    setStep(prevStep => {
      const nextStep = prevStep + 1;
      console.log('Next Step', nextStep);
      if (nextStep == 5) {
        // call the place order api
        PlaceOrder(
          total,
          cart,
          selectedAdress,
          selectedTime,
          selectedDeliveryTime,
        );
      }
      return nextStep;
    });
  };

  // below both used in step 2
  const PickUpTimeOption = [
    {startTime: '6:30 AM', endTime: '9:00 AM'},
    {startTime: '9:00 AM', endTime: '11:30 AM'},
    {startTime: '5:30 PM', endTime: '7:30 PM'},
    {startTime: '7:30 PM', endTime: '10:00 PM'},
  ];

  return (
    <SafeAreaView className="flex-1">
      <View
        style={{padding: hp(1)}}
        className="flex-row items-center justify-between  bg-amber-400">
        <View className="flex-row items-center space-x-1">
          <ArrowLeftIcon size={28} color="black" />
          <Text className="text-lg font-serif text-black">
            Choose Your Address
          </Text>
        </View>
        <XCircleIcon size={28} color="black" />
      </View>
      <HeaderComp />

      <View style={{backgroundColor: '#F0F8FF'}} className="flex-1 p-2">
        <ScrollView>
          {step === 1 && (
            <Step1
              addresses={addresses}
              setSelectedAdress={setSelectedAdress}
              selectedAdress={selectedAdress}
              navigation={navigation}
            />
          )}
          {step === 2 && (
            <Step2
              currentDate={currentDate}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              PickUpTimeOption={PickUpTimeOption}
            />
          )}

          {step === 3 && (
            <Step3
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              deliveryDate={deliveryDate}
              setDeliveryDate={setDeliveryDate}
              PickUpTimeOption={PickUpTimeOption}
              selectedDeliveryTime={selectedDeliveryTime}
              setSelectedDeliveryTime={setSelectedDeliveryTime}
            />
          )}
          {step == 4 && <Step4 total={total} cart={cart} />}
        </ScrollView>
      </View>

      <View className="bg-white p-3 flex-row items-center  mt-auto mx-2 space-x-1">
        <Pressable
          disabled={step == 1}
          onPress={HandleBack}
          style={{backgroundColor: theme.btnBgColorWhite, padding: hp(2)}}
          className=" rounded-md flex-1">
          <Text className="text-center text-black">Back</Text>
        </Pressable>
        <Pressable
          onPress={HandleNext}
          style={{backgroundColor: theme.btnBgColorBlue, padding: hp(2)}}
          className="rounded-md flex-1">
          <Text className="text-center text-white">
            {step === 4 ? 'Place Order' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
