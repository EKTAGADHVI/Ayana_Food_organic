import React from 'react';
import { Component } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import { Black, Gray, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_width } from '../../Utils/constant';
import styles from './styles';

class CheckOut extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            fName: '',
            lName: '',
            compnyName: '',
            stretAddress: '',
            city: "",
            stateList: [ { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' } ],
            openState: false,
            state: '',
            state_Value: '',
            pinCode: '',
            billingPhone: '',
            billingEmail: ''
        }
    }

    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" :"height"} keyboardVerticalOffset={20}>
                    <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustContentInsets={true} >
                        <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Checkout" } />
                        <View style={ [ styles.rowView, { borderBottomColor: Gray, borderBottomWidth: 0.5 } ] }>
                            <Text style={ [ styles.normalText, { color: Light_Green } ] }> Billing Details</Text>
                            <TouchableOpacity style={ styles.minusButton }>
                                <Text style={ [ styles.normalText, { paddingVertical: 0, paddingHorizontal: 0, color: White } ] }> - </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                           
                            <View style={ [ styles.rowView, { width: screen_width - 30 } ] }>
                                <Input
                                    textStyle={{color:Black}}
                                    title={ "First Name" }
                                    value={ this.state.fName }
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            fName: text
                                        } )
                                    } }
                                    secureTextEntry={ false }

                                    inputStyle={ { width: screen_width / 2 - 30, } }
                                    placeholder={ "Enter Your First Name" }
                                />
                                <Input
                                      textStyle={{color:Black}}
                                    title={ "Last Name" }
                                    value={ this.state.lName }
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            lName: text
                                        } )
                                    } }
                                    containerStyle={ { marginHorizontal: 10 } }
                                    secureTextEntry={ false }
                                    inputStyle={ { width: screen_width / 2 - 30, } }
                                    placeholder={ "Enter Your Last Name" }
                                />
                            </View>

                            <Input
                                  textStyle={{color:Black}}
                                title={ "Company Name (Optional)" }
                                value={ this.state.compnyName }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        compnyName: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }
                                inputStyle={ { width: screen_width - 30, } }
                                placeholder={ "Enter Your Company Name" }
                            />
                            <Input
                                  textStyle={{color:Black}}
                                title={ "Street Address" }
                                value={ this.state.stretAddress }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        stretAddress: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }
                                multiline={ true }
                                inputStyle={ { width: screen_width - 30, height: 80 } }
                                placeholder={ "Enter Your Street Address" }
                            />
                            <Input
                                  textStyle={{color:Black}}
                                title={ "Town/City *" }
                                value={ this.state.city }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        city: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }
                                inputStyle={ { width: screen_width - 30, } }
                                placeholder={ "Enter Your Company Name" }
                            />


                            <Text style={ [ styles.normalText, { fontSize: 16, color: Black, } ] }>State *</Text>
                            <DropDownPicker
                                open={ this.state.openState }
                                value={ this.state.state }
                                items={ this.state.stateList }
                                setOpen={ () =>
                                {
                                    this.setState( { openState: !this.state.openState } )
                                } }
                                setValue={ ( callback ) =>
                                {
                                    this.setState( state => ( {
                                        state: callback( state.value ),
                                        // selectedTaskId: callback( state.value )
                                    } ) );
                                } }
                                setItems={ ( callback ) =>
                                {
                                    this.setState( state => ( {
                                        state_Value: callback( state.items )
                                    } ) );
                                } }
                                placeholder="Select Your State"
                                placeholderStyle={ [ styles.normalText, { fontSize: 14, color: Text_Gray } ] }
                                arrowIconStyle={ {
                                    width: 20,
                                    height: 20,
                                    tintColor: Black
                                } }
                                tickIconStyle={ {
                                    width: 20,
                                    height: 20,
                                    tintColor: Black
                                } }
                                containerStyle={ styles.containerStyle }
                                style={ {
                                    borderWidth: 0,
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: Gray
                                } }

                                dropDownContainerStyle={ {
                                    borderWidth: 0,
                                    backgroundColor: White
                                } }

                            />

                            <Input
                                  textStyle={{color:Black}}
                                title={ "PinCode *" }
                                value={ this.state.pinCode }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        pinCode: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }

                                inputStyle={ { width: screen_width - 30 } }
                                placeholder={ "Enter Your PinCode" }
                            />

                            <Input
                                  textStyle={{color:Black}}
                                title={ "Billing Phone Number *" }
                                value={ this.state.billingPhone }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        billingPhone: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }

                                inputStyle={ { width: screen_width - 30, } }
                                placeholder={ "Enter Your Billing Phone Number" }
                            />

                            <Input
                              textStyle={{color:Black}}
                                title={ "Billing Email *" }
                                value={ this.state.billingEmail }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        billingEmail: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }

                                inputStyle={ { width: screen_width - 30, } }
                                placeholder={ "Enter Your Billing Email" }
                            />

                            <FilledButton title="Apply and Continue"
                                style={ { width: screen_width - 30, borderRadious: 15, marginVertical: "6%", alignSelf: "center", } }
                                textStyle={ { fontSize: 16, paddingVertical: 8 } }
                                onPress={ () => {this.props.navigation.navigate('OrderPreview') } } />
 
                        </View>
                      
                    </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        );
    }
}

export default CheckOut;