import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text, View ,Image,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import SearchBox from '../../Components/SearchBox';
import { actions } from '../../Redux/actions';
import { GET_BLOG_LIST_ERROR, GET_BLOG_LIST_SUCESS } from '../../Redux/actionTypes';
import Apis from '../../RestApi/Apis';
import { Black, Light_Green, White } from '../../Utils/colors';
import { screen_width } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';


class Blog extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            searchValue: '',
            // link: [
            //     {
            //         "id": 0,
            //         "url": require( '../../../assets/banner1.png' )
            //     },
            //     {
            //         "id": 1,
            //         "url": require( '../../../assets/banner2.png' )
            //     },
            //     {
            //         "id": 2,
            //         "url": require( '../../../assets/banner1.png' )
            //     }

            // ],
            data:[],
            visible:true
        }
        // this.props.blogRequest();
    }


    searchBlog = () =>{
        Apis.searchBlogCall({
            "keyword":this.state.searchValue
        })
        .then((res)=> {return JSON.stringify(res)})
        .then((response)=>{
            console.log("Search Data",response);
            // let data = JSON.parse(response).data.data
            if(JSON.parse(responce).data.status == true){
                   
                console.log("====== GET_BLOG_LIST_LOADING ====== >  ", JSON.parse(responce).data);
                this.setState({data:JSON.parse(responce).data.data})
                this.props.dispatch({
                    type:GET_BLOG_LIST_SUCESS,
                    payload:JSON.parse(responce).data
                });
                
                setTimeout(()=>{
                    this.setState({visible:false})
                },2000)
               
            }
            else{
                console.log("====== GET_BLOG_LIST_SUCESS ====== >  ", JSON.parse(responce).data);
                this.props.dispatch({
                    type:GET_BLOG_LIST_ERROR,
                    payload:JSON.parse(responce).data
                });
                this.setState({visible:false})
            }
        }).
        catch((error)=>{
            console.log("ERROR",error)
            this.setState({visible:false})
        })
    }
   componentDidMount(){
    this.setState({visible:true})
  
            
            Apis.getBlogCall()
            .then((res)=> {
                return JSON.stringify(res);
            })
            .then((responce)=>{
                if(JSON.parse(responce).data.status == true){
                   
                    console.log("====== GET_BLOG_LIST_LOADING ====== >  ", JSON.parse(responce).data);
                    this.setState({data:JSON.parse(responce).data.data})
                    this.props.dispatch({
                        type:GET_BLOG_LIST_SUCESS,
                        payload:JSON.parse(responce).data
                    });
                    
                    setTimeout(()=>{
                        this.setState({visible:false})
                    },2000)
                   
                }
                else{
                    console.log("====== GET_BLOG_LIST_SUCESS ====== >  ", JSON.parse(responce).data);
                    this.props.dispatch({
                        type:GET_BLOG_LIST_ERROR,
                        payload:JSON.parse(responce).data
                    });
                    this.setState({visible:false})
                }
            }).
            catch((error)=>{
                this.props.dispatch({
                    type:GET_BLOG_LIST_ERROR,
                    payload:error
                });
                this.setState({visible:false})
            })
      
    }

    removeTags = ( str ) =>
    {
       
        if ( ( str === null ) || ( str === '' ) )
            return '';
        else
            str = str.toString();

        // Regular expression to identify HTML tags in 
        // the input string. Replacing the identified 
        // HTML tag with a null string.
       let newstr= str.replace( /(<([^>]+)>)/ig, '' );
       return  newstr.replace(/^\s+|\s+$/gm,'');
    }

    renderItem = ( item, index ) =>
    {
    
        return (
            <View style={styles.itemView}>
                <View style={styles.rowView}>
                    {
                        item.img.length>0?
                        <Image 
                        source={{uri:item.img[0].img_path}}
                        style={styles.imageStyle } />:
                        <Image 
                        source={require('../../../assets/default.png')}
                        style={styles.imageStyle } />
                    }
                   
                    <View style={{ left:5}}>
                        <Text style={[styles.normalText,{color:Light_Green, marginRight:"35%"}]}>{item.category_name}</Text>
                        <Text style={[[styles.normalText,{color:Black}]]}>Ayana Food Organic</Text>
                        <Text style={styles.smallText}>{item.post_date}</Text>
                    </View>

                </View>
                <Text style={[[styles.normalText,{color:Black,fontFamily:POPINS_REGULAR}]]}>{this.removeTags(item.post_content.slice( 0, 250 ) + ( item.post_content.slice.length > 250 ? "..." : "...." )) }</Text>
                <View style={[styles.rowView,{justifyContent:'space-between'}]}>
                    <FilledButton title="Read more"
                        style={ { borderRadious: 20,paddingVertical:0 } }
                        textStyle={ { fontSize: 10, paddingVertical: 5 , paddingHorizontal:15} }
                        onPress={ () => {this.props.navigation.navigate('BlogDetails',{
                            data:item,
                        }) } } />

                        {/* <TouchableOpacity style={styles.btnStyle}>
                            <View style={styles.rowView}>
                                <Image source={require('../../../assets/message.png')}
                                style={styles.iconStyle}/>
                                <Text style={[styles.smallText]}>Leave a comment</Text>
                            </View>
                        </TouchableOpacity> */}
                </View>
            </View>
        )
    }

    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                <ProgressLoader
                            visible={ this.state.visible }
                            isModal={ true }
                            isHUD={true}
                            hudColor={White}
                            color={ Light_Green } />
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Blog' } />
                    <SearchBox
                        style={ styles.searchBox }
                        value={ this.state.searchValue }
                        onChangeText={ ( text ) =>
                        {
                            this.setState( {
                                searchValue: text
                            } )
                           
                        } }
                        secureTextEntry={ false }
                        onEndEditing={ () =>
                            {
                                this.searchBlog()
                                this.setState( { visible: true } )
                                // setTimeout(()=>{
                                //     this.setState({visible:false})
                                // },2000)
                            } }
                        placeholder={ "Search here" } />
                        
                    <View>
                  
                        <FlatList
                            data={ this.state.data }
                            extraData={this.state.data}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={ ( item, index ) => item.ID}
                            renderItem={ ( { item, index } ) => this.renderItem( item, index ) } />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

function mapStateToProps ( state, ownProps )
{
    console.log( " state.getBlogsReducer.data",state.getBlogsReducer.data)
    return {
        // data : state.loginReducer.data
        blogs:state.getBlogsReducer.data
       
    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        blogRequest: ( request ) => dispatch( actions.getBlogsAction( request ) ),
        
        dispatch
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Blog );
