import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React from "react";
import { Text } from "react-native";

export const appText = {
    small: hp(2),
    medium: hp(2.6),
    lg: hp(2.8)
}
import PropTypes from 'prop-types'; // Add this line
export const MyText = ({ text, isHeading = false, isSmallMedLg = 'small', txtColor, size, fontWeightt }) => {
    const fontWeight =typeof fontWeightt === "undefined" ? (isHeading ? 'bold' : 'semibold') : fontWeightt;
    const color = typeof txtColor === "undefined" ? (isSmallMedLg === 'lg' ? 'black' : isSmallMedLg === 'med' ? 'black' : '#2A292B') : txtColor;
    const fontSize = typeof size === "undefined" ? (isSmallMedLg === 'lg' ? appText.lg : isSmallMedLg === 'med' ? appText.medium : appText.small) : size;
    
    // Combine the component's own styles with the custom styles passed through the `style` prop
 return   <Text style={{ color , fontWeight ,fontSize}}>
      {text}
    </Text>
}
MyText.propTypes = {
    text: PropTypes.string.isRequired,
    isHeading: PropTypes.bool,
    isSmallMedLg: PropTypes.string,
    txtColor: PropTypes.string,
    size: PropTypes.number,
    fontWeightt: PropTypes.string
};
