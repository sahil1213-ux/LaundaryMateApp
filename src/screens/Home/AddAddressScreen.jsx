import {Text, Pressable, View, SafeAreaView, Alert} from 'react-native';
import React, {useState} from 'react';

import {addDoc, collection} from 'firebase/firestore';
import {auth, db} from '../../firebase/firbaseConfig';
import {useNavigation} from '@react-navigation/native';
import {AddressTextField} from '../../components/AddressTextField';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from '../../utils/loading';

const Add = () => {
  const [city, setCity] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const userUid = auth.currentUser?.uid || '';

  const navigation = useNavigation();

  const AddAddress = async () => {
    setLoading(true);
    try {
      const addressCollectionRef = collection(
        db,
        'users',
        userUid,
        'userAddresses',
      );

      const addresssDocRef = await addDoc(addressCollectionRef, {
        name: city,
        houseNo: houseNo,
        landmark: landmark,
        postalCode: postalCode,
      });

      console.log('address added ', addresssDocRef.id);
      navigation.replace('Address');
      Alert.alert('Address Added');
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="bg-white flex-1">
      <View style={{marginTop: hp(2.8)}}>
        <AddressTextField
          value={city}
          setValue={setCity}
          placeholder="City"
          headingTxt="City"
        />

        <AddressTextField
          value={houseNo}
          setValue={setHouseNo}
          placeholder="House No"
          headingTxt="House No"
        />
        <AddressTextField
          value={landmark}
          setValue={setLandmark}
          placeholder="Landmark"
          headingTxt="Landmark"
        />

        <AddressTextField
          value={postalCode}
          setValue={setPostalCode}
          placeholder="Postal Code"
          headingTxt="Postal Code"
        />

        {loading ? (
          <Loading />
        ) : (
          <Pressable
            onPress={AddAddress}
            className="bg-yellow-500 p-4 rounded-md items-center justify-center sm: mt-1 md:mt-2 mx-auto">
            <Text className="text-black">Add Address</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Add;
