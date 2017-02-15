/**
 * Created by taranjeet.s on 1/24/2017.
 */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Picker,ScrollView,Image,View,TextInput,Text,DatePickerAndroid,TouchableWithoutFeedback,Dimensions } from 'react-native';
import { visitorupdate,orderupdate } from '../../actions';
import DatePicker from 'react-native-datepicker'
import { CardSection } from './../common';
import Input from './Input';
import Hr from 'react-native-hr';
import { connect } from 'react-redux';
import Character from '../../assets/Details_character.png';
import Arrow from '../../assets/company_list_arrow.png';
import humman_running from '../../assets/Fo.png';
import buildingImage from '../../assets/Dashboard-building.png';
import calender from '../../assets/calender.png';

class VisitorForm extends Component {
    constructor(props) {
        super(props);
        this.state = { width : '' ,height: '' };
    }
    componentWillMount() {
        var {height, width} = Dimensions.get('window');
        this.setState({ width,height });
    }
    state = {
        presetDate: new Date(2020, 4, 5),
        allDate: new Date(2020, 4, 5),
        simpleText: 'pick a date',
        spinnerText: 'pick a date',
        calendarText: 'pick a date',
        defaultText: 'pick a date',
        minText: 'pick a date, no earlier than today',
        maxText: 'pick a date, no later than today',
        presetText: 'pick a date, preset to 2020/5/5',
        allText: 'pick a date between 2020/5/1 and 2020/5/10',
    };
    onSubmit(){
        console.log("DSF");
    }
    showPicker = async (stateKey, options) => {
        try {
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                var date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };
    onRowPress() {
        Actions.companylist();
    }
    renderHuman(){
        if(this.props.last_visit){
            var monthNames = ["January", "Febuary", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const last_visit = this.props.last_visit;
            var visit = last_visit.split("-");
            const year = visit[0];
            const month_number = visit[1]-1;
            const month = monthNames[month_number];
            const day = visit[2];
            /*const da = d.split(":");
            const dayy = da[0];
            const day = `${dayy[0]}${dayy[1]}`;
            console.log(day);*/
            const dat = `${year} ${month} ${day}`;
            return (
                <View style={{ height: 25 ,marginTop : 10,width : 140,borderRadius : 3,backgroundColor : '#ffe5d0',flexDirection : 'row' }}>
                    <Image source={humman_running} style={{ marginLeft : 10,marginTop :4,width : 12,height : 16 }}></Image>
                    <Text style={{ marginLeft : 5,marginTop : 4 }}>{dat}</Text>
                </View>
            );
        }
    }
    renderErrors(){
        const { error } = this.props;
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
    render(){
        const Item = Picker.Item;
        const { name,phone,email,error } = this.props;
        const { sku,amount,type } = this.props.order;
        const company_name = this.props.selected_company.name;
        const breadth = this.state.width;
        let paddingLeft = 220;
        if(breadth>600){
            paddingLeft = 490;
        }
        const width = breadth-100;
        return (
            <ScrollView
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps={true}>
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

                    <View style={{ justifyContent : 'center',alignItems : 'center',paddingTop : 25 }}>
                        <View>
                            <Image source={Character} style={{ width : 70,height :70 }} />
                        </View>
                        <View>
                            <Text style={{ fontSize : 20,fontWeight : 'bold',color : 'black' }}>Visitor Details</Text>
                        </View>
                    </View>

                    <View style={{ paddingRight:50,paddingLeft : 50 }}>
                        <View style={{ paddingTop : 5 }}>
                            <TextInput
                                placeholder='Mobile Number'
                                underlineColorAndroid='transparent'
                                style={{ fontSize : 14,backgroundColor : '#dae2e0',height : 50,paddingLeft : 15 }}
                                placeholderTextColor="#B8B8B8"
                                onChangeText={value => this.props.visitorupdate({props : 'mobile',value})}
                                value={this.props.mobile}
                            />
                        </View>

                        {this.renderHuman()}

                        <View style={{ paddingTop : 10 }}>
                            <TextInput
                                placeholder='Name'
                                style={{ fontSize : 14,backgroundColor : '#dae2e0',height : 50,paddingLeft : 15 }}
                                placeholderTextColor="#B8B8B8"
                                underlineColorAndroid='transparent'
                                placeholderStyle={{ backgroundColor : 'green' }}
                                onChangeText={value => this.props.visitorupdate({props : 'name',value})}
                                value={this.props.name}
                            />
                        </View>

                        <View style={{ justifyContent : 'center',alignItems : 'center',paddingTop : 10 }}>
                            <DatePicker
                                style={{ width : width,backgroundColor : '#fff' }}
                                date={this.props.created_at}
                                mode="date"
                                placeholder="23 Jan 2017"
                                format="YYYY-MM-DD"
                                minDate={new Date()}
                                maxDate={new Date()}
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
                                        paddingLeft : 15},
                                    dateInput: {
                                        borderColor : '#e0e6e9',
                                        backgroundColor : '#dae2e0'
                                    }
                                }}
                                onDateChange={value => this.props.visitorupdate({props : 'created_at',value})}
                            />
                        </View>

                        <View style={{ paddingTop : 10 }}>
                            <TextInput
                                placeholder='Email'
                                underlineColorAndroid='transparent'
                                keyboardType={'email-address'}
                                style={{ fontSize : 14,backgroundColor : '#fff',height : 50,paddingLeft : 15,borderWidth : 1,borderColor : '#dae2e0' }}
                                placeholderTextColor="#B8B8B8"
                                onChangeText={value => this.props.visitorupdate({props : 'email',value})}
                                value={this.props.email}
                            />
                        </View>


                    <View style={{ justifyContent : 'center',alignItems : 'center',paddingTop : 10 }}>
                        <DatePicker
                            style={{ width : width,backgroundColor : '#fff' }}
                            date={this.props.dob}
                            mode="date"
                            placeholder="Select Date Of Birth"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            iconSource = {calender}
                            minDate="1950-01-01"
                            maxDate={new Date()}
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
                                    paddingLeft :0,
                                    color : '#b9bcbe'
                                },dateText : {
                                    alignSelf : 'flex-start',
                                    paddingLeft : 4},
                                dateInput: {
                                    borderColor : '#e0e6e9',
                                    paddingLeft : 15
                                }
                            }}
                            onDateChange={value => this.props.visitorupdate({props : 'dob',value})}
                        />
                    </View>

                    <View style={{ justifyContent : 'center',alignItems : 'center',paddingTop : 10,paddingBottom : 10 }}>
                        <DatePicker
                            style={{ width : width,backgroundColor : '#fff' }}
                            date={this.props.anniversary}
                            mode="date"
                            placeholder="Select Anniversary"
                            format="YYYY-MM-DD"
                            minDate="1950-01-01"
                            maxDate={new Date()}
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
                                    paddingLeft : 0,
                                    color : '#b9bcbe'
                                },dateText : {
                                    alignSelf : 'flex-start',
                                    paddingLeft : 4},
                                dateInput: {
                                    borderColor : '#e0e6e9',
                                    paddingLeft : 15
                                }
                            }}
                            onDateChange={value => this.props.visitorupdate({props : 'anniversary',value})}
                        />
                    </View>

                    <View style={{paddingTop : 3}}>
                        <Hr lineColor='#b3b3b3' text='Add-Order' textColor='steelblue' />
                    </View>

                    <View style={{ paddingTop : 10 }}>
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

                    </View>

                    <View>
                        {this.renderErrors()}
                    </View>

                </View>
            </ScrollView>
        );
    }
}
const styles = {
    textStyle : {
        fontSize : 20,
        color : "red",
        alignSelf : 'center',
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
};
function mapStateToProps(state){
    const { order } = state;
    const { selected_company,coustomerlist } = state.companies;
    const { name,mobile,email,dob,anniversary,created_at,loading,error } = state.coustomer;
    return { order,selected_company,name,mobile,email,dob,anniversary,created_at,loading,error,coustomerlist };
};
export default connect(mapStateToProps,{visitorupdate,orderupdate})(VisitorForm);