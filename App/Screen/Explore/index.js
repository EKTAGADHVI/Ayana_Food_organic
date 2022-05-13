import React, { Component } from 'react';
import { FlatList, SafeAreaView, View, Image, TouchableOpacity, Text,} from 'react-native';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import InternetScreen from '../../Components/InternetScreen';
import SearchBox from '../../Components/SearchBox';
import { actions } from '../../Redux/actions';
import { Light_Green, White } from '../../Utils/colors';
import styles from './styles';
import NetInfo from "@react-native-community/netinfo";
import ProductView from '../../Components/ProductView';
import { PRODUCT_BY_KEYWORD_SUCESS } from '../../Redux/actionTypes';
import { initialState } from '../../Utils/constant';
class Explore extends Component
{
    constructor ( props )
    {
        super( props );
      
        this.state = {
            searchValue: '',
            categoeries: [],
            visible: false,
            isInternet:true,
            modalVisible: false,
            keyword: '',
            searchLoading: this.props.searchLoding,
        };
        this.checkInternet()
    }

    renderItem = ( item, index ) =>
    {
        console.log( item )
        if ( index < 6 )
        {
            return (
                <TouchableOpacity style={ [ styles.categoeryView, { backgroundColor: index % 2 === 0 ? '#FEF1E4' : '#E5F3EA' } ] }
                    onPress={ () => { this.onCategoryPress( item ) } } >
                    {
                        item.guid === null || item.guid === "" ?
                            <Image source={ require( '../../../assets/default.png' ) }
                                resizeMode={ 'contain' }
                                style={ styles.ImageStyle }>
                            </Image>
                            :
                            <Image source={ { uri: item.guid !== null || item.guid !== "" ? item.guid : "" } }
                                resizeMode={ 'contain' }
                                style={ styles.ImageStyle }>
                            </Image>
                    }

                    <Text style={ styles.regularText }>{ item.name }</Text>
                </TouchableOpacity>
            );
        }

    }
    onCategoryPress = ( data ) =>
    {
        let subCategoeriesData =
            this.props?.cataegoery?.data.filter( ( item ) =>
            {
                if ( item.parent === data.category_id )
                {
                    return data;
                }
            } );

        this.props.navigation.navigate( "SubCategories", {
            subCategoeries: subCategoeriesData,
            title: data.name
        } )

    }
    checkInternet=()=>{
        NetInfo.fetch().then( state =>
            {
                console.log( "Connection type", state.type );
                console.log( "Is connected?", state.isConnected );
                if ( state.isConnected == true )
                {
                  
                  this.setState({isInternet:true})
                  this.props.getCategoeryList();
                  this.filterCat()
                  this.setState( { visible: true } )
                  
                }
                else
                {
                    this.setState({isInternet:false})
                }
            } );
    }
    filterCat = () =>{
        setTimeout( () =>
        {
       
       if(this.state.isInternet === true ){
        if ( this.props?.cataegoery?.data.length > 0 )
        {
            let mainCategoeries =
                this.props?.cataegoery?.data.filter( ( data ) =>
                {
                    if ( data.parent == "0" )
                    {
                        return data;
                    }
                } );

            this.setState( {
                categoeries: mainCategoeries
            }, () =>
            {
                this.setState( { visible: false } )
            } )
            console.log( "Save" )
        }
       
       }
       
        }, 1000 )
    }
    componentDidMount ()
    {
     
        this.checkInternet()
        this.filterCat();
        // console.log( "did Mount", this.props.cataegoery )
       
    }

