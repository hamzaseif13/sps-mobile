import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-paper";
const TodaySchedule = () => {
	const arr = [1, 2, 3, 5];
	const handleOpenMaps = () => {
		const latitude = 37.7749; // Replace with your desired latitude
		const longitude = -122.4194; // Replace with your desired longitude
	
		const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
	
		Linking.openURL(url);
	  };
	return (
		<View style={styles.container}>
			<Text style={{ fontWeight: "bold", fontSize: 20 }}>TodaySchedule</Text>
			<Text style={{ marginTop: 10, fontSize: 20 }}>08:00 AM - 16:00 PM</Text>
			<ScrollView style={{ gap: 10, marginTop: 10,paddingBottom:100 }}>
				{arr.map((item, index) => {
					return (
						<View style={styles.card}>
							<View style={styles.row}>
								<Text style={{ fontWeight: "bold", fontSize: 18 }}>Amman Third Circle</Text>
								<Text style={{ fontWeight: "bold", fontSize: 20 }}>
									{"TC"}-<Text style={styles.tagBody}>{"101"}</Text>
								</Text>
							</View>
							<View style={[styles.row, { marginTop: 10 }]}>

								<Entypo onPress={handleOpenMaps} name="location-pin" size={40} color="#4169e1" />
								<Button mode="contained" buttonColor="#4169e1" >
									Details
								</Button>
							</View>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default TodaySchedule;

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	card: {
		backgroundColor: "#e0e0e0",
		padding: 10,
		borderRadius: 10,marginVertical:5
	},
	container: {
		marginTop:150 ,flex:-1,paddingBottom:100
	},
	tagHeader: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
		backgroundColor: "#e0e0e0",
		borderRadius: 15,
		padding: 8,
		width: "30%",
		textAlign: "center",
	},
	tagBody: {
		fontWeight: "bold",
		color: "#4169e1",
	},
});
