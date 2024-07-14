import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './firbaseConfig';
import { useDispatch } from 'react-redux';
import { cleanCart } from '../redux/CartReducer';

export  const PlaceOrder = async (total,cart, selectedAdress,selectedTime,selectedDeliveryTime) => {
    const userUid = auth.currentUser.uid;
    const dispatch = useDispatch();
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