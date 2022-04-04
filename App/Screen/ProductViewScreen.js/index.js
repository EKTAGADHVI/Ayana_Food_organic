import React, { Component } from 'react';
import { FlatList, SafeAreaView, View,Image,Text } from 'react-native';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import ProductView from '../../Components/ProductView';
import { actions } from '../../Redux/actions';
import { Light_Green, White } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';

class ProductViewScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {

            categoeries: [],
            request: this.props.route.params.request ? this.props.route.params.request : '',
            visible: false

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
timeOut =() =>{
    setInterval( () =>
    {
        this.setState( { categoeries: this.props.getProductsListByCatId.data } );
        this.setState( {
            visible: false
        } )
        // console.log( "Cateeeeee", this.props.getProductsListByCatId )
      
    }, 1000 )
   
}
displayPrice = (data) =>{
    let price ="";
    if(data.length >1){
        price = data[0].meta_value + " - " +data[data.length-1].meta_value
    }
    else{
        price = data[0].meta_value
    }
    return price;
}
discountInPercentage=(data)=>{
    console.log("Prioce",data)
    let discountPrice = data._regular_price -data._sale_price;
    let price =(discountPrice/data._regular_price)*100;
    return price.toFixed(1) + "%";
}

    componentWillUnmount ()
    {
        this.setState( {
            categoeries: [],
            request: '',
            visible: false
        } )
        clearTimeout(this.timeOut)
    }
    render ()
    {
        return (

            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ this.props.route.params.title }
                        rightMenuIcon={ require( '../../../assets/filter.png' ) } />
                    <ProgressLoader
                        visible={ this.state.visible }
                        isModal={ true }
                        isHUD={ true }
                        hudColor={ White }
                        color={ Light_Green } />
                 {
                     this.state.categoeries &&     this.state.categoeries.length>0?
                     <FlatList
                     data={ this.state.categoeries }
                     numColumns={ 2 }
                     extraData={this.state.categoeries}
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
                             image={ item.img[0].img_path }
                             // image={ item.img[0].img_path }
                             rating={ item.rating[0].meta_value }
                             discount={this.discountInPercentage(item.variation[0])}
                             price={ this.displayPrice(item.price) }
                             storeName={ item.seller_name }
                             onPress={ () =>
                             {
                                 this.props.navigation.navigate( 'ProductDetailScreen', {
                                     data: item
                                 } )
                             } }
                         />



                     } } />
                     :
                     <View style={ { justifyContent: 'center', alignItems: 'center', height: screen_height / 1.5 } }>
                     <Image
                         style={ styles.emptyCart }
                         source={ require( '../../../assets/emptyCart.png' ) } />

                     <Text style={ styles.titleText }>Oops</Text>
                     <Text style={ [ styles.normalText, { fontSize: 18, fontFamily: POPINS_REGULAR, textAlign: 'center' } ] }>Product Not Fount !</Text>
                 </View>
                 }
                </SafeAreaView>
            </View>
        );
    }
}
// export default ProductViewScreen;
function mapStateToProps ( state, ownProps )
{
    console.log( " state.getProductByCatIdReducer.data", state.getProductByCatIdReducer.data )
    return {
        // data : state.loginReducer.data
        products: state.productListReducer.data,
        getProductsListByCatId: state.getProductByCatIdReducer.data

    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        getProductByCatId: ( request ) => dispatch( actions.getProductListByCatId( request ) ),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( ProductViewScreen );