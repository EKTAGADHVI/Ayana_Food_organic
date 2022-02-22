import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { screen_height, screen_width } from '../Utils/constant';

const LogoView = (props) =>{
    return <Image
    style={[styles.mainLayout,styles.props]}
    source={require('../../assets/logo.png')}/>
}

export default LogoView;
const styles = StyleSheet.create({
    mainLayout:{
        height:screen_height/9,
        width:screen_width/2,
        resizeMode:'contain',
    //    borderWidth:1,
        alignSelf:'center',
        top:Platform.OS==='ios' ?"15%":0,
    
    },
});