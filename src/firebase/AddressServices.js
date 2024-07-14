
import { collection,query,getDocs,  } from 'firebase/firestore';
import { auth, db,  } from './firbaseConfig';

export const fetchAddress = async (setAddresses) => {
    const userUid = auth.currentUser.uid;
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