    displayPrice = ( data ) =>
    {

        let price = "";
        let l_data = data.filter((item)=>{
        
                return Object.keys(item).indexOf("_sale_price")!= -1 ?item :null
            
        });
        if(data !== undefined){
            if ( data?.length > 1 )
        {
          
            // console.log("L DATA",l_data)
            price = l_data?.reduce( function ( prev, curr )
            {
            
                    return prev?._sale_price < curr?._sale_price ? prev : curr;
                
               
            } );
           
            console.log( "MIN", price )
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
        console.log( "WEIGHJHGHG",data)
        let price = "";
    
        if(data!== undefined){
            if ( data.length > 1)
        {
            price = data.reduce( function ( prev, curr )
            {
                return prev._sale_price < curr._sale_price ? prev : curr;
            } );
            console.log( "MIN", price )
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
     
        if(data !== undefined ){
         
            let discountPrice = data._regular_price - data._sale_price;
        let price = ( discountPrice / data._regular_price ) * 100;
        return price.toFixed( 1 ) + "%";
        }
        else{
            return 0;
        }
    }
    render ()
    {

        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                  

                    <ProgressLoader
                        visible={ this.state.visible }
                        isModal={ true }
                        isHUD={ true }
                        hudColor={ White }
                        color={ Light_Green } />
                    {this.state.isInternet === true     ?
                        <View>
                              <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Find Product" } />
                              <SearchBox
                                editable={ false }
                                onTouchStart={()=>{ this.setState( { modalVisible: true } )}}
                                onFocus={ () =>
                                {
                                    this.setState( { modalVisible: true } )
                                } }
                                value={ this.state.searchValue }
                                onChangeText={ ( text ) =>
                                {
                                    // this.setState( {
                                    //     searchValue: text
                                    // } )
                                } }
                                secureTextEntry={ false }
                                placeholder={ "Search here" } />
                            <View style={ styles.underLineView }>
                                <Text style={ styles.labelText }>All Categoeies</Text>
                            </View>
                            <FlatList
                                style={ { alignSelf: 'center' } }
                                numColumns={ 2 }
                                extraData={ this.state.categoeries }
                                data={ this.state.categoeries }
                                keyExtractor={ ( item, index ) => item.category_id }
                                renderItem={ ( { item, index } ) => this.renderItem( item, index ) } />
                        </View>
                        :
                        <InternetScreen 
                                         onPress={()=>{
                     this.checkInternet();
                 }}/>
                    }
                          <Modal
                        isVisible={ this.state.modalVisible }
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        //    transparent={ true }

                        style={ { flex: 1, backgroundColor: White,justifyContent:'center',alignItems:'center' } }
                        onRequestClose={ () =>
                        {
                            this.setState( { modalVisible: false } )
                            this.setState( { keyword: '' } )
                            this.props.dispatch(
                                {
                                    type: PRODUCT_BY_KEYWORD_SUCESS,
                                    payload: initialState
                                }
                            )
                            // mooveRL();
                        } }>
                        <View style={ styles.modalStyles }>
                            <ProgressLoader
                                visible={ this.props.searchLoading == true ? true : setTimeout(()=>{false},1000) }
                                isModal={ true }
                                isHUD={ true }
                                hudColor={ White }
                                color={ Light_Green } />
                            <View style={ { marginTop: "10%" } }>
                                <View style={ { flexDirection: 'row' } }>
                                    <TouchableOpacity style={ {
                                        marginHorizontal: 10,
                                        justifyContent: 'center'
                                    } }
                                        onPress={ () =>
                                        {
                                            this.setState( { modalVisible: false } )
                                            this.setState( { keyword: '' } )
                                            this.props.dispatch(
                                                {
                                                    type: PRODUCT_BY_KEYWORD_SUCESS,
                                                    payload: initialState
                                                }
                                            )
                                        } }>
                                        <Image
                                            style={ {
                                                alignSelf: 'center',
                                                left: "10%"
                                            } }
                                            source={ require( '../../../assets/back.png' ) } />
                                    </TouchableOpacity>
                                    <SearchBox
                                        style={ { width: "85%", alignSelf: "flex-end" } }
                                        autoFocus={ true }
                                        value={ this.state.keyword }
                                        onEndEditing={ () =>
                                        {
                                            this.props.byKeyWord( {
                                                "keyword": this.state.keyword
                                            } );
                                            this.setState( { searchLoading: true } )
                                            // setTimeout(()=>{
                                            //     this.setState({visible:false})
                                            // },2000)
                                        } }
                                        onChangeText={ ( text ) =>
                                        {
                                            this.setState( { keyword: text } )
                                            // this.props.byKeyWord({
                                            //     "keyword": text
                                            // });
                                        } }
                                        secureTextEntry={ false }
                                        placeholder={ "Search here" } />
                                </View>
                                <FlatList
                                    data={ this.props.keyWordProduct?.data }
                                    numColumns={ 2 }
                                  
                                    maxToRenderPerBatch={ 2 }
                                    style={{alignSelf:'center'}}
                                    extraData={ this.props.keyWordProduct?.data }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) =>
                                    {
                                        // console.log("Image Search", index , item.ID,item.img[ 0 ].img_path)
                                        let count = 14
                                        return (
                                            <ProductView
                                            name={ item.post_title.slice( 0, count ) + ( item.post_title.length > count ? "..." : "" ) }
                                            image={ item.img[0]?item.img[ 0 ].img_path:"https://www.google.com/imgres?imgurl=https%3A%2F%2Ftazacommune.com%2Fwp-content%2Fplugins%2Fwp-appkit%2Fdefault-themes%2Fq-android%2Fimg%2Fimg-icon.svg&imgrefurl=https%3A%2F%2Ftazacommune.com%2Fwp-content%2Fplugins%2Fwp-appkit%2Fdefault-themes%2Fq-android%2Fimg%2F&tbnid=IcDkuwOqDZfKRM&vet=12ahUKEwjx8uK3usj3AhVYjNgFHRbLAzoQMygIegUIARDbAQ..i&docid=O1pAK2L-q7izNM&w=912&h=816&q=default%20image&hl=en-GB&ved=2ahUKEwjx8uK3usj3AhVYjNgFHRbLAzoQMygIegUIARDbAQ" }
                                            rating={ item.rating[ 0 ].meta_value }
                                            weight={this.displayWeight(item.variation)}
                                            price={ this.displayPrice( item.variation ) }
                                            // price={ 50 }
                                            discount={ this.discountInPercentage( item.variation[ 0 ] ) }
                                            storeName={ item.seller_name }
                                            onPress={ () =>
                                            {
                                                this.setState( { modalVisible: false } )
                                                this.props.navigation.navigate( 'ProductDetailScreen', {
                                                    data: item
                                                } )
                                            } }
                                            onAdd={ () =>
                                            {
                                                // this.addToCart( item );
                                            } } />
                                        )


                                    } } />
                            </View>

                        </View>

                    </Modal>

                </SafeAreaView>
            </View>
        );
    }
}
function mapStateToProps ( state, ownProps )
{
    // console.log( "state.categoeryListReducer.data ", state.categoeryListReducer.data)
    return {
        // data : state.loginReducer.data
        products: state.productListReducer.data,
        cataegoery: state.categoeryListReducer.data,
        keyWordProduct: state.getKeywordProductReducer.data,

        searchLoading: state.getKeywordProductReducer.isLoading,

    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        getCategoeryList: ( request ) => dispatch( actions.getCategoeryListAction() ),
        byKeyWord: ( request ) => dispatch( actions.getKeywordProduct( request ) ),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( Explore );