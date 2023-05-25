
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from './slices/user';
import SignUp from './screens/Signup';

export default function Form() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        Alert.alert('User account created & signed in!');
        const user = JSON.stringify(userCredential.user);
        dispatch(login(JSON.parse(user)));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  }
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
          <Button title='Signup' color='maroon' onPress={signup} />
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});

