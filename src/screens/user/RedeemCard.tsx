import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import { Button } from 'react-native-paper';

export default function RedeemCard() {
  return (
    <CustomSafeAreaView>
        <View style={styles.container}>
            <Text style={{fontSize:20,fontWeight:"bold"}}>Enter Your Redeem Card</Text>
            <TextInput style={{borderWidth:1,borderColor:"#4169e1",borderRadius:10,marginTop:20,padding:10}}/>
            <Button  loading={true}  mode='contained' onPress={()=>console.log("first")} style={{borderRadius:10,marginTop:10}} buttonColor='#4169e1'>
                Redeem
            </Button>
        </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
    },
    button:{
        backgroundColor:"#4169e1",
        padding:10,
        borderRadius:10,
        marginTop:10,
        alignItems:"center"
        ,
    }
});
