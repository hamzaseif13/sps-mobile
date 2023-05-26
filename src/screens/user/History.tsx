import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
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
import { createBookingSession, getBookingHistory } from "../../api/customer";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const History = () => {
	const { isLoading, data, error } = useQuery("history", () => getBookingHistory());
	if (isLoading) return <LoadingScreen />;
	if (error) return <Text>Something went wrong please try again later</Text>;
	const zone = data?.data?.zone;
	console.log(data?.data)
	const getPrice = (item:any) => {
		const duration = item.bookingSession.duration /  3_600_000;
		const price = item.zone.fee;
		return `${price*duration} JD`;
	}

	return (
		<CustomSafeAreaView>
			<ScrollView style={styles.container}>
				{data?.statusCode===204?<Text>History is empty</Text> :data?.data.sort((a:any,b:any)=>{return new Date(b.bookingSession.createdAt).getTime()- new Date(a.bookingSession.createdAt).getTime()}).map((item: any) => {
					return (
						<View key={item.bookingSession.id} style={styles.card}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Text style={{ fontSize: 22, fontWeight: "bold" }}>{item.zone.title}</Text>
								<Text style={styles.tagHeader}>
									{item.zone.tag.split("-")[0]}-
									<Text style={styles.tagBody}>{item.zone.tag.split("-")[1]}</Text>
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
								<Text>{item.bookingSession.createdAt}</Text>
								<Text style={{ fontSize: 15, fontWeight: "bold" }}>{getPrice(item)}</Text>
							</View>
						</View>
					);
				})}
			</ScrollView>
		</CustomSafeAreaView>
	);
};

export default History;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		gap: 20,marginBottom:100
	},
	card: {
		backgroundColor: "#D8D8D8",
		padding: 10,
		borderRadius: 10,
		marginBottom:15
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
