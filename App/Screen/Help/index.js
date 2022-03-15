import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { Text_Gray } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import styles from './styles';

class HelpScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            fname:"",
            lname:"",
            email:'',
            comment:''
        }
    }

    

    render(){
      return(
        <View style={ styles.mainLayout }>
        <SafeAreaView>
            <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Help" } />
            <View style={styles.formContainer}>
                    <Text style={styles.titleText}>Leave us a message</Text>
                    <TextInput
                    value={this.state.fname}
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={(text)=>{
                        this.setState({fname:text})
                    }}
                    placeholderTextColor={Text_Gray}
                
                    />
                    <TextInput
                       value={this.state.lname}
                       style={styles.input}
                       placeholder="Last Name"
                       onChangeText={(text)=>{
                           this.setState({lname:text})
                       }}
                       placeholderTextColor={Text_Gray}/>
                    <TextInput
                       value={this.state.email}
                       style={styles.input}
                       placeholder="Email"
                       onChangeText={(text)=>{
                           this.setState({email:text})
                       }}
                       placeholderTextColor={Text_Gray}/>
                    <TextInput
                       value={this.state.comment}
                       style={[styles.input,{height:screen_height/6}]}
                       multiline={true}
                       placeholder="Comment or Message"
                       onChangeText={(text)=>{
                           this.setState({comment:text})
                       }}
                       placeholderTextColor={Text_Gray}/>
                       
                       <FilledButton title="Send Message"
                       style={{width:screen_width/2.5,borderRadious:20,marginVertical:"6%"}}
                       textStyle={{fontSize:14, paddingVertical:8}}
                       onPress={()=>{}}/>

            </View>
        
           
        </SafeAreaView>
    </View>
      );
    }

}

export default HelpScreen;