import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppContext } from '../context/AppContext';
import * as SecureStore from "expo-secure-store";
const OfficerNavigation = () => {
  const {user} = useAppContext();
  const appContext = useAppContext();
  const logout=async()=>{
    await SecureStore.deleteItemAsync("user");
    appContext.setUser(null)
  }
  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>
          <Button title="logout" onPress={logout}/>
    </View>
  )
}

export default OfficerNavigation

const styles = StyleSheet.create({})