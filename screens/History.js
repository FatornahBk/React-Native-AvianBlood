import React from 'react'
import { Text, View } from 'react-native'
import Navbar from '../components/Navbar'
import TabBar from '../components/TabBar'

const History = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
        <TabBar text={"History"} />


        <Navbar />
    </View>
  )
}

export default History