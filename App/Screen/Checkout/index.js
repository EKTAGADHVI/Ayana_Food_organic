import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Component } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';

import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import { ToastMessage } from '../../Components/ToastMessage';
import { GET_PROFILE_ERROR, GET_PROFILE_SUCESS } from '../../Redux/actionTypes';
import Apis from '../../RestApi/Apis';
import { Black, Gray, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_width } from '../../Utils/constant';
import styles from './styles';

class CheckOut extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            fName: '',
            lName: '',
            compnyName: '',
            stretAddress: '',
            city: "",
            stateList: [ { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' } ],
            openState: false,
            state: '',
            state_Value: '',
            pinCode: '',
            billingPhone: '',
            billingEmail: '',
            viewBtn:false,
            product:'',
            totalPrice:this.props.route.params.totalPrice,
            CheckOutData:this.props.route.params.checkoutData,
            visible:true,
            // isFname:false,
            // isLname:false,
            // is
        }
    }
    profileAPICall =() =>{
         AsyncStorage.getItem( 'UserData' )
        .then( ( res ) =>
        {

            let dd = JSON.parse( res ).data;
            console.log( "UserRes", dd[ 0 ].ID )
            if ( res !== null )
            {
                Apis.getProfileCall({
                    "user_id":dd[ 0 ].ID.toString()
                })
                .then((res  )=>{
                    return JSON.stringify(res);
                })
                .then((responce)=>{
        
                    console.log("Response Fetch call", responce)
                    if(JSON.parse(responce).data.status == true){
                        this.setState({visible:false})
                        console.log("======GET_PROFILE_LOADING_sucess===== >  ", JSON.parse(responce).data);
                        let data=JSON.parse(responce).data.data;
                        AsyncStorage.setItem('UserDetails',JSON.stringify(data))
                        .then(()=>{
                            this.setState({visible:false})
                            this.props.dispatch({
                                type:GET_PROFILE_SUCESS,
                                payload:JSON.parse(responce).data
                            });
                            this.setState({
                                fName:data[0].firstname,
                                lName:data[0].lastname,
                                email:data[0].user_email,
                                phone: data[0].phone,
                                billingEmail:data[0].user_email,
                                billingPhone: data[0].phone,
                                state_Value:data[0].new_location.state,
                                city:data[0].new_location.city,
                                stretAddress:data[0].street_address
                            })
                            // this.setState({userData:data})
                        })
                        .catch((error)=>{
                            this.setState({visible:false})
                            console.log(error)
                        })
                    }
                    else{
                        this.setState({visible:false})
                        console.log("======GET_PROFILE_LOADING ====== >  ", JSON.parse(responce).data);
                        this.props.dispatch({
                            type:GET_PROFILE_ERROR,
                            payload:JSON.parse(responce).data
                        });
                    }
                }).catch((error)=>{
                    this.setState({visible:false})
                    this.props.dispatch({
                        type:GET_PROFILE_ERROR,
                        payload:error
                    });
                    console.log("Fetch ERROR", error)
                })
            }
            else
            {
                this.setState({visible:false})
                this.setState( { userData: [] } )
            }
        } ).catch( ( error ) => { 
            this.setState({visible:false})
        } )

     
    }

   async componentDidMount(){
       this.profileAPICall()
      await  AsyncStorage.getItem('PostalCode')
        .then((res)=>{
            console.log("ressfiusgdfg",res)
           if(res!== null){
            this.setState({pinCode: JSON.parse(res).code})
           }
           else{
           
           }
            
        
        })
        .catch((error)=>{
            console.log("Data Not Removed")
        })
    }
    validation =()=>{
            if(this.state.fName === ""){
                ToastMessage('error','Enter  First Name','Please Check')
            }
            else if(this.state.lName== ""){
                ToastMessage('error','Enter  Last Name','Please Check')
            }else if(this.state.stretAddress==""){
                ToastMessage('error','Enter  Street Address','Please Check')
            }
            else if(this.state.city == ""){
                ToastMessage('error','Enter City Name' ,'Please Check')
            }
            else if(this.state.state_Value == ''){
                ToastMessage('error','Enter State Name' ,'Please Check')
            }
            else if(this.state.pinCode==''){
                ToastMessage('error','Enter Pincode' ,'Please Check')
            }
            else if(this.state.billingPhone== ''){
                ToastMessage('error','Enter Billing Phone' ,'Please Check')
            }
            else if(this.state.billingEmail == ''){
                // this.setState({viewBtn:true})
                ToastMessage('error','Enter Billing Email' ,'Please Check')
            }
            else{
              
                let billingData={
                    fName: this.state.fName,
                    lName: this.state.lName,
                    compnyName: this.state.compnyName,
                    stretAddress: this.state.stretAddress,
                    city: this.state.city,
                    state_Value: this.state.state_Value,
                    pinCode: this.state.pinCode,
                    billingPhone: this.state.billingPhone,
                    billingEmail: this.state.billingEmail,
                };
                
                  setTimeout(()=>{
                    this.setState({visible:false})
                    this.props.navigation.navigate('OrderPreview',{
                        totalPrice:this.state.totalPrice,
                        data:this.state.CheckOutData,
                        billingData:billingData
                    })
                  
                  },1500)
              
            }
    }
    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
        //   this.setState({ email: text })
          return false;
        }
        else {
        //   this.setState({ email: text })
          console.log("Email is Correct");
        }
      }
    render ()
    {
        let isFname=false;
        let isLname=false;
        let isStreetAddress=false;
        let isCity=false;
        let isState=false;
        let isPincode=false;
        let isBillingNo=false;
        let isBillingEmail=false;
        let isValidEmail=false;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         

        if(this.state.fName === ""){
            isFname=false
            // ToastMessage('error','Enter  First Name','Please Check')
        }
        else{
            isFname=true
         }
       if(this.state.lName== ""){
           isLname=false;
            // ToastMessage('error','Enter  Last Name','Please Check')
        }
        else{
            isLname=true
        }
        if(this.state.stretAddress==""){
            isStreetAddress=false
            // ToastMessage('error','Enter  Street Address','Please Check')
        }else{
            isStreetAddress=true
        }
       if(this.state.city == ""){
           isCity=false
            // ToastMessage('error','Enter City Name' ,'Please Check')
        }
        else{
            isCity=true
        }
         if(this.state.state_Value == ''){
             isState=false;
            // ToastMessage('error','Enter State Name' ,'Please Check')
        }
        else{
            isState=true;
        }
        if(this.state.pinCode==''){
            isPincode=false
            // ToastMessage('error','Enter Pincode' ,'Please Check')
        }else{
            isPincode=true
        }
        if(this.state.billingPhone== ''){
            isBillingNo=false
            // ToastMessage('error','Enter Billing Phone' ,'Please Check')
        }
        else{
            isBillingNo=true;
        }
      if(this.state.billingEmail == '' ){
          isBillingEmail=false;
            // this.setState({viewBtn:true})
            // ToastMessage('error','Enter Billing Email' ,'Please Check')
        }
         
        else{
            isBillingEmail=true;
        }
     if(this.validate(this.state.billingEmail)===false){
         isValidEmail=false
     }
     else{
         isValidEmail=true
     }
       

        return (
            <View style={ styles.mainLayout }>
               
                   <Toast  />
                <SafeAreaView>
             
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" :"height"} keyboardVerticalOffset={20}>
                    <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustContentInsets={true} >

                     
                    <ProgressLoader
                    visible={ this.state.visible }
                    isModal={ true }
                    isHUD={ true }
                    hudColor={ White }
                    color={ Light_Green } />
                     
                      {this.state.visible == false ?
                      <>
                        <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Checkout" } />
                        <View style={ [ styles.rowView, { borderBottomColor: Gray, borderBottomWidth: 0.5 } ] }>
                            <Text style={ [ styles.normalText, { color: Light_Green } ] }> Billing Details</Text>
                            <TouchableOpacity style={ styles.minusButton }>
                                <Text style={ [ styles.normalText, { paddingVertical: 0, paddingHorizontal: 0, color: White } ] }> - </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                           
                            <View style={ [ styles.rowView, { width: screen_width - 30 } ] }>
                                <Input
                                    textStyle={{color:Black}}
                                    title={ "First Name" }
                                    value={ this.state.fName }
                                    onEndEditing={()=>{
                                        // let isValid=false;
                                        if(this.state.fName === ""){
                                            // isValid=false;
                                            this.setState({viewBtn:false})
                                            // ToastMessage('error','Enter  First Name','Please Check')
                                        }
                                        else{

                                            this.setState({viewBtn:true}) 
                                        }
                                       
                                    }}
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            fName: text
                                        } )
                                    } }
                                    secureTextEntry={ false }

                                    inputStyle={ { width: screen_width / 2 - 30, } }
                                    placeholder={ "Enter Your First Name" }
                                />
                                <Input
                                      textStyle={{color:Black}}
                                    title={ "Last Name" }
                                    value={ this.state.lName }
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            lName: text
                                        } )
                                    } }
                                    onEndEditing={()=>{
                                        this.setState({viewBtn:false})
                                    }}
                                    containerStyle={ { marginHorizontal: 10 } }
                                    secureTextEntry={ false }
                                    inputStyle={ { width: screen_width / 2 - 30, } }
                                    placeholder={ "Enter Your Last Name" }
                                />
                            </View>

                            <Input
                                  textStyle={{color:Black}}
                                title={ "Company Name (Optional)" }
                                value={ this.state.compnyName }
                                // onEndEditing={()=>{
                                //     this.setState({viewBtn:false})
                                // }}
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        compnyName: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }
                                inputStyle={ { width: screen_width - 30, } }
                                placeholder={ "Enter Your Company Name" }
                            />
                            <Input
                                  textStyle={{color:Black}}
                                title={ "Street Address" }
                                value={ this.state.stretAddress }
                                onEndEditing={()=>{
                                    this.setState({viewBtn:false})
                                }}
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        stretAddress: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }
                                multiline={ true }
                                inputStyle={ { width: screen_width - 30, height: 80 } }
                                placeholder={ "Enter Your Street Address" }
                            />
                            <Input
                                  textStyle={{color:Black}}
                                title={ "Town/City *" }
                                value={ this.state.city }

                                onEndEditing={()=>{
                                    this.setState({viewBtn:false})
                                }}
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        city: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }
                                inputStyle={ { width: screen_width - 30, } }
                                placeholder={ "Enter Your Company Name" }
                            />


                            {/* <Text style={ [ styles.normalText, { fontSize: 16, color: Black, } ] }>State *</Text>
                            <DropDownPicker
                                open={ this.state.openState }
                                value={ this.state.state }
                                items={ this.state.stateList }
                                setOpen={ () =>
                                {
                                    this.setState( { openState: !this.state.openState } )
                                } }
                                setValue={ ( callback ) =>
                                {
                                    this.setState( state => ( {
                                        state: callback( state.value ),
                                        // selectedTaskId: callback( state.value )
                                    } ) );
                                } }
                                setItems={ ( callback ) =>
                                {
                                    this.setState( state => ( {
                                        state_Value: callback( state.items )
                                    } ) );
                                } }
                                placeholder="Select Your State"
                                placeholderStyle={ [ styles.normalText, { fontSize: 14, color: Text_Gray } ] }
                                arrowIconStyle={ {
                                    width: 20,
                                    height: 20,
                                    tintColor: Black
                                } }
                                tickIconStyle={ {
                                    width: 20,
                                    height: 20,
                                    tintColor: Black
                                } }
                                containerStyle={ styles.containerStyle }
                                style={ {
                                    borderWidth: 0,
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: Gray
                                } }

                                dropDownContainerStyle={ {
                                    borderWidth: 0,
                                    backgroundColor: White
                                } }

                            /> */}
                                <Input
                                  textStyle={{color:Black}}
                                title={ "State *" }
                                onEndEditing={()=>{
                                    this.setState({viewBtn:false})
                                }}
                                value={ this.state.state_Value }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        state_Value: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }
                                inputStyle={ { width: screen_width - 30, } }
                                placeholder={ "Enter Your State Name" }
                            />

                            <Input
                                  textStyle={{color:Black}}
                                title={ "PinCode *" }
                                maxLength={6}
                                onEndEditing={()=>{
                                    this.setState({viewBtn:false})
                                }}
                                value={ this.state.pinCode }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        pinCode: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }

                                inputStyle={ { width: screen_width - 30 } }
                                placeholder={ "Enter Your PinCode" }
                            />

                            <Input
                                  textStyle={{color:Black}}
                                  onEndEditing={()=>{
                                    this.setState({viewBtn:false})
                                }}
                                maxLength={10}
                                title={ "Billing Phone Number *" }
                                value={ this.state.billingPhone }
                                keyboardType={'number-pad'}
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        billingPhone: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }

                                inputStyle={ { width: screen_width - 30, } }
                                placeholder={ "Enter Your Billing Phone Number" }
                            />

                            <Input
                              textStyle={{color:Black}}
                                title={ "Billing Email *" }
                                onEndEditing={()=>{
                                    this.setState({viewBtn:true})
                                }}
                                value={ this.state.billingEmail }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        billingEmail: text
                                    } )
                                } }
                                // containerStyle={ { marginHorizontal: 10 } }
                                secureTextEntry={ false }

                                inputStyle={ { width: screen_width - 30, } }
                                placeholder={ "Enter Your Billing Email" }
                            />

                            <FilledButton title="Apply and Continue"
                            disabled={
                                (isFname ===true) &&
                                (isLname ===true) &&
                                (isStreetAddress ===true)&&
                                (isCity===true) &&
                                (isState ===true) &&
                                (isBillingNo ===true)&&
                                (isBillingEmail ===true) &&
                                (isValidEmail === true) ?
                                false :true

                            }
                                style={ { width: screen_width - 30, borderRadious: 15, marginVertical: "6%", alignSelf: "center",
                                opacity:   (isFname ===true) &&
                                (isLname ===true) &&
                                (isStreetAddress ===true)&&
                                (isCity===true) &&
                                (isState ===true) &&
                                (isBillingNo ===true)&&
                                (isBillingEmail ===true)  &&
                                (isValidEmail === true) ? 1 :0.5
                             } }
                                textStyle={ { fontSize: 16, paddingVertical: 8 } }
                                onPress={ () => {this.validation() } } />
 </View>
                      </>
                      :null}
                      
                    </ScrollView>
                    </KeyboardAvoidingView>
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
export default connect( mapStateToProps, mapDispatchToProps )( CheckOut );
