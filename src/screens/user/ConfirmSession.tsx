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
const ConfirmSession = () => {
	const navigation = useNavigation<any>();
	const route = useRoute();
	const [zoneId, setZoneId] = useState("");
	const [spaceNumber, setSpaceNumber] = useState<string>();
	const { car, setCar } = useAppContext();
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [visible, setVisible] = React.useState(false);
	const clientQuery = useQueryClient()
	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Confirm Booking",
			headerTitleStyle: {
				fontWeight: "bold",
				textAlign: "center",
			},
		});
	}, [navigation]);

	const { data, isLoading, refetch } = useQuery(
		["zone", route.params?.toString().split("-")[0]],
		(queryKey) => getZoneById(queryKey.queryKey[1]!),
		{
			enabled: true,
		}
	);


	useEffect(() => {
		const [zoneIdQr, spaceNumberQr] = route.params?.toString().split("-")!;
		refetch({ queryKey: ["zone", zoneIdQr] });
		if (spaceNumberQr) {
			setSpaceNumber(spaceNumberQr);
		}
	}, [route.params]);

	const { mutateAsync: createBoookingSessionAsync, isLoading:isCreatingSession } = useMutation(
		(request: CreateSessionRequest) => createBookingSession(request),
		{ mutationKey: "booking" }
	);


	if (isLoading) return <LoadingScreen />;
	if (!data?.isSuccess) return <Text>Something Went wrong please try again later</Text>;
	const zone = data.data;
	const calculatePrice = () => {
		return (hours + minutes / 60) * zone?.fee!;
	};
	const canConfirm = () => {
		return !!car && hours + minutes / 60 > 0 && !!spaceNumber;
	};
	const createSession = async () => {
		const resp = await createBoookingSessionAsync({
			carId: Number(car!.id),
			spaceNumber: Number(spaceNumber),
			zoneId: zone!.id,
			durationInMs: minutes*60_000 + hours*3_600_000,
		});
		if (resp.isSuccess) {
			Toast.show({
				type: "success",
				text1: "Success",
				text2: "Session Created Successfully",
			})
			clientQuery.refetchQueries("zones")
		}
		else{
			Toast.show({
				type: "error",
				text1: "Error",
				text2: resp.error,
			})
		}
	};

	return (
		<CustomSafeAreaView>
			<View style={styles.container}>
				<View
					style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
				>
					<Text style={{ fontSize: 30, maxWidth: "60%", fontWeight: "bold" }}>
						{data.data?.title}
					</Text>
					<Text style={styles.tagHeader}>
						{data.data?.tag.split("-")[0]}-
						<Text style={styles.tagBody}>{data.data?.tag.split("-")[1]}</Text>
					</Text>
				</View>
				<View style={styles.addCarDiv}>
					<Button
						mode="contained"
						buttonColor="#4169e1"
						style={{ borderRadius: 10, paddingVertical: 5, width: "100%" }}
						onPress={() => navigation.navigate("SelectCar")}
					>
						{car ? car.brand + " " + car.plateNumber : "Select Car"}
					</Button>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text style={{ fontSize: 20 }}>Select Parking Duration</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 10,
							justifyContent: "center",
						}}
					>
						<TouchableOpacity onPress={() => setHours(hours - 1)} disabled={hours === 0}>
							<Ionicons name="remove-circle-outline" size={32} color="black" />
						</TouchableOpacity>
						<Text style={{ marginHorizontal: 20, fontSize: 24, width: "40%", textAlign: "center" }}>
							{hours} hours
						</Text>
						<TouchableOpacity onPress={() => setHours(hours + 1)}>
							<Ionicons name="add-circle-outline" size={32} color="black" />
						</TouchableOpacity>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 10,
							justifyContent: "center",
						}}
					>
						<TouchableOpacity onPress={() => setMinutes(minutes - 15)} disabled={minutes === 0}>
							<Ionicons name="remove-circle-outline" size={32} color="black" />
						</TouchableOpacity>
						<Text style={{ marginHorizontal: 20, fontSize: 24, width: "40%", textAlign: "center" }}>
							{minutes} minutes
						</Text>
						<TouchableOpacity onPress={() => setMinutes(minutes + 15)} disabled={minutes === 45}>
							<Ionicons name="add-circle-outline" size={32} color="black" />
						</TouchableOpacity>
					</View>
				</View>
				<Text style={{ marginVertical: 10 }}>Zone Fee : {zone?.fee}JD/Hour</Text>

				<Dropdown
					style={styles.dropdown}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
					value={spaceNumber}
					inputSearchStyle={styles.inputSearchStyle}
					iconStyle={styles.iconStyle}
					data={generateArray(zone?.numberOfSpaces!)}
					search={false}
					maxHeight={300}
					labelField="label"
					valueField="value"
					placeholder="Select Space Number"
					onChange={(item) => {
						setSpaceNumber(item.value);
					}}
				/>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 30,
					}}
				>
					<Text style={{ fontWeight: "bold", fontSize: 18 }}>Total {calculatePrice()} JD</Text>
					<Button
						mode="contained"
						buttonColor="#4169e1"
						style={{ borderRadius: 10, paddingVertical: 5 }}
						onPress={createSession}
						disabled={!canConfirm()}
						loading={isCreatingSession}
					>
						<Text>Confirm</Text>
					</Button>
				</View>
			</View>
		</CustomSafeAreaView>
	);
};

export default ConfirmSession;

const styles = StyleSheet.create({
	tagHeader: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
		backgroundColor: "#e0e0e0",
		borderRadius: 15,
		padding: 8,
		width: "33%",
		textAlign: "center",
	},
	tagBody: {
		fontWeight: "bold",
		color: "#4169e1",
	},
	container: {
		paddingHorizontal: 20,
	},
	addCarDiv: {
		marginTop: 10,
		flexDirection: "row",
	},
	dropdown: {
		marginVertical: 16,
		height: 50,
		borderBottomColor: "gray",
		borderBottomWidth: 0.5,
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
function generateArray(n: number) {
	return Array.from({ length: n }, (_, index) => index + 1).map((item) => ({
		label: item.toString(),
		value: item.toString(),
	}));
}
