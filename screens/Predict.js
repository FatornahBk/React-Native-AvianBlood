import React from 'react'
import { Text, View } from 'react-native'
import Navbar from '../components/Navbar'
import TabBar from '../components/TabBar'

const Predict = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
        <TabBar text={"Prediction"} />



        <Navbar />
    </View>
  )
}

export default Predict