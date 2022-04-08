import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import { Gray, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';
class Favourite extends Component
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
            quentity: 0,
            favData:[]
        }
    }

    async componentDidMount(){
        await AsyncStorage.getItem( 'addToFav' )
        .then( ( res ) =>
        {
            console.log('Fav DATA',res)
       
            if ( res !== null )
            {
                this.setState( { favData: JSON.parse( res ),
                visible:false } )
              
            }
            else
            {
                this.setState( { favData: [],
                visible:false } )
            }
        } )
        .catch( ( error ) =>
        {
            console.log( "Error", error )
            this.setState( { favData: [] } )
        } )
    }
    displayPrice = ( data ) =>
    {
        let price = "";
        if ( data.length > 1 )
        {
            price = data[ 0 ].meta_value + " - " + data[ data.length - 1 ].meta_value
        }
        else
        {
            price = data[ 0 ].meta_value
        }
        return price;
    }

    removeItem = async ( id ) =>
    {
        let remove = this.state.favData.filter( ( data ) =>
        {
            return data.ID !== id
        } );
        await AsyncStorage.setItem( 'addToFav', JSON.stringify( remove ) )
            .then( ( res ) =>
            {
                
                this.setState( { favData: remove } )
            } )
            .catch( ( error ) =>
            {
                console.log( "Error", error )
               
            } )

    }
    renderItem = ( item, index ) =>
    {
        console.log("Image",item.img[0].img_path);
        return (
            <View style={ styles.ItemView }>
                
                <View style={ { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', } }>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={ {
                        alignSelf: 'center',
                        height:18,
                        width:18,
                        backgroundColor:Light_Green,
                        padding:3,
                        borderRadius:9,
                        justifyContent:"center"
                    } } 
                    onPress={()=>{
                        this.removeItem( item.ID )
                    }}>
                        <Image
                            style={ [ styles.iconStyle2,{tintColor:White,} ] }

                            source={ require( '../../../assets/closed.png' ) } />
                    </TouchableOpacity>
                    <Image
                        style={ styles.ImageStyle }
                        source={ {uri:item.img[0].img_path}} />
                    </View>
        
                    <View style={ styles.middleContainer }>
                        <Text style={ styles.normalText }>{ item.post_title.slice( 0, 18 ) + ( item.post_title.length > 20 ? "..." : "" ) }</Text>
                        <Text style={ styles.smallText }>{item.seller_name}</Text>
                        <Text style={ [styles.normalText,{fontSize:12}] }>Rs. {this.displayPrice( item.price )}</Text>
                    </View>
                </View>
                <View style={ styles.endContainer }>
                    <TouchableOpacity style={ {
                        alignSelf: 'center',
                        backgroundColor:Light_Green,padding:5,
                        borderRadius:8
                    } }>
                        <Image
                            style={ [ styles.iconStyle2, ] }

                            source={ require( '../../../assets/plus.png' ) } />
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Favourite' } />
                    {
                        this.state.link.length > 0 ?
                            <View style={ { height: screen_height / 1.2 - 30, } }>
                                <FlatList
                                    data={ this.state.favData }
                                    extraData={this.state.favData}
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
                                <Text style={ [ styles.normalText, { fontSize: 18, fontFamily: POPINS_REGULAR, textAlign: 'center' } ] }>No favourite yet !</Text>
                            </View>
                    }
                </SafeAreaView>

            </View>
        );
    }
}

export default Favourite