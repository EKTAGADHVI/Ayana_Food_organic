import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { ToastMessage } from '../../Components/ToastMessage';
import { actions } from '../../Redux/actions';
import { HELP_ERROR, HELP_SUCESS } from '../../Redux/actionTypes';
import Apis from '../../RestApi/Apis';
import { Light_Green, Text_Gray, White } from '../../Utils/colors';
import { initialState, screen_height, screen_width } from '../../Utils/constant';
import styles from './styles';

class HelpScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            fname:"",
            lname:"",
            email:'',
            comment:'',
            visible:false
        }
    }

    onSendMessage=()=>{
        let reg = ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/ );
        console.log( "Entry", this.state.email, this.state.password )
        if(this.state.fname === "" || this.state.fname === null){
            ToastMessage('error','Enter  First Name','Please Check')
        }
        else if(this.state.lname === "" || this.state.lname === null){
            ToastMessage('error','Enter  last Name','Please Check')
        }
        else if ( this.state.email === "" || this.state.email === null )
        {
            ToastMessage('error','Enter  Email','Please Check')
        }
       
        else if ( this.state.comment === "" || this.state.comment === null )
        {
            ToastMessage('error','Enter Comment','Please Check')
        }
        else{
            this.setState({visible:true});
            let request={
                //userId remain
                 "firstName":this.state.fname, 
                 "lastName":this.state.lname, 
                 "email":this.state.email,
                 "comment":this.state.comment
            }
            Apis.helpCall(request)
            .then((res)=>  {return JSON.stringify(res)})
            .then((response)=>{
                this.setState({visible:false});
               
                if(JSON.parse(response).data.status == true){
                    console.log("====== BANNERS_ERROR====== >  ", JSON.parse(response).data);
                    this.props.dispatch({
                        type:HELP_SUCESS,
                        payload:JSON.parse(response).data
                    });
                    this.setState({
                        fname:"",
                        lname:"",
                        email:'',
                        comment:'',
                        
                    })
                    alert("Your mesaage sent.")
                }
                else{
                    this.setState({visible:false});
               
                    console.log("======BANNERS_ERROR ====== >  ", JSON.parse(response).data);
                    this.props.dispatch({
                        type:HELP_ERROR,
                        payload:JSON.parse(response).data
                    });
                }

            })
            .catch((error)=>{
                this.props.dispatch({
                    type:HELP_ERROR,
                    payload:initialState
                });
                console.log("error",error);
                this.setState({visible:false});
            })
        }
    }

    componentWillUnmount(){
        this.setState({
            fname:"",
            lname:"",
            email:'',
            comment:'',
            
        });
    }
    render(){
      return(
        <View style={ styles.mainLayout }>
        <SafeAreaView>
            <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Help" } />
            <ProgressLoader
                            visible={ this.state.visible }
                            isModal={ true }
                            isHUD={true}
                            hudColor={White}
                            color={ Light_Green } />
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
                       onPress={()=>{
                           this.onSendMessage()
                       }}/>

            </View>
        
           
        </SafeAreaView>
    </View>
      );
    }

}
function mapStateToProps ( state, ownProps )
{
    console.log( " state.loginReducer.data", state.loginReducer.data )
    return {
        // data : state.loginReducer.data

        loginData: state.loginReducer.data,
        isLoading:state.loginReducer.isLoading
    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        loginRequest: ( request ) => dispatch( actions.loginAction( request ) ),
        dispatch
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( HelpScreen );

