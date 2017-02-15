/**
 * Created by taranjeet.s on 1/24/2017.
 */
import React, { Component } from 'react';
import { View,TextInput,Text,DatePickerAndroid,TouchableWithoutFeedback } from 'react-native';
import { visitorupdate } from '../../actions';
import DatePicker from 'react-native-datepicker'
import { Card,CardSection } from './../common';
import Character from '../../assets/Details_character.png';
import Input from './Input';
import { Makiko } from 'react-native-textinput-effects';
import { connect } from 'react-redux';

class VisitorForm extends Component {
    render(){
        const { name,phone,email } = this.props;
        return (
            <View>
                <View>
                    <View style={ styles.imageStyle } >
                        <Image source={Character} />
                    </View>
                    <View style={styles.textViewStyleone}>
                        <Text style={styles.textStyleone}>Login Account</Text>
                    </View>
                    <View style={styles.textViewStyletwo}>
                        <Text style={styles.textStyletwo}>Please enter your seller account credentials</Text>
                    </View>
                </View>
                <CardSection>
                    <Input
                        placeholder="Mobile Number"
                        onChangeText={value => this.props.visitorupdate({props : 'mobile',value})}
                        value={this.props.mobile}/>
                </CardSection>

                <CardSection>
                    <Input
                        placeholder="jane doe"
                        onChangeText={value => this.props.visitorupdate({props : 'name',value})}
                        value={this.props.name}/>
                </CardSection>

                <CardSection>
                    <Input
                        placeholder="Email"
                        onChangeText={value => this.props.visitorupdate({props : 'email',value})}
                        value={this.props.email}/>
                </CardSection>

                <CardSection>
                    <View>
                        <DatePicker
                            style={{width: 200}}
                            date={this.props.dob}
                            mode="date"
                            placeholder="Select Date Of Birth"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon ={false}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                showIcon : false,
                                dateInput: {
                                    marginLeft: 0
                                }
                            }}
                            onDateChange={value => this.props.visitorupdate({props : 'dob',value})}
                        />
                    </View>
                </CardSection>
                <CardSection>
                    <View>
                        <DatePicker
                            style={{width: 200}}
                            date={this.props.anniversary}
                            mode="date"
                            placeholder="Select Anniversary"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon ={false}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                showIcon : false,
                                dateInput: {
                                    marginLeft: 0
                                }
                            }}
                            onDateChange={value => this.props.visitorupdate({props : 'anniversary',value})}
                        />
                    </View>
                </CardSection>
                <CardSection>
                    <View>
                        <DatePicker
                            style={{width: 200}}
                            date={this.props.created_at}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon ={false}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                showIcon : false,
                                dateInput: {
                                    marginLeft: 0
                                }
                            }}
                            onDateChange={value => this.props.visitorupdate({props : 'created_at',value})}
                        />
                    </View>
                </CardSection>
            </View>
        );
    }
}
const styles = {
    textStyleone : {
        fontSize : 23,
        color : '#000000',
        fontWeight : '600'
    },
    textStyletwo : {
        fontSize : 13,
        color : '#000000'
    },
    imageStyle : {
        paddingTop : 40,
        justifyContent: 'center',
        alignItems : 'center',
    },
    textViewStyleone : {
        paddingTop : 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textViewStyletwo : {
        paddingTop : 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom : 10
    }

};
function mapStateToProps({coustomer}){
    const { name,mobile,email,dob,anniversary,created_at,error } = coustomer;
    return { name,mobile,email,dob,anniversary,created_at,error };
};
export default connect(mapStateToProps,{visitorupdate})(VisitorForm);