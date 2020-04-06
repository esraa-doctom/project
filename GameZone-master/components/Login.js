import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase'
import { withOrientation } from 'react-navigation';

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const OnLoginPress = () => {
   
      firebase.auth().signInWithEmailAndPassword(email, password)

        .then(() => {

        }, (error) => {
          if (email == '' && password == '') {
            Alert.alert('ERROR', 'invalid credential!', [
              { text: 'DISSMIS' }
            ]);
          } else {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              if (error.message == 'The email address is badly formatted.') {
                Alert.alert('auth/invalid-email', error.message,
                  [{ text: 'Dismiss' }]);
              } else if (error.message == 'The password is invalid or the user does not have a password.') {
                Alert.alert('auth/wrong-password', error.message,
                  [{ text: 'Dismiss' }]);
              } else if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                Alert.alert('auth/user-not-found', error.message,
                  [{ text: 'Dismiss' }]);
              } else {
                Alert.alert('auth/network-request-failed', error.message, [
                  { text: 'DISMISS' }
                ])
              }
            }, 200)
          }

        })
    
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>




      <View style={styles.loginScreenContainer}>
        <View style={styles.loginFormView}>
          {loading ? <ActivityIndicator size="large" style={styles.re} /> :
            <View>
              <Text style={styles.logoText}>Login</Text>
              <TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} value={email} onChangeText={(text) => setEmail(text)} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />



              <TouchableOpacity style={styles.loginButton} onPress={() => OnLoginPress()}>
                <Text style={styles.btntxt}>LOGIN</Text>
              </TouchableOpacity>
            </View>}
          <TouchableOpacity style={styles.loginButton2} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.btntxt}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton3} onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.btntxt2}>Forget Password</Text>
          </TouchableOpacity>

        </View>
      </View>

    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,

  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,

  },
  btntxt: {

    color: 'white',
    marginLeft: 150,
  },
  re: {
    marginTop: 250
  },
  btntxt2: {

    color: 'white',
    marginLeft: 130,
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center'
  },
  loginButton2: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center'
  }
  ,
  loginButton3: {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center'
  }
});
