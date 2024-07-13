import {Text, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';

import {addDoc, collection} from 'firebase/firestore';
import {auth, db} from '../../firebase/firbaseConfig';
import {useNavigation} from '@react-navigation/native';
import {AddressTextField} from '../../components/AddressTextField';

const add = () => {
  const [name, setName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const userUid = auth?.currentUser.uid;

  const navigation = useNavigation();

  const addAddress = async () => {
    try {
      const addressCollectionRef = collection(
        db,
        'users',
        userUid,
        'userAddresses',
      );

      const addresssDocRef = await addDoc(addressCollectionRef, {
        name: name,
        houseNo: houseNo,
        landmark: landmark,
        postalCode: postalCode,
      });

      console.log('address added ', addresssDocRef.id);
      navigation.replace('Address');
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <AddressTextField
        value={name}
        setValue={setName}
        placeholder="Name"
        headingTxt="Name"
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

      <Pressable
        onPress={addAddress}
        className="bg-yellow-500 p-4 rounded-sm items-center justify-center sm: mt-3 md:mt-5">
        <Text>Add Address</Text>
      </Pressable>
    </ScrollView>
  );
};

export default add;
