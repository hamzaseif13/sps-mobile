import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext } from "react";

interface AppContextType {
	user?: {
		role: "OFFICER" | "CUSTOMER";
		jwtToken:string
		email:string
		firstName:string
		lastName:string
	};
	setUser: any;
}
const appContextDefaultValues: AppContextType = {
	setUser: null,
};
const AppContextSPS = createContext<AppContextType>(appContextDefaultValues);

interface Props {
	children: React.ReactNode;
}

export const useAppContext = () => {
	return useContext(AppContextSPS);
};

const AppContext = ({ children }: Props) => {
	const [user, setUser] = React.useState<AppContextType["user"]>();

	return <AppContextSPS.Provider value={{ user, setUser }}>{children}</AppContextSPS.Provider>;
};

export default AppContext;
