import {Pressable} from 'react-native';
import React from 'react';
import {MyText} from '../utils/sizes_padding_margin';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {theme} from '../utils/theme';
import PropTypes from 'prop-types';

export const CategoryCard = ({text, setSelectedOption, selectedOption}) => (
  <Pressable
    style={{
      borderColor:
        selectedOption === text ? theme.bgBlueColor : theme.transparent,
      padding: hp(1.4),
      marginHorizontal: hp(0.3),
      backgroundColor:
        selectedOption === text ? theme.bgBlueColor : theme.white,
    }}
    onPress={() => setSelectedOption(text)}
    className="bg-white justify-center items-center rounded-md border">
    <MyText
      text={text}
      isHeading={true}
      txtColor={selectedOption === text ? 'white' : theme.blackColor}
    />
  </Pressable>
);

CategoryCard.propTypes = {
  text: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  selectedOption: PropTypes.string.isRequired,
};

export const SubCategoryCard = ({text, setOptions, option}) => (
  <Pressable
    style={{
      borderColor: option === text ? theme.blackColor : theme.JubileeGrey,
      paddingHorizontal: hp(1.7),
      paddingVertical: hp(0.4),
      marginEnd: hp(0.64),
      borderWidth: 1,
    }}
    onPress={() => setOptions(text)}
    className="bg-white items-center rounded-full">
    <MyText
      text={text}
      isHeading={true}
      size={hp(2.7)}
      fontWeight={'500'}
      txtColor={option === text ? theme.blackColor : theme.DarkPurpleGrey}
    />
  </Pressable>
);

SubCategoryCard.propTypes = {
  text: PropTypes.string.isRequired,
  setOptions: PropTypes.func.isRequired,
  option: PropTypes.string.isRequired,
};
