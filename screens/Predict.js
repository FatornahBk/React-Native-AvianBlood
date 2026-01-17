import React from 'react'
import { Text, View } from 'react-native'
import Navbar from '../components/Navbar'
import HeaderBar from '../components/HeaderBar'

const Predict = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>

        <HeaderBar title={"Prediction"} />



        <Navbar />
    </View>
  )
}

export default Predict