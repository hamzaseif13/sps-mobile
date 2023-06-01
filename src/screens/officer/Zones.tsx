import { Linking, ScrollView, StyleSheet, Text, View,RefreshControl } from "react-native";
import React from 'react'
import CustomSafeAreaView from '../../components/CustomSafeAreaView'
import { useQuery } from "react-query";
import { getAllZones } from "../../api/customer";
import ZoneCard from "../../screensComponents/officer-home/ZoneCard";

const Zones = () => {
  const { data, isLoading: zonesLoading,refetch ,isRefetching} = useQuery({
		queryKey: "zones",
		queryFn: getAllZones,
		enabled: true,
	});
  const zones = data?.data || [];
  return (
    
  <CustomSafeAreaView>
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch}/>}>
      {
        zones.map((zone:any, index:number) => <ZoneCard zone={zone} key={index}/>)

      }
    </ScrollView>
  </CustomSafeAreaView>
  )
}

export default Zones

const styles = StyleSheet.create({container:{
  paddingHorizontal:20,
  marginBottom:100
}})