import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {storage} from '../../mmkv';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {handleLogin} from '../../firebase/SignupAndLogin';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {theme} from '../../utils/theme';
import AuthInputs from '../../components/AuthComponents';

// firebase

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const token = storage.getString('auth');
        if (token) {
          navigation.replace('Home');
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView
      className="flex-1 space-y-1"
      style={{backgroundColor: theme.white}}>
      <View
        style={{height: hp(27), backgroundColor: theme.amber, width: '100%'}}>
        <Text
          onPress={() => navigation.push('TabNav')}
          className="self-end my-1 mx-1 text-white sm:text-sm md:text-base">
          Skip
        </Text>
        <View
          className="items-center justify-center"
          style={{
            marginTop: hp(5),
          }}>
          <FastImage
            style={{width: hp(25), height: hp(10), resizeMode: 'cover'}}
            source={{
              uri: 'https://laundrymate.in/assets/images/shared/branding/Logo.webp',
            }}
          />
        </View>
        <Text
          className={`text-center text-amber text-2xl font-bold`}
          style={{
            marginTop: hp(2),
            fontSize: hp(3),
          }}>
          Wash Wizard
        </Text>
      </View>

      <KeyboardAvoidingView className="space-y-2 flex-1 justify-center">
        <View>
          <Text
            className={`text-center text-amber font-bold text-base`}
            style={{
              marginTop: hp(1),
            }}>
            Log in to your Account
          </Text>
        </View>

        <View className="space-y-1">
          <AuthInputs
            value={email}
            setValue={setEmail}
            tag="email"
            placeholder="Enter your email"
          />
          <AuthInputs
            value={password}
            setValue={setPassword}
            tag="password"
            placeholder="enter your password"
          />
        </View>

        <View
          className=" self-end mx-3"
          style={{
            marginTop: hp(2),
          }}>
          <Text style={{color: theme.amber, fontWeight: '500'}}>
            Forgot Password
          </Text>
        </View>

        <Pressable
          onPress={() => handleLogin({email, password})}
          className="rounded-sm bg-yellow-500 ml-auto mr-auto mt-1 "
          style={{
            marginTop: hp(1.3),
            paddingHorizontal: hp(8),
            padding: hp(1.5),
          }}>
          <Text className="text-center text-white font-bold text-sm">
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.replace('SignUp')}
          style={{marginTop: hp(1)}}>
          <Text style={{fontSize: hp(2)}} className="text-center">
            {`Don't have an account? `}
            <Text style={{color: theme.amber}}>Sign up</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
