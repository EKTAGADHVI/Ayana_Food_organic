import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../../Redux/actions';
import { LOGIN_SUCESS } from '../../Redux/actionTypes';
import { Black, Light_Green, Text_Gray } from '../../Utils/colors';
import { POPINS_REGULAR } from '../../Utils/fonts';

class SplashScreen extends Component
{
  constructor ( props )
  {
    super( props );
    //  this.callApi()
  }

  // callApi = async() =>{
  //   this.props.getCategoeryList()

  //   this.props.getTopRatedProduct( {
  //       "product_type": "toprated"
  //   } );
  //   this.props.getFeaturedProduct( {
  //       "product_type": "featured"
  //   } );
  //   this.props.getOnSaleProduct( {
  //       "product_type": "onsale"
  //   } );
  //   this.props.videosCall();
  //   this.props.bestOffersCall();
  //   this.props.getOrganicWorldProduct( {
  //       "product_type": "organic-world"
  //   } );
  //   this.props.getBestSellingProduct( {
  //       "product_type": "bestselling"
  //   } );
  //   this.props.getRecentProduct( {
  //       "product_type": "recent"
  //   } );
  // }
  async componentDidMount ()
  {
    setTimeout( async () =>
    {

      await AsyncStorage.getItem( 'UserData' )
        .then( ( response ) =>
        {
          console.log( "response", response )
          if ( response !== null && response !== "" )
          {
            this.props.dispatch( {
              type: LOGIN_SUCESS,
              payload: JSON.parse( response )
            } );

            AsyncStorage.getItem( 'PostalCode' )
              .then( ( postalcode ) =>
              {
                if ( postalcode !== null && postalcode !== "" )
                {
                  this.props.navigation.dispatch(
                    CommonActions.reset( {
                      index: 1,
                      routes: [
                        { name: 'Home' },
                      ],
                    } )
                  );
                }
                else
                {
                  this.props.navigation.dispatch(
                    CommonActions.reset( {
                      index: 1,
                      routes: [
                        { name: 'AddDeliveryLocation' },
                      ],
                    } )
                  );
                }
              } )
              .catch( ( err ) => { } )

          }
          else
          {
            this.props.navigation.dispatch(
              CommonActions.reset( {
                index: 1,
                routes: [
                  { name: 'LoginScreen' },
                ],
              } )
            );
          }
        } )
        .catch( ( error ) =>
        {

          console.log( "error" )
        } )




    }, 2000 )
  }
  render ()
  {
    return (
      <View style={ { flex: 1 } }>
        <ImageBackground
          style={ { height: "100%", width: "100%" } }
          source={ require( '../../../assets/splash3.png' ) }>

          <View style={{alignSelf:"center",top:"20%"}}>
            <Text style={{color:Light_Green,fontFamily:POPINS_REGULAR,textAlign:'center'}}>Powered By</Text>
            <Text style={{color:Black,fontFamily:POPINS_REGULAR,textAlign:'center',fontSize:14}}>Ayana Food Organic Pvt. Ltd.</Text>
          </View>
        </ImageBackground>

      </View>
    );
  }
}

function mapStateToProps ( state, ownProps )
{
  console.log( "state.homePageReducer.data ", state.categoeryListReducer.data )
  return {
    data: state.loginReducer.data,
    products: state.productListReducer.data,
    cataegoery: state.categoeryListReducer.data,
    getProducts: state.getProductByCatIdReducer.data,
    bestSelling: state.getBestSellingProductReducer.data,
    topRated: state.getTopRatedProductReducer.data,
    featured: state.getFeaturedProductReducer.data,
    onSale: state.getOnSaleProductReducer.data,
    organicWorld: state.getOrganicWorldProductReducer.data,
    recentProduct: state.getRecentProductReducer.data,
    bestOffer: state.getBestOfferReducer.data,
    homePageData: state.homePageReducer.data,
    keyWordProduct: state.getKeywordProductReducer.data,
    video: state.getVideosReducer.data,
    searchLoading: state.getKeywordProductReducer.isLoading
  };

}

const mapDispatchToProps = dispatch =>
{
  return {
    //getPeople,
    // login: (request) => dispatch(actions.login.apiActionCreator(request)),
    productList: ( request ) => dispatch( actions.productListAction() ),
    getCategoeryList: ( request ) => dispatch( actions.getCategoeryListAction() ),
    getProduct: ( request ) => dispatch( actions.getProductListByCatId( request ) ),
    getBestSellingProduct: ( request ) => dispatch( actions.getBestSellingProductAction( request ) ),
    getTopRatedProduct: ( request ) => dispatch( actions.getTopRatedProductAction( request ) ),
    getFeaturedProduct: ( request ) => dispatch( actions.getFeaturedProductAction( request ) ),
    getOnSaleProduct: ( request ) => dispatch( actions.getOnSaleProductAction( request ) ),
    getOrganicWorldProduct: ( request ) => dispatch( actions.getOrganicWorldProductAction( request ) ),
    getRecentProduct: ( request ) => dispatch( actions.getRecentProductAction( request ) ),
    homePageCall: ( request ) => dispatch( actions.homePageAction( request ) ),
    bestOffersCall: ( request ) => dispatch( actions.getBestOfferAction( request ) ),
    byKeyWord: ( request ) => dispatch( actions.getKeywordProduct( request ) ),
    videosCall: ( request ) => dispatch( actions.getVideosAction( request ) ),
    dispatch,
  };
};
export default connect( mapStateToProps, mapDispatchToProps )( SplashScreen );