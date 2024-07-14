import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {theme} from '../../../utils/theme';
import moment from 'moment';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const renderDateButtons = (
  currentDate,
  setSelectedDate,
  selectedDate,
) => {
  const next6days = getNext6Days(currentDate);
  return next6days.map(date => (
    <TouchableOpacity
      key={date.format('YYYY-MM-DD')}
      onPress={() => setSelectedDate(date)}
      style={{
        borderColor: date.isSame(selectedDate, 'day') ? 'transparent' : 'black',
        borderWidth: date.isSame(selectedDate, 'day') ? 0 : 1,
        backgroundColor: date.isSame(selectedDate, 'days')
          ? '#0066b2'
          : 'white',
      }}
      className="p-3 rounded-sm">
      <Text
        className="text-center text-sm "
        style={{
          color: date.isSame(selectedDate, 'day')
            ? theme.btnBgColorWhite
            : theme.btnTextColorBlack,
        }}>
        {date.format('DD')}
      </Text>
      <Text
        style={{
          color: date.isSame(selectedDate, 'day')
            ? theme.btnBgColorWhite
            : theme.btnTextColorBlack,
        }}
        className="text-center text-sm text-black">
        {date.format('ddd')}
      </Text>
    </TouchableOpacity>
  ));
};

export const getNext6Days = currentDate => {
  const nextDays = [];
  for (let i = 0; i < 5; i++) {
    const nextDate = moment(currentDate).add(i, 'days');
    nextDays.push(nextDate);
  }
  return nextDays;
};

// const PickUpTimeOption = [
//   {startTime: '6:30 AM', endTime: '9:00 AM'},
//   {startTime: '9:00 AM', endTime: '11:30 AM'},
//   {startTime: '5:30 PM', endTime: '7:30 PM'},
//   {startTime: '7:30 PM', endTime: '10:00 PM'},
// ];
export const renderPickUpTimeOption = (
  selectedDate,
  currentDate,
  selectedTime,
  setSelectedTime,
  PickUpTimeOption,
) => {
  if (selectedDate) {
    const isCurrentDate = selectedDate.isSame(moment(), 'day');
    // const currentTime = moment();

    return PickUpTimeOption.map(options => {
      console.log(options);
      const starTime = moment(
        selectedDate.format('YYYY-MM-DD') + ' ' + options.startTime,
        'YYYY-MM-DD LT',
      );
      // check if the time slot is passed the current time
      const isTimeSlotPassed = isCurrentDate && starTime.isBefore(currentDate);

      const textDeco = isTimeSlotPassed ? 'line-through opacity-50' : 'bg-none';
      const bgColor =
        selectedTime &&
        selectedTime.startTime == options.startTime &&
        selectedTime.endTime == options.endTime;
      return (
        <TouchableOpacity
          key={`${options.startTime}-${options.endTime}`} // Example of using a unique combination of properties
          onPress={() => {
            if (!isTimeSlotPassed) {
              setSelectedTime(options);
            }
          }}
          style={{
            padding: hp(1),
            margin: hp(1),
            backgroundColor: bgColor ? 'blue' : 'white',
          }}
          className={`rounded-sm ` + textDeco}>
          <Text
            className={`text-sm font-semibold tracking-tight ${
              bgColor ? 'text-white' : 'text-black'
            }`}>
            {`${options.startTime} - ${options.endTime}`}
          </Text>
        </TouchableOpacity>
      );
    });
  }
};
