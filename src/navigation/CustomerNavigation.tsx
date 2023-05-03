import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/user/Home";
import Profile from "../screens/user/Profile";
import RecentSession from "../screensComponents/customer-home/RecentSession";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Wallet from "../screens/user/Wallet";
import Map from "../screens/user/Map";
import { Ionicons } from '@expo/vector-icons';
import AddBalance from "../screens/user/AddBalance";
import AddCar from "../screens/user/AddCar";
import History from "../screens/user/History";
import ConfirmSession from "../screens/user/ConfirmSession";
import ScanQR from "../screens/user/ScanQR";
const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const getIconName = (routeName:string)=>{

}
const CustomerNavigation = () => {
	return (
		<>
			<Tab.Navigator
				   screenOptions={({ route }) => ({
					
					tabBarIcon: ({ focused, color, size }) => {
						let iconName:"home"|"wallet"|"person" = "home";
						switch(route.name){
							case "Home" :
							 iconName = "home";break;
							case "Wallet" : iconName = "wallet";break;
							case "Profile" : iconName = "person";break;

						}
				
						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: '#4169e1',
					tabBarInactiveTintColor: 'gray',
					//Tab bar styles can be added here
					tabBarStyle:{paddingVertical: 5,position:'absolute',height:60},
					tabBarLabelStyle:{paddingBottom:3,fontSize:15,fontWeight:"bold"},
				
				})}
				
			>
				<Tab.Screen name="Home" options={{ headerShown: false }} component={StackNav} />
				<Tab.Screen name="Wallet" component={Wallet} />
				<Tab.Screen name="Profile" component={Profile} />
			</Tab.Navigator>
		</>
	);
};

const StackNav = () => {
	return (
		<stack.Navigator>
			<stack.Screen name="Home2" component={Home} />
			<stack.Screen name="Map" options={{ headerShown: false }} component={Map} />
			<stack.Screen name="AddBalance"  component={AddBalance} />
			<stack.Screen name="AddCar"  component={AddCar} />
			<stack.Screen name="History"  component={History} />
			<stack.Screen name="Confirm"  component={ConfirmSession} />
			<stack.Screen name="ScanQR"  component={ScanQR} />
		</stack.Navigator>
	);
};
export default CustomerNavigation;

const styles = StyleSheet.create({});
