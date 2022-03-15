/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';


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
import { connect } from 'react-redux';




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
  },3000)
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
function mapStateToProps(state, ownProps) {
  // console.log(" state.loginReducer.data", state.loginReducer.data)
    return {
      // data : state.loginReducer.data
  
  
    };
  
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
      
        dispatch,
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(App);


