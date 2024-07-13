import {View, Pressable} from 'react-native';
import React from 'react';
import {MyText} from '../utils/sizes_padding_margin';
// import {theme} from '../utils/theme';

import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {theme} from '../../utils/theme';
export default function BasketScreen() {
  const navigation = useNavigation();
  // step 4 useSelector
  // const cart = useSelector(state => state.cart.cart);
  return (
    <View>
      <View
        className={`bg-${theme.bgColor} p-${hp(
          2,
        )} flex-row items-center justify-between`}>
        <MyText
          text={'Basket Total'}
          className={`text-${theme.white}`}
          isHeading={true}
        />
        <View>
          <MyText text="Rs 0" className={`text-${theme.white}`} />
          <MyText text="For 0 Items" className={`text-${theme.white}`} />
        </View>
      </View>

      <View className="p-1 justify-center items-center bg-white rounded-sm sm:mx-0.5 md:m- mx-1 h-48">
        <MyText isSmallMedLg="small" text="YOUR BASKET IS EMPTY" />
      </View>
      {/* Responsive Pressable Button */}
      <Pressable
        onPress={() => navigation.push('Select')}
        className={`bg-${theme.bgColor} mt-2 justify-center items-center py-5 w-36 self-center rounded-md md:w-48`}>
        <MyText
          text="Place an Order"
          className={`text-${theme.white} text-sm md:text-base`}
          style={{letterSpacing: 0.4}}
          isSmallMedLg="small"
          size={hp(3)}
        />
      </Pressable>
    </View>
  );
}
