import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {storage} from '../../mmkv';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-vector-icons/Fontisto';
import {AntDesign} from 'react-native-vector-icons/AntDesign';
import {handleLogin} from '../../firebase/LoginSignUpServices';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {theme} from '../../utils/theme';

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
      className="flex-1 items-center"
      style={{backgroundColor: theme.white}}>
      <View
        style={{height: hp(40), backgroundColor: theme.amber, width: '100%'}}>
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
          className="text-center text-2xl font-bold"
          style={{
            marginTop: hp(2),
            fontSize: hp(3),
            color: theme.white,
          }}>
          Wash Wizard
        </Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center font-bold'}}>
          <Text
            style={{
              fontSize: hp(3),
              marginTop: hp(5),
              color: theme.amber,
            }}>
            Log in to your Account
          </Text>
        </View>

        <View>
          <View style={styles.emailContainer}>
            <Icon
              style={{marginLeft: hp(1.3)}}
              name="email"
              size={hp(2.5)}
              color={theme.white}
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.EmailField}
              placeholder="Enter your email"
              placeholderTextColor={theme.white}
            />
          </View>

          <View style={styles.passwordContainer}>
            <AntDesign
              name="lock1"
              size={hp(2.5)}
              color={theme.white}
              style={{marginLeft: hp(1)}}
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.PasswordField}
              placeholder="Enter your password"
              placeholderTextColor={theme.white}
            />
          </View>
        </View>

        <View
          className="flex-row items-center justify-between"
          style={{
            marginTop: hp(2),
          }}>
          <Text>Keep me logged in</Text>
          <Text style={{color: theme.amber, fontWeight: '500'}}>
            Forgot Password
          </Text>
        </View>

        <View style={{marginTop: hp(10)}} />

        <Pressable
          onPress={() => handleLogin({email, password})}
          className="rounded-sm bg-yellow-500 p-4 ml-auto mr-auto"
          style={{
            width: hp(20),
            padding: hp(2),
          }}>
          <Text
            className="text-center text-white font-bold"
            style={{
              fontSize: hp(2),
            }}>
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.replace('SignUp')}
          style={{marginTop: hp(1)}}>
          <Text style={{fontSize: hp(3)}} className="text-center">
            {`Don't have an account? Sign up`}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(1),
    backgroundColor: theme.amber,
    paddingVertical: hp(1),
    borderRadius: 5,
    marginTop: hp(5),
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(1),
    backgroundColor: theme.amber,
    paddingVertical: hp(1),
    borderRadius: 5,
    marginTop: hp(5),
  },
  EmailField: {
    color: theme.white,
    width: hp(20),
    marginVertical: hp(1.5),
    fontSize: hp(3),
  },
  PasswordField: {
    color: theme.white,
    width: hp(20),
    marginVertical: hp(1.5),
    fontSize: hp(3),
  },
});
