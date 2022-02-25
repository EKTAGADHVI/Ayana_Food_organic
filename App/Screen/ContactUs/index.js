import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import styles from './styles';


class ContactUs extends Component
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
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Contac Us" } />

                    <View style={ { top: "5%" ,padding:10} }>
                        <View style={ styles.container }>
                            <Image
                                style={ styles.iconStyle }
                                source={ require( '../../../assets/office.png' ) } />
                            <View style={ styles.innerContainer }>
                                <Text style={ styles.titleText }>Register Office </Text>
                                <Text style={ styles.normalText }>B-68, World Bank Barra Kanpur,Pin -208027, Uttar Pradesh</Text>
                            </View>
                        </View>
                        <View style={ styles.container }>
                            <Image
                                style={ styles.iconStyle }
                                source={ require( '../../../assets/time.png' ) } />
                            <View style={ styles.innerContainer }>
                                <Text style={ styles.titleText }>Hours of Operation</Text>
                                <View style={styles.rowView}>
                                <View>
                                <Text style={ styles.normalText }>Monday to Saturday</Text>
                                <Text style={ styles.normalText }>Sunday</Text>
                               
                                </View>
                                <View>
                                <Text style={ styles.normalText }>10 AM to 6 PM</Text>
                                <Text style={ [styles.normalText,{textAlign:"right"}] }>Closed</Text>
                                </View>
                                </View>
                              
                                
                            </View>
                        </View>
                        <View style={ styles.container }>
                            <Image
                                style={ styles.iconStyle }
                                source={ require( '../../../assets/support.png' ) } />
                            <View style={ styles.innerContainer }>
                                <Text style={ styles.titleText }>Support</Text>
                                <Text style={ styles.normalText }>Mobile Number : +91 0512-3571904</Text>
                                <Text style={ styles.normalText }> Email : sales@ayanafoodorganic.com</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

        );
    }
}

export default ContactUs;