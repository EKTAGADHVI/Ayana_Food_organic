import React from 'react';
import { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import { Gray, Light_Green } from '../../Utils/colors';
import { POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class OrderPreview extends Component
{
    constructor ( props )
    {
        super( props );
    }

    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Order Preview" } />

                    <View style={[styles.rowView,]}> 
                        <Text style={[styles.normalText,{fontSize:15 , fontFamily:POPINS_SEMI_BOLD,color:Light_Green}]}>Your Order</Text>
                    </View>
                    <View style={[styles.rowView]}>
                        <Text style={[styles.normalText,{fontFamily:POPINS_SEMI_BOLD}]}>Product</Text>
                        <Text style={[styles.normalText,{fontFamily:POPINS_SEMI_BOLD}]}>Price</Text>                     
                    </View>
                    <View style={[styles.rowView]}>
                        <Text style={[styles.normalText,{fontSize:12}]}>Green Gram seed  1 Kg x 1</Text>
                        <Text style={[styles.normalText,{fontSize:12}]}>Rs. 155.00</Text>                     
                    </View>
                    <View style={[styles.rowView]}>
                        <Text style={[styles.normalText,{fontSize:12}]}>Green Gram seed  1 Kg x 1</Text>
                        <Text style={[styles.normalText,{fontSize:12}]}>Rs. 155.00</Text>                     
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

export default OrderPreview;