import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

export default function Loading() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Progress.Bar progress={0.5} width={200} />
    </View>
  );
}
