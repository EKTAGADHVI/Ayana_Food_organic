import React, { Component } from 'react';
import { FlatList,SafeAreaView,View } from 'react-native';
import { connect } from 'react-redux';
import BasicHeader from '../../Components/BasicHeader';
import ProductView from '../../Components/ProductView';
import styles from './styles';

class ProductViewScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {

            categoeries: this.props.route.params.data,


        }
    }

    render ()
    {
        return (
           
            <View style={styles.mainLayout}>
                 <SafeAreaView>
                <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ this.props.route.params.title}
                rightMenuIcon={require('../../../assets/filter.png')}/>
                <FlatList
                    data={ this.state.categoeries }
                    numColumns={ 2 }
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
                        name={ item.name.slice(0,count) +(item.name.length > count ? "..." : "") }
                        image ={item.images[0]?.src} 
                        rating={item.rating_count}
                        price ={item.price}
                        />
                        


                    } } />
                    </SafeAreaView>
            </View>
        );
    }
}
// export default ProductViewScreen;
function mapStateToProps ( state, ownProps )
{
    console.log( " state.loginReducer.data", state.productListReducer.data )
    return {
        // data : state.loginReducer.data
        products: state.productListReducer.data,


    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( ProductViewScreen );