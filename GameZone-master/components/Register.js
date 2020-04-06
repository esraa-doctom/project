import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import * as firebase from 'firebase'

export default function Register({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const OnSignUp = () => {
        if (password !== passwordConfirm) {
            Alert.alert('Passwords do not match')
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {

            }, (error) => {

                if (email == '' && password == '' && passwordConfirm == '') {
                    Alert.alert('ERROR', 'invalid credential!', [
                        { text: 'DISSMIS' }
                    ]);
                } else {
                    if (error.message == 'The email address is already in use by another account.') {
                        Alert.alert('auth/email-already-in-use', error.message, [
                            { text: 'DISMISS' }
                        ])
                    }else if (error.message == 'The email address is badly formatted.') {
                        Alert.alert('auth/invalid-email', error.message,
                            [{ text: 'Dismiss' }]);
                    } else {
                        Alert.alert('auth/network-request-failed', error.message, [
                            { text: 'DISMISS' }
                        ])
                    }
                }
            })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Register</Text>
            <TextInput placeholder="Email"  
            style={styles.loginFormTextInput} value={email}
             onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder="Password"  
            style={styles.loginFormTextInput} secureTextEntry={true} 
            value={password} onChangeText={(text) => setPassword(text)}/>
            <TextInput placeholder="Password Confirm"  
            style={styles.loginFormTextInput} secureTextEntry={true} value={passwordConfirm} 
            onChangeText={(text) => setPasswordConfirm(text)}/>
            <TouchableOpacity style={styles.loginButton} onPress={() => OnSignUp()}>
                <Text style={styles.btntxt}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton2} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.btntxt}>Login</Text>
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
        marginTop: 50,
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
        marginLeft:150,
      },
      btntxt2: {
        
        color: 'white',
        marginLeft:130,
      },
      loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginRight:20,
        marginLeft:20,
        justifyContent: 'center'
      },
      loginButton2: {
        backgroundColor: 'black',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginRight:20,
        marginLeft:20,
        justifyContent: 'center'
      }
      ,
      loginButton3: {
        backgroundColor: 'red',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginRight:20,
        marginLeft:20,
        justifyContent: 'center'
      }
});
