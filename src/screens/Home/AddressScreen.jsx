import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MyText} from '../utils/sizes_padding_margin';
import {collection, query, getDocs, addDoc} from 'firebase/firestore';
import {auth} from '../../firebase/firbaseConfig';
import {db} from '../../firebase/firbaseConfig';
import {useDispatch, useSelector} from 'react-redux';
import {FastImage} from 'react-native-fast-image';
import {cleanCart} from '../../redux/CartReducer';
import {PencilSquareIcon, PlusCircleIcon} from 'react-native-heroicons/solid';

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
  const userUid = auth?.currentUser.uid;

  const cart = useSelector(state => state.cart.cart);
  const total = cart
    .map(item => item.item.price * item.item.quantity)
    .reduce((prev, current) => prev + current, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        // first find the user address collection
        const addressCollectionRef = collection(
          db,
          'users',
          userUid,
          'userAddresses',
        );
        // then query the address collection
        const addressQuery = query(addressCollectionRef);

        // then  get the address snapshot
        const addressSnapshot = await getDocs(addressQuery);

        // then map over the address snapshot
        const addresses = [];

        addressSnapshot.forEach(doc => {
          addresses.push({id: doc.id, ...doc.data()});
        });
        setAddresses(addresses);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchAddress();
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
        PlaceOrder();
      }
      return nextStep;
    });
  };

  const PlaceOrder = async () => {
    try {
      // first take collection reference of the user orders
      const ordersCollectionRef = collection(db, 'orders');
      // then add the order to the collection
      const orderDocRef = await addDoc(ordersCollectionRef, {
        userUid: userUid,
        items: {...cart},
        total: total,
        address: selectedAdress,
        pickuptime: `${selectedTime.startTime} - ${selectedTime.endTime}`,
        deliveryTime: `${selectedDeliveryTime.startTime} - ${selectedDeliveryTime.endTime}`,
      });
      if (orderDocRef.id) {
        dispatch(cleanCart());
        console.log('order placed', orderDocRef.id);
        navigation.navigate('Home');
      } else {
        throw new Error('Order not placed');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getNext6Days = () => {
    const nextDays = [];
    for (let i = 0; i < 5; i++) {
      const nextDate = moment(currentDate).add(i, 'days');
      nextDays.push(nextDate);
    }
    return nextDays;
  };

  const renderDateButtons = () => {
    const next6days = getNext6Days();
    return next6days.map(date => (
      <TouchableOpacity
        key={date.format('YYYY-MM-DD')}
        onPress={() => setSelectedDate(date)}
        style={{
          borderColor: date.isSame(selectedDate, 'day')
            ? 'transparent'
            : 'black',
          borderWidth: date.isSame(selectedDate, 'day') ? 0 : 1,
          backgroundColor: date.isSame(selectedDate, 'days')
            ? '#0066b2'
            : 'white',
        }}
        className="p-3 rounded-sm">
        <Text
          className="text-center text-sm "
          style={{
            color: date.isSame(selectedDate, 'day')
              ? theme.btnBgColorWhite
              : theme.btnTextColorBlack,
          }}>
          {date.format('DD')}
        </Text>
        <Text
          style={{
            color: date.isSame(selectedDate, 'day')
              ? theme.btnBgColorWhite
              : theme.btnTextColorBlack,
          }}
          className="text-center text-sm text-black">
          {date.format('ddd')}
        </Text>
      </TouchableOpacity>
    ));
  };

  // below both used in step 2
  const PickUpTimeOption = [
    {startTime: '6:30 AM', endTime: '9:00 AM'},
    {startTime: '9:00 AM', endTime: '11:30 AM'},
    {startTime: '5:30 PM', endTime: '7:30 PM'},
    {startTime: '7:30 PM', endTime: '10:00 PM'},
  ];
  const renderPickUpTimeOption = () => {
    if (selectedDate) {
      const isCurrentDate = selectedDate.isSame(moment(), 'day');
      // const currentTime = moment();

      return PickUpTimeOption.map(options => {
        console.log(options);
        const starTime = moment(
          selectedDate.format('YYYY-MM-DD') + ' ' + options.startTime,
          'YYYY-MM-DD LT',
        );
        // check if the time slot is passed the current time
        const isTimeSlotPassed =
          isCurrentDate && starTime.isBefore(currentDate);

        const textDeco = isTimeSlotPassed
          ? 'line-through opacity-50'
          : 'bg-none';
        const bgColor =
          selectedTime &&
          selectedTime.startTime == options.startTime &&
          selectedTime.endTime == options.endTime;
        return (
          <TouchableOpacity
            key={`${options.startTime}-${options.endTime}`} // Example of using a unique combination of properties
            onPress={() => {
              if (!isTimeSlotPassed) {
                setSelectedTime(options);
              }
            }}
            style={{
              padding: hp(1),
              margin: hp(1),
              backgroundColor: bgColor ? 'blue' : 'white',
            }}
            className={`rounded-sm ` + textDeco}>
            <Text
              className={`text-sm font-semibold tracking-tight ${
                bgColor ? 'text-white' : 'text-black'
              }`}>
              {`${options.startTime} - ${options.endTime}`}
            </Text>
          </TouchableOpacity>
        );
      });
    }
  };

  // below both used in step3
  const getNextDays = () => {
    const nextDays = [];
    let startDate = moment().add(1, 'days');

    if (moment(selectedDate).isSameOrBefore(moment().add(2, 'days'), 'days')) {
      startDate = moment(selectedDate).add(2, 'days');
    }

    for (let i = 0; i < 5; i++) {
      const nextDate = moment(startDate).add(i, 'days');
      nextDays.push(nextDate);
    }

    return nextDays;
  };

  const renderButtons = () => {
    const next6days = getNextDays();
    console.log(next6days, 'next dats');
    return next6days.map((date, index) => {
      console.log(date, 'date');
      return (
        <TouchableOpacity
          style={{
            borderColor: date.isSame(deliveryDate, 'day')
              ? 'transparent'
              : 'black',
            borderWidth: date.isSame(deliveryDate, 'day') ? 0 : 1,
            backgroundColor: date.isSame(deliveryDate, 'days')
              ? '#0066b2'
              : 'white',
            padding: hp(1.5),
          }}
          className="rounded-sm"
          onPress={() => {
            setDeliveryDate(date);
          }}
          key={index}>
          <MyText
            text={date.format('DD')}
            className="text-center"
            isSmallMedLg="small"
            txtColor={
              date.isSame(deliveryDate, 'days')
                ? theme.btnBgColorWhite // Assuming 'white' is a contrasting color to '#0066b2'
                : theme.btnTextColorBlack
            }
          />
          <MyText
            text={date.format('ddd')}
            className="text-center"
            isSmallMedLg="small"
            txtColor={
              date.isSame(deliveryDate, 'days')
                ? theme.btnBgColorWhite // Assuming 'white' is a contrasting color to '#0066b2'
                : theme.btnTextColorBlack
            }
          />
        </TouchableOpacity>
      );
    });
  };

  const renderTimeOptions = () => {
    return PickUpTimeOption.map((options, index) => {
      console.log(options);
      // const starTime = moment(
      //   selectedDate.format('YYYY-MM-DD') + ' ' + options.startTime,
      //   'YYYY-MM-DD LT',
      // );

      const bgColor =
        selectedDeliveryTime &&
        selectedDeliveryTime.startTime == options.startTime &&
        selectedDeliveryTime.endTime == options.endTime;
      return (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedDeliveryTime(options)}
          style={{
            padding: hp(1),
            margin: hp(1),
            backgroundColor: bgColor ? 'blue' : 'white',
          }}>
          <Text
            className={`text-sm font-semibold tracking-tight ${
              bgColor ? 'text-white' : 'text-black'
            }`}>
            {`${options.startTime} - ${options.endTime}`}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const p2 = hp(1);
  const p1 = hp(0.5);
  return (
    <View className="flex-1">
      <View
        style={{padding: p2}}
        className="flex-row items-center justify-between  bg-amber-400">
        <View className="flex-row items-center space-x-1">
          <ArrowLeftIcon size={28} color="black" />
          <Text className="text-lg font-serif text-black">
            Choose Your Address
          </Text>
        </View>
        <XCircleIcon size={28} color="black" />
      </View>
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

      <View style={{backgroundColor: '#F0F8FF'}} className="flex-1 p-2">
        <ScrollView>
          {step === 1 && (
            <View>
              <View>
                {/* Map Over All Addresses */}
                <Pressable
                  onPress={() => navigation.navigate('AddAddress')}
                  className="flex-row items-center space-x-1">
                  <PlusIcon size={28} color="black" />
                  <Text className=" font-bold">Add New Address</Text>
                </Pressable>
              </View>
              <View>
                {addresses?.map((item, index) => (
                  <Pressable
                    onPress={() => setSelectedAdress(item)}
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      marginVertical: 10,
                      borderRadius: 15,
                      borderWidth: selectedAdress === item ? 2 : 1,
                      borderColor: '#0066b2',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <MapPinIcon size={24} color="#0066b2" />
                        <Text style={{fontSize: 17, fontWeight: '500'}}>
                          Home
                        </Text>
                      </View>
                      {/* <FontAwesome name="flag" size={24} color="#0066b2" /> */}
                    </View>

                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 15,
                        fontWeight: '500',
                        width: '95%',
                      }}>
                      {item?.houseNo} {item?.landmark}
                    </Text>
                    <Text
                      style={{
                        marginTop: 6,
                        color: 'gray',
                        fontSize: 15,
                        fontWeight: '500',
                      }}>
                      Bangalore {item?.postalCode}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
          {step === 2 && (
            <View className="bg-white p-3 rounded-md space-y-1">
              <View className=" items-center space-x-2 flex-row ">
                <MapPinIcon size={24} color="black" className="mt-2" />
                <View className=" space-y-1">
                  <Text className="font-bold  text-gray-700">Pick up slot</Text>
                  <Text className=" font-semibold text-[15] text-black">
                    {currentDate.format('MMM YYYY')}
                  </Text>
                </View>
              </View>

              <View className="flex-row space-x-3 flex-wrap mt-2 ">
                {renderDateButtons()}
              </View>
              <Text className="font-semibold text-black">
                Pickup Time Options
              </Text>
              <View className="flex-row flex-wrap">
                {renderPickUpTimeOption()}
              </View>
            </View>
          )}

          {step === 3 && (
            <>
              <View className="bg-white mt-2 p-2 rounded-md">
                <View className="flex-row justify-between items-center space-x-1">
                  <View className="flex-row items-center space-x-1">
                    <MapPinIcon size={24} color="black" />
                    <Text className="font-semibold text-black">
                      Pick up slot
                    </Text>
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
                    {renderButtons()}
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
                    {renderTimeOptions()}
                  </View>
                </View>
              </View>
            </>
          )}
          {step == 4 && (
            <View>
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}>
                <View style={{padding: 10}}>
                  <Text style={{fontSize: 16, fontWeight: '600'}}>
                    Your Cart
                  </Text>
                </View>

                <View style={{marginHorizontal: 12}}>
                  {cart?.map((item, index) => (
                    <Pressable
                      style={{
                        padding: 10,
                        backgroundColor: 'white',
                        marginVertical: 13,
                        flexDirection: 'row',
                        gap: 12,
                        borderRadius: 5,
                      }}
                      key={index}>
                      <View>
                        <FastImage
                          style={{width: 40, height: 40}}
                          source={{uri: item?.item?.image}}
                        />
                      </View>

                      <View style={{flex: 1}}>
                        <Text>{item?.item.name}</Text>
                        <Text>{item?.item.price * item?.item.quantity}</Text>
                      </View>

                      <Pressable>
                        <PlusCircleIcon size={24} color="#89CFF0" />
                      </Pressable>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#0066b2',
                  padding: 10,
                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    Total Amount
                  </Text>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    Rs {total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    Promo Code
                  </Text>
                  <Text style={{color: 'white', fontWeight: '500'}}>Rs 0</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    Delivery Charges
                  </Text>
                  <Text style={{color: 'white', fontWeight: '500'}}>Rs 25</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    Total Payable
                  </Text>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    Rs {total + 25}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#0066b2',
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    TOTAL AMOUNT
                  </Text>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    Rs {total}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    TAXES AND CHARGES
                  </Text>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    Rs 150
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    TOTAL PAYABLE
                  </Text>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    Rs {total + 25 + 150}
                  </Text>
                </View>
              </View>
            </View>
          )}
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
    </View>
  );
}
