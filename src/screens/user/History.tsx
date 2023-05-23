import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getZoneById } from "../../api/common";
import LoadingScreen from "../LoadingScreen";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { Button, TextInput, Menu, Divider, Provider } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useAppContext } from "../../context/AppContext";
import { Dropdown } from "react-native-element-dropdown";
import { CreateSessionRequest } from "../../interface/Booking";
import { createBookingSession } from "../../api/customer";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const History = () => {
	const history = [
		{
			address: "Amman Third Circle",
			tag: "TC-100",
			date: "12/12/2020",
			time: "12:00",
			duration: "1 hour",
			price: "1.5 JD",
		},
	];
	return (
		<CustomSafeAreaView>
			<View style={styles.container}>
				<View style={styles.card}>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
					>
						<Text style={{ fontSize: 22, fontWeight: "bold" }}>Amman Third Circle</Text>
						<Text style={styles.tagHeader}>
							{"TC"}-<Text style={styles.tagBody}>100</Text>
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							padding: 8,
						}}
					>
						<Text>14 Jun 2023, 11:30 AM - Active</Text>
						<Text style={{ fontSize: 15, fontWeight: "bold" }}>1.5 JD</Text>
					</View>
				</View>
				<View style={styles.card}>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
					>
						<Text style={{ fontSize: 22, fontWeight: "bold" }}>Amman Third Circle</Text>
						<Text style={styles.tagHeader}>
							{"TC"}-<Text style={styles.tagBody}>100</Text>
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							padding: 8,
						}}
					>
						<Text>14 Jun 2023, 11:30 AM - 1H, 45M</Text>
						<Text style={{ fontSize: 15, fontWeight: "bold" }}>1.5 JD</Text>
					</View>
				</View>
				<View style={styles.card}>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
					>
						<Text style={{ fontSize: 22, fontWeight: "bold" }}>Amman Third Circle</Text>
						<Text style={styles.tagHeader}>
							{"TC"}-<Text style={styles.tagBody}>100</Text>
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							padding: 8,
						}}
					>
						<Text>14 Jun 2023, 11:30 AM - 1H, 45M</Text>
						<Text style={{ fontSize: 15, fontWeight: "bold" }}>1.5 JD</Text>
					</View>
				</View>
			</View>
		</CustomSafeAreaView>
	);
};

export default History;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		gap: 20,
	},
	card: {
		backgroundColor: "#D8D8D8",
		padding: 10,
		borderRadius: 10,
	},
	tagHeader: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
		borderRadius: 15,
		padding: 8,
		textAlign: "center",
	},
	tagBody: {
		fontWeight: "bold",
		color: "#4169e1",
	},
});
