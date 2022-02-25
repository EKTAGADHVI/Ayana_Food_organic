import React, { Component } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import { screen_height, screen_width } from '../../Utils/constant';
import styles from './styles';

class AddDeliveryLocation extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            deliveryCode: ''
        }
    }
    render ()
    {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
        return (
            <ImageBackground
                style={ styles.mainLayout }
                source={ require( '../../../assets/background.png' ) } >
                <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}  automaticallyAdjustContentInsets={true} >
                   
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <BasicHeader style={ { backgroundColor: 'transperent' } } OnBackPress={ () => { this.props.navigation.goBack() } } />
                       
                            <View style={ { height: screen_height / 1.6 ,justifyContent:'center'} }>
                                <Image
                                    source={ require( '../../../assets/locationImage.png' ) }
                                    style={ styles.bannerStyle } />
                                <View style={ { paddingVertical: 10, paddingHorizontal: 15 } }>
                                    <Text style={ styles.titleText }>Select Delivery Location</Text>
                                    <Text style={ styles.normalText }>Product has been shown based on the delivery location</Text>
                                </View>
                            </View>
                            <View >
                                <Input

                                    title={ "Add Your Delivery Location" }
                                    value={ this.state.deliveryCode }
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            deliveryCode: text
                                        } )
                                    } }
                                    secureTextEntry={ false }
                                    placeholder={ "Enter Your Pincode" }
                                    textStyle={ styles.labelStyle }
                                />
                                <TouchableOpacity>
                                    <View style={ styles.rowView }>
                                        <Image
                                            style={ styles.iconStyle }
                                            source={ require( '../../../assets/current.png' ) } />
                                        <Text style={ styles.regularText }>Current Location Using GPS</Text>
                                    </View>
                                </TouchableOpacity>

                                <FilledButton
                                    onPress={ () => { } }
                                    title={ "Submit" } />
                            </View>
                     
                  
                    </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

export default AddDeliveryLocation;