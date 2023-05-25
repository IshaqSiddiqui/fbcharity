import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, TextInp } from 'react'
import { useNavigation } from '@react-navigation/native';
import { logout, selectUser } from '../slices/user';
import { useSelector, useDispatch } from 'react-redux';
import { data } from '../data';

const HomeScreen = () => {

    const user = useSelector(selectUser);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({ title: 'Home' })
    }, [])

    useEffect(() => {
        if (!user) {
            navigation.replace('Login');
        }
    }, [user])

    console.log('user', user);

    const signOut = () => {
        dispatch(logout())
        navigation.replace('Login');
    }

    return (
        <View style={styles.container}>

            <Button style={styles.button} title='Logout' onPress={signOut} />

            <Text style={styles.texter}>Email: {user?.email}</Text>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({});