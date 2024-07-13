import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet, // Add this line to import StyleSheet
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {handleSignUp} from '../../firebase/LoginSignUpServices';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://laundrymate.in/assets/images/shared/branding/Logo.webp',
            }}
          />
        </View>
        <Text style={styles.title}>Wash Wizard</Text>
      </View>

      <KeyboardAvoidingView>
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Log in to your Account</Text>
        </View>

        <View>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="email"
              size={windowWidth * 0.06}
              color="white"
              style={styles.inputIcon}
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={'white'}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="lock1"
              size={windowWidth * 0.06}
              color="white"
              style={styles.inputIcon}
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={'white'}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text>Keep me logged in</Text>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </View>

        <View style={styles.spacing} />

        <Pressable onPress={handleSignUp} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            handleSignUp({email, password, setEmail, setPassword, navigation})
          }
          style={styles.signupButton}>
          <Text style={styles.signupButtonText}>
            Don&apos;t have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    height: windowHeight * 0.2,
    backgroundColor: '#FEBE10',
    width: '100%',
  },
  logoContainer: {
    marginTop: windowHeight * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.05,
    resizeMode: 'cover',
  },
  title: {
    marginTop: windowHeight * 0.02,
    textAlign: 'center',
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    color: 'white',
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.05,
    color: '#FEBE10',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: windowWidth * 0.01,
    backgroundColor: '#FEBE10',
    paddingVertical: windowHeight * 0.01,
    borderRadius: windowWidth * 0.01,
    marginTop: windowHeight * 0.03,
  },
  inputIcon: {
    marginLeft: windowWidth * 0.02,
  },
  input: {
    color: 'white',
    width: windowWidth * 0.8,
    marginVertical: windowHeight * 0.01,
    fontSize: windowWidth * 0.04,
  },
  bottomContainer: {
    marginTop: windowHeight * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotPassword: {
    color: '#007FFF',
    fontWeight: '500',
  },
  spacing: {
    marginTop: windowHeight * 0.05,
  },
  loginButton: {
    width: windowWidth * 0.4,
    backgroundColor: '#FEBE10',
    borderRadius: windowWidth * 0.02,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: windowHeight * 0.02,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: 'white',
  },
  signupButton: {
    marginTop: windowHeight * 0.02,
  },
  signupButtonText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.035,
  },
});
