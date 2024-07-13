import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {auth, db} from '../firebase/firbaseConfig';
import {collection, query, getDocs, where} from 'firebase/firestore';
import {
  ArrowLeftIcon,
  Bars3BottomLeftIcon,
  DocumentTextIcon,
  FolderOpenIcon,
} from 'react-native-heroicons/solid';
import FastImage from 'react-native-fast-image';

export default function OrdersScreen() {
  const userUid = auth.currentUser.uid;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // collection reference
        const collectionRef = collection(db, 'orders');

        const ordersQuery = query(
          collectionRef,
          where('userUid', '==', userUid),
        );
        const ordersSnapshot = await getDocs(ordersQuery);

        const orders = [];
        ordersSnapshot.docs.forEach(doc => {
          orders.push({id: doc.id, ...doc.data()});
        });

        if (orders.length > 0) {
          setOrders(orders);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style={{padding: 12, height: 200, backgroundColor: '#FEBE10'}}>
      <View className="flex flex-row items-center justify-between">
        <View>
          <FastImage
            style={{width: 200, height: 50, resizeMode: 'cover'}}
            source={{
              uri: 'https://laundrymate.in/assets/images/shared/branding/Logo.webp',
            }}
          />
        </View>
        {/* <Octicons name="three-bars" size={24} color="white" /> */}
        <Bars3BottomLeftIcon size={24} color="white" />
      </View>

      <View className="flex flex-row items-center justify-between space-y-1">
        <View className="flex items-center justify-center sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-gray-300">
          {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
          <ArrowLeftIcon size={24} color="black" />
        </View>
        <Text>My Orders</Text>
      </View>

      <View>
        {orders?.map((item, index) => (
          <Pressable className="p-2 bg-white rounded-md" key={index}>
            <View className="flex flex-row items-center justify-between p2 bg-blue-500 rounded-tr-sm rounded-tl-sm">
              <View>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
                  Order Detail
                </Text>
                <Text className="text-white font-semibold text-sm">
                  {item?.id}
                </Text>
              </View>

              <View>
                <Text className="text-white font-semibold text-sm">
                  Payment
                </Text>
                <Text className="text-white text-base font-semibold mt-1">
                  Cash on delivery
                </Text>
              </View>
            </View>

            <View className="flex flex-row items-center justify-between bg-white">
              <View>
                <Text className="text-gray-600 ">
                  {item?.address.houseNo} {item?.address.landmark}
                </Text>
                <View style={{marginTop: 10}}>
                  <Text className={`sm:text-sm md:text-lg font-semibold`}>
                    PICK UP
                  </Text>
                  <Text style={{fontSize: 15, marginTop: 4}}>
                    {item?.pickuptime}
                  </Text>
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 13, fontWeight: '600'}}>
                    DELIVERY
                  </Text>
                  <Text style={{fontSize: 15, marginTop: 4}}>
                    {item?.deliveryTime}
                  </Text>
                </View>
                <View style={{marginBottom: 20}} />
              </View>

              <View style={{alignItems: 'center'}}>
                <View className="flex flex-row items-center justify-center w-9 h-9 md:w-11 rounded-full bg-blue-100 mt-2">
                  <DocumentTextIcon size={24} color="black" />
                </View>
                <Text className="text-center to-gray-600 sm:text-sm md:text-lg">
                  Order Summary
                </Text>
                <View className="flex flex-row items-center justify-center w-9 h-9 md:w-11 rounded-full bg-blue-100 mt-2">
                  <FolderOpenIcon size={24} color="black" />
                </View>
                <Text className="text-center to-gray-600 sm:text-sm md:text-lg">
                  FeedBack
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
