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
import { PRODUCT_FILTER_ERROR, PRODUCT_FILTER_SUCESS, PRODUCT_LIST_BY_CAT_ID_EROOR, PRODUCT_LIST_BY_CAT_ID_SUCESS } from '../../Redux/actionTypes';
import Apis from '../../RestApi/Apis';
import { ScrollView } from 'react-native-gesture-handler';

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
            isInternet:false,
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
                "name":"Discount",
                "tag":'discount'
            }],
            selectedCat:[],
            selectedShop:[],
            selectedPrice:'',
           sellerData:[]

        }
      
        // console.log("Product IDDD",this.state.request)
        if ( this.state.categoryId !== '' )
        {
            // let request ={
            //     "category_id":this.state.categoryId
            // };
            // console.log("Request",request)
            // this.props.getProductByCatId( this.state.request );

        }
    }

    callProductByID=()=>{
        this.setState( {
            visible: true
        } )
        Apis.getProductByCategoryId(this.state.request)
        .then((res)=>{
          return JSON.stringify(res);
      })
      .then((responce)=>{
        this.setState( {
            visible: false
        } )
          if(JSON.parse(responce).data.status == true){
            //   console.log("====== Product List By Cat ID ====== >  ", JSON.parse(responce).data);
              this.props.dispatch({
                  type:PRODUCT_LIST_BY_CAT_ID_SUCESS,
                  payload:JSON.parse(responce).data
              });
              this.setState( { categoeries: JSON.parse(responce)?.data?.data} );
          }
          else{
            //   console.log("====== Product List By Cat ID ====== >  ", JSON.parse(responce).data);
              this.props.dispatch({
                  type:PRODUCT_LIST_BY_CAT_ID_EROOR,
                  payload:JSON.parse(responce).data
              });
              this.setState( {
                visible: false
            } )
          }
         
      })
      .catch((error)=>{
        this.setState( {
            visible: false
        } )
          this.props.dispatch({
              type:PRODUCT_LIST_BY_CAT_ID_EROOR,
              payload:error
          });
          console.log("==== Category List===Error=== ", error)
      })   
  
   
    }
    componentDidMount ()
    {
       this.callProductByID()
        setTimeout( () =>
        {

            this.setState( { categoeries: this.props.getProductsListByCatId.data ?this.props.getProductsListByCatId.data:[] } );

            // this.setState( {
            //     visible: false
            // } )
            this.filterDisplay();
            this.filterSeller()
        }, 3000 )

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
        let final= [];
        if ( this.state.categoeries?.length > 0 )
        {
          this.state?.categoeries?.map((item, index)=>{
                data.push({
                    "seller_name": item?.seller_name
                });
            } );
         
                // this.setState({sellerData:data})
            
            final = data.filter((v,i,a)=>a.findIndex(v2=>(v2.seller_name===v.seller_name))===i)
            console.log("Filter Data",final)
          
            this.setState({sellerData:final})
           
        }
        else
        {
           seller =''
        }
        this.setState({sellerData:final});
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
    checkInternet=()=>{
        NetInfo.fetch().then( state =>
            {
                console.log( "Connection type", state.type );
                console.log( "Is connected?", state.isConnected );
                if ( state.isConnected == true )
                {
                  this.setState({isInternet:true,})
                  this.callApi()
                }
                else
                {
                    this.setState({isInternet:false})
                }
            } );
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
          
            // console.log("L DATA",l_data)
            price = l_data?.reduce( function ( prev, curr )
            {
            
                    return prev?._sale_price < curr?._sale_price ? prev : curr;
                
               
            } );
           
            // console.log( "MIN", price )
            return price?._sale_price;
            // price = data[ 0 ].meta_value + " - " + data[ data.length - 1 ].meta_value
        }
        else
        {
         return Object.keys(data[ 0 ]).indexOf("_sale_price")!= -1? Object.keys(data[ 0 ]).indexOf("_regular_price")? data[ 0 ]?._regular_price : data[ 0 ]?._price:data[ 0 ]?._regular_price
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
            price = data.reduce( function ( prev, curr )
            {
                return prev._sale_price < curr._sale_price ? prev : curr;
            } );
            // console.log( "MIN", price )
           return  price.attribute_pa_weight
            // price = data[ 0 ].meta_value + " - " + data[ data.length - 1 ].meta_value
        }
        else
        {
           return data[ 0 ].attribute_pa_weight
        }
        }
       
    

    }
    discountInPercentage = ( data ) =>
    {
        // console.log("Discount In Percentage", data);

        if(data !== undefined && data.length>0){
            let discountPrice = data[0]?._regular_price - data[0]?._sale_price;
        let price = ( discountPrice / data[0]._regular_price ) * 100;
        return price.toFixed( 1 ) + "%";
        }
        else{
            return "";
        }
    }


    filterDisplay = () =>
    {
        let data = [];
        let final=[];
        this.state?.categoeries?.length >0? this.state.categoeries?.map( ( item, index ) =>
        {
            let filterData = {
                "category_id": item?.category[ 0 ]?.category_id,
                "category_name": item?.category[ 0 ]?.category_name,
               
            }
            data.push( filterData );
        } ):
        null

        final = data.filter((v,i,a)=>a.findIndex(v2=>['category_name','category_id'].every(k=>v2[k] ===v[k]))===i)
        console.log("Filter Data",final)
        this.setState( { filterData: final } );
        

    }

    callFilterProduct=()=>{
        this.setState({modalvisible:false,
        visible:true})
        let request ={
            "category_id":this.state.selectedCat,
            "seller_name":this.state.selectedShop,
            "price":this.state.selectedPrice
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
            categoeries: JSON.parse(responce)?.data?.data});

            this.props.dispatch({
                type:PRODUCT_FILTER_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("======PRODUCT_FILTER_LOADING====== >  ", JSON.parse(responce).data);
            this.setState({
                visible:false,
                categoeries: []});
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
                        this.state.categoeries && this.state.categoeries.length > 0 && this.state.visible==false  ?
                            <FlatList
                                data={ this.state.categoeries }
                                numColumns={ 2 }
                                extraData={ this.state.categoeries }
                                scrollEnabled={ true }
                              
                                legacyImplementation={ false }
                                showsHorizontalScrollIndicator={ false }
                                showsVerticalScrollIndicator={ false }
                                keyExtractor={ ( item, index ) => index.toString() }
                                renderItem={ ( { item, index } ) =>
                                {
                                   
                                    var count = 14;
                                    return <ProductView
                                        name={ item.post_title.slice( 0, count ) + ( item.post_title.length > count ? "..." : "" ) }
                                        image={ item?.img[ 0 ]?.img_path }
                                        // image={ item.img[0].img_path }
                                        rating={ item.rating[ 0 ].meta_value }
                                        weight={this.displayWeight(item?.variation)}
                                        discount={ this.discountInPercentage( item?.variation )}
                                        price={ this.displayPrice( item?.variation ) }
                                        storeName={ item?.seller_name }
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
                                <ScrollView>
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
                            </ScrollView>
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
        filteredProduct:state.productFilterReducer.data,
        productLoading:state.getProductByCatIdReducer.isLoading

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