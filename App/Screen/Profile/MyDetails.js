import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Component } from 'react';
import { View, SafeAreaView, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { actions } from '../../Redux/actions';
import { GET_PROFILE_ERROR, GET_PROFILE_SUCESS } from '../../Redux/actionTypes';
import Apis from '../../RestApi/Apis';
import { Light_Green, White } from '../../Utils/colors';
import { screen_width } from '../../Utils/constant';
import { POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class MyDetails extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            id: '',
            email: '',
            phone: '',
            strit: '',
            city: '',
            stateName: '',
            zip: '380060',
            userName: '',
            isEditable: this.props.route.params.editable,
            visible: true
        }
        this.profileAPICall()
    }
    profileAPICall = () =>
    {
        Apis.getProfileCall( {
            "user_id": this.props.route.params.data[ 0 ].ID
        } )
            .then( ( res ) =>
            {
                return JSON.stringify( res );
            } )
            .then( ( responce ) =>
            {

                console.log( "Response Fetch call", responce )
                if ( JSON.parse( responce ).data.status == true )
                {
                    console.log( "======GET_PROFILE_LOADING_sucess===== >  ", JSON.parse( responce ).data );
                    let data = JSON.parse( responce ).data.data;
                    AsyncStorage.setItem( 'UserDetails', JSON.stringify( data ) )
                        .then( () =>
                        {
                            this.props.dispatch( {
                                type: GET_PROFILE_SUCESS,
                                payload: JSON.parse( responce ).data
                            } );
                            this.setState( {

                                email: data[ 0 ].user_email,
                                phone: data[ 0 ].phone,
                                city: data[ 0 ].new_location.city,
                                stateName: data[ 0 ].new_location.state,
                                userName: data[ 0 ].display_name,
                                strit:data[ 0 ].street_address
                            } )
                            this.setState( { visible: false } )
                            // this.setState({userData:data})
                        } )
                        .catch( ( error ) =>
                        {
                            this.setState( { visible: false } )
                            console.log( error )
                        } )
                }
                else
                {
                    this.setState( { visible: false } )
                    console.log( "======GET_PROFILE_LOADING ====== >  ", JSON.parse( responce ).data );
                    this.props.dispatch( {
                        type: GET_PROFILE_ERROR,
                        payload: JSON.parse( responce ).data
                    } );
                }
            } ).catch( ( error ) =>
            {
                this.props.dispatch( {
                    type: GET_PROFILE_ERROR,
                    payload: error
                } );
                this.setState( { visible: false } )
                console.log( "Fetch ERROR", error )
            } )
    }
    renderDetail = ( detail ) =>
    {
        return (
            <View style={ styles.ItemView } >
                <View style={ styles.rowView }>

                    <Text style={ [ styles.normalText, { color: Light_Green, fontSize: 14 } ] }>{ detail.name } :</Text>
                    <TextInput
                        value={ detail.value }
                        onChangeText={ detail.onChangeText }
                        style={ styles.inpuStyle }
                        keyboardType={ detail.keyboardType }
                        editable={ detail.editable }
                    />
                </View>
            </View>
        );
    }

    UpdateProfile = () =>
    {

        if ( this.state.email == null || this.state.email == "" )
        {

        }
        else if ( this.state.phone == null || this.state.phone == "" )
        {

        }
        else if ( this.state.strit == null || this.state.strit == "" ) { }
        else if ( this.state.city == null || this.state.city === "" ) { }
        else if ( this.state.stateName == null || this.state.stateName == "" ) { }
        else if ( this.state.zip == null || this.state.zip == "" )
        {

        }
        else
        {
            this.setState( { visible: true } )
            let request = {
                "userId": this.props.route.params.data[ 0 ].ID,
                "userName": this.state.userName,
                "email": this.state.email,
                "phone": this.state.phone,
                "country": "India",
                "state": "Gujarat",
                "street_address":this.state.strit,
                "city": this.state.city,
                "pincode": this.state.zip
            }
            Apis.updateProfileCall( request )
                .then( ( res ) =>
                {
                    return JSON.stringify( res )
                } )
                .then( ( responce ) =>
                {
                    console.log( "Response Fetch call", responce )
                    if ( JSON.parse( responce ).data.status == true )
                    {
                        console.log( "======GET_PROFILE_LOADING_sucess===== >  ", JSON.parse( responce ).data );
                        let data = JSON.parse( responce ).data.data;
                        this.profileAPICall()
                        this.setState( { visible: false } )
                    }
                } ).catch( ( error ) =>
                {
                    this.setState( { visible: false } )
                } )
        }
    }
    componentDidMount ()
    {
        AsyncStorage.getItem( 'PostalCode' )
            .then( ( res ) =>
            {
                console.log( "ressfiusgdfg", res )
                if ( res !== null )
                {
                    this.setState( { zip: JSON.parse( res ).code } )
                }
                else
                {

                }


            } )
            .catch( ( error ) =>
            {
                console.log( "Data Not Removed" )
            } )
        console.log( 'this.props.routes.params.data', this.props.route.params.data );
        this.setState( {
            id: this.props.route.params.data[ 0 ].ID,
            email: this.props.route.params.data[ 0 ].user_email,
            phone: this.props.route.params.data[ 0 ].phone
        } )
        // this.props.profileCall({
        //    "request":this.state.us   
        // })
    }
    render ()
    {
        let isStreetAddress = false;
        let isCity = false;
        let isState = false;
        let isPincode = false;
        let isPhoneNo = false;
        let isEmail = false;
        if ( this.state.email !== null && this.state.email !== "" )
        {
            isEmail = true;
        }
        if ( this.state.phone !== null && this.state.phone !== "" )
        {
            isPhoneNo = true;
        }
        if ( this.state.strit !== null && this.state.strit !== "" )
        {
            isStreetAddress = true;

        }
        if ( this.state.city !== null && this.state.city !== "" )
        {
            isCity = true
        }
        if ( this.state.stateName !== null && this.state.stateName !== "" )
        {
            isState = true
        }
        if ( this.state.zip !== null && this.state.zip !== "" )
        {
            isPincode = true
        }
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <ProgressLoader
                        visible={ this.state.visible }
                        isModal={ true }
                        isHUD={ true }
                        hudColor={ White }
                        color={ Light_Green } />
                    {
                        this.state.visible == false ?
                            <View>
                                <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'My Details' } />
                                <View>
                                    <this.renderDetail
                                        value={ this.state.email }
                                        onChangeText={ ( text ) => { this.setState( { email: text } ) } }
                                        keyboardType={ 'default' }
                                        editable={ this.state.isEditable }
                                        name={ "Email " } />

                                    <this.renderDetail
                                        value={ this.state.phone }
                                        onChangeText={ ( text ) => { this.setState( { phone: text } ) } }
                                        keyboardType={ 'number-pad' }
                                        editable={ this.state.isEditable }
                                        name={ "Mobile Number " } />

                                    <Text style={ [ styles.regularText, { fontFamily: POPINS_SEMI_BOLD, paddingHorizontal: 10, paddingVertical: 15 } ] }>Delivery Address :</Text>
                                    <this.renderDetail
                                        value={ this.state.strit }
                                        onChangeText={ ( text ) => { this.setState( { strit: text } ) } }
                                        keyboardType={ 'default' }
                                        editable={ this.state.isEditable }
                                        name={ "Street " } />
                                    <this.renderDetail
                                        value={ this.state.city }
                                        onChangeText={ ( text ) => { this.setState( { city: text } ) } }
                                        keyboardType={ 'default' }
                                        editable={ this.state.isEditable }
                                        name={ "City/Town " } />

                                    <this.renderDetail
                                        value={ this.state.stateName }
                                        onChangeText={ ( text ) => { this.setState( { stateName: text } ) } }
                                        keyboardType={ 'default' }
                                        editable={ this.state.isEditable }
                                        name={ "State/Province/Region" } />
                                    <this.renderDetail
                                        value={ this.state.zip }
                                        onChangeText={ ( text ) => { this.setState( { zip: text } ) } }
                                        keyboardType={ 'default' }
                                        editable={ this.state.isEditable }
                                        name={ "Zip/Postal Code" } />

                                    <View style={ { height: 200, justifyContent: 'center' } }>
                                        {
                                            this.state.isEditable === true ?
                                                <FilledButton
                                                    title={ "Update" }
                                                    onPress={ () =>
                                                    {
                                                        this.UpdateProfile();
                                                    } }
                                                    style={ { width: screen_width / 2.5, alignSelf: "center",
                                                opacity:
                                                 
                                                (isStreetAddress ===true)&&
                                                (isPincode ===true)&&
                                                (isCity===true) &&
                                                (isState ===true) &&
                                                (isPhoneNo ===true)&&
                                                (isEmail ===true) ? 1 :0.5 } }
                                                    textStyle={ { paddingVertical: 5, fontSize: 14 } } 
                                                    disabled={
                                                        (isStreetAddress ===true)&&
                                                        (isPincode ===true)&&
                                                        (isCity===true) &&
                                                        (isState ===true) &&
                                                        (isPhoneNo ===true)&&
                                                        (isEmail ===true) ?false :true
                        
                                                    }/>
                                                :
                                                null
                                        }
                                    </View>
                                </View>
                            </View>
                            : null
                    }
                </SafeAreaView>
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
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( MyDetails );
