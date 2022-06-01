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
       
        if(data !== undefined){
            let l_data = data.filter((item)=>{
        
                return Object.keys(item).indexOf("_sale_price")!= -1 ?item :null
            
        });
            if ( data?.length > 1 )
        {
            /// new Logic

            if(Object.keys(data[ 0 ]).indexOf("_sale_price")!= -1){
                price=data[ 0 ]?._sale_price
            }
            else if(Object.keys(data[ 0 ]).indexOf("_price")!= -1){
                price=data[ 0 ]?._price
            }
            else{
                price=data[ 0 ]?._regular_price
            }

        //   Old Logic
            // console.log("L DATA",l_data)
            // price = l_data?.reduce( function ( prev, curr )
            // {
            
            //         return prev?._sale_price < curr?._sale_price ? prev : curr;
                
               
            // } );
           
            // console.log( "MIN", price )
            return price;
            // price = data[ 0 ].meta_value + " - " + data[ data.length - 1 ].meta_value
        }
        else
        {
            let price;
            if(Object.keys(data[ 0 ]).indexOf("_sale_price")!= -1){
                price=data[ 0 ]?._sale_price
            }
            else if(Object.keys(data[ 0 ]).indexOf("_price")!= -1){
                price=data[ 0 ]?._price
            }
            else{
                price=data[ 0 ]?._regular_price
            }
         return price
        }

        }
       
        // console.log("Price",price._sale_price)
       
        // return 50;
    }

    displayWeight = ( data ) =>
    {
        // console.log( "WEIGHJHGHG",data)
        let price = "";
    
        if(data!== undefined){
            if ( data.length > 1)
        {
            return data[ 0 ].attribute_pa_weight
           
           
            //==== OLD =====//
        //                 price = data.reduce( function ( prev, curr )
        //     {
        //         return prev._sale_price < curr._sale_price ? prev : curr;
        //     } );
        //     // console.log( "MIN", price )
        //    return  price.attribute_pa_weight
        //     // price = data[ 0 ].meta_value + " - " + data[ data.length - 1 ].meta_value
        }
        else
        {
           return data[ 0 ].attribute_pa_weight
        }
        }
       
    

    }
    addToCart = async ( item ) =>
    {
        let added = false;
        let previousData = null;
        let alreadyAdded = false;
        try
        {
            await AsyncStorage.getItem( 'AddToCart' )
                .then( ( res ) =>
                {
                    console.log( "DashBoard Cart", res )
                    let cart = JSON.parse( res );
                    previousData = JSON.parse( res );
                    if ( res !== null && cart.length > 0 )
                    {
                        // this.setState( { cartItem: cart.length } )
                        alreadyAdded = cart.filter( ( data ) =>
                        {

                            console.log( "DHDHDH", data );
                            if ( data.ID === item.ID )
                            {
                                if ( data.selectedVariation === this.state.selectedVarinat )
                                {
                                    added = true;
                                }
                                else
                                {
                                    added = false
                                }
                                return true;
                            }
                            else;
                            {
                                added = false;
                                return false;
                            }
                        } );
                    }
                    else
                    {
                        added = false;
                        alreadyAdded = false;
                    }
                } )
                .catch( ( error ) =>
                {
                    console.log( "Error", error )
                    // this.setState( { cartData: [] } )
                } )

            console.log( "Alreday Added", added )
            if ( added === false )
            {
                let cartData = [];

                // previousData=[];
                let finalItem = {
                    ...item,
                    selectedVariation: this.state.selectedVarinat,
                    cartPrice: this.state.price * this.state.quentity,
                    cartRegularPrice: this.state.cartRegularPrice,
                    cartQuentity: this.state.quentity,
                    regPrice: this.state.regPrice,
                    sPrice: this.state.sPrice
                };
                if(previousData != null){
                    previousData.push( finalItem );
                }else{
                    previousData=[];
                    previousData.push( finalItem );
                }
               
                await AsyncStorage.setItem( 'AddToCart', JSON.stringify( previousData ) )
                    .then( ( res ) =>
                    {
                        EventRegister.emit( 'Add-to-cart' )

                        setTimeout( () =>
                        {
                            this.props.navigation.navigate( 'Cart' );
                        }, 1000 )
                        console.log( "Sucessfully Added" );
                    } )
                    .catch( ( error ) =>
                    {
                        console.log( "error", error );
                    } )
            }
            else
            {
                // let finalItem ={
                //     ...item,
                //     selectedVariation:this.state.selectedVarinat,
                //     cartPrice:this.state.price * this.state.quentity + 1,
                //     cartRegularPrice:this.state.cartRegularPrice,
                //     cartQuentity:this.state.quentity,
                //     regPrice:this.state.regPrice,
                //     sPrice:this.state.sPrice
                // };
                // previousData.push(finalItem );
                let UpdatedData = previousData.filter( ( data ) =>
                {
                    if ( data.ID === item.ID )
                    {
                        if ( data.selectedVariation !== this.state.selectedVarinat )
                        {
                            // let finalItem ={
                            //     ...data,
                            //     selectedVariation:this.state.selectedVarinat,
                            //     cartPrice:this.state.price * this.state.quentity + 1,
                            //     cartRegularPrice:this.state.cartRegularPrice,
                            //     cartQuentity:this.state.quentity,
                            //     regPrice:this.state.regPrice,
                            //     sPrice:this.state.sPrice
                            // };
                            return data
                        }
                    }
                } );
                let oldData = previousData.filter( ( data ) =>
                {
                    if ( data.ID !== item.ID )
                    {
                        if ( data.selectedVariation !== this.state.selectedVarinat )
                        {
                            // let finalItem ={
                            //     ...data,
                            //     selectedVariation:this.state.selectedVarinat,
                            //     cartPrice:this.state.price * this.state.quentity + 1,
                            //     cartRegularPrice:this.state.cartRegularPrice,
                            //     cartQuentity:this.state.quentity,
                            //     regPrice:this.state.regPrice,
                            //     sPrice:this.state.sPrice
                            // };
                            return data
                        }
                    }
                } );
                console.log( "DAATTATATTATA", UpdatedData )
                this.setState( { quentity: this.state.quentity + 1 } )
              if (oldData !== null){
                oldData.push( {

                    ...item,
                    selectedVariation: this.state.selectedVarinat,
                    cartPrice: this.state.price * this.state.quentity,
                    cartRegularPrice: this.state.cartRegularPrice,
                    cartQuentity: this.state.quentity,
                    regPrice: this.state.regPrice,
                    sPrice: this.state.sPrice

                } )
              }
              else{
                  oldData =[]
              }
                await AsyncStorage.setItem( 'AddToCart', JSON.stringify( oldData ) )
                    .then( ( res ) =>
                    {

                        EventRegister.emit( 'Add-to-cart' )
                        this.props.navigation.navigate( 'Cart' );
                        console.log( "Sucessfully Added" );
                    } )
                    .catch( ( error ) =>
                    {
                        console.log( "error", error );
                    } )
                // alert( "Item Already added" )
            }
        }
        catch ( error )
        {

        }
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
                  
                        <Text style={ [styles.normalText,{fontSize:12}] }>Rs. {this.displayPrice( item.variation )}   <Text style={ [styles.smallText,{color:Text_Gray,textAlign:"center"}] }>{this.displayWeight(item.variation)}</Text></Text>
                    </View>
                </View>
                <View style={ styles.endContainer }>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('ProductDetailScreen',{
                            data: item
                        })
                      
                    }}
                    style={ {
                        alignSelf: 'center',
                        backgroundColor:Light_Green,padding:5,
                        borderRadius:8
                    } }
                >
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