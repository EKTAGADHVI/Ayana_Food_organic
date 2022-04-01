import React, { Component } from 'react';
import { FlatList, SafeAreaView, View ,Image,TouchableOpacity,Text} from 'react-native';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import SearchBox from '../../Components/SearchBox';
import { actions } from '../../Redux/actions';
import { Light_Green, White } from '../../Utils/colors';
import styles from './styles';

class Explore extends Component
{
    constructor ( props )
    {
        super( props );
        this.props.getCategoeryList();
        this.state={
            searchValue:'',
            categoeries: [],
            visible:false
        };
    }

    renderItem  = ( item, index ) =>
    {
        console.log( item )
        if ( index < 6 )
        {
            return (
                <TouchableOpacity style={ [ styles.categoeryView, { backgroundColor: index % 2 === 0 ? '#FEF1E4' : '#E5F3EA' } ] } 
                onPress={()=>{this.onCategoryPress(item)}} >
                    {
                        item.guid === null || item.guid === "" ?
                        <Image source={require('../../../assets/default.png')}
                        resizeMode={ 'contain' }
                        style={styles.ImageStyle}>
                    </Image>
                    :
                    <Image source={{uri:item.guid !== null || item.guid !== "" ?item.guid: ""  }}
                    resizeMode={ 'contain' }
                    style={styles.ImageStyle}>
                </Image>
                    }
                   
                    <Text style={styles.regularText}>{ item.name }</Text>
                </TouchableOpacity>
            );
        }

    }
    onCategoryPress=(data)=>{
        let subCategoeriesData =
        this.props?.cataegoery?.data.filter((item)=>{
            if(item.parent === data.category_id){
                return data;
            }
        });

        this.props.navigation.navigate("SubCategories",{
            subCategoeries:subCategoeriesData,
            title:data.name
        })

    }
    componentDidMount(){
        this.setState({visible:true})
        console.log("did Mount",this.props.cataegoery)
        setTimeout(()=>{
            if(this.props?.cataegoery?.data.length >0){
                let mainCategoeries =
                this.props?.cataegoery?.data.filter((data)=>{
                    if(data.parent == "0"){
                        return data;
                    }
                });

                this.setState({
                    categoeries:mainCategoeries
                },()=>{
                   
                })
                console.log("Save")
            }
            this.setState({visible:false})
        },1000)
    }
    render ()
    {
    
        return (
            <View style={ styles.mainLayout }>
            <SafeAreaView>
                <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Find Product" } />

                <ProgressLoader
                visible={this.state.visible}
                isModal={true} 
                isHUD={true}
                hudColor={White}
                color={Light_Green} />
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
                    <View style={styles.underLineView}>
                    <Text style={styles.labelText}>All Categoeies</Text>
                    </View>
                        <FlatList
                        style={{alignSelf:'center'}}
                        numColumns={2}
                        extraData={this.state.categoeries}
                        data={this.state.categoeries}
                        keyExtractor={(item,index)=>item.category_id }
                        renderItem={({item,index})=>this.renderItem(item,index)}/>
              
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
        cataegoery:state.categoeryListReducer.data


    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        getCategoeryList:(request)=>dispatch(actions.getCategoeryListAction()),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( Explore );