import React, { Component } from 'react';
import { FlatList,SafeAreaView,View } from 'react-native';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import ProductView from '../../Components/ProductView';
import { actions } from '../../Redux/actions';
import { Light_Green, White } from '../../Utils/colors';
import styles from './styles';

class ProductViewScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {

            categoeries: [],
            request:this.props.route.params.request ? this.props.route.params.request:'',
            visible:false

        }
        if(this.state.categoryId !== ''){
            // let request ={
            //     "category_id":this.state.categoryId
            // };
            // console.log("Request",request)
            this.props.getProductByCatId(this.state.request);
        
        }
    }
componentDidMount(){
    this.setState({
        visible:true
    })
    setTimeout(()=>{
      setInterval(()=>{

        console.log("Cateeeeee",this.props.getProductsListByCatId )
        this.setState({categoeries:this.props.getProductsListByCatId.data});
      },500)
      this.setState({
        visible:false
    })
    },2000)
   
}
componentWillUnmount(){
  this.setState({
    categoeries: [],
    request:'',
    visible:false
  })
}
    render ()
    {
        return (
           
            <View style={styles.mainLayout}>
                 <SafeAreaView>
                <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ this.props.route.params.title}
                rightMenuIcon={require('../../../assets/filter.png')}/>
                  <ProgressLoader
                visible={this.state.visible}
                isModal={true} 
                isHUD={true}
                hudColor={White}
                color={Light_Green} />
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
                        name={ item.post_title.slice(0,count) +(item.post_title.length > count ? "..." : "") }
                        image ={item.guid} 
                        rating={2}
                        price ={20}
                        onPress={ () =>
                            {
                                this.props.navigation.navigate( 'ProductDetailScreen', {
                                    data: item
                                } )
                            } }
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
    // console.log( " state.getProductByCatIdReducer.data", state.getProductByCatIdReducer.data )
    return {
        // data : state.loginReducer.data
        products: state.productListReducer.data,
        getProductsListByCatId:state.getProductByCatIdReducer.data

    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        getProductByCatId:(request)=>dispatch(actions.getProductListByCatId(request)),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( ProductViewScreen );