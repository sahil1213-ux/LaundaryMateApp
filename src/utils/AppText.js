import { View, Text } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
export function SmallText({text, color = 'text-white', styles}) {
  return (
    <View>
      <Text className = {`font-semibold ${color} sm:text-sm md:text-base`} {...styles}>{text}</Text>
    </View>
  )
}
SmallText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  styles: PropTypes.object
}