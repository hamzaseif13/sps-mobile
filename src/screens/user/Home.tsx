import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import HomeHeader from "../../components/HomeHeader";
import HomeButton from "../../components/HomeButton";
import ButtonsList from "../../screensComponents/customer-home/ButtonsList";
import { useAppContext } from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
import RecentSession from "../../screensComponents/customer-home/RecentSession";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "./Map";
import { getJwtToken } from "../../helpers";
const Home = () => {
	const navigation = useNavigation<any>();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);
	const {user,setUser} = useAppContext();
	return (
		<CustomSafeAreaView>
			
			<View style={styles.container}>
			
				<HomeHeader firstName={user?.firstName!} secondName={user?.lastName!} profilePicture="skd" />
				<ButtonsList />
				<RecentSession />
			</View>
		</CustomSafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
	},
});
export default Home;
