import React from 'react';
import { Component } from 'react';
import { View, SafeAreaView, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import BasicHeader from '../../Components/BasicHeader';
import { actions } from '../../Redux/actions';
import { Light_Green } from '../../Utils/colors';
import { POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class MyDetails extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            email: '',
            phone: '+91 9285004531',
            strit: 'Ahemdabad',
            city: 'Ahemdabad',
            stateName: 'Gujarat',
            zip: '380060',
            isEditable: false
        }
    }
    renderDetail = ( detail ) =>
    {
        return (
            <View style={ styles.ItemView } >
                <View style={ styles.rowView }>

                    <Text style={ [ styles.normalText,{color:Light_Green,fontSize:14} ] }>{ detail.name } :</Text>
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

    componentDidMount(){
        console.log('this.props.routes.params.data',this.props.route.params.data);
        this.setState({
            email:this.props.route.params.data[0].user_email
        })
        // this.props.profileCall({
        //    "request":this.state.us
        // })
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
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

                        <Text style={[ styles.regularText ,{fontFamily:POPINS_SEMI_BOLD, paddingHorizontal:10,paddingVertical:15}]}>Delivery Address :</Text>
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
                            value={ this.state.stateName }
                            onChangeText={ ( text ) => { this.setState( { stateName: text } ) } }
                            keyboardType={ 'default' }
                            editable={ this.state.isEditable }
                            name={ "Zip/Postal Code" } />
                    </View>
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
export default connect( mapStateToProps, mapDispatchToProps )( MyDetails );
