import React from 'react'
import { Text, View } from 'react-native'
import Navbar from '../components/Navbar'
import TabBar from '../components/TabBar'

const Profile = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
        <TabBar text={"My Profile"} />

        <Navbar />
    </View>
  )
}

export default Profile