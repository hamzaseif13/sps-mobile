import { Button, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import HomeHeader from "../../components/HomeHeader";
import HomeButton from "../../components/HomeButton";
import ButtonsList from "../../screensComponents/officer-home/ButtonsList";
import { useAppContext } from "../../context/AppContext";
import * as SecureStore from "expo-secure-store";
import RecentSession from "../../screensComponents/customer-home/RecentSession";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodaySchedule from "../../screensComponents/officer-home/TodaySchedule";
import { SafeAreaView } from "react-native-safe-area-context";
import { getJwtToken } from "../../helpers";

const Home = () => {
	const navigation = useNavigation<any>();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);
	const { user, setUser } = useAppContext();

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: -1 }}>
				<HomeHeader
					firstName={user?.firstName!}
					secondName={user?.lastName!}
					profilePicture="skd"
				/>
				<ButtonsList />
			</View>
			<TodaySchedule />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 20,
		flex: 1,
	},
});
export default Home;
