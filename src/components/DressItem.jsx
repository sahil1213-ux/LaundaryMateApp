import {View, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {PlusIcon} from 'react-native-heroicons/outline';
import {MyText} from '../utils/sizes_padding_margin';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/CartReducer';
import PropTypes from 'prop-types';
import AddComponent from './AddComponent';
import {theme} from '../utils/theme';

export default function DressItem({item, selectedOption, key}) {
  const dispatch = useDispatch();

  //   step 7
  const cart = useSelector(state => state.cart.cart);

  return (
    <View>
      <Pressable
        key={key}
        className="flex-row items-center"
        style={styles.container}>
        <View>
          <FastImage
            style={{width: hp(6.5), height: hp(6.5)}}
            source={{uri: item.image}}
          />
        </View>
        <View style={{flex: 1}}>
          <MyText text={item.name} size={hp(1.875)} fontWeightt={'500'} />
          <MyText
            text={
              'Rs ' +
              (selectedOption === 'Wash + Iron'
                ? item.price + 20
                : selectedOption === 'Stream Iron'
                ? item.price + 35
                : selectedOption === 'Dry Clean'
                ? item.price + 45
                : item.price)
            }
          />
        </View>
        {cart.some(c => c.item.id === item.id) ? (
          <AddComponent item={item} cart={cart} />
        ) : (
          <Pressable
            style={styles.addToCart}
            onPress={() => {
              dispatch(addToCart({item, category: selectedOption}));
            }}>
            <PlusIcon size={hp(3)} color="#89CFF0" />
          </Pressable>
        )}
      </Pressable>
    </View>
  );
}

DressItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectedOption: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

const styles = {
  container: {
    padding: hp(1),
    gap: hp(1.5),
    marginVertical: hp(1.5),
    backgroundColor: theme.white,
  },
  addToCart: {
    padding: hp(1),
    gap: hp(1.5),
    marginVertical: hp(1.5),
    borderRadius: 5,
  },
};
