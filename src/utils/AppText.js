import { View, Text } from 'react-native'
import React from 'react'

export function SmallText(text) {
  return (
    <View>
      <Text className = "font-semibold text-white sm:text-sm md:text-base">{text}</Text>
    </View>
  )
}