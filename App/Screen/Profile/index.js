import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { connect } from 'react-redux';
import BasicHeader from '../../Components/BasicHeader';
import { actions } from '../../Redux/actions';
import { GET_PROFILE_ERROR, GET_PROFILE_SUCESS } from '../../Redux/actionTypes';
import Apis from '../../RestApi/Apis';
import { Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';
import NetInfo from "@react-native-community/netinfo";
import InternetScreen from '../../Components/InternetScreen';
import { CommonActions } from '@react-navigation/native';
class Profile extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            userData: [],
            isInternet:false
        }
        this.checkInternet()
    }
    logout = () => {
        Alert.alert(
            "Ayana Food & Organic",
            'Are you sure you want to Logout?',
            [
                {
                    text: 'Yes', onPress: async () => {

                            // setVisible(false)
                            this.props.logout();
                            await AsyncStorage.removeItem('UserData')
                            .then((res)=>{
                                AsyncStorage.removeItem("PostalCode")
                                .then(()=>{})
                                .catch((err)=>{})
                                AsyncStorage.removeItem("AddToCart")
                                .then(()=>{})
                                .catch((err)=>{})

                                console.log("Data Removed")
                              setTimeout(()=>{
                               this.props.navigation.dispatch(
                                    CommonActions.reset({
                                      index: 1,
                                      routes: [
                                        { name: 'LoginScreen' },
                                      ],
                                    })
                                  );
                              },700)
                            })
                            .catch((error)=>{
                                console.log("Data Not Removed")
                            })}

                },
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    }


    renderProfileMenu = ( menu ) =>
    {
        return (
            <TouchableOpacity style={ styles.ItemView } onPress={ menu.onPress }>
                <View style={ styles.rowView }>
                    <Image
                        source={ menu.leftIcon }
                        style={ styles.iconStyle } />
                    <Text style={ [ styles.regularText ] }>{ menu.name }</Text>
                    <Image
                        source={ require( '../../../assets/right.png' ) }
                        style={ styles.iconStyle } />
                </View>
            </TouchableOpacity>
        );
    }
    checkInternet=()=>{
        NetInfo.fetch().then( state =>
            {
                console.log( "Connection type", state.type );
                console.log( "Is connected?", state.isConnected );
                if ( state.isConnected == true )
                {
                  this.setState({isInternet:true,})

                }
                else
                {
                    this.setState({isInternet:false})
                }
            } );
    }

    // profileEvent=EventRegister.addEventListener('profile-call', this.profileAPICall)
    componentDidMount ()
      {
         AsyncStorage.getItem( 'UserData' )
            .then( ( res ) =>
            {
                console.log("RESPONSE==",res);

                let dd = JSON.parse( res ).data;
                console.log( "UserRes", dd[ 0 ].ID )
                if ( res !== null )
                {

                    this.setState( { userData: JSON.parse( res ).data } )
                    this.profileAPICall(dd[ 0 ].ID)
                    // // this.props.profileCall( {
                    // //     "user_id":"122"
                    // // } )
                }
                else
                {
                    this.setState( { userData: [] } )
                }
            } ).catch( ( error ) => { } )
    }
    profileAPICall =(id) =>{
        Apis.getProfileCall({
            "user_id":id
        })
        .then((res  )=>{
            return JSON.stringify(res);
        })
        .then((responce)=>{

            console.log("Response Fetch call", responce)
            if(JSON.parse(responce).data.status == true){
                console.log("======GET_PROFILE_LOADING_sucess===== >  ", JSON.parse(responce).data);
                let data=JSON.parse(responce)?.data;
                AsyncStorage.setItem('UserData',JSON.stringify(data))
                .then(()=>{
                    this.props.dispatch({
                        type:GET_PROFILE_SUCESS,
                        payload:JSON.parse(responce).data
                    });

                    this.setState({userData:data?.data})
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
            else{
                console.log("======GET_PROFILE_LOADING ====== >  ", JSON.parse(responce).data);
                this.props.dispatch({
                    type:GET_PROFILE_ERROR,
                    payload:JSON.parse(responce).data
                });
            }
        }).catch((error)=>{
            this.props.dispatch({
                type:GET_PROFILE_ERROR,
                payload:error
            });
            console.log("Fetch ERROR", error)
        })
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
               {
                   this.state.isInternet === true ?
                   <SafeAreaView>
                   <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Profile' } />
                   {
                       this.state.userData.length > 0 ?
                           <View>
                               <View style={ styles.profileContainer }>
                                   <Image
                                       style={ styles.imageStyle }
                                       source={ require( '../../../assets/profile.png' ) } />
                                   <View style={ { left: "15%" } }>
                                       <View style={ [ styles.rowView, { width: "70%", justifyContent: 'flex-start' } ] }>

                                           <Text style={ [ styles.normalText, ] }>{ this.state.userData[ 0 ].user_login }</Text>
                                           <TouchableOpacity onPress={ () =>
                                           {
                                               this.props.navigation.navigate( 'MyDetails', {
                                                   data: this.state.userData,
                                                   editable: true
                                               } )
                                           } }>
                                               <Image
                                                   style={ [ styles.iconStyle, { left: 10 } ] }
                                                   source={ require( '../../../assets/pencil.png' ) }
                                               />
                                           </TouchableOpacity>

                                       </View>
                                       <Text style={ [ styles.normalText, { color: Text_Gray, fontSize: 12 } ] }>{ this.state.userData[ 0 ].user_email }</Text>
                                   </View>

                               </View>
                               <this.renderProfileMenu
                                   name={ "My Orders" }
                                   onPress={ () => { this.props.navigation.navigate( 'Orders' ) } }
                                   leftIcon={ require( '../../../assets/order.png' ) } />
                               <this.renderProfileMenu
                                   onPress={ () =>
                                   {
                                       this.props.navigation.navigate( 'MyDetails', {
                                           data: this.state.userData,
                                           editable: false
                                       } )
                                   } }
                                   name={ "My Details" }
                                   leftIcon={ require( '../../../assets/my_details.png' ) } />
                               <this.renderProfileMenu
                                   onPress={ () => { } }
                                   name={ "Notification" }
                                   leftIcon={ require( '../../../assets/notification.png' ) } />
                                     <this.renderProfileMenu
                                   onPress={ () => {this.logout() } }
                                   name={ "Logout" }
                                   leftIcon={ require( '../../../assets/logout.png') } />

                           </View> :
                           <View style={ { justifyContent: 'center', alignItems: 'center', height: screen_height / 1.5 } }>
                               <Image
                                   style={ styles.emptyCart }
                                   source={ require( '../../../assets/emptyCart.png' ) } />

                               <Text style={ styles.titleText }>Oops</Text>
                               <TouchableOpacity onPress={ () =>
                               {
                                   this.props.navigation.navigate( 'LoginScreen' );
                               } }>
                                   <Text style={ [ styles.normalText, { fontSize: 18, fontFamily: POPINS_REGULAR, textAlign: 'center', color: Light_Green } ] }>Click Here to Login</Text>
                               </TouchableOpacity>
                           </View>

                   }

               </SafeAreaView>
               :
               <InternetScreen
               onPress={()=>{
                   this.checkInternet();
               }}/>
               }
            </View>
        );
    }
}
function mapStateToProps ( state, ownProps )
{
    console.log( "state.getProfileReducer.data", state.getProfileReducer.data )
    return {

        profile: state.getProfileReducer.data

    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        profileCall: ( request ) => dispatch( actions.getProfileAction( request ) ),
        logout:(request)=>dispatch(actions.logoutAction()),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( Profile );
