import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import useTimer from "../../hooks/useTimer";
import Countdown from "react-countdown";
import { useQuery } from "react-query";
import { getLatestSession } from "../../api/customer";
const RecentSession = () => {
	const { data, isLoading } = useQuery("recent-session", () => getLatestSession(),{enabled:false});
	if (isLoading)
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	return (
		<View style={styles.container}>
		
			<View style={styles.idk}>
				<Text style={styles.text}>Current Session</Text>
				<Text>TC-101</Text>
			</View>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121,
				}}
			>
				<Marker
					coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
					title="Marker Title"
					description="Marker Description"
				/>
			</MapView>
			<View style={styles.idk}>
				<View style={{ display: "flex", gap: 4 }}>
					<Text>Amman Third Circle</Text>
					<Countdown
						date={Date.now() + 500000}
						renderer={({ hours, minutes, seconds, completed }) => (
							<Text>
								Time Left : {hours.toString().padStart(2, "0")}:
								{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}{" "}
							</Text>
						)}
					/>
				</View>
				<Button buttonColor="#4169e1" mode="contained" onPress={() => console.log("Pressed")}>
					<AntDesign name="arrowright" size={24} color="white" />
				</Button>
			</View>
		</View>
	);
};

export default RecentSession;

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		backgroundColor: "#D8D8D8",
		padding: 10,
		borderRadius: 10,
		height: "46%",
	},
	map: {
		width: "100%",
		height: "60%",
	},
	text: {
		fontSize: 20,
		marginBottom: 10,
	},
	idk: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 5,
		alignItems: "center",
	},
});
