import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const DonateScreen = () => {
    const navigation = useNavigation()
    const [donateAmt, setDonateAmt] = useState(10);

    const inc = () => {
        setDonateAmt(Number(donateAmt) + 1)
    }

    const dec = () => {
        if (donateAmt > 1) {
            setDonateAmt(Number(donateAmt) - 1)
        }
    }

    const donate = () => {
        console.log('donate');
        navigation.push('Payment',{
            amount:donateAmt
        })
    }

    console.log('donateAmt', donateAmt);

    return (
        <View>
            <Text>DonateScreen</Text>
            <TextInput
                style={styles.input}
                value={String(donateAmt)}
                onChangeText={(text) => setDonateAmt(Number(text))}
                keyboardType='numeric'
            />
            <Button title="Inc" onPress={inc} />
            <Button title="Dec" onPress={dec} />
            <Button title="Donate" onPress={donate} />
        </View>
    )
}

export default DonateScreen

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        padding: 20,
        fontSize: 20,
        color: "#000"
    }
})