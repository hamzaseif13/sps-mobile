import { StyleSheet} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/officer/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "../screens/officer/Map";
import { Ionicons } from "@expo/vector-icons";
import History from "../screens/officer/History";
import Schedule from "../screens/officer/Schedule";
import ProfilePage from "../screens/officer/Profile";
import Report from "../screens/officer/Report";
const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getIconName = (routeName: string) => {};
const CustomerNavigation = () => {
	return (
		<>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName: "home" | "time" | "person" = "home";
						switch (route.name) {
							case "Home":
								iconName = "home";
								break;
							case "Schedule":
								iconName = "time";
								break;
							case "Profile":
								iconName = "person";
								break;
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: "#4169e1",
					tabBarInactiveTintColor: "gray",
					//Tab bar styles can be added here
					tabBarStyle: { paddingVertical: 5, position: "absolute", height: 60 },
					tabBarLabelStyle: { paddingBottom: 3, fontSize: 15, fontWeight: "bold" },
				})}
			>
				<Tab.Screen name="Home" options={{ headerShown: false }} component={StackNav} />
				<Tab.Screen name="Schedule" component={Schedule} />
				<Tab.Screen name="Profile" component={ProfilePage} />
			</Tab.Navigator>
		</>
	);
};

const StackNav = () => {
	return (
		<stack.Navigator>
			<stack.Screen name="Home2" component={Home} />
			<stack.Screen name="Map" options={{ headerShown: false }} component={Map} />
			<stack.Screen name="Report" options={{ headerShown: false }} component={Report} />
			<stack.Screen name="History" options={{ headerShown: false }} component={History} />
		</stack.Navigator>
	);
};
export default CustomerNavigation;

const styles = StyleSheet.create({});
