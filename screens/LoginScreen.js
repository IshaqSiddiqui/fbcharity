import { StyleSheet, TextInput, View,Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword, } from 'firebase/auth';
import { login } from '../slices/user';
import { selectUser } from '../slices/user';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = useSelector(selectUser);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        if(user){
            navigation.replace('HomeTabs');
        }
    }, [user])

    console.log('user', user);

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = JSON.stringify(userCredential.user);
            dispatch(login(JSON.parse(user)));
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorMessage);
          });
      }

  return (
    <View style={styles.container}>
     <View style={styles.login}>

<View>
  <TextInput
    style={styles.input}
    placeholder='Email'
    onChangeText={(text) => setEmail(text)}
    value={email}
    keyboardType='email-address'
    autoCapitalize='none'
  />
  <TextInput
    style={styles.input}
    placeholder='Password'
    onChangeText={(text) => setPassword(text)}
    value={password}
    secureTextEntry={true}
  />
  <View style={styles.buttonContainer}>
    <Button title='Login' color='maroon' onPress={signIn} />
    <Button title='Signup' color='maroon' onPress={()=>navigation.navigate("Signup")} />
  </View>

</View>

</View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    login: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 40,
        borderColor: '#777',
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent:'center'
      }
})