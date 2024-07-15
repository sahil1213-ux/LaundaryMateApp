import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  ArrowLeftIcon,
  MagnifyingGlassCircleIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/outline';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../utils/theme';
import {houseData, kidsData, menData, womenData} from '../../constants';
import DressItem from '../../components/DressItem';
import {CategoryCard, SubCategoryCard} from '../../components/BasketComp';
import {MyText} from '../../utils/sizes_padding_margin';
import {useSelector} from 'react-redux';

export default function SelectScreen() {
  const [option, setOption] = useState('Men');
  const [selectedOption, setSelectedOption] = useState('Wash + fold');
  const cart = useSelector(state => state.cart.cart);
  const [cat] = useState([
    'Wash + fold',
    'Wash + Iron',
    'Stream + Iron',
    'Dry Clean',
  ]);
  const [subCat] = useState(['Men', 'Women', 'Kids', 'Households']);

  const navigation = useNavigation();
  const total = cart
    .map(item => item.item.price * item.item.quantity)
    .reduce((prev, current) => prev + current, 0);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: '#FEBE10',
            paddingTop: hp(3),
            padding: hp(1),
          }}
          className="flex-row items-center justify-between">
          <View className=" mx-1">
            <View
              style={{margin: hp(1)}}
              className="flex-row space-x-2 items-center ">
              <Pressable
                style={{padding: hp(0.4)}}
                className=" justify-center items-center to-gray-500 mr-1.5 ">
                <ArrowLeftIcon size={hp(4)} color={theme.blackColor} />
              </Pressable>
              <MyText
                text="Our Laundray list"
                isHeading={true}
                txtColor={theme.blackColor}
                size={hp(2.8)}
              />
            </View>
          </View>
          <View className="flex-row items-center space-x-1">
            <MagnifyingGlassCircleIcon
              size={hp(5.4)}
              color={theme.blackColor}
            />
            {/* <Bars3CenterLeftIcon size={24} color="#0066b2" /> */}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            backgroundColor: '#FEBE10',
            paddingVertical: hp(1),
          }}>
          {cat.map((item, index) => (
            <CategoryCard
              key={index}
              text={item}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
            />
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal
          style={{padding: hp(1), marginHorizontal: hp(1)}}>
          {subCat.map((item, index) => (
            <SubCategoryCard
              key={index}
              text={item}
              setOptions={setOption}
              option={option}
            />
          ))}
        </ScrollView>
        <View style={{marginHorizontal: hp(1)}}>
          {option === 'Men' && (
            <View>
              {menData.map(item => (
                <DressItem
                  key={item.id}
                  item={item}
                  selectedOption={selectedOption}
                />
              ))}
            </View>
          )}
          {option === 'Women' && (
            <View>
              {womenData.map(item => (
                <DressItem
                  key={item.id}
                  item={item}
                  selectedOption={selectedOption}
                />
              ))}
            </View>
          )}
          {option === 'Kids' && (
            <View>
              {kidsData.map(item => (
                <DressItem
                  key={item.id}
                  item={item}
                  selectedOption={selectedOption}
                />
              ))}
            </View>
          )}
          {option === 'Households' && (
            <View>
              {houseData.map(item => (
                <DressItem
                  key={item.id}
                  item={item}
                  selectedOption={selectedOption}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      {cart.length > 0 && (
        <Pressable style={{backgroundColor: '#E0E0E0', padding: hp(1)}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: hp(3)}}>
            <View
              style={{
                width: hp(3),
                height: hp(3),
                borderRadius: 15,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ShoppingBagIcon size={20} color="black" />
            </View>

            <View style={{flex: 1}}>
              <Text style={{fontSize: 13, fontWeight: '500'}}>
                Basket Total Rs {total}
              </Text>
              <Text style={{fontSize: 13, fontWeight: '500', marginTop: 3}}>
                You have {cart.length} items saved in your basket
              </Text>
            </View>

            <Pressable
              onPress={() => navigation.navigate('Basket')}
              style={{padding: 10, backgroundColor: 'white', borderRadius: 4}}>
              <Text>View</Text>
            </Pressable>
          </View>
        </Pressable>
      )}
    </>
  );
}
