import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo, AntDesign, FontAwesome,MaterialIcons } from "@expo/vector-icons";
import HomeButton from "../../components/HomeButton";
import { Button } from "react-native-paper";

const ButtonsList = () => {
	return (
		<View style={styles.buttonsContainer}>
			<HomeButton title="Park Now" target="Map">
				<Entypo name="location-pin" size={60} color="#4169e1" />
			</HomeButton>

			<HomeButton title="Add Car"target="AddCar">
				<Entypo name="plus" size={60} color="#4169e1" />
			</HomeButton>

			<HomeButton title="Add Balance" target="AddBalance">
				<FontAwesome name="money" size={60} color="#4169e1" />
			</HomeButton>

			<HomeButton title="History" target="History">
            <MaterialIcons name="history" size={60} color="#4169e1" />
			</HomeButton>
		</View>
	);
};

export default ButtonsList;

const styles = StyleSheet.create({
	buttonsContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: 7,
		marginTop: 10,
	},
});
