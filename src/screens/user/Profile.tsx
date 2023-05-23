import { Button, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation ,Route} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useAppContext } from "../../context/AppContext";

interface t{
    name:string
}
const Profile = () => {
  const {setUser} = useAppContext()
  const navigation = useNavigation<any>();
  useLayoutEffect(() => {
    navigation.setOptions({
     headerTitleAlign:"center",
     headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
    }
    });
  }, [navigation]);
  const logout = async () => {
		await SecureStore.deleteItemAsync("user");
		setUser(null);
	};
  return (
    <View>
      <Text>Home</Text>
      	 <Button title="logout" onPress={logout}/>
    </View>
  );
};
export default Profile