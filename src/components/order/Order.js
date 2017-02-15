/**
 * Created by taranjeet.s on 1/25/2017.
 */
import React,{ Component } from 'react';
import { Picker,TouchableOpacity,View,Text,TouchableWithoutFeedback,Image,TextInput,Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { addOrder,orderupdate } from '../../actions';
import { CardSection } from '../common';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from './Button';
import { connect } from 'react-redux';
import Cart from '../../assets/cart.png';
import buildingImage from '../../assets/Dashboard-building.png';
import calender from '../../assets/calender.png';
import Arrow from '../../assets/company_list_arrow.png';
import { Actions } from 'react-native-router-flux';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected1: 'chair',
            selected2: 'sofa',
            selected3: 'Bed',
            color: 'red',
            width : '' ,height: '',
            mode: Picker.MODE_DIALOG,
        };
    }
    componentWillMount() {
        var {height, width} = Dimensions.get('window');
        this.setState({ width,height });
    }
    renderError(){
        const {error } = this.props;
        if(error){
            error.map(err => {
                return (
                    <View>
                        <Text>{err}</Text>
                    </View>
                );
            });
        }
    }
    renderButton(){
        const { loading } = this.props;
        if(loading){
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.props.loading} size="large" />
                </View>
            );
        }
        else{
            return (
                <Button onPress={this.onButtonPress.bind(this)}>ADD ORDER</Button>
            );
        }
    }
    onRowPress() {
        Actions.companylist();
    }
    onButtonPress() {
        const { sku,amount,date,type } = this.props.order;
        const { slug } = this.props;
        console.log("the slug is",slug);
        const { mobile_property } = this.props;
        console.log("the mobile in the order is ",mobile_property);
        console.log("the order is nthe order component",this.props.order);
        this.props.addOrder({ slug,mobile : mobile_property,sku,amount,date,type });
    }
    onValueChange(key,value) {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
    }



    render() {
        const Item = Picker.Item;
        const company_name = this.props.selected_company.name;
        console.log("the errors isn ordr are ",this.props.error);
        const { sku,amount,date,type } = this.props.order;
        const breadth = this.state.width;
        let paddingLeft = 280;
        if(breadth>600){
            paddingLeft = 490;
        }
        const width = breadth-40;
        return (
        <View style={{ paddingTop : 60 }}>
            <TouchableWithoutFeedback style={{ flex : 1 }} onPress={this.onRowPress.bind(this)}>
                <View>
                <CardSection style={{ alignSelf : 'center' }}>
                    <View style={styles.building}><Image source={ buildingImage } /></View>
                    <Text style={ styles.TextStyle }>{company_name}</Text>
                    <View style={styles.arrowStyle} >
                        <Image source={Arrow}></Image>
                    </View>
                </CardSection>
                <View style={{ height : 2,backgroundColor : '#dae1e5' }} ></View>
            </View>
            </TouchableWithoutFeedback>

            <View style={{ justifyContent : 'center',alignItems : 'center',paddingTop : 20,paddingBottom : 20 }}>
                <View>
                    <Image source={Cart} style={{ width : 60,height : 60 }} />
                </View>
                <View>
                    <Text style={{ fontSize : 20,fontWeight : 'bold',color : 'black' }}>Add Order Details</Text>
                    <Text style={{ fontSize : 12,alignSelf : 'center' }}>Please fill the form below</Text>
                </View>
            </View>

            <View style={{ paddingRight: 20,paddingLeft : 20 }}>
                <View style={{ borderWidth : 1,borderColor : '#e0e6e9' }}>
                    <Picker
                        selectedValue={type}
                        mode="dropdown"
                        onValueChange={value => this.props.orderupdate({props : 'type',value})}>
                        <Item label="Select Type" />
                        <Item label="Sofa" value="sofa" />
                        <Item label="Bed" value="bed" />
                    </Picker>
                </View>


            <View style={{ justifyContent : 'center',alignItems : 'center',paddingTop : 10 }}>
                <DatePicker
                    style={{ width : width,backgroundColor : '#fff' }}
                    date={date}
                    mode="date"
                    minDate={new Date()}
                    maxDate={new Date()}
                    placeholder="Select Date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource = {calender}
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: paddingLeft,
                            top: 12,
                            width : 15,
                            height : 15,
                        },
                        placeholderText : {
                            alignSelf : 'flex-start',
                            fontSize : 15,
                            paddingLeft : 10,
                            color : '#b9bcbe'
                        },dateText : {
                            alignSelf : 'flex-start',
                            color : '#b9bcbe',
                            paddingLeft : 10},
                        dateInput: {
                            borderColor : '#e0e6e9'
                        }
                    }}
                    onDateChange={value => this.props.orderupdate({props : 'date',value})}
                />
            </View>

                <View style={{ paddingTop : 10 }}>
                    <TextInput
                        placeholder='Enter Amount'
                        underlineColorAndroid='transparent'
                        keyboardType={'phone-pad'}
                        style={{ fontSize : 15,backgroundColor : '#dae2e0',height : 45,paddingLeft : 10 }}
                        placeholderTextColor="#bac1c5"
                        onChangeText={value => this.props.orderupdate({props : 'amount',value})}
                        value={amount}
                    />
                </View>

                <View style={{ paddingTop : 10 }}>
                    <TextInput
                        placeholder='SKU (Optional)'
                        underlineColorAndroid='transparent'
                        style={{ fontSize : 15,backgroundColor : '#dae2e0',height : 45,paddingLeft : 10,color : '#bac1c5' }}
                        placeholderTextColor="#B8B8B8"
                        onChangeText={value => this.props.orderupdate({props : 'sku',value})}
                        value={sku}
                    />
                </View>

                <View>
                    <Text style={styles.textStyle}>
                        {this.props.error}
                    </Text>
                </View>

            <CardSection>
                { this.renderButton() }
            </CardSection>
            </View>
        </View>
        );
    }
}
const styles = {
    buttonStyle : {
        justifyContent : 'center',
        flex : 1,
        height : 50,
        backgroundColor: '#6C3483',
        borderRadius:25,
        marginTop : 20,
        marginLeft:80,
        marginRight:80
    },
    arrowStyle: {
        flex : 1,
        paddingRight : 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    building: {
        width: 55,
        height: 55,
        marginLeft : 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextStyle : {
        fontSize : 15,
        color : '#000000',
        paddingLeft : 10,
        fontWeight : '600',
        paddingTop : 17
    },
    textStyle : {
        fontSize : 10,
        color : "red",
        alignSelf : 'center'
    }
};
function mapStateToProps(state){
    const { order } = state;
    const { loading } = order;
    const { mobile_property,error } = order;
    const { companies } = state;
    const { selected_company } = state.companies;
    const { slug } = companies.selected_company;
    return { order,slug,mobile_property,selected_company,loading,error };
}
export default connect(mapStateToProps,{addOrder,orderupdate})(Order);