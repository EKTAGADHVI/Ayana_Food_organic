import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import ProductView from '../../Components/ProductView';
import { actions } from '../../Redux/actions';
import { Light_Green, White, Black } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import Modal from "react-native-modal";
import styles from './styles';
import { PRODUCT_FILTER_ERROR, PRODUCT_FILTER_SUCESS } from '../../Redux/actionTypes';
import Apis from '../../RestApi/Apis';

class ProductViewScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {

            categoeries: [],
            request: this.props.route.params.request ? this.props.route.params.request : '',
            visible: false,
            filterData: [],
            modalvisible: false,
            checkedCat: null,
            checkedSeller: null,
            checkedPrice: null,
            PriceDAta:[{
                "name":"Price ( Low to High )",
                "tag":'lowtohigh'
            },
            {
                "name":"Price ( High to Low )",
                "tag":'hightolow'
            },{
                "name":"Popularity"
            },{
                "name":"Discount"
            }],
            selectedCat:[],
            selectedShop:[],
            selectedPrice:'',
           sellerData:[]

        }
        if ( this.state.categoryId !== '' )
        {
            // let request ={
            //     "category_id":this.state.categoryId
            // };
            // console.log("Request",request)
            this.props.getProductByCatId( this.state.request );

        }
    }
    componentDidMount ()
    {
        this.setState( {
            visible: true
        } )
        setTimeout( () =>
        {

            this.timeOut()
        }, 2500 )

    }
    addToCart = async ( item ) =>
    {
        let alreadyAdded = false;
        try
        {
            await AsyncStorage.getItem( 'AddToCart' )
                .then( ( res ) =>
                {
                    console.log( "DashBoard Cart", res )
                    let cart = JSON.parse( res );
                    if ( res !== null && cart.length > 0 )
                    {
                        this.setState( { cartItem: cart.length } )
                        alreadyAdded = cart.filter( ( data ) =>
                        {

                            console.log( "DHDHDH", data );
                            if ( data.ID === item.ID )
                            {
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                        } );
                    }
                    else
                    {

                    }
                } )
                .catch( ( error ) =>
                {
                    console.log( "Error", error )
                    this.setState( { cartData: [] } )
                } )
            if ( alreadyAdded === false )
            {
                let cartData = [];
                let finalItem = {
                    ...item,
                    selectedVariation: item.variation[ 0 ]?.attribute_pa_weight,
                    cartPrice: item.variation[ 0 ]?._price,
                    cartRegularPrice: item.variation[ 0 ]?._regular_price,
                    cartQuentity: 1,
                    regPrice: item.variation[ 0 ]?._regular_price,
                    sPrice: item.variation[ 0 ]?._price
                };
                cartData.push( finalItem );
                // cartData.push(item);
                await AsyncStorage.setItem( 'AddToCart', JSON.stringify( cartData ) )
                    .then( ( res ) =>
                    {

                        console.log( "Sucessfully Added" );
                    } )
                    .catch( ( error ) =>
                    {
                        console.log( "error", error );
                    } )
            }
            else
            {
                alert( "Item Already added" )
            }
        }
        catch ( error )
        {

        }
    }
    filterSeller=()=>{
        let seller = "";
        let data=[];
        if ( this.state.categoeries.length > 1 )
        {
            seller = this.state.categoeries.reduce( function ( prev, curr )
            {
              
                return prev.seller_name == curr.seller_name ? prev.seller_name : curr.seller_name;
            } );
            if(this.state.sellerData.length== 0){
                this.state.sellerData.push({
                    "seller_name": seller
                });
                // this.setState({sellerData:data})
            }
            this.state.categoeries.find((data)=>{
                if(data.seller_name !== seller){
                    this.state.sellerData.push({
                        "seller_name": data.seller_name
                    });
                  
                }
            })
           
        }
        else
        {
           seller =''
        }
        // return sell;
    }
    timeOut = () =>
    {
        setInterval( () =>
        {
            this.setState( { categoeries: this.props.getProductsListByCatId.data ?this.props.getProductsListByCatId.data:[] } );

            this.setState( {
                visible: false
            } )
            this.filterDisplay();
            this.filterSeller()
            // console.log( "Cateeeeee", this.props.getProductsListByCatId )

        }, 1000 )

    }
    displayPrice = ( data ) =>
    {

        let price = "";
        if ( data.length > 1 )
        {
            price = data.reduce( function ( prev, curr )
            {
                return prev._sale_price < curr._sale_price ? prev : curr;
            } );
            console.log( "MIN", price )
            // price = data[ 0 ].meta_value + " - " + data[ data.length - 1 ].meta_value
        }
        else
        {
            price = data[ 0 ]._sale_price
        }
        return price._sale_price;
    

    }
    displayWeight = ( data ) =>
    {

        let price = "";
        if ( data.length > 1 )
        {
            price = data.reduce( function ( prev, curr )
            {
                return prev._sale_price < curr._sale_price ? prev : curr;
            } );
            console.log( "MIN", price )
            // price = data[ 0 ].meta_value + " - " + data[ data.length - 1 ].meta_value
        }
        else
        {
            price = data[ 0 ].attribute_pa_weight
        }
        return price.attribute_pa_weight;
    

    }
    discountInPercentage = ( data ) =>
    {

        let discountPrice = data._regular_price - data._sale_price;
        let price = ( discountPrice / data._regular_price ) * 100;
        return price.toFixed( 1 ) + "%";
    }


    filterDisplay = () =>
    {
        let data = [];
        this.state.categoeries.length >0? this.state.categoeries.map( ( item, index ) =>
        {
            let filterData = {
                "category_id": item.category[ 0 ].category_id,
                "category_name": item.category[ 0 ].category_name,
                "seller_name": item.seller_name
            }
            data.push( filterData );
        } ):
        null
        this.setState( { filterData: data } );
    }

    callFilterProduct=()=>{
        this.setState({modalvisible:false,
        visible:true})
        let request ={
            "category_id":this.state.selectedCat,
            "seller_name":this.state.selectedShop,
            "price":this.state.selectedPrice,
        }
        // this.props.filterCall(request);
        Apis.productFilterCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("======PRODUCT_FILTER_LOADING====== >  ", JSON.parse(responce).data);
            this.setState({
                visible:false,
            categoeries: JSON.parse(responce).data.data});

            this.props.dispatch({
                type:PRODUCT_FILTER_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("======PRODUCT_FILTER_LOADING====== >  ", JSON.parse(responce).data);
            this.setState({
                visible:false,
                categoeries: this.props.getProductsListByCatId.data});
            // console.log("======PRODUCT_FILTER_LOADING====== >  ", JSON.parse(responce).data);
            this.props.dispatch({
                type:PRODUCT_FILTER_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        console.log("==== PRODUCT_FILTER_LOADING===Error=== ", error)
        this.setState({
            visible:false, categoeries: this.props.getProductsListByCatId.data});
        this.props.dispatch({
            type:PRODUCT_FILTER_ERROR,
            payload:error
        });
        console.log("==== PRODUCT_FILTER_LOADING===Error=== ", error)
    })   

 
    //  setTimeout(()=>{
    //          this.setState({categoeries:this.props.filteredProduct.data});
    //      },2500)
    }
    componentWillUnmount ()
    {
        this.setState( {
            categoeries: [],
            request: '',
            visible: false
        } )
        clearInterval( this.timeOut )
    }
    render ()
    {
        return (

            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ this.props.route.params.title }
                        rightMenuIcon={ require( '../../../assets/filter.png' ) }
                        OnRightMenuPress={ () =>
                        {
                            this.setState( { modalvisible: !this.state.modalvisible } )
                        } } />
                    <ProgressLoader
                        visible={ this.state.visible }
                        isModal={ true }
                        isHUD={ true }
                        hudColor={ White }
                        color={ Light_Green } />
                    {
                        this.state.categoeries && this.state.categoeries.length > 0  ?
                            <FlatList
                                data={ this.state.categoeries }
                                numColumns={ 2 }
                                extraData={ this.state.categoeries }
                                scrollEnabled={ true }
                                maxToRenderPerBatch={ 2 }
                                legacyImplementation={ false }
                                showsHorizontalScrollIndicator={ false }
                                showsVerticalScrollIndicator={ false }
                                keyExtractor={ ( item, index ) => index.toString() }
                                renderItem={ ( { item, index } ) =>
                                {
                                    var count = 14;
                                    return <ProductView
                                        name={ item.post_title.slice( 0, count ) + ( item.post_title.length > count ? "..." : "" ) }
                                        image={ item.img[ 0 ].img_path }
                                        // image={ item.img[0].img_path }
                                        rating={ item.rating[ 0 ].meta_value }
                                        weight={this.displayWeight(item.variation)}
                                        discount={ this.discountInPercentage( item.variation[ 0 ] ) }
                                        price={ this.displayPrice( item.variation ) }
                                        storeName={ item.seller_name }
                                        onPress={ () =>
                                        {
                                            this.props.navigation.navigate( 'ProductDetailScreen', {
                                                data: item
                                            } )
                                        } }
                                        // onAdd={ () =>
                                        // {
                                        //     this.addToCart( item );
                                        // } }
                                    />



                                } } />
                            :
                          this.state.visible===false?
                          <View style={ { justifyContent: 'center', alignItems: 'center', height: screen_height / 1.5 } }>
                          <Image
                              style={ styles.emptyCart }
                              source={ require( '../../../assets/emptyCart.png' ) } />

                          <Text style={ styles.titleText }>Oops</Text>
                          <Text style={ [ styles.normalText, { fontSize: 18, fontFamily: POPINS_REGULAR, textAlign: 'center' } ] }>Product Not Found !</Text>
                      </View>:
                      null
                    }
                    <Modal
                        isVisible={ this.state.modalvisible }
                        animationIn="slideInRight"
                        animationOut="slideOutRight"
                        transparent={ false }


                        onRequestClose={ () =>
                        {
                            this.setState( { modalvisible: false } )
                            // mooveRL();
                        } }>
                        <View style={ styles.modalContainer }>
                            <View style={ { marginVertical: "12%" } }>
                                <BasicHeader OnBackPress={ () => { this.setState( { modalvisible: false } ) } } title={ "Filter" }
                                />
                            </View>

                            <View style={ styles.modalSection }>
                                <View style={ { marginVertical: 15 } }>
                                    <Text style={ styles.TitleText }>Categories</Text>
                                    {
                                       this.state.filterData.length >0 ? this.state.filterData.map( ( item, index ) =>
                                        {
                                            return (
                                                <View key={ index }>
                                                    {this.state.checkedCat === index ?
                                                        <TouchableOpacity
                                                        style={ styles.rowView }

                                                            onPress={ () =>
                                                            {
                                                                this.setState( {
                                                                    checkedCat: index,

                                                                } )
                                                                this.state.selectedCat.push(item.category_id)
                                                            } }
                                                        >
                                                            <Image style={ { height: 22, width: 22, resizeMode: 'contain', } } source={ require( "../../../assets/checked.png" ) } />
                                                            <Text  style={ styles.catText }>{ item.category_name }</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                        style={ styles.rowView }

                                                            onPress={ () =>
                                                            {
                                                                this.setState( {
                                                                    checkedCat: index
                                                                } )
                                                                this.state.selectedCat.push(item.category_id)
                                                            } }
                                                        >
                                                            <Image style={ { height: 22, width: 22, resizeMode: 'contain', alignSelf: 'center' } } source={ require( "../../../assets/unchecked.png" ) } />
                                                            <Text  style={ styles.catText }>{ item.category_name }</Text>
                                                        </TouchableOpacity> }
                                                </View>
                                            );
                                        } )
                                        :null
                                    }
                                </View>

                                <View style={ { marginVertical: 15 } }>
                                    <Text style={ styles.TitleText }>Seller</Text>
                                    {
                                       this.state.sellerData.length >0 ? this.state.sellerData.map( ( item, index ) =>
                                        {
                                            console.log("Seller Data",item)
                                            return (
                                                <View key={ index }>
                                                    {this.state.checkedSeller === index ?
                                                        <TouchableOpacity
                                                        style={ styles.rowView }

                                                            onPress={ () =>
                                                            { 
                                                                // let cat =[...this.state.selectedCat,item.seller_name]
                                                                this.setState( {
                                                                    checkedSeller: index,
                                                                    // selectedShop:cat
                                                                } )
                                                                this.state.selectedShop.push(item.seller_name)
                                                                console.log("dddgd",item.seller_name)
                                                            } }
                                                        >
                                                            <Image style={ { height: 22, width: 22, resizeMode: 'contain', } } source={ require( "../../../assets/checked.png" ) } />
                                                            <Text  style={ styles.catText }>{ item.seller_name }</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                        style={ styles.rowView }

                                                            onPress={ () =>
                                                            {
                                                                this.setState( {
                                                                    checkedSeller: index,
                                                                   
                                                                } )
                                                                this.state.selectedShop.push(item.seller_name)
                                                            } }
                                                        >
                                                            <Image style={ { height: 22, width: 22, resizeMode: 'contain', alignSelf: 'center' } } source={ require( "../../../assets/unchecked.png" ) } />
                                                            <Text  style={ styles.catText }>{ item.seller_name  }</Text>
                                                        </TouchableOpacity> }
                                                </View>
                                            );
                                        } )
                                        :null
                                    }
                                </View>

                                <View style={ { marginVertical: 15 } }>
                                    <Text style={ styles.TitleText }>Price</Text>
                                    {
                                      this.state.PriceDAta.length >0?  this.state.PriceDAta.map( ( item, index ) =>
                                        {
                                            return (
                                                <View key={ index }>
                                                    {this.state.checkedPrice === index ?
                                                        <TouchableOpacity
                                                        style={ styles.rowView }

                                                            onPress={ () =>
                                                            {
                                                                this.setState( {
                                                                    checkedPrice: index,
                                                                    selectedPrice:item.tag
                                                                } )
                                                            } }
                                                        >
                                                            <Image style={ { height: 22, width: 22, resizeMode: 'contain', } } source={ require( "../../../assets/checked.png" ) } />
                                                            <Text style={ styles.catText }>{ item.name }</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            style={ styles.rowView }
                                                            onPress={ () =>
                                                            {
                                                                this.setState( {
                                                                    checkedPrice: index,
                                                                    selectedPrice:item.tag
                                                                } )
                                                            } }
                                                        >
                                                            <Image style={ { height: 22, width: 22, resizeMode: 'contain', alignSelf: 'center' } } source={ require( "../../../assets/unchecked.png" ) } />
                                                            <Text  style={ styles.catText }>{ item.name }</Text>
                                                        </TouchableOpacity> }
                                                </View>
                                            );
                                        } )
                                        :null
                                    }
                                </View>
                                <TouchableOpacity style={styles.btnStyle} onPress={()=>{
                                    this.callFilterProduct();
                                }}>
                                <Text style={[styles.normalText,{fontFamily:POPINS_REGULAR, color:White}]}>Apply</Text>
                            </TouchableOpacity>
                            </View>
                          
                        </View>

                    </Modal>

                </SafeAreaView>
            </View>
        );
    }
}
// export default ProductViewScreen;
function mapStateToProps ( state, ownProps )
{
    console.log( "state.productFilterReducer.data",state.productFilterReducer.data )
    return {
        // data : state.loginReducer.data
        products: state.productListReducer.data,
        getProductsListByCatId: state.getProductByCatIdReducer.data,
        filteredProduct:state.productFilterReducer.data

    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        getProductByCatId: ( request ) => dispatch( actions.getProductListByCatId( request ) ),
        filterCall:(request)=>dispatch(actions.productFilterAction(request)),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( ProductViewScreen );