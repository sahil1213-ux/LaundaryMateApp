import {View, Text} from 'react-native';
import React from 'react';
import {PlayIcon} from 'react-native-heroicons/solid';
import PropTypes from 'prop-types'; // Add this line
export default function FeaturesCard({featureTxt, featureInfo}) {
  return (
    <View className="flex-row items-center  mx-2 mt-1 z-10">
      <View className="px-4 py-3 rounded-md bg-white">
        <View className="flex-row items-center space-x-1">
          <View>
            <Text className="text-2xl font-bold text-blue-600">
              {featureTxt}
            </Text>
            <Text>{featureInfo}</Text>
          </View>
          <PlayIcon size={24} color="black" />
        </View>
      </View>
    </View>
  );
}

FeaturesCard.propTypes = {
  featureTxt: PropTypes.string.isRequired,
  featureInfo: PropTypes.string.isRequired,
};
