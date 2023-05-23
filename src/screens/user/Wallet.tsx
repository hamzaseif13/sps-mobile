import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { useQuery } from "react-query";

const Wallet = () => {
	const navigation = useNavigation<any>();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitleAlign: "center",
			headerTitleStyle: {
				fontWeight: "bold",
				fontSize: 24,
			},
		});
	}, [navigation]);
/*   const { data, isLoading, refetch } = useQuery(
		"wallet",
		(queryKey) => getZoneById(queryKey.queryKey[1]!),
		{
			enabled: true,
		}
	); */
	return (
		<CustomSafeAreaView>
			<View style={styles.container}>
				<View style={styles.cashBox}>
					<Text style={styles.cash}>Cash</Text>
					<Text style={styles.amount}>JOD 5.530</Text>
				</View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Payment Methods
          </Text>
          <View style={{marginLeft:20}}>
            <View style={styles.method}>
              <FontAwesome name="cc-visa" size={40} color="#4169e1" />
              <Text style={styles.methodTitle}>4124-1241-2141-4211</Text>
            </View>
            <View style={styles.method}>
              <FontAwesome name="plus" size={40} color="#4169e1" style={{marginRight:12,marginLeft:10}}/>
              <Text style={styles.methodTitle}>Add Card</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Redeem Cards
          </Text>
          <View style={{marginLeft:20}}>
            <TouchableOpacity onPress={()=>navigation.navigate("Redeem")}>
              <View style={styles.method}>
                <FontAwesome name="plus" size={40} color="#4169e1" style={{marginRight:12,marginLeft:10}}/>
                <Text style={styles.methodTitle}>Add Redeem Card</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
			</View>
		</CustomSafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},cashBox:{
    backgroundColor: "#D8D8D8",
    padding:10,borderRadius:10
  },cash:{
    marginBottom:15
  },amount:{
    fontSize:30,fontWeight:"bold"
  },section:{
    marginVertical:15
  },sectionTitle:{
    fontSize:20,fontWeight:"bold"
  },method:{
    display:"flex",flexDirection:"row",alignItems:"center",gap:10,marginTop:10
  },methodTitle:{
    fontSize:20
  }
});
export default Wallet;
