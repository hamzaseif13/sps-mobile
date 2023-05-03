import React, { useState, useEffect, useRef } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	StatusBar,
	Alert,
	TouchableHighlight,
	TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import MapSearchBar from "../../screensComponents/customer-map/MapSearchBar";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getAllZones } from "../../api/customer";
import { Zone } from "../../interface/Zone";

import ParkingMarker from "../../screensComponents/customer-map/ParkingMarker";
import { Button } from "react-native-paper";

const LAT_DELTA = 0.015;
const LONG_DELTA = 0.0121;
const Map = () => {
	const [zone, setZone] = useState<Zone | null>(null);

	const { data, isLoading: zonesLoading } = useQuery({
		queryKey: "zones",
		queryFn: getAllZones,
		enabled: true,
		onSuccess: (resp) => {
			if (resp.isSuccess) {
				setZones(resp.data!);
			} else {
				Alert.alert("Error", resp.error);
			}
		},
	});
	const [zones, setZones] = useState<Array<Zone>>([]);
	const navigation = useNavigation<any>();
	const [location, setLocation] = useState<{ longitude: number; latitude: number }>({
		longitude: 35.9106,
		latitude: 31.9539,
	});
	const mapRef = useRef<any>(null);
	const [errorMsg, setErrorMsg] = useState("");
	const getUserLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Location Permission", "Please allow location permission to use this feature", [
				{
					text: "Allow",
					onPress: () => getUserLocation(),
				},
				{
					text: "Cancel",
					onPress: navigation.goBack,
				},
			]);
			return;
		}
		Location.getCurrentPositionAsync({}).then((location) => {
			setLocation(location.coords);
			/* mapRef.current.animateToRegion({
				...location.coords,
				latitudeDelta: LAT_DELTA,
				longitudeDelta: LONG_DELTA,
			}); */
		});
	};
	useEffect(() => {
		getUserLocation();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#003f5c" barStyle="light-content" />
			<MapSearchBar />
			<MapView
				ref={mapRef}
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					...location,
					latitudeDelta: LAT_DELTA,
					longitudeDelta: LONG_DELTA,
				}}
			>
				{zones.map((zone) => (
					<Marker
						key={zone.id}
						coordinate={{
							latitude: zone.lat,
							longitude: zone.lng,
						}}
						onPress={() => {
							setZone(zone);
						}}
					>
						<ParkingMarker
							tag={zone.tag}
							totalSpaces={zone.numberOfSpaces}
							availableSpaces={zone.availableSpaces}
						/>
					</Marker>
				))}
			</MapView>
			{zone && (
				<View style={[styles.floatingSection]}>
					<View style={styles.header}>
						<View>
							<Text style={styles.header}>{zone.title}</Text>
							<Text>{zone.address}</Text>
						</View>
						<Text style={styles.tagHeader}>
							{zone.tag.split("-")[0]}-<Text style={styles.tagBody}>{zone.tag.split("-")[1]}</Text>
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop:20
						}}
					>
						<View>
							<Text style={styles.avlSpaces}>Price : {zone.fee} JD/Hour</Text>
							<Text style={styles.avlSpaces}>
								Available Spaces : {zone.availableSpaces}/{zone.numberOfSpaces}
							</Text>
						</View>
						<Button buttonColor="#4169e1" mode="contained" onPress={()=>navigation.navigate("Confirm")}>
							Confirm
						</Button>
					</View>
				</View>
			)}
		</View>
	);
};

export default Map;

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
	map: {
		width: "100%",
		height: "100%",
	},
	floatingSection: {
		backgroundColor: "white",
		borderWidth: 1,
		position: "absolute",
		bottom: 40,
		width: "100%",
		height: 200,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 20,
	},
	hide: {
		display: "none",
	},
	show: {
		display: "flex",
	},
	tagHeader: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
		backgroundColor: "#e0e0e0",
		borderRadius: 15,
		padding: 8,
	},
	tagBody: {
		fontWeight: "bold",
		color: "#4169e1",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		fontSize: 25,
		color: "#4169e1",
	},
	avlSpaces: {
		fontSize: 20,
	},
});
