import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BasicHeader from '../../Components/BasicHeader';
import { actions } from '../../Redux/actions';
import { Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';

class Profile extends Component
{
    constructor ( props )
    {
        super( props );
        this.state={
            userData:[]
        }
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
    async componentDidMount(){
        await AsyncStorage.getItem('UserData')
        .then((res)=>{
            console.log("UserRes",res)
            let dd=JSON.parse(res).data;
            if(res !== null){
                this.setState({userData:JSON.parse(res).data})
                // this.props.profileCall({
                //     "user_id": dd[0].ID
                // })
            }
            else{
                this.setState({userData:[]})
            }
        }).catch((error)=>{})
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Profile' } />
                  {
                      this.state.userData.length>0?
                      <View>
                      <View style={ styles.profileContainer }>
                      <Image
                          style={ styles.imageStyle }
                          source={ require( '../../../assets/profile.png' ) } />
                      <View style={ { left:"15%" } }>
                          <View style={ [ styles.rowView,{width:"70%",justifyContent:'flex-start'} ] }>
                           
                             <Text style={ [styles.normalText,] }>{this.state.userData[0].user_login}</Text>
                              <TouchableOpacity onPress={()=>{
                                  this.props.navigation.navigate('MyDetails',{
                                    data:this.state.userData,
                                    editable:true
                                })
                              }}>
                                  <Image
                                      style={ [styles.iconStyle,{left:10}] }
                                      source={ require( '../../../assets/pencil.png' ) }
                                  />
                              </TouchableOpacity>
                            
                          </View>
                          <Text style={ [ styles.normalText, { color: Text_Gray ,fontSize:12} ] }>{this.state.userData[0].user_email}</Text>
                      </View>
                   
                  </View>
                  <this.renderProfileMenu
                        name={ "Orders" }
                        onPress={ () => { this.props.navigation.navigate('Orders')} }
                        leftIcon={ require( '../../../assets/order.png' ) } />
                    <this.renderProfileMenu
                        onPress={ () => { this.props.navigation.navigate('MyDetails',{
                            data:this.state.userData,
                            editable:false
                        })} }
                        name={ "My Details" }
                        leftIcon={ require( '../../../assets/my_details.png' ) } />
                    <this.renderProfileMenu
                        onPress={ () => { } }
                        name={ "Notification" }
                        leftIcon={ require( '../../../assets/notification.png' ) } />
                  </View>:
                <View style={ { justifyContent: 'center', alignItems: 'center', height: screen_height / 1.5 } }>
                <Image
                    style={ styles.emptyCart }
                    source={ require( '../../../assets/emptyCart.png' ) } />

                <Text style={ styles.titleText }>Oops</Text>
              <TouchableOpacity onPress={()=>{
                  this.props.navigation.navigate('LoginScreen');
              }}>
              <Text style={ [ styles.normalText, { fontSize: 18, fontFamily: POPINS_REGULAR, textAlign: 'center',color:Light_Green } ] }>Click Here to Login</Text>
              </TouchableOpacity>
            </View>
            
                  }
                
                </SafeAreaView>
            </View>
        );
    }
}
function mapStateToProps ( state, ownProps )
{
    console.log( "state.getProfileReducer.data",state.getProfileReducer.data )
    return {
        
        profile:state.getProfileReducer.data

    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,    
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        profileCall: ( request ) => dispatch( actions.getProfileAction(request)),       
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( Profile );
