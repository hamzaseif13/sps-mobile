import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getOfficerSchedule } from "../../api/officer";
import { useNavigation } from "@react-navigation/native";
import ZoneCard from "./ZoneCard";
import { useAppContext } from "../../context/AppContext";
const TodaySchedule = () => {
	const {user} = useAppContext()
	const { data, isLoading, error,refetch } = useQuery("officerSchedule", () => getOfficerSchedule());
	const navigation = useNavigation<any>();

	
	if (isLoading) return <Text>Loading...</Text>;
	const { zones, endsAt, startsAt } = data?.data!;
	return (
		<View style={styles.container}>
			<Text style={{ fontWeight: "bold", fontSize: 20 }}>TodaySchedule</Text>
			<Text style={{ marginTop: 10, fontSize: 20 }}>
				{convertTimeFormat(startsAt)} - {convertTimeFormat(endsAt)}
			</Text>
			<ScrollView style={{ gap: 10, marginTop: 10, paddingBottom: 100 }}>
				{zones.length > 0 &&
					zones.map((zone, index) => {
						return (
							<ZoneCard  zone={zone} key={index}/>
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
		borderRadius: 10,
		marginVertical: 5,
	},
	container: {
		marginTop: 20,
		flex: 1,
		paddingBottom: 100,
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
export function convertTimeFormat(time: string) {
	const [hours, minutes] = time.split(":");
	let suffix = "AM";
	let formattedHours = parseInt(hours);

	if (formattedHours >= 12) {
		suffix = "PM";
		formattedHours -= 12;
	}

	if (formattedHours === 0) {
		formattedHours = 12;
	}

	const formattedHoursString = formattedHours.toString().padStart(2, "0");

	return `${formattedHoursString}:${minutes} ${suffix}`;
}
