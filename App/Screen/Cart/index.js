import React, { Component } from 'react';
import { FlatList, Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import { Gray, Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';

class Cart extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            link: [
                {
                    "id": 0,
                    "url": require( '../../../assets/banner1.png' )
                },
                {
                    "id": 1,
                    "url": require( '../../../assets/banner2.png' )
                },
                {
                    "id": 2,
                    "url": require( '../../../assets/banner1.png' )
                }

            ],
            quentity: 0
        }
    }
    renderItem = ( item, index ) =>
    {
        return (
            <View style={ styles.ItemView }>
                <View style={ { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', } }>
                    <Image
                        style={ styles.ImageStyle }
                        source={ require( '../../../assets/product.png' ) } />
                    <View style={ styles.middleContainer }>
                        <Text style={ styles.normalText }>Product Name</Text>
                        <Text style={ styles.smallText }>1 kg</Text>
                        <View style={ styles.q_container }>
                            <TouchableOpacity style={ styles.btnStyle } onPress={ () =>
                            {
                                this.setState( {
                                    quentity: this.state.quentity - 1
                                } )
                            } }>
                                <Image
                                    style={ styles.iconStyle2 }
                                    source={ require( '../../../assets/minus.png' ) } />
                            </TouchableOpacity>
                            <View style={ styles.q_Container }>
                                <Text style={ styles.quentityText }>{ this.state.quentity }</Text>
                            </View>
                            <TouchableOpacity style={ styles.btnStyle } onPress={ () =>
                            {
                                this.setState( {
                                    quentity: this.state.quentity + 1,

                                } )

                            } }>
                                <Image
                                    style={ [ styles.iconStyle2, { tintColor: Light_Green } ] }

                                    source={ require( '../../../assets/plus.png' ) } />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={ styles.endContainer }>
                    <TouchableOpacity style={ {
                        top: "10%",
                    } }>
                        <Image
                            style={ [ styles.iconStyle2, { tintColor: Gray, } ] }
                            source={ require( '../../../assets/closed.png' ) } />
                    </TouchableOpacity>
                    <View style={ {
                        top: "30%", alignSelf: 'flex-end'
                    } }>
                        <Text style={ styles.smallText }>Rs. 25000</Text>
                        <View style={ styles.bottomLine }></View>


                        <Text style={ [ styles.normalText ] }>Rs. 2000</Text>
                    </View>
                </View>
            </View>
        );
    }

    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Cart' } />
                    {
                        this.state.link.length > 0 ?
                            <View style={ { height: screen_height / 1.2 - 30, } }>
                                <FlatList
                                    data={ this.state.link }
                                    scrollEnabled={ true }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) => this.renderItem( item, index ) }
                                />
                            </View>
                            :
                            <View style={ { justifyContent: 'center', alignItems: 'center', height: screen_height / 1.5 } }>
                                <Image
                                    style={ styles.emptyCart }
                                    source={ require( '../../../assets/emptyCart.png' ) } />

                                <Text style={ styles.titleText }>Oops</Text>
                                <Text style={ [ styles.normalText, { fontSize: 18, fontFamily: POPINS_REGULAR, textAlign: 'center' } ] }>Your Cart is Empty</Text>
                            </View>
                    }
                </SafeAreaView>

            </View>
        );
    }
}

export default Cart;