import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const PaymentScreen = () => {

    const route = useRoute();

    const {amount} = route.params;

  return (
    <View>
      <Text>Donation Amount : {amount}</Text>
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({})