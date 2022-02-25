import React, { Component } from 'react';
import { Image, View } from 'react-native';

class SplashScreen extends Component {
    render(){
        return(
            <View style={{flex:1}}>
                 <Image
    style={{height:"100%",width:"100%"}}
    source={require('../../../assets/splash2.png')}/>
 
            </View>
        );
    }
}

export default SplashScreen;