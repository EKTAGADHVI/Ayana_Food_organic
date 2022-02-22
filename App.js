/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import type {Node} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './App/Screen/SplashScreen';
import RootNavigation from './App/Navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';




class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isLogin :false
    }
  }
componentDidMount(){
  setTimeout(()=>{
    this.setState({
      isLogin:true
    })
  },1000)
}
  render(){
   if(this.state.isLogin === false)
   {
     return <SplashScreen/>
   }
   else{
    return  (
      <NavigationContainer>
        <RootNavigation/>
      </NavigationContainer>
    )
  }
  }
}


export default App;
