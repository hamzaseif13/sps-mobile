import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ExtendSession = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topLeft}>
				<Text style={styles.location}>Amman, third circle</Text>

				<View style={styles.timeZone}>
					<Text style={styles.time}>14Jun, 9:00 AM</Text>

					<View>
						<Text style={styles.zone}>
							TC<Text style={{ color: "#4169e1" }}>200-1</Text>
						</Text>
					</View>
				</View>
				<View>
					<Text style={styles.timerText}>00:09:30</Text>
				</View>
			</View>

			<View style={styles.bottomLeft}>
				<Text style={styles.extend}>Extend</Text>

				<View style={{flexDirection:"column"}}>
					<TouchableOpacity style={styles.button}>
						<FontAwesome name="plus" size={20} color="#4169e1" />
						<Text style={styles.buttonText}>Add 5 minutes</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button}>
						<FontAwesome name="plus" size={20} color="#4169e1" />
						<Text style={styles.buttonText}>Add 30 minutes</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button}>
						<FontAwesome name="plus" size={20} color="#4169e1" />
						<Text style={styles.buttonText}>Add custom time</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	topLeft: {
		marginTop: 20,
	},
	location: {
		fontSize: 30,
		fontWeight: "bold",
	},
	timeZone: {
		flexDirection: "row",
		marginTop: 30,
	},
	time: {
		fontSize: 20,
		fontWeight: "bold",
		marginRight: 10,
		padding: 5,
	},
	zone: {
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: 80,
		backgroundColor: "#e0e0e0",
		padding: 5,
		borderRadius: 10,
	},
	timerText: {
		fontSize: 40,
		fontWeight: "bold",
		alignSelf: "center",
		marginTop: 40,
	},
	bottomLeft: {
		flex: 0.6,
		justifyContent: "center",
		marginBottom: 15,
		marginRight: 90,
		alignItems: "flex-start",
	},
	extend: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 10,
	},
	button: {
		padding: 10,
		borderRadius: 5,
		flexDirection: "row",
		marginBottom: 15,
	},
	buttonText: {
		left: 10,
		fontSize: 16,
		marginRight: 80,
	},
});

export default ExtendSession;
