import React, { Component } from 'react';
import { FlatList, SafeAreaView, View, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import InternetScreen from '../../Components/InternetScreen';
import SearchBox from '../../Components/SearchBox';
import { actions } from '../../Redux/actions';
import { Light_Green, White } from '../../Utils/colors';
import styles from './styles';
import NetInfo from "@react-native-community/netinfo";
class Explore extends Component
{
    constructor ( props )
    {
        super( props );
      
        this.state = {
            searchValue: '',
            categoeries: [],
            visible: false,
            isInternet:true
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

                                value={ this.state.searchValue }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        searchValue: text
                                    } )
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
        cataegoery: state.categoeryListReducer.data


    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        getCategoeryList: ( request ) => dispatch( actions.getCategoeryListAction() ),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( Explore );