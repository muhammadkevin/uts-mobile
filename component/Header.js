import React from 'react';
import { Image } from 'react-native';
import { Text, View, t } from "react-native-tailwind";
import { SeedingIcon } from "../styles/icon";
import STyle from '../styles/style';


const HeaderComponent = () => {
    return(
        <View className="p-3" style={STyle.bgMain}>
            <Text className="font-bold text-2xl text-white">
                <SeedingIcon style={STyle.logo} size={21}/> 
                <View className="pl-2">
                    <Image source={require('./../styles/images/logo.png')} style={{width:120, height:30}}/>
                </View>
            </Text>
        </View>
    );
} 

export default HeaderComponent;

