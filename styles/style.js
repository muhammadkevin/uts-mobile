import React from 'react';
import { StyleSheet } from 'react-native';
 

 
const STyle = StyleSheet.create({
    logo: {
        color: 'white',
        fontFamily: "Cagliostro-Regular",
        marginBottom: 3,
    },
    iconsave: {
        color: 'white'
    },
    icondelete: {
        color: 'white'
    },
    touchables: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    bgMain: {
        backgroundColor: 'rgba(255,255,255, 0.2)',
    },
    bgDelete: {
        backgroundColor: 'rgba(39, 153, 219, 0.5)'
    },
    bgClearAll: {
        backgroundColor: 'rgba(219, 39, 39, 0.4)'
    }
});

export default STyle;