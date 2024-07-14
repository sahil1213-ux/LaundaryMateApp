import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {MyText} from '../../../utils/sizes_padding_margin';
import {theme} from '../../../utils/theme';
import moment from 'moment';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const renderButtons = (deliveryDate, setDeliveryDate, selectedDate) => {
  const next6days = getNextDays(selectedDate);
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

const getNextDays = selectedDate => {
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

export const renderTimeOptions = (
  PickUpTimeOption,
  selectedDeliveryTime,
  setSelectedDeliveryTime,
) => {
  return PickUpTimeOption.map((options, index) => {
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
