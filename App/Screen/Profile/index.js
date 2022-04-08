import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import { Text_Gray } from '../../Utils/colors';
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
            if(res !== null){
                this.setState({userData:JSON.parse(res).data})
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
                    <View style={ styles.profileContainer }>
                        <Image
                            style={ styles.imageStyle }
                            source={ require( '../../../assets/profile.png' ) } />
                        <View style={ { left: "15%" } }>
                            <View style={ [ styles.rowView, ] }>
                                <Text style={ styles.normalText }>User Name</Text>
                                <TouchableOpacity>
                                    <Image
                                        style={ styles.iconStyle }
                                        source={ require( '../../../assets/pencil.png' ) }
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={ [ styles.normalText, { color: Text_Gray, } ] }>xyz@gmail.com</Text>
                        </View>
                    </View>
                    <this.renderProfileMenu
                        name={ "Orders" }
                        onPress={ () => { this.props.navigation.navigate('Orders')} }
                        leftIcon={ require( '../../../assets/order.png' ) } />
                    <this.renderProfileMenu
                        onPress={ () => { this.props.navigation.navigate('MyDetails')} }
                        name={ "My Details" }
                        leftIcon={ require( '../../../assets/my_details.png' ) } />
                    <this.renderProfileMenu
                        onPress={ () => { } }
                        name={ "Notification" }
                        leftIcon={ require( '../../../assets/notification.png' ) } />
                </SafeAreaView>
            </View>
        );
    }
}
export default Profile;