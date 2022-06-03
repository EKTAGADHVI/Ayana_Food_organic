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
import AuthNavigation from './App/Navigation/AuthNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_SUCESS } from './App/Redux/actionTypes';




class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isLogin :false
    }
  }
  async componentDidMount(){
  // setTimeout(async()=>{

  //   await  AsyncStorage.getItem('UserData')
  //     .then((res)=>{
  //       console.log("LOCAL STORAHE DATA",res)
  //       if(res !== null)
  //       {
         
  //             this.props.dispatch({
  //               type:LOGIN_SUCESS,
  //               payload:res
  //             });
  //             this.setState({isLogin:true})
  //           // loggedIn = true;
             
  //           }
           
      
        
  //       else{
  //         this.setState({isLogin:true})
  //       }
  //     })
  //     .catch((error)=>{
  //     console.log("Error")
  //     // this.setState({isLogin:true})
  //     })
      
  //   },2500)
  // // setTimeout(()=>{
  // //   this.setState({
  // //     isLogin:true
  // //   })
  // // },3000)
}
  render(){
    
    return  (
      
      <NavigationContainer>      
       <RootNavigation/>
      </NavigationContainer>
    )
  }
  
}
function mapStateToProps(state, ownProps) {
  console.log(" state.loginReducer.data", state.loginReducer.data)
    return {
      data : state.loginReducer.data
  
  
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


