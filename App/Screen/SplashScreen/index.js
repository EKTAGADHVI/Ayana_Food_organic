import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { Image, View } from 'react-native';

class SplashScreen extends Component {
    constructor(props){
        super(props);
    }

   async componentDidMount(){
        setTimeout(async ()=>{
            await AsyncStorage.getItem('UserData')
            .then((response)=>{
                console.log("response",response)
                if(response !== null && response!== "" ){

                 AsyncStorage.getItem('PostalCode')
                  .then((postalcode)=>{
                    if(postalcode !== null && postalcode !== ""){
                      this.props.navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'Home' },
                          ],
                        })
                      );
                    }
                    else{
                      this.props.navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'AddDeliveryLocation' },
                          ],
                        })
                      );
                    }
                  })
                  .catch((err)=>{})
                   
                }
                else{
                    this.props.navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'LoginScreen' },
                          ],
                        })
                      );
                }
            })
            .catch((error)=>{
               
                console.log("error")
            })
          
        },2000)
    }
    render(){
        return(
            <View style={{flex:1}}>
                 <Image
    style={{height:"100%",width:"100%"}}
    source={require('../../../assets/splash3.png')}/>
 
            </View>
        );
    }
}

export default SplashScreen;