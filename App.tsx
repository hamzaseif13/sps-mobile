import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppContext from "./src/context/AppContext";
import NavigationProvider from "./src/navigation/NavigationProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
const queryClient = new QueryClient({defaultOptions:{
	queries:{
		 refetchOnWindowFocus:false,
		 retry: false,
		 refetchOnMount: false,
	}
}});
const App = () => {
	return (
		<NavigationContainer>
			<QueryClientProvider client={queryClient}>
				<AppContext>
					<NavigationProvider />
				</AppContext>
			</QueryClientProvider>
		</NavigationContainer>
	);
};

export default App;

const styles = StyleSheet.create({});